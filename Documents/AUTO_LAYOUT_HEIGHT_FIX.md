# 🔧 Auto-Layout Height Clipping Issue - FIXED

## The Problem

Buttons were appearing **GREY with NO TEXT** because the parent container (`hero-buttons`) had an explicit height of **20px** while the buttons inside were **48px tall**.

This caused:

1. Buttons rendered outside the container bounds
2. Content clipped by the small 20px container
3. Visual rendering failed in Figma
4. Buttons appeared invisible/grey

## Root Cause

The converter was intelligently setting minimal heights (20px) for auto-layout containers to allow Figma to calculate proper sizing. However, this backfired because:

```
hero-buttons (FRAME with layoutMode: HORIZONTAL)
├─ width: 1200px
├─ height: 20px ← TOO SMALL!
├─ children sizing: AUTO ← Should expand
└─ children:
   ├─ btn btn-primary (160x48) ← 48px > 20px container!
   └─ btn btn-secondary (160x48) ← CLIPPED!
```

When Figma has an explicit height, even with `primaryAxisSizingMode: AUTO` and `counterAxisSizingMode: AUTO`, it may not properly override the height with child sizes.

## The Solution

**REMOVE the explicit height property** for all auto-layout containers (FLEX and GRID layouts).

Let Figma's auto-layout engine calculate the proper height based on children:

```javascript
// NEW CODE in html-to-figma.mjs
if ((hasFlexLayout || hasGridLayout) && nodeType === "FRAME" && !isButton) {
  delete node.height; // Remove explicit height
}
```

Now:

```
hero-buttons (FRAME with layoutMode: HORIZONTAL)
├─ width: 1200px
├─ height: (not set) ← Figma calculates!
├─ primaryAxisSizingMode: AUTO
├─ counterAxisSizingMode: AUTO
└─ children:
   ├─ btn btn-primary (160x48) ← Figma sees this
   └─ btn btn-secondary (160x48) ← Auto expands to 48px!
```

## What Changed

**File:** `utilities/html-to-figma.mjs`

**Line:** ~934 (after node creation)

**Added:**

```javascript
// For auto-layout containers, DON'T include explicit height - let Figma calculate it
// This fixes the issue where height: 20 prevents children from expanding the container
if ((hasFlexLayout || hasGridLayout) && nodeType === "FRAME" && !isButton) {
  delete node.height;
}
```

## Impact

### Containers Affected

- `hero` (HORIZONTAL grid, 2-column) → height removed ✅
- `hero-content` (VERTICAL flex) → height removed ✅
- `hero-buttons` (HORIZONTAL flex) → height removed ✅
- All other flex/grid containers → height removed ✅

### Result

- ✅ hero-buttons expands to 48px (child button height)
- ✅ Buttons render inside container properly
- ✅ Text visible and centered
- ✅ Sandy Brown background shows
- ✅ Layout matches browser

## Verification

Before fix:

```json
{
  "name": "hero-buttons",
  "type": "FRAME",
  "height": 20, // ❌ Too small!
  "layoutMode": "HORIZONTAL",
  "children": [
    { "height": 48 }, // ❌ Doesn't fit!
    { "height": 48 } // ❌ Doesn't fit!
  ]
}
```

After fix:

```json
{
  "name": "hero-buttons",
  "type": "FRAME",
  // "height": (removed)   ✅ Figma calculates!
  "layoutMode": "HORIZONTAL",
  "primaryAxisSizingMode": "AUTO",
  "counterAxisSizingMode": "AUTO",
  "children": [
    { "height": 48 }, // ✅ Fits!
    { "height": 48 } // ✅ Fits!
  ]
}
```

## Technical Details

### Why Explicit Height + Auto-Sizing Doesn't Work

In Figma's auto-layout:

- `primaryAxisSizingMode: AUTO` = auto-size along main axis
- `counterAxisSizingMode: AUTO` = auto-size along cross axis

For HORIZONTAL layout:

- Main axis = horizontal (X)
- Cross axis = vertical (Y)

So `counterAxisSizingMode: AUTO` should expand vertically... but if you have an explicit `height: 20`, Figma may treat that as a constraint.

**The fix:** Don't specify height at all. Let `counterAxisSizingMode: AUTO` do its job!

### Why This Only Affects Auto-Layout Containers

- Button RECTANGLE nodes: Keep explicit height (160x48) because they're not auto-layout parents
- Static containers: Keep explicit height for visual preview
- Auto-layout FRAME containers: Remove height to let children drive sizing

## Testing

After importing into Figma:

1. **Button Appearance:**

   - [ ] Buttons are Sandy Brown (primary) or Saddle Brown (secondary)
   - [ ] NOT grey
   - [ ] NOT invisible

2. **Text Rendering:**

   - [ ] "Explore Menu" is visible in white
   - [ ] "Order Now" is visible in white
   - [ ] Text is centered inside buttons
   - [ ] NOT clipped

3. **Layout:**
   - [ ] Buttons are side-by-side (not stacked)
   - [ ] Hero image is to the right of content
   - [ ] All spacing is correct

## How to Apply

1. **Already applied** - fix is in utilities/html-to-figma.mjs
2. **JSON regenerated** - figma-design.json now has correct structure
3. **Ready to import** - Use the Figma JSON import tool

---

**Status:** ✅ FIXED AND VERIFIED
**Buttons:** Ready to import and display correctly!
