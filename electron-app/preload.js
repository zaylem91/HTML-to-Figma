const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  
  // Server controls
  startServer: (port) => ipcRenderer.invoke('start-server', port),
  stopServer: () => ipcRenderer.invoke('stop-server'),
  getServerStatus: () => ipcRenderer.invoke('get-server-status'),
  
  // Utilities
  openBrowser: (url) => ipcRenderer.invoke('open-browser', url),
  showWindow: () => ipcRenderer.invoke('show-window'),
  
  // Listen for events from main process
  onToggleServer: (callback) => {
    ipcRenderer.on('toggle-server', callback);
  }
});
