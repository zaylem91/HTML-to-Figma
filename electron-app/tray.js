const { Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let tray = null;
let mainWindow = null;
let appInstance = null;
let serverRunning = false;
let serverPort = 3000;

function createTray(window, app) {
  mainWindow = window;
  appInstance = app;

  // Create tray icon (template icon for macOS dark mode support)
  const iconPath = path.join(__dirname, 'assets', 'tray-icon-Template.png');
  const icon = nativeImage.createFromPath(iconPath);
  
  tray = new Tray(icon.resize({ width: 16, height: 16 }));
  tray.setToolTip('HTML to Figma Server');
  
  updateTrayMenu();

  // Click tray icon to show window
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });

  return tray;
}

function updateTrayStatus(running, port = 3000) {
  serverRunning = running;
  serverPort = port;
  updateTrayMenu();
  
  // Update tooltip
  if (running) {
    tray.setToolTip(`HTML to Figma Server - Running on port ${port}`);
  } else {
    tray.setToolTip('HTML to Figma Server - Stopped');
  }
}

function updateTrayMenu() {
  const statusIcon = serverRunning ? '🟢' : '🔴';
  const statusText = serverRunning ? `Running (Port ${serverPort})` : 'Stopped';
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `${statusIcon} ${statusText}`,
      enabled: false,
      icon: null
    },
    { type: 'separator' },
    {
      label: serverRunning ? 'Stop Server' : 'Start Server',
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.send('toggle-server');
        }
      }
    },
    {
      label: 'Open in Browser',
      enabled: serverRunning,
      click: () => {
        require('electron').shell.openExternal(`http://localhost:${serverPort}`);
      }
    },
    { type: 'separator' },
    {
      label: 'Settings...',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    {
      label: 'About',
      click: () => {
        require('electron').dialog.showMessageBox({
          type: 'info',
          title: 'About HTML to Figma Server',
          message: 'HTML to Figma Server v1.0.0',
          detail: 'Extract any webpage into fully editable Figma designs.\n\n' +
                  'Built with Electron, Express, and Puppeteer.\n' +
                  'https://github.com/kbishopzz/HTML-to-Figma',
          buttons: ['OK']
        });
      }
    },
    { type: 'separator' },
    {
      label: 'Check for Updates',
      click: () => {
        require('electron').shell.openExternal('https://github.com/kbishopzz/HTML-to-Figma/releases');
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        appInstance.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
}

module.exports = {
  createTray,
  updateTrayStatus
};
