# HTML to Figma - Web Page Extractor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-F24E1E?logo=figma)](https://www.figma.com/community)
[![GitHub stars](https://img.shields.io/github/stars/kbishopzz/HTML-to-Figma?style=social)](https://github.com/kbishopzz/HTML-to-Figma/stargazers)

> 🚀 **Extract any webpage into fully editable Figma designs with one click**

A powerful Figma plugin that converts any website into native Figma elements—not screenshots, but actual editable frames, text, and styles. Perfect for designers who want to quickly prototype from existing sites, developers documenting designs, or teams converting web projects to Figma.

## ✨ What Makes This Special

**Two Extraction Methods:**

- 🤖 **Automatic Mode**: Enter URL → Click Extract → Done (requires local server)
- 📋 **Manual Mode**: Copy/paste from browser console (works everywhere)

**Production-Ready Features:**

- ✅ Fully editable Figma elements (not images)
- ✅ Preserves colors, fonts, spacing, borders, shadows
- ✅ Auto Layout conversion from flexbox
- ✅ Smart text node detection
- ✅ Dual JSON format support
- ✅ Comprehensive error handling

## 🎯 Quick Start

### Option A: Automatic Extraction (Recommended)

**1. Start the Extraction Server**

```bash
npm install express puppeteer cors
node extraction-server.js
```

**2. Use the Plugin**

- Open Figma plugin
- Switch to "URL Extraction" tab
- Enter website URL
- Click "Extract URL"
- JSON appears automatically!
- Click "Convert to Figma"

### Option B: Manual Extraction

**1. Extract Website**

- Open any website in browser
- Open DevTools Console (F12)
- Copy/paste contents of `browser-extract.js`
- Press Enter
- JSON copied to clipboard!

**2. Import to Figma**

- Open Figma plugin
- Paste JSON into text area
- Click "Convert to Figma"

Done! The website is now editable Figma elements.

## 📦 What Gets Extracted

### Visual Properties

- ✅ Colors (text, backgrounds, borders)
- ✅ Typography (family, size, weight, line height, spacing)
- ✅ Text styles (alignment, decoration, transform)
- ✅ Borders and border radius
- ✅ Box shadows and text shadows
- ✅ Opacity and visibility

### Layout Properties

- ✅ Exact positions and dimensions
- ✅ Flexbox layouts → Auto Layout
- ✅ Gap and spacing
- ✅ Padding and margins
- ✅ Alignment properties
- ✅ Z-index layering

### Elements

- ✅ Text content (as TEXT nodes)
- ✅ Images (src preserved)
- ✅ Buttons and inputs
- ✅ Containers and frames
- ✅ Links (href preserved)
- ✅ Nested hierarchies

## 🏗️ Architecture

### Plugin Structure

```
src/
├── code.ts                 # Main plugin logic
├── ui.html                 # Plugin UI with tabs
├── types.ts                # TypeScript definitions
├── converters/
│   ├── html-converter.ts   # HTML-style JSON → Figma
│   └── figma-converter.ts  # Figma-style JSON → Figma
└── utils/
    ├── node-utils.ts       # Format detection, validation
    ├── style-utils.ts      # Style conversion
    ├── color-utils.ts      # Color parsing
    └── font-utils.ts       # Font loading
```

### Extraction Server

```
extraction-server.js        # Express + Puppeteer server
browser-extract.js          # Browser extraction script
```

## 🔧 How It Works

**Automatic Mode:**

1. User enters URL in plugin
2. Plugin sends request to local server (localhost:3000)
3. Server launches headless Chrome with Puppeteer
4. Loads webpage and runs extraction script
5. Returns JSON to plugin
6. Plugin converts to Figma nodes

**Manual Mode:**

1. User runs extraction script in browser console
2. Script analyzes DOM and computed styles
3. Creates structured JSON with visual properties
4. Copies to clipboard automatically
5. User pastes into plugin
6. Plugin converts to native Figma elements

## 🚀 Installation & Setup

### Plugin Installation

1. Clone this repository

```bash
git clone https://github.com/kbishopzz/HTML-to-Figma.git
cd HTML-to-Figma
```

2. Install dependencies

```bash
npm install
```

3. Build the plugin

```bash
npm run build
```

4. Load in Figma

- Figma → Plugins → Development → Import plugin from manifest
- Select `manifest.json` from this directory

### Extraction Server Setup (Optional)

For automatic extraction, start the server:

```bash
npm install express puppeteer cors
node extraction-server.js
```

Keep it running while using the plugin.

See [EXTRACTION_SERVER_SETUP.md](EXTRACTION_SERVER_SETUP.md) for details.

## 📖 Usage Guide

### Extracting Specific Elements

```javascript
// In browser console, extract specific parts
extractPage("#header"); // Extract header only
extractPage(".nav"); // Extract navigation
extractPage("#main-content"); // Extract main content
```

### Plugin Options

- **Smart Text Detection**: Automatically identifies text nodes
- **Auto Layout**: Converts flexbox to Figma Auto Layout
- **Font Loading**: Loads fonts with fallback to Inter
- **Error Handling**: Comprehensive validation and error messages

### Tips for Best Results

1. **Start with smaller sections**: Extract components rather than entire pages
2. **Use automatic mode**: Server extraction is faster and more reliable
3. **Check console**: Plugin logs detailed conversion progress
4. **Edit after import**: All elements are fully editable in Figma

## 🧪 Testing

Run automated tests:

```bash
npm run test
```

Manual testing guide: [TESTING_GUIDE.md](TESTING_GUIDE.md)

## 📚 Documentation

- [Architecture Overview](Documents/ARCHITECTURE.md)
- [Extraction Server Setup](EXTRACTION_SERVER_SETUP.md)
- [Publishing Guide](PUBLISHING_GUIDE.md)
- [Marketplace Listing](MARKETPLACE_LISTING.md)
- [Quick Reference](QUICK_REFERENCE.md)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Figma Plugin API
- Extraction powered by Puppeteer
- UI inspiration from Figma design patterns

## 🐛 Known Issues & Limitations

- Complex CSS animations not supported
- Some advanced CSS properties may not convert perfectly
- Images are placeholders (not downloaded)
- Requires localhost server for automatic extraction
- Font availability depends on Figma's font library

## 🔮 Roadmap

### v1.1 (Coming Soon)

- [ ] Image downloading and embedding
- [ ] CSS animations to Figma interactions
- [ ] Component detection and creation
- [ ] Variant extraction

### v1.2

- [ ] Batch URL extraction
- [ ] Style guide generation
- [ ] Design token export
- [ ] Responsive breakpoint support

### v2.0

- [ ] Direct Figma API integration
- [ ] Cloud-based extraction (no local server)
- [ ] AI-powered component naming
- [ ] Real-time collaboration features

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/kbishopzz/HTML-to-Figma/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kbishopzz/HTML-to-Figma/discussions)
- **Email**: Support available for Pro users

## 📊 Stats

- ⭐ **Stars**: Show your support by starring the repo!
- 🍴 **Forks**: Feel free to fork and customize
- 🐛 **Issues**: Help us improve by reporting bugs

---

**Made with ❤️ for designers and developers**

Transform any website into editable Figma designs • [Report Bug](https://github.com/kbishopzz/HTML-to-Figma/issues) • [Request Feature](https://github.com/kbishopzz/HTML-to-Figma/discussions)

[⬆ Back to top](#html-to-figma---web-page-extractor)

- **Learning Tool**: Study how websites are structured visually

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- Better CSS gradient support
- Image loading from URLs
- More complex layout algorithms
- Component extraction and deduplication
- CSS Grid support

## 📄 License

MIT License - feel free to use and modify!

---

**Made for designers who want to move fast and replicate visually** 🎨✨
name: el.tagName.toLowerCase(),
type: "FRAME",
x: Math.round(r.left),
y: Math.round(r.top),
width: Math.round(r.width),
height: Math.round(r.height),
backgroundColor: style.backgroundColor || undefined,
children: [],
};

    // collect direct text children
    const text = el.innerText && el.innerText.trim();
    if (text) {
      node.children.push({
        id: `${node.id}-text`,
        name: "text",
        type: "TEXT",
        x: 0,
        y: 0,
        width: node.width,
        height: Math.round(node.height / 3),
        text: text,
        style: {
          fontSize: parseInt(style.fontSize) || 16,
          fontFamily: style.fontFamily,
        },
      });
    }

    frames.push(node);

});
return { frames };
}

// Run and copy the JSON to clipboard:
copy(JSON.stringify(pageToSimpleJson(), null, 2));

```

Notes:

- This snippet produces a basic frame/text snapshot and is intended as a starting point. For more accurate conversions (styles, nested DOM, images, flex layouts), use the provided `browser-extract.js` script which captures comprehensive styling and layout information.
- After copying, paste into the plugin JSON textarea and Convert.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for designers who want to move fast and replicate visually
- Inspired by the need to bridge the gap between web and design tools
- Thanks to all contributors and the Figma plugin community

## ⭐ Star Us!

If you find this project useful, please consider giving it a star on GitHub! It helps others discover the project.

[![GitHub stars](https://img.shields.io/github/stars/kbishopzz/HTML-to-Figma?style=social)](https://github.com/kbishopzz/HTML-to-Figma/stargazers)

---

**Made with ❤️ for designers and developers** | [Report Bug](https://github.com/kbishopzz/HTML-to-Figma/issues) | [Request Feature](https://github.com/kbishopzz/HTML-to-Figma/issues)
```
