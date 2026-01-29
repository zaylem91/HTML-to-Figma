# Quick Start: Implement Components

## TL;DR - 3 Files to Add/Modify

### ✅ What This Solves

- ✅ **Button text** - Now extracted and displayed
- ✅ **Arrow styling** - Reusable components instead of text nodes
- ✅ **Images** - Proper image support
- ✅ **Compatibility** - 100% Figma-native

---

## Step 1: Add Component Factory (5 min)

**File:** `utilities/html-to-figma.mjs`

**Location:** Add before the main `convertElement()` function (around line 500)

**What to add:** Copy from `COMPONENT_IMPLEMENTATION.md` → Section 1: Component Factory Functions

This creates:

- Component definitions (the blueprints)
- Component instances (the usages)
- Helper functions for each type

---

## Step 2: Fix Button Text Extraction (2 min)

**File:** `utilities/html-to-figma.mjs`

**Location:** Find `if (isButton) {` around line 751

**Replace this:**

```javascript
if (isButton) {
  finalWidth = parseSize(elementStyles["width"]) || 160;
  finalHeight = parseSize(elementStyles["height"]) || 48;
  nodeType = "RECTANGLE";
}
```

**With this:**

```javascript
if (isButton) {
  // Extract button text
  const directText = $element
    .contents()
    .filter((i, el) => el.type === "text")
    .text()
    .trim();
  const buttonText = directText || $element.text().trim() || "Button";

  // Create button instance
  const btnStyle = classList.includes("btn-secondary")
    ? "secondary"
    : "primary";
  const buttonInstance = createButtonInstance(buttonText, btnStyle);

  // Use instance properties
  finalWidth = buttonInstance.width;
  finalHeight = buttonInstance.height;
  nodeType = "INSTANCE";

  // Store for later - we'll need to use this instance
  $element.data("figmaNode", buttonInstance);
}
```

---

## Step 3: Replace Arrow Nodes (1 min)

**File:** `utilities/html-to-figma.mjs`

**Location:** Find `function createArrowNode(text, elementStyles)` around line 431

**Replace entire function with:**

```javascript
function createArrowNode(text, elementStyles) {
  const direction = detectArrowDirection(text);
  return createArrowInstance(direction);
}
```

---

## Step 4: Add Image Support (2 min)

**File:** `utilities/html-to-figma.mjs`

**Location:** Add two functions before `convertElement()` (around line 700)

```javascript
function isImage($element) {
  return $element.prop("tagName") === "IMG";
}

function hasImages($element) {
  return $element.find("img").length > 0;
}
```

**Then in `convertElement()`**, add at the very start (after getting elementStyles):

```javascript
// Handle images
if (isImage($element)) {
  return createImageInstance(
    $element.attr("src") || "",
    $element.attr("alt") || "image"
  );
}
```

---

## Step 5: Add Component Library to Output (2 min)

**File:** `utilities/html-to-figma.mjs`

**Location:** Find where you create the final output (around line 1050 in `convertToFigmaDesign()`)

**Add this BEFORE returning the frames:**

```javascript
// Create Design System frame with components
const componentLibrary = createComponentLibrary();
const designSystemFrame = {
  id: "frame_design_system",
  name: "Design System",
  type: "FRAME",
  x: 0,
  y: 0,
  width: 1400,
  height: 1000,
  layoutMode: "VERTICAL",
  paddingTop: 40,
  paddingRight: 40,
  paddingBottom: 40,
  paddingLeft: 40,
  itemSpacing: 80,
  counterAxisSizingMode: "AUTO",
  children: componentLibrary,
};

// Add to beginning of frames array
frames.unshift(designSystemFrame);
```

---

## Verification Script

After making changes, run this to validate:

```bash
cd /Users/student2/Documents/semester-2-mideterm-project
python3 << 'EOF'
import json

with open('figma-design.json', 'r') as f:
    data = json.load(f)

# Check 1: First frame is Design System
first_frame = data['frames'][0]
is_design_system = first_frame['name'] == 'Design System'
print(f"✓ Design System frame: {is_design_system}")

# Check 2: Components exist
components = [c for c in first_frame.get('children', []) if c['type'] == 'COMPONENT']
print(f"✓ Components found: {len(components)}")
for comp in components[:5]:
    print(f"  - {comp['name']} ({comp['id']})")

# Check 3: Buttons have instances
button_instances = []
for frame in data['frames'][1:]:  # Skip design system
    for child in frame.get('children', []):
        if child.get('type') == 'INSTANCE' and 'button' in child.get('mainComponent', ''):
            button_instances.append(child)

print(f"✓ Button instances: {len(button_instances)}")

# Check 4: Instances have overrides
with_text = sum(1 for inst in button_instances if inst.get('overrides'))
print(f"✓ Button instances with text: {with_text}")

# Check 5: No more TEXT arrows
text_arrows = []
for frame in data['frames']:
    for child in frame.get('children', []):
        if child.get('type') == 'TEXT' and child.get('text') in ['→', '←', '↑', '↓']:
            text_arrows.append(child)

print(f"✓ Old-style TEXT arrows (should be 0): {len(text_arrows)}")

print("\n✅ Component implementation successful!" if len(components) > 5 and len(button_instances) > 0 else "\n⚠️ Some checks failed")
EOF
```

---

## What It Looks Like in Figma

### Before (Rectangles)

```
Menu Page
├── Button (Rectangle, no text)
├── Button (Rectangle, no text)
└── Item (Frame)
    ├── Name (Text)
    └── Arrow (Text: →)
```

### After (Components)

```
Design System
├── Button / Primary ⭐ [Component]
├── Button / Secondary ⭐ [Component]
├── Arrow / Right ⭐ [Component]
├── Image / Placeholder ⭐ [Component]
└── ...

Menu Page
├── Button: "Order Now" 🔗 [Instance of Button/Primary] ← Has text!
├── Button: "Learn More" 🔗 [Instance of Button/Primary]
└── Item (Frame)
    ├── Product Image 🔗 [Instance of Image/Placeholder]
    ├── Item Name (Text)
    └── → [Instance of Arrow/Right]
```

The 🔗 badge shows it's an instance. ⭐ shows it's a component definition.

---

## Figma Import

When you import the new JSON:

1. **Design System frame** appears at top with all components
2. **Figma automatically recognizes** COMPONENT and INSTANCE types
3. **Right-click any instance** → "Go to main component" to edit all at once
4. **Change** one component → **all instances update** automatically

---

## Troubleshooting

| Problem                 | Solution                                                      |
| ----------------------- | ------------------------------------------------------------- |
| Components not showing  | Check `type: "COMPONENT"` (not "FRAME")                       |
| Instances not linking   | Check `mainComponent` field exists and matches component `id` |
| Button text not showing | Check `overrides` object has correct text child ID            |
| Validation fails        | Run the verification script above                             |
| Images still missing    | Make sure `isImage()` function is called early                |

---

## Next Level (Optional)

Once components work:

1. **Add component variants** - "Button" with states (primary, secondary, hover, disabled)
2. **Add component properties** - "Button size" property selector
3. **Add image replacement** - Store actual image URLs, generate download links
4. **Export to HTML** - Use components in coded prototypes

---

## Files to Backup

Before making changes:

```bash
cp utilities/html-to-figma.mjs utilities/html-to-figma.mjs.backup
```

If something breaks:

```bash
cp utilities/html-to-figma.mjs.backup utilities/html-to-figma.mjs
```

---

## Questions?

Reference these docs:

- **COMPONENTS_STRATEGY.md** - Conceptual overview
- **COMPONENT_IMPLEMENTATION.md** - Full code examples
- **This file** - Quick implementation steps

**Ready?** Start with Step 1 and let me know what happens! 🚀
