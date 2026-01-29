// UI State
let serverRunning = false;
let currentSettings = {};

// DOM Elements
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const currentPort = document.getElementById('current-port');
const serverUrl = document.getElementById('server-url');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const openBrowserBtn = document.getElementById('open-browser-btn');
const portInput = document.getElementById('port-input');
const autoStartCheckbox = document.getElementById('auto-start-checkbox');
const startMinimizedCheckbox = document.getElementById('start-minimized-checkbox');
const notificationsCheckbox = document.getElementById('notifications-checkbox');
const saveSettingsBtn = document.getElementById('save-settings-btn');

// Initialize
async function init() {
  // Load settings
  currentSettings = await window.api.getSettings();
  applySettings(currentSettings);
  
  // Load server status
  await updateServerStatus();
  
  // Set up event listeners
  setupEventListeners();
}

function applySettings(settings) {
  portInput.value = settings.port || 3000;
  autoStartCheckbox.checked = settings.autoStart || false;
  startMinimizedCheckbox.checked = settings.startMinimized || false;
  notificationsCheckbox.checked = settings.showNotifications !== false;
}

function setupEventListeners() {
  // Server controls
  startBtn.addEventListener('click', handleStartServer);
  stopBtn.addEventListener('click', handleStopServer);
  openBrowserBtn.addEventListener('click', handleOpenBrowser);
  
  // Settings
  saveSettingsBtn.addEventListener('click', handleSaveSettings);
  
  // External links
  document.getElementById('github-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.api.openBrowser('https://github.com/kbishopzz/HTML-to-Figma');
  });
  
  document.getElementById('docs-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.api.openBrowser('https://github.com/kbishopzz/HTML-to-Figma#readme');
  });
  
  document.getElementById('issues-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.api.openBrowser('https://github.com/kbishopzz/HTML-to-Figma/issues');
  });
  
  // Listen for toggle from tray menu
  window.api.onToggleServer(() => {
    if (serverRunning) {
      handleStopServer();
    } else {
      handleStartServer();
    }
  });
}

async function handleStartServer() {
  const port = parseInt(portInput.value);
  
  if (port < 1024 || port > 65535) {
    showMessage('Port must be between 1024 and 65535', 'error');
    return;
  }
  
  startBtn.disabled = true;
  startBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="2"/><circle cx="8" cy="8" r="2"/></svg> Starting...';
  
  try {
    const result = await window.api.startServer(port);
    
    if (result.success) {
      showMessage(`Server started successfully on port ${port}`, 'success');
      await updateServerStatus();
    } else {
      showMessage(`Failed to start server: ${result.error}`, 'error');
      startBtn.disabled = false;
      startBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2L12 8L4 14V2Z"/></svg> Start Server';
    }
  } catch (error) {
    showMessage(`Error starting server: ${error.message}`, 'error');
    startBtn.disabled = false;
    startBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2L12 8L4 14V2Z"/></svg> Start Server';
  }
}

async function handleStopServer() {
  stopBtn.disabled = true;
  stopBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="2"/></svg> Stopping...';
  
  try {
    const result = await window.api.stopServer();
    
    if (result.success) {
      showMessage('Server stopped successfully', 'success');
      await updateServerStatus();
    } else {
      showMessage(`Failed to stop server: ${result.error}`, 'error');
      stopBtn.disabled = false;
      stopBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="4" y="4" width="8" height="8"/></svg> Stop Server';
    }
  } catch (error) {
    showMessage(`Error stopping server: ${error.message}`, 'error');
    stopBtn.disabled = false;
    stopBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="4" y="4" width="8" height="8"/></svg> Stop Server';
  }
}

function handleOpenBrowser() {
  if (serverRunning) {
    const port = parseInt(portInput.value);
    window.api.openBrowser(`http://localhost:${port}`);
  }
}

async function handleSaveSettings() {
  const settings = {
    port: parseInt(portInput.value),
    autoStart: autoStartCheckbox.checked,
    startMinimized: startMinimizedCheckbox.checked,
    showNotifications: notificationsCheckbox.checked
  };
  
  try {
    const result = await window.api.saveSettings(settings);
    
    if (result.success) {
      showMessage('Settings saved successfully', 'success');
      currentSettings = settings;
    } else {
      showMessage('Failed to save settings', 'error');
    }
  } catch (error) {
    showMessage(`Error saving settings: ${error.message}`, 'error');
  }
}

async function updateServerStatus() {
  const status = await window.api.getServerStatus();
  
  serverRunning = status.running;
  
  if (status.running) {
    // Server is running
    statusIndicator.className = 'status-indicator running';
    statusText.textContent = 'Running';
    currentPort.textContent = status.port;
    serverUrl.textContent = status.url;
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    openBrowserBtn.disabled = false;
    
    startBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2L12 8L4 14V2Z"/></svg> Start Server';
    stopBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="4" y="4" width="8" height="8"/></svg> Stop Server';
  } else {
    // Server is stopped
    statusIndicator.className = 'status-indicator stopped';
    statusText.textContent = 'Stopped';
    currentPort.textContent = '-';
    serverUrl.textContent = '-';
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    openBrowserBtn.disabled = true;
    
    startBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2L12 8L4 14V2Z"/></svg> Start Server';
    stopBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="4" y="4" width="8" height="8"/></svg> Stop Server';
  }
}

function showMessage(text, type = 'success') {
  // Remove existing messages
  const existing = document.querySelector('.message');
  if (existing) {
    existing.remove();
  }
  
  // Create new message
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  
  // Insert after header
  const header = document.querySelector('header');
  header.after(message);
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    message.style.opacity = '0';
    setTimeout(() => message.remove(), 300);
  }, 4000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
