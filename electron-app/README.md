# HTML to Figma Server (Electron App)

Desktop application that runs the extraction server in the background with a beautiful GUI and system tray controls.

## Features

- 🎯 **System Tray Integration** - Quick access from menu bar
- 🚀 **One-Click Server Control** - Start/stop with ease
- ⚙️ **Settings Panel** - Configure port, auto-start, notifications
- 🟢 **Status Indicators** - Real-time server status
- 🎨 **Beautiful Dark UI** - Native-looking macOS interface
- 💾 **Persistent Settings** - Saves your preferences
- 🔔 **Notifications** - Get notified when extractions complete

## Installation

### For Development

1. Install dependencies:

```bash
cd electron-app
npm install
```

2. Run in development mode:

```bash
npm start
```

### Building for Distribution

Build a DMG for macOS:

```bash
npm run build:mac
```

This creates:

- `dist/HTML to Figma Server-1.0.0-universal.dmg` - Universal binary (Apple Silicon + Intel)
- `dist/HTML to Figma Server-1.0.0-arm64-mac.zip` - Apple Silicon only
- `dist/HTML to Figma Server-1.0.0-x64-mac.zip` - Intel only

## Usage

1. **Start the App**
   - Double-click the app icon or DMG
   - You'll see the status window and system tray icon

2. **Start Server**
   - Click "Start Server" button
   - Server runs on port 3000 (configurable)
   - Green indicator shows it's running

3. **Use with Figma Plugin**
   - Open Figma plugin "HTML to Figma"
   - Enter a URL in the "URL Extraction" tab
   - Click "Extract URL"
   - JSON appears automatically!

4. **System Tray Menu**
   - Right-click tray icon for quick controls:
     - Start/Stop Server
     - Open in Browser
     - Settings
     - Quit

## Settings

- **Port Number**: Change if 3000 is in use (default: 3000)
- **Auto-start**: Start server when app launches
- **Start Minimized**: App starts in tray without window
- **Notifications**: Get alerts for extractions

## Keyboard Shortcuts

- `Cmd+Q` - Quit app
- `Cmd+W` - Hide window (app stays in tray)
- `Cmd+,` - Open Settings (when implemented)

## Architecture

```
electron-app/
├── main.js              # Main process (Electron entry point)
├── tray.js              # System tray icon and menu
├── server.js            # Extraction server (Express + Puppeteer)
├── preload.js           # Security bridge (IPC)
├── renderer/
│   ├── index.html       # Main UI
│   ├── styles.css       # Dark theme styling
│   └── app.js           # UI logic and API calls
├── assets/
│   ├── icon.icns        # macOS app icon
│   └── tray-icon.png    # Menu bar icon
└── package.json         # Dependencies and build config
```

## Technologies

- **Electron 28** - Desktop framework
- **Express** - HTTP server
- **Puppeteer** - Headless browser for extraction
- **electron-store** - Settings persistence
- **electron-builder** - DMG/installer creation

## Development

### Hot Reload

Changes to renderer files (HTML/CSS/JS) require app restart.

### Debugging

- Open DevTools: `Cmd+Option+I` in the app window
- View console logs in Terminal when running `npm start`

### Testing

```bash
# Run in dev mode with verbose logging
npm run dev
```

## Building Icons

### macOS App Icon (icon.icns)

Use [iconutil](https://developer.apple.com/library/archive/documentation/GraphicsAnimation/Conceptual/HighResolutionOSX/Optimizing/Optimizing.html):

```bash
# Create icon set
mkdir icon.iconset
# Add PNG files at various sizes (16x16@1x, 32x32@1x, etc.)
iconutil -c icns icon.iconset
```

### Tray Icon (Template Icon)

- Name: `tray-icon-Template.png` (macOS convention)
- Size: 22x22px @1x, 44x44px @2x
- Format: PNG with transparency
- Style: Black icon, transparent background
- macOS will automatically invert colors for dark mode

## Distribution

### Code Signing (Optional but Recommended)

1. Get Apple Developer certificate ($99/year)
2. Add to build config:

```json
"mac": {
  "identity": "Developer ID Application: Your Name",
  "hardenedRuntime": true
}
```

### Notarization (Required for macOS 10.15+)

```bash
# After building, notarize the DMG
xcrun notarytool submit dist/*.dmg --wait
```

## Troubleshooting

**Port Already in Use**

- Change port in Settings
- Check if another app is using port 3000:
  ```bash
  lsof -i :3000
  ```

**Server Won't Start**

- Check Terminal for error messages
- Ensure Puppeteer downloaded Chromium:
  ```bash
  cd electron-app
  npm install puppeteer --force
  ```

**App Won't Open on macOS**

- Right-click → Open (first time only)
- Or: `xattr -cr "HTML to Figma Server.app"`

## License

MIT - See LICENSE file in root directory
