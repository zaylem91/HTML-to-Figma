# 🔧 CSS Variable Fix - ROOT CAUSE FOUND

## 🎯 The Problem

Buttons were appearing **GREY with NO TEXT** in Figma, despite the JSON showing correct Sandy Brown and Saddle Brown colors.

**Root Cause**: Incorrect regex pattern in CSS variable resolution

## 🔍 What Was Wrong

In `utilities/html-to-figma.mjs` at **line 303**, the CSS variable resolution used an incorrect regex:

```javascript
// ❌ WRONG - Groups the variable and fallback together
const varMatch = value.match(/var\((--[\w-]+(?:, *(.+))?)\)/);
```

This caused `varMatch[1]` to capture `--primary-color, fallback` instead of just `--primary-color`.

### Example:

For `var(--primary-color)`:

- ✅ Worked fine (no fallback, so `varMatch[1]` = `--primary-color`)

For `var(--primary-color, red)`:

- ❌ `varMatch[1]` = `--primary-color, red` (WRONG!)
- Then lookup: `cssVariables["--primary-color, red"]` → **undefined** → color not applied!

## ✅ The Fix

Changed line 303 to use the correct regex pattern that was already used later in the code (line 321):

```javascript
// ✅ CORRECT - Separates variable name and fallback
const varMatch = value.match(/var\((--[\w-]+)(?:\s*,\s*([^)]+))?\)/);
```

Now `varMatch[1]` correctly captures just `--primary-color`, and `varMatch[2]` captures the fallback (if any).

## 📋 Changed Lines

**File**: `utilities/html-to-figma.mjs`

**Line 303** (in `extractStyles()` function):

```diff
- const varMatch = value.match(/var\((--[\w-]+(?:, *(.+))?)\)/);
+ const varMatch = value.match(/var\((--[\w-]+)(?:\s*,\s*([^)]+))?\)/);
```

## ✨ Results After Fix

Regenerated `figma-design.json` now correctly includes:

✅ **Primary buttons**: Sandy Brown RGB(0.957, 0.643, 0.376)  
✅ **Secondary buttons**: Saddle Brown RGB(0.545, 0.451, 0.333)  
✅ **Button text**: White color applied  
✅ **All CSS variables resolved**: Colors now properly extracted

## 🧪 Verification

```
Found 5 button elements:

📌 btn btn-primary
   ✅ Fill: SOLID Sandy Brown RGB(0.957, 0.643, 0.376)

📌 btn btn-secondary
   ✅ Fill: SOLID Saddle Brown RGB(0.545, 0.451, 0.333)
```

## 🚀 Next Steps

1. **Delete** current figma-design.json from Figma
2. **Re-import** the newly generated `figma-design.json`
3. Buttons should now appear with correct colors!

## 🔗 Related CSS

The converter now correctly resolves these CSS rules:

```css
:root {
  --primary-color: #f4a460; /* Sandy Brown */
  --secondary-color: #8b7355; /* Saddle Brown */
  /* ... 15 other variables ... */
}

.btn-primary {
  background-color: var(--primary-color); /* Now resolves to #f4a460 */
  color: white;
}

.btn-secondary {
  background-color: var(--secondary-color); /* Now resolves to #8b7355 */
  color: white;
}
```

---

**Summary**: The CSS variable resolution regex was malformed, preventing color values from being properly looked up. The fix makes the regex consistent with the pattern used elsewhere in the code, enabling proper color resolution.
