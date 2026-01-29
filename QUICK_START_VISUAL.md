# Quick Start Guide: Website to Figma

## 🎯 Goal

Extract any website and replicate it visually in Figma in under 2 minutes.

---

## ⚡ 3-Step Process

### Step 1: Extract Website (30 seconds)

1. **Open the website** you want to extract in Chrome, Firefox, or Safari
2. **Open Developer Tools**:
   - Mac: `Cmd + Option + I`
   - Windows/Linux: `F12` or `Ctrl + Shift + I`
3. **Go to Console tab**
4. **Copy and paste** the entire `browser-extract.js` file
5. **Press Enter**
6. ✅ JSON is automatically copied to your clipboard!

**What you'll see:**

```
🎨 Starting page extraction for Figma...
📦 Extracting: body
✅ Page extracted successfully!
📋 JSON copied to clipboard!
📊 Stats: { totalNodes: 247, url: '...', viewport: {...} }
🎨 Now paste this into the Figma plugin!
```

### Step 2: Convert in Figma (30 seconds)

1. **Open Figma** (Desktop app required for plugins)
2. **Run the plugin**:
   - Plugins → Development → HTML to Figma Converter
3. **Paste JSON**: `Cmd+V` / `Ctrl+V` into the text area
4. **Click "Convert to Figma"**
5. ✅ Your design appears on the canvas!

### Step 3: Refine (60 seconds)

1. **Adjust spacing** if needed
2. **Replace image placeholders** with actual images
3. **Fine-tune colors** and styles
4. ✅ Design ready to use!

---

## 🎨 What You Get

### Visual Elements

- ✅ All colors (backgrounds, text, borders)
- ✅ All typography (fonts, sizes, weights)
- ✅ Borders and border radius
- ✅ Shadows and effects
- ✅ Exact positions and sizes

### Layout

- ✅ Flexbox → Auto Layout conversion
- ✅ Spacing and gaps
- ✅ Alignment properties
- ✅ Padding

### Content

- ✅ All text content
- ✅ Image placeholders (with correct sizes)
- ✅ Buttons and inputs
- ✅ Nested elements

---

## 💡 Pro Tips

### Tip 1: Extract Specific Sections

Instead of the whole page, extract just what you need:

```javascript
// In browser console after running the script:
extractPage("#header"); // Just the header
extractPage(".pricing-section"); // Just pricing section
extractPage("main"); // Just main content
```

### Tip 2: Best Pages to Extract

- ✅ Landing pages
- ✅ Component libraries
- ✅ Marketing pages
- ✅ Dashboard UIs
- ⚠️ Complex web apps (may need more cleanup)

### Tip 3: Font Issues?

If fonts don't load:

1. Go to Figma plugin options
2. Set "Default Font Family" to a font you have installed
3. Reconvert

### Tip 4: Clean Up After Import

Common cleanup tasks:

1. Delete empty frames
2. Merge similar elements
3. Replace image placeholders
4. Adjust Auto Layout spacing
5. Group related elements

---

## 🔧 Troubleshooting

### Problem: "No JSON data provided"

**Solution**: Make sure you pasted the JSON, not just the script

### Problem: Font errors

**Solution**: Set default font in options to "Inter" or "Roboto"

### Problem: Nothing appears

**Solution**:

1. Check plugin console (Plugins → Development → Open Console)
2. Make sure JSON is valid
3. Try a simpler page first

### Problem: Layout looks wrong

**Solution**:

1. Figma Auto Layout behaves differently than CSS
2. Manually adjust frame properties
3. Use absolute positioning for complex layouts

### Problem: Colors are wrong

**Solution**:

1. Check "Preserve Colors" is enabled
2. Some CSS color formats may not parse correctly
3. Manually adjust in Figma

---

## 📊 Example Workflow

**Scenario**: Extract a pricing section from a competitor's website

1. **Navigate** to competitor.com/pricing
2. **Inspect** the pricing section, note the ID or class (e.g., `#pricing`)
3. **Open console**, paste `browser-extract.js`, press Enter
4. **Run**: `extractPage('#pricing')`
5. **Copy** the JSON (already in clipboard)
6. **Open Figma**, run plugin, paste, convert
7. **Adjust** colors to your brand
8. **Add** your pricing
9. ✅ Custom pricing section in 3 minutes!

---

## 🎯 Common Use Cases

### Use Case 1: Competitor Analysis

Extract competitor designs to analyze their layout and styling choices.

### Use Case 2: Client Inspiration

Client likes a website? Extract it and use as a starting point.

### Use Case 3: Design System Documentation

Extract your own HTML components to document in Figma.

### Use Case 4: Rapid Prototyping

Convert HTML/CSS mockups quickly to Figma for refinement.

### Use Case 5: Learning

Study how professional websites structure their designs.

---

## ⚙️ Plugin Options

### Preserve Colors (✅ Recommended)

Keeps all color properties from the website.

### Preserve Text Styles (✅ Recommended)

Maintains font families, sizes, weights.

### Use Auto Layout (✅ Recommended)

Converts flexbox to Figma Auto Layout for responsive designs.

### Default Font Family

Fallback font when website fonts aren't available.

- Recommendation: "Inter" (built into Figma)

---

## 🚀 Advanced: Custom Extraction Script

Want more control? Modify `browser-extract.js`:

```javascript
// Only extract visible elements above fold
function elementToJson(element, depth = 0, parentRect = null) {
  const rect = element.getBoundingClientRect();

  // Skip elements below viewport
  if (rect.top > window.innerHeight) return null;

  // ... rest of the function
}
```

---

## 📚 Resources

- **Main README**: Full documentation
- **browser-extract.js**: The extraction script
- **src/types.ts**: JSON format specification
- **Plugin Console**: Debugging info

---

## ✨ You're Ready!

Now go extract some websites and create amazing designs! 🎨

**Remember**: This tool is for inspiration and learning. Always respect copyright and create original work.
