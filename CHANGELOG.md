# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-29

### 🎉 Initial Release

First public release of HTML to Figma - Web Page Extractor plugin.

### ✨ Added

#### Core Features

- Dual extraction modes: automatic (via local server) and manual (browser console)
- Automatic URL extraction using Node.js + Express + Puppeteer server
- Manual extraction via browser console script (`browser-extract.js`)
- Smart text node detection for leaf nodes only
- Dual JSON format support (HTML-style and Figma-style)
- Comprehensive style conversion (colors, fonts, borders, shadows)
- Auto Layout conversion from flexbox properties
- Font loading with fallback to Inter

#### Architecture

- Modular codebase with converters and utilities
- `html-converter.ts` - HTML-style JSON to Figma conversion
- `figma-converter.ts` - Figma-style JSON to Figma conversion
- `node-utils.ts` - Format detection and validation
- `style-utils.ts` - CSS to Figma style conversion
- `color-utils.ts` - Color parsing and conversion
- `font-utils.ts` - Font loading with fallbacks

#### User Interface

- Three-tab UI: URL Extraction, JSON Input, Options
- "Paste from Clipboard" button with auto-paste on tab switch
- Real-time extraction status and error messages
- Automatic fallback to manual mode if server unavailable
- Comprehensive console logging for debugging

#### Developer Tools

- Automated testing framework (`automated-test.ts`)
- Visual test validation with node counting
- Test automation scripts
- Comprehensive error handling and validation
- TypeScript with full type definitions

#### Documentation

- Complete README with installation and usage guide
- Architecture documentation
- Extraction server setup guide
- Marketplace listing preparation
- Publishing guide for Figma marketplace
- Testing guide and checklist
- Quick reference guide

### 🔧 Technical Details

#### Dependencies

- TypeScript 5.x
- Webpack 5.99.5
- Express 4.x
- Puppeteer (for server)
- CORS middleware

#### Build System

- Webpack bundling with TypeScript
- HTML inlining for plugin UI
- Development and production builds

#### Network Access

- Configured for localhost:3000 (extraction server)
- HTTPS support for web requests
- Proper CORS handling

### 📋 Format Support

#### HTML-Style JSON

```json
{
  "type": "div",
  "styles": { "backgroundColor": "#fff" },
  "position": { "absolute": { "x": 0, "y": 0, "width": 100, "height": 100 } },
  "children": [...]
}
```

#### Figma-Style JSON

```json
{
  "type": "FRAME",
  "absoluteBoundingBox": { "x": 0, "y": 0, "width": 100, "height": 100 },
  "fills": [{ "type": "SOLID", "color": { "r": 1, "g": 1, "b": 1 } }],
  "children": [...]
}
```

### 🐛 Bug Fixes

- Fixed text node creation to only apply to leaf nodes (no children)
- Enhanced format detection to check children properties correctly
- Fixed template literal syntax in extraction script
- Added comprehensive null checks for all UI button handlers
- Fixed recursive node counting for accurate validation

### 🔒 Security

- Added network access permissions with reasoning
- CORS configuration for server
- Input validation and sanitization
- Error boundary for plugin crashes

### 📚 Known Limitations

- Complex CSS animations not supported
- Images are placeholders (not downloaded)
- Font availability depends on Figma's library
- Requires localhost server for automatic extraction
- Some advanced CSS properties may not convert perfectly

---

## Upcoming Releases

### [1.1.0] - Planned (Q2 2026)

#### Planned Features

- [ ] Image downloading and embedding
- [ ] CSS animations to Figma interactions
- [ ] Component detection and creation
- [ ] Variant extraction from CSS states
- [ ] Batch URL extraction

### [1.2.0] - Planned (Q3 2026)

#### Planned Features

- [ ] Style guide generation
- [ ] Design token export (JSON/CSS/SCSS)
- [ ] Responsive breakpoint support
- [ ] Advanced Auto Layout options

### [2.0.0] - Planned (Q4 2026)

#### Planned Features

- [ ] Direct Figma API integration
- [ ] Cloud-based extraction (no local server)
- [ ] AI-powered component naming
- [ ] Real-time collaboration features
- [ ] Plugin marketplace integration

---

## Support

For bug reports and feature requests, please visit:

- [GitHub Issues](https://github.com/kbishopzz/HTML-to-Figma/issues)
- [GitHub Discussions](https://github.com/kbishopzz/HTML-to-Figma/discussions)

## Links

- [Repository](https://github.com/kbishopzz/HTML-to-Figma)
- [Documentation](https://github.com/kbishopzz/HTML-to-Figma#readme)
- [Figma Community](https://www.figma.com/community)

---

**[Unreleased]**: https://github.com/kbishopzz/HTML-to-Figma/compare/v1.0.0...HEAD
**[1.0.0]**: https://github.com/kbishopzz/HTML-to-Figma/releases/tag/v1.0.0
