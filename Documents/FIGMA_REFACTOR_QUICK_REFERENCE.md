# Quick Reference: Figma API Refactoring

## What Was Changed?

### The Problem

TEXT nodes in the JSON weren't using the correct Figma Plugin API structure. They had:

- ❌ `fontFamily: "Inter"` (string) instead of `fontName: {family, style}`
- ❌ Missing required `characters` property
- ❌ Missing `textAutoResize` property
- ❌ Wrong text alignment property names

### The Solution

All TEXT nodes now follow the official Figma Plugin API specification:

**BEFORE:**

```javascript
const textNode = {
  type: "TEXT",
  text: "Explore Menu",           // ❌ Wrong property
  fontFamily: "Inter",            // ❌ Wrong format
  fontSize: 16,
  fontWeight: 600,               // ❌ Not part of API
  textAlignHorizontal: "CENTER",
  fills: [...]
};
```

**AFTER:**

```javascript
const textNode = {
  type: "TEXT",
  characters: "Explore Menu",     // ✅ Correct property
  fontName: {                     // ✅ Correct object format
    family: "Inter",
    style: "SemiBold"
  },
  fontSize: 16,
  textAlignHorizontal: "CENTER",
  textAutoResize: "HEIGHT",       // ✅ Auto-resize behavior
  fills: [...]
};
```

## Key Improvements

### 1. Font Name Structure

```javascript
// ❌ OLD
fontFamily: "Inter"

// ✅ NEW
fontName: {
  family: "Inter",
  style: "SemiBold"  // "Light", "Regular", "Bold", "SemiBold"
}
```

### 2. Text Content Property

```javascript
// ❌ OLD
text: "Button text";

// ✅ NEW
characters: "Button text"; // Figma API requires "characters"
```

### 3. Auto-Resize Behavior

```javascript
// ✅ NEW (was missing)
textAutoResize: "HEIGHT"; // Allows text to expand vertically
```

## Affected Files

- ✅ `utilities/html-to-figma.mjs` - Complete refactor
- ✅ `figma-design.json` - Updated output

## Verified Properties in Output

All button TEXT nodes now have:

```
✅ characters: "Button text"
✅ fontName: { family: "Inter", style: "SemiBold" }
✅ fontSize: 16 (numeric)
✅ textAlignHorizontal: "CENTER"
✅ textAutoResize: "HEIGHT"
✅ fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
```

## Expected Visual Improvements

1. **Text rendering** - Should now render properly in Figma
2. **Color display** - White text on Sandy Brown background
3. **Alignment** - Centered text in buttons
4. **Font** - Inter SemiBold at 16px
5. **Button sizing** - 160px × 48px rectangles

## For Testing

Try importing `figma-design.json` into Figma to see:

- Buttons with Sandy Brown backgrounds
- White centered text
- Proper font rendering
- Correct button sizing and spacing

## Reference Documentation

- Figma Plugin API: https://www.figma.com/plugin-docs/api/TextNode/
- TEXT Node Properties: See fontName, characters, textAutoResize
- RECTANGLE Node Properties: See fills, cornerRadius

## Impact Summary

| Aspect        | Before         | After            |
| ------------- | -------------- | ---------------- |
| TEXT nodes    | Non-compliant  | ✅ API-compliant |
| Font handling | String-based   | ✅ Object-based  |
| Text content  | Wrong property | ✅ "characters"  |
| Auto-resize   | Missing        | ✅ "HEIGHT"      |
| Figma import  | May fail       | ✅ Should work   |
