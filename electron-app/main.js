const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { createTray, updateTrayStatus } = require('./tray');
const { startServer, stopServer, getServerStatus } = require('./server');

// Initialize settings store
const store = new Store({
  defaults: {
    port: 3000,
    autoStart: true,
    startMinimized: false,
    showNotifications: true
  }
});

let mainWindow = null;
let isQuitting = false;

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // If user tries to open second instance, focus the window
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    minWidth: 500,
    minHeight: 600,
    title: 'HTML to Figma Server',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: !store.get('startMinimized'),
    backgroundColor: '#1e1e1e'
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // Hide instead of close (keep app running in tray)
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  return mainWindow;
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();
  createTray(mainWindow, app);

  // Auto-start server if enabled
  if (store.get('autoStart')) {
    const port = store.get('port');
    startServer(port);
    updateTrayStatus(true, port);
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else if (mainWindow) {
    mainWindow.show();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
  stopServer();
});

app.on('window-all-closed', () => {
  // Don't quit on macOS when window closes (keep in tray)
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('get-settings', () => {
  return {
    port: store.get('port'),
    autoStart: store.get('autoStart'),
    startMinimized: store.get('startMinimized'),
    showNotifications: store.get('showNotifications')
  };
});

ipcMain.handle('save-settings', (event, settings) => {
  store.set('port', settings.port);
  store.set('autoStart', settings.autoStart);
  store.set('startMinimized', settings.startMinimized);
  store.set('showNotifications', settings.showNotifications);
  return { success: true };
});

ipcMain.handle('start-server', async (event, port) => {
  try {
    await startServer(port || store.get('port'));
    updateTrayStatus(true, port);
    return { success: true, port };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('stop-server', async () => {
  try {
    await stopServer();
    updateTrayStatus(false);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-server-status', () => {
  return getServerStatus();
});

ipcMain.handle('open-browser', (event, url) => {
  shell.openExternal(url);
});

ipcMain.handle('show-window', () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
});
