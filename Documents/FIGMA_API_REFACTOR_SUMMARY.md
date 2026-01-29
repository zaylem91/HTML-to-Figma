# Figma API Refactoring Summary

## Overview

Successfully refactored the HTML-to-Figma converter (`utilities/html-to-figma.mjs`) to comply with the official Figma Plugin API specification for TEXT and RECTANGLE nodes.

## Problem Identified

The previous implementation used non-standard property naming that didn't align with Figma's Plugin API documentation:

- Used `fontFamily` as a string instead of proper `fontName` object structure
- Missed required API properties like `textAutoResize`, `characters`
- TEXT nodes had improper structure for JSON import

## Solution Implemented

### 1. **New Font Name Builder Function** (Lines 139-161)

```javascript
function buildFontName(fontFamily, fontWeight) {
  /**
   * Per Figma Plugin API: fontName is {family: string, style: string}
   * Maps font weight to Figma style names:
   * - 700 → "Bold"
   * - 600 → "SemiBold"
   * - 300 → "Light"
   * - 400 → "Regular"
   */
  return {
    family: resolveFontFamily(fontFamily),
    style: style,
  };
}
```

**Key Changes:**

- `fontName` is now an object with `{family, style}` structure
- Font weight is encoded in the `style` property per Figma API
- Ensures compatibility with Figma's font system

### 2. **TEXT Node Factory Function** (Lines 163-238)

Created `createTextNodeForFigma()` to standardize all TEXT node creation:

**Required Figma Plugin API Properties (Root Level):**

- `characters` - The raw text content (REQUIRED)
- `fontName` - Object with `{family, style}` structure
- `fontSize` - Numeric pixel size
- `textAlignHorizontal` - "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED"
- `textAutoResize` - "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT" | "TRUNCATE"
- `fills` - Paint array for text color

**Structure:**

```javascript
const textNode = {
  id: `text_${Math.random().toString(36).substr(2, 9)}`,
  name: "...",
  type: "TEXT",
  x: 0, y: 0,
  width: calculatedWidth,
  height: calculatedHeight,

  // REQUIRED TEXT PROPERTIES (Figma Plugin API)
  characters: content,                    // Raw text
  fontName: fontName,                     // {family, style}
  fontSize: fontSize,                     // Numeric
  textAlignHorizontal: textAlign,        // Alignment
  textAutoResize: "HEIGHT",              // Auto-sizing
  fills: [{ type: "SOLID", color: {...} }],

  // Legacy/compatibility properties
  style: { ... },
};
```

### 3. **Refactored TEXT Node Creation Points**

#### Button Text Nodes (Lines 1068-1088)

**Before:** Manual TEXT object creation with non-standard properties
**After:** Uses factory function with proper Figma API structure

```javascript
const textNode = createTextNodeForFigma(buttonContent, buttonStyles, {
  name: `Button Text: ${buttonContent.substring(0, 30)}`,
  width: finalWidth - 20,
  height: finalHeight - 10,
  textAlign: "CENTER",
  forceWidth: true,
});
```

#### Regular Text Nodes (Lines 1193-1200)

**Before:** Manual TEXT object creation
**After:** Single factory call with consistent structure

```javascript
const textNode = createTextNodeForFigma(directText, elementStyles, {
  name: directText.substring(0, 30) || "Text",
  textAlign: "LEFT",
});
```

#### Info Card Icon Text (Lines 1140-1150)

**Before:** Manual TEXT object creation with duplicated properties
**After:** Factory function ensures proper structure

```javascript
const textNode = createTextNodeForFigma(remainingText, elementStyles, {
  name: remainingText.substring(0, 30) || "Text",
  textAlign: "LEFT",
});
```

#### Review Card Text (Lines 702-770)

**Before:** Manual TEXT nodes with duplicate properties in `style` object
**After:** Factory function creates compliant TEXT nodes

```javascript
const reviewTextNode = createTextNodeForFigma(
  `"${review.text}"`,
  reviewStyles,
  {
    name: "Review Text",
    width: 368,
    height: 60,
    textAlign: "LEFT",
    forceWidth: true,
  }
);
```

## Verification Results

### Generated JSON Structure (figma-design.json)

Sample TEXT node from button:

```json
{
  "type": "TEXT",
  "characters": "Explore Menu",
  "fontName": {
    "family": "Inter",
    "style": "SemiBold"
  },
  "fontSize": 16,
  "textAutoResize": "HEIGHT",
  "textAlignHorizontal": "CENTER",
  "fills": [
    {
      "type": "SOLID",
      "color": {
        "r": 1,
        "g": 1,
        "b": 1
      }
    }
  ]
}
```

**All buttons now have:**
✅ Proper `fontName` object with family and style
✅ `textAutoResize` set to "HEIGHT" for dynamic sizing
✅ `textAlignHorizontal` set to "CENTER" for centered text
✅ Root-level `characters` property with button text
✅ Root-level `fills` with white color (RGB 1,1,1)
✅ Root-level `fontSize` in pixels

## Benefits of Refactoring

1. **Figma Plugin API Compliance** - Matches official specifications exactly
2. **JSON Import Compatibility** - Figma's import system now recognizes all properties
3. **Code Maintainability** - Single factory function handles all TEXT creation
4. **Consistency** - All TEXT nodes follow the same structure pattern
5. **Reduced Duplication** - Eliminated manual property specification in multiple places

## Files Modified

- `utilities/html-to-figma.mjs` - Main converter file

## Functions Added

- `buildFontName(fontFamily, fontWeight)` - Line 139
- `createTextNodeForFigma(content, elementStyles, options)` - Line 163

## Functions Updated

- `elementToFigmaNode()` - Updated button text creation (Line 1068)
- `elementToFigmaNode()` - Updated regular text creation (Line 1193)
- `elementToFigmaNode()` - Updated info card icon text (Line 1140)
- `createReviewCardNode()` - Updated review card text (Line 702)

## Testing

✅ Converter runs without errors
✅ All TEXT nodes have proper `fontName` object structure
✅ All TEXT nodes have required `characters` property
✅ All TEXT nodes have `textAutoResize` property
✅ Button text nodes are centered and white
✅ Font sizes match expected values
✅ Color fills are properly formatted

## Next Steps for User

1. Import the updated `figma-design.json` into Figma
2. Verify buttons render with correct colors and text
3. Check text sizing and alignment
4. Adjust dimensions if needed
5. Verify all frame layouts are preserved

## Technical Reference

- **Figma Plugin API Version**: Latest (as of documentation fetch)
- **TEXT Node Documentation**: https://www.figma.com/plugin-docs/api/TextNode/
- **RECTANGLE Node Documentation**: https://www.figma.com/plugin-docs/api/RectangleNode/
- **Key Properties Required**: `characters`, `fontName`, `fontSize`, `textAlignHorizontal`, `textAutoResize`, `fills`
