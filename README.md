# HTML Whisperer: HTML to Figma Converter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/kbishopzz/HTML-to-Figma?style=social)](https://github.com/kbishopzz/HTML-to-Figma/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/kbishopzz/HTML-to-Figma)](https://github.com/kbishopzz/HTML-to-Figma/issues)

A powerful Figma plugin that converts websites to editable Figma designs with accurate visual replication. Extract any website and recreate it in Figma with preserved styling, layout, and typography.

> 🎯 **Extract → Convert → Edit** - Turn any website into a Figma design in under 5 minutes!

## 🚀 Key Features

- **Visual Accuracy**: Preserves colors, fonts, spacing, borders, and shadows
- **Layout Fidelity**: Automatically converts flexbox layouts to Figma Auto Layout
- **Typography**: Maintains text styles, sizes, weights, and alignment
- **Comprehensive Styling**: Supports borders, border-radius, box-shadows, opacity
- **Smart Extraction**: Browser script captures complete page structure
- **One-Click Conversion**: Paste JSON and convert instantly

## 🎯 Quick Start (3 Steps)

### Step 1: Extract a Website

1. Open any website in your browser
2. Open DevTools Console (F12 or Cmd+Option+I)
3. Copy and paste the contents of `browser-extract.js`
4. Press Enter
5. JSON is automatically copied to clipboard!

### Step 2: Import to Figma

1. Open this plugin in Figma
2. Paste the JSON into the text area
3. Click "Convert to Figma"

### Step 3: Edit Your Design

The website is now in Figma with all elements editable!

## 📦 What Gets Captured

### Visual Properties

- ✅ Colors (text, backgrounds, borders)
- ✅ Typography (font family, size, weight, line height, letter spacing)
- ✅ Text alignment and decoration
- ✅ Borders and border radius
- ✅ Box shadows
- ✅ Opacity and visibility

### Layout Properties

- ✅ Exact positions and dimensions
- ✅ Flexbox layouts (converted to Auto Layout)
- ✅ Gap and spacing
- ✅ Padding
- ✅ Alignment properties

### Elements

- ✅ Text content
- ✅ Images (as placeholders)
- ✅ Buttons and inputs
- ✅ Containers and frames
- ✅ Links and interactive elements

## 🔧 How It Works

1. **Browser Extraction**: The `browser-extract.js` script analyzes the DOM and computed styles
2. **JSON Format**: Creates a structured JSON with all visual and layout properties
3. **Figma Conversion**: Plugin converts JSON to native Figma elements
4. **Style Application**: Applies all CSS properties as Figma styles
5. **Layout Creation**: Converts flexbox to Auto Layout for responsive designs

## � Browser Extraction Script

The `browser-extract.js` file is a powerful script that captures any website's visual structure.

### Features:

- Captures all visible elements with accurate positions
- Extracts computed styles (colors, fonts, borders, shadows)
- Preserves layout properties (flexbox, alignment)
- Filters out hidden and zero-size elements
- Handles text content, images, and form inputs
- Automatically copies JSON to clipboard

### Usage:

```bash
# Open the script
cat browser-extract.js

# Copy the entire content
# Paste into browser console on any website
# JSON is automatically copied to clipboard!
```

### Advanced Usage:

```javascript
// Extract specific element instead of whole page
extractPage("#header"); // Extract header only
extractPage(".container"); // Extract by class

// Access the JSON data
console.log(window.figmaJson);
```

## 🎨 Conversion Options

- **Preserve Colors**: Maintains all color properties
- **Preserve Text Styles**: Keeps typography intact
- **Use Auto Layout**: Converts flexbox to Figma Auto Layout
- **Default Font Family**: Fallback font (default: Inter)

## 📝 JSON Format

The plugin accepts JSON with this structure:

```json
{
  "type": "CANVAS",
  "name": "My Design",
  "children": [{
    "type": "div",
    "styles": {
      "backgroundColor": "#ffffff",
      "padding": "20px",
      "display": "flex",
      "flexDirection": "column"
    },
    "position": {
      "absolute": {
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 800
      }
    },
    "children": [...]
  }]
}
```

## 🛠️ Development Setup

### Build & Install

```bash
npm install
npm run build
```

### Import into Figma Desktop

1. Open Figma Desktop
2. Plugins → Development → Import plugin from manifest...
3. Select `manifest.json` from this repo
4. Run: Plugins → Development → HTML to Figma Converter

### Troubleshooting

- Open plugin console: Plugins → Development → Open Console
- After code changes: `npm run build` and reload plugin
- Font errors: Check that fonts are available in Figma

## 💡 Tips for Best Results

1. **Extract Clean Pages**: Pages with clean HTML structure convert better
2. **Check Viewport**: Make sure the page is fully loaded before extraction
3. **Use Specific Selectors**: Extract specific sections with `extractPage('#section-id')`
4. **Adjust After Import**: Fine-tune spacing and alignment in Figma
5. **Font Availability**: Ensure fonts used on the website are installed in Figma

## 🔮 Advanced Features

### Auto Layout Conversion

Flexbox layouts are automatically converted to Figma Auto Layout with:

- Correct direction (horizontal/vertical)
- Proper alignment and distribution
- Gap spacing preserved

### Smart Text Handling

- Text transforms (uppercase, lowercase, capitalize)
- Text decoration (underline, strikethrough)
- Multi-line text with proper wrapping
- Text alignment (left, center, right, justify)

### Visual Effects

- Border radius on corners
- Drop shadows and effects
- Opacity and transparency
- Stroke/border styling

## 📚 Example Use Cases

- **Design System Analysis**: Extract competitor websites to analyze their design systems
- **Rapid Prototyping**: Convert existing pages as starting points
- **Design Handoff**: Convert HTML prototypes to Figma for refinement
- **Component Library**: Extract UI components for documentation
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
