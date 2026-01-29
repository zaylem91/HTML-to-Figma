# Component Reference Card

## Quick Property Lookup

### COMPONENT Type

```javascript
{
  type: "COMPONENT",        // ← Makes this a template
  id: "component_button_primary",
  name: "Button / Primary",

  // All standard properties
  x, y, width, height,
  backgroundColor, cornerRadius,
  layoutMode, padding*, itemSpacing,

  // Contains children that can be overridden
  children: [...]
}
```

### INSTANCE Type

```javascript
{
  type: "INSTANCE",                           // ← Uses a component
  id: "instance_button_123",
  name: "Button: Order Now",

  // Reference to component
  mainComponent: "component_button_primary",  // Must exist!

  // Override specific child properties
  overrides: {
    "text_button_primary_label": {
      text: "Order Now"          // Override this child's text
    }
  }
}
```

---

## Common Patterns

### Pattern 1: Button with Text Override

```javascript
// Define once (COMPONENT)
{
  type: "COMPONENT",
  id: "component_button_primary",
  children: [{
    id: "text_button_primary_label",
    type: "TEXT",
    text: "Button"  // Default
  }]
}

// Use many times (INSTANCE)
{
  type: "INSTANCE",
  mainComponent: "component_button_primary",
  overrides: {
    "text_button_primary_label": {
      text: "Order Now"  // Custom text
    }
  }
}
```

### Pattern 2: Arrow Icon (No Override)

```javascript
// Define (COMPONENT)
{
  type: "COMPONENT",
  id: "component_arrow_right",
  children: [{
    id: "text_arrow_right_icon",
    type: "TEXT",
    text: "→"
  }]
}

// Use (INSTANCE - no overrides needed)
{
  type: "INSTANCE",
  mainComponent: "component_arrow_right"
  // Same arrow every time
}
```

### Pattern 3: Image Placeholder (With Metadata)

```javascript
// Define (COMPONENT)
{
  type: "COMPONENT",
  id: "component_image_placeholder",
  backgroundColor: { r: 0.93, g: 0.93, b: 0.93 }
}

// Use (INSTANCE - with image source)
{
  type: "INSTANCE",
  mainComponent: "component_image_placeholder",
  metadata: {
    source: "assets/images/pizza.jpg",
    alt: "Margherita Pizza"
  }
}
```

---

## Validation Checklist

Before exporting, verify:

```javascript
□ All COMPONENT types have unique `id`
□ All INSTANCE types have `mainComponent` field
□ All `mainComponent` IDs match an actual COMPONENT `id`
□ Override child IDs match actual children in component
□ No circular references (instance can't reference itself)
□ Design System frame is first in frames array
□ All standard properties (x, y, width, height) present
□ No invalid properties (like vectorPaths, strokes, etc.)
```

---

## Property Cheat Sheet

### Required for ALL nodes

```
id, name, type, x, y, width, height
```

### For COMPONENT/INSTANCE

```
mainComponent          (INSTANCE only, points to COMPONENT id)
overrides              (INSTANCE only, object of child overrides)
children               (both - if have children)
```

### For colored elements

```
backgroundColor        (RECTANGLE, COMPONENT, INSTANCE)
                      Format: { r: 0-1, g: 0-1, b: 0-1 }
```

### For text elements

```
text                  (TEXT nodes in children)
style: {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeightPx,
  fills: [{type: "SOLID", color: {...}}]
}
```

### For layout

```
layoutMode           "HORIZONTAL" or "VERTICAL"
primaryAxisSizingMode
counterAxisSizingMode
paddingTop, paddingRight, paddingBottom, paddingLeft
itemSpacing
primaryAxisAlignItems
counterAxisAlignItems
```

---

## Creating a Component Library

### Minimal (Core)

```javascript
[
  createButtonPrimaryComponent(), // Button
  createArrowRightComponent(), // Arrow
  createImagePlaceholderComponent(), // Image
];
```

### Standard

```javascript
[
  // Buttons
  createButtonPrimaryComponent(),
  createButtonSecondaryComponent(),

  // Arrows
  createArrowRightComponent(),
  createArrowLeftComponent(),
  createArrowUpComponent(),
  createArrowDownComponent(),

  // Media
  createImagePlaceholderComponent(),
  createSocialIconComponent("facebook"),
];
```

### Complete (Design System)

```javascript
[
  // Buttons (3 styles, 2 sizes each)
  createButtonPrimaryComponent(),
  createButtonSecondaryComponent(),
  createButtonLargeComponent(),
  createButtonPrimaryLargeComponent(),

  // Arrows (4 directions)
  createArrowRightComponent(),
  createArrowLeftComponent(),
  createArrowUpComponent(),
  createArrowDownComponent(),

  // Media (3 types)
  createImagePlaceholderComponent(),
  createImageProductComponent(),
  createImageHeroComponent(),

  // Social Icons (3 platforms)
  createSocialIconComponent("facebook"),
  createSocialIconComponent("instagram"),
  createSocialIconComponent("twitter"),

  // Other
  createRatingStarComponent(),
  createTagComponent(),
  createBadgeComponent(),
];
```

---

## Implementation Checklist

### Phase 1: Factory Functions (20 min)

- [ ] Copy component factory functions to file
- [ ] Copy instance creation functions to file
- [ ] Add `createComponentLibrary()` function
- [ ] Add detection helpers (`isImage`, `hasImages`, etc.)

### Phase 2: Button Fixes (5 min)

- [ ] Update button text extraction
- [ ] Change button node type to INSTANCE
- [ ] Wire up createButtonInstance()

### Phase 3: Arrow Updates (2 min)

- [ ] Replace createArrowNode() with component version
- [ ] Add detectArrowDirection() function

### Phase 4: Image Support (5 min)

- [ ] Add image detection
- [ ] Add early image handling in convertElement()

### Phase 5: Library Output (5 min)

- [ ] Create Design System frame
- [ ] Add components to output
- [ ] Unshift to beginning of frames array

### Testing (5 min)

- [ ] Run validation script
- [ ] Check figma-design.json manually
- [ ] Verify component count
- [ ] Check instance links

---

## Troubleshooting

| Error                       | Cause                                      | Fix                                                |
| --------------------------- | ------------------------------------------ | -------------------------------------------------- |
| `mainComponent not found`   | INSTANCE references non-existent COMPONENT | Verify COMPONENT `id` matches exactly              |
| `overrides not applied`     | Child ID incorrect                         | Check child `id` in COMPONENT matches override key |
| `Missing properties`        | Incomplete node definition                 | Add x, y, width, height to all nodes               |
| `Instances not linking`     | Missing `mainComponent` field              | Check INSTANCE has mainComponent property          |
| `Design System not showing` | Wrong type or frame structure              | Verify first frame has type: "FRAME"               |

---

## Before & After Examples

### Before: Text Button (Broken)

```json
{
  "id": "btn_1",
  "type": "RECTANGLE",
  "width": 160,
  "height": 48,
  "backgroundColor": {...},
  "children": []
}
```

Result: Gray box, no text

### After: Text Button (Fixed)

```json
{
  "id": "instance_btn_1",
  "type": "INSTANCE",
  "mainComponent": "component_button_primary",
  "overrides": {
    "text_button_primary_label": {
      "text": "Click Me"
    }
  }
}
```

Result: Button with text "Click Me"

---

### Before: Arrow (Static)

```json
{
  "id": "arrow_1",
  "type": "TEXT",
  "text": "→",
  "style": {...}
},
{
  "id": "arrow_2",
  "type": "TEXT",
  "text": "→",
  "style": {...}
},
{
  "id": "arrow_3",
  "type": "TEXT",
  "text": "→",
  "style": {...}
}
```

Result: 3 separate nodes, same style (repetitive)

### After: Arrow (Reusable)

```json
{
  "id": "instance_arrow_1",
  "type": "INSTANCE",
  "mainComponent": "component_arrow_right"
},
{
  "id": "instance_arrow_2",
  "type": "INSTANCE",
  "mainComponent": "component_arrow_right"
},
{
  "id": "instance_arrow_3",
  "type": "INSTANCE",
  "mainComponent": "component_arrow_right"
}
```

Result: 3 instances of same component, edit component once to change all

---

## Figma API Reference

### Official FigmaJsonNode Component Properties

```typescript
interface FigmaJsonNode {
  // Identity
  id: string;
  name: string;
  type: "COMPONENT" | "INSTANCE" | "FRAME" | "TEXT" | ...;

  // Position & Size
  x: number;
  y: number;
  width: number;
  height: number;

  // Component-Specific
  mainComponent?: string;              // INSTANCE only
  overrides?: {
    [childId: string]: {
      text?: string;
      fills?: Fill[];
      [property: string]: any;
    }
  };                                   // INSTANCE only

  // Appearance
  backgroundColor?: Color;
  cornerRadius?: number;
  fills?: Fill[];

  // Layout
  layoutMode?: "HORIZONTAL" | "VERTICAL";
  primaryAxisSizingMode?: "FIXED" | "AUTO";
  counterAxisSizingMode?: "FIXED" | "AUTO";
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  itemSpacing?: number;

  // Alignment
  primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlignItems?: "MIN" | "CENTER" | "MAX";

  // Content
  text?: string;                       // TEXT nodes only
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    lineHeightPx?: number;
    fills?: Fill[];
  };

  // Hierarchy
  children?: FigmaJsonNode[];
}

interface Color {
  r: number;  // 0-1
  g: number;  // 0-1
  b: number;  // 0-1
}

interface Fill {
  type: "SOLID";
  color: Color;
}
```

---

## File Organization

```
utilities/
└── html-to-figma.mjs
    ├── Color utilities (hexToRgb, parseColor)
    ├── Text utilities (createTextNode)
    ├── Detection utilities (isButton, isImage, isArrow)
    │
    ├── COMPONENT DEFINITIONS              ← NEW SECTION
    │   ├── createButtonPrimaryComponent()
    │   ├── createButtonSecondaryComponent()
    │   ├── createArrowRightComponent()
    │   ├── createArrowLeftComponent()
    │   ├── createArrowUpComponent()
    │   ├── createArrowDownComponent()
    │   ├── createImagePlaceholderComponent()
    │   └── createComponentLibrary()
    │
    ├── COMPONENT INSTANCES               ← NEW SECTION
    │   ├── createButtonInstance()
    │   ├── createArrowInstance()
    │   ├── createImageInstance()
    │   ├── detectArrowDirection()
    │   └── createSocialIconInstance()
    │
    ├── Main conversion (convertElement, convertToFigmaDesign)
    └── Export
```

---

## Ready to Code?

Start here:

1. **COMPONENT_QUICK_START.md** - 5-step guide
2. **COMPONENT_IMPLEMENTATION.md** - Full code to copy
3. **This file** - Reference while coding

Questions? Check **VISUAL_COMPARISON.md** for architecture overview.
