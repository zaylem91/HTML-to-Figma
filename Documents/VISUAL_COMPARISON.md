# Visual Architecture Comparison

## Current vs. Proposed

### CURRENT APPROACH (Rectangles + Text Nodes)

```
figma-design.json
└── frames: [
    {
      id: "frame_menu",
      name: "Menu Page",
      type: "FRAME",
      children: [
        {
          id: "btn_order",
          name: "btn--primary",
          type: "RECTANGLE",           ← ❌ Just a colored box
          x: 100, y: 200,
          width: 160, height: 48,
          backgroundColor: { ... },

          children: []                  ← ❌ No text inside!
          // Text is LOST because:
          // - Extraction failed
          // - No children created
          // - No override mechanism
        },

        {
          id: "arrow_next",
          name: "arrow",
          type: "TEXT",                 ← 🟡 Just unicode character
          x: 300, y: 250,
          text: "→",
          // Problem: Not reusable, hard to style consistently
        }
      ]
    }
  ]
```

**Problems:**

- ❌ No button text visible
- ❌ Each arrow is separate TEXT node (not reusable)
- ❌ No images handled
- ❌ Can't batch-edit similar elements
- ❌ Not a design system

---

### PROPOSED APPROACH (Components + Instances)

```
figma-design.json
└── frames: [
    {
      id: "frame_design_system",
      name: "Design System",
      type: "FRAME",
      children: [
        // ⭐ COMPONENT DEFINITIONS (Templates)
        {
          id: "component_button_primary",
          name: "Button / Primary",
          type: "COMPONENT",             ← ✅ Blueprint
          x: 0, y: 0,
          width: 160, height: 48,
          backgroundColor: { r: 0.96, g: 0.65, b: 0.38 },

          children: [
            {
              id: "text_button_primary_label",
              type: "TEXT",
              x: 0, y: 0,
              text: "Button",
              style: { ... }
            }
          ]
        },

        {
          id: "component_arrow_right",
          name: "Arrow / Right",
          type: "COMPONENT",             ← ✅ Reusable
          children: [
            {
              id: "text_arrow_right_icon",
              type: "TEXT",
              text: "→"
            }
          ]
        },

        {
          id: "component_image_placeholder",
          name: "Image / Placeholder",
          type: "COMPONENT",
          backgroundColor: { r: 0.93, g: 0.93, b: 0.93 }
        }
      ]
    },

    {
      id: "frame_menu",
      name: "Menu Page",
      type: "FRAME",
      children: [
        // 🔗 COMPONENT INSTANCES (Uses)
        {
          id: "instance_button_123",
          name: "Button: Order Now",
          type: "INSTANCE",               ← ✅ Instance
          x: 100, y: 200,
          width: 160, height: 48,

          mainComponent: "component_button_primary",  ← Links to template

          overrides: {
            "text_button_primary_label": {
              text: "Order Now"            ← ✅ TEXT VISIBLE!
            }
          }
        },

        {
          id: "instance_button_456",
          name: "Button: Add to Cart",
          type: "INSTANCE",
          mainComponent: "component_button_primary",
          overrides: {
            "text_button_primary_label": {
              text: "Add to Cart"          ← ✅ Different text
            }
          }
          // All styling inherited from component
        },

        {
          id: "instance_arrow_next",
          name: "Arrow: Next",
          type: "INSTANCE",
          mainComponent: "component_arrow_right",
          // No overrides needed - same arrow everywhere
        },

        {
          id: "instance_image_product",
          name: "Image: Pizza Margherita",
          type: "INSTANCE",
          mainComponent: "component_image_placeholder",
          metadata: {
            source: "assets/images/pizza.jpg",
            alt: "Margherita Pizza"
          }
        }
      ]
    }
  ]
```

**Advantages:**

- ✅ Button text visible and customizable
- ✅ Arrows reusable across entire design
- ✅ Images properly structured
- ✅ Change one component = update all instances
- ✅ Professional design system
- ✅ 100% Figma compatible

---

## Side-by-Side Comparison

### Button Rendering

| Current                                  | Proposed                                     |
| ---------------------------------------- | -------------------------------------------- |
| ![current-button] RECTANGLE with NO text | ![proposed-button] INSTANCE with "Order Now" |

```
CURRENT:
┌──────────────────┐
│   (gray box)     │  ← No text!
└──────────────────┘

PROPOSED:
┌──────────────────┐
│    Order Now     │  ← Text visible
│   (sandy brown)  │     (from override)
└──────────────────┘
```

### Arrow Handling

| Current                        | Proposed                                 |
| ------------------------------ | ---------------------------------------- |
| 5 separate TEXT nodes with "→" | 5 INSTANCES of "Arrow / Right" component |

```
CURRENT:
Menu Item 1  → [TEXT node]
Menu Item 2  → [TEXT node]
Menu Item 3  → [TEXT node]
Menu Item 4  → [TEXT node]
Menu Item 5  → [TEXT node]

Each node is separate, styled independently

PROPOSED:
Menu Item 1  → [INSTANCE of Arrow/Right]
Menu Item 2  → [INSTANCE of Arrow/Right]
Menu Item 3  → [INSTANCE of Arrow/Right]
Menu Item 4  → [INSTANCE of Arrow/Right]
Menu Item 5  → [INSTANCE of Arrow/Right]

All linked to one component - change style once, all update
```

### File Size Growth

```
CURRENT:
Design frames: ~150 KB
- 50 buttons = 50 duplicate nodes
- 30 arrows = 30 duplicate nodes
- No images

PROPOSED:
Design System frame: ~20 KB (components)
Design frames: ~120 KB (instances - smaller, just references)
Total: ~140 KB (SAME SIZE, but with more functionality)
```

---

## Data Flow Comparison

### CURRENT (What Happens Now)

```
HTML Button Element
    ↓
convertElement()
    ├─ Detect: isButton = true
    ├─ Create: RECTANGLE node
    │   └─ backgroundColor: #F4A460
    │   └─ NO children
    ├─ Try to extract text
    │   └─ ❌ Text lost (no mechanism)
    └─ Return: Rectangle (textless)

Figma Import
    └─ Shows: Gray box, no text
```

### PROPOSED (What Will Happen)

```
HTML Button Element (e.g., <button>Order Now</button>)
    ↓
convertElement()
    ├─ Detect: isButton = true
    ├─ Extract: text = "Order Now"
    ├─ Create: INSTANCE
    │   ├─ mainComponent: "component_button_primary"
    │   ├─ overrides: {
    │   │    "text_button_primary_label": "Order Now"
    │   │  }
    │   └─ x, y, width, height
    └─ Return: Instance with text override

Component Library (Already exists in frame 0)
    └─ component_button_primary (COMPONENT)
        └─ children: [{
            id: "text_button_primary_label",
            type: "TEXT",
            text: "Button"  ← Default value
        }]

Figma Import
    ├─ Loads component definition
    ├─ Creates instance linking to it
    ├─ Applies override: "Order Now"
    └─ Shows: Sandy brown button with "Order Now" text ✅
```

---

## JSON Structure Comparison

### CURRENT Button JSON

```json
{
  "id": "btn_order",
  "name": "btn--primary",
  "type": "RECTANGLE",
  "x": 100,
  "y": 200,
  "width": 160,
  "height": 48,
  "backgroundColor": {
    "r": 0.96,
    "g": 0.65,
    "b": 0.38
  },
  "cornerRadius": 8,
  "layoutMode": "HORIZONTAL",
  "paddingTop": 12,
  "paddingRight": 24,
  "paddingBottom": 12,
  "paddingLeft": 24,
  "children": []
}
```

**Problems:**

- Empty `children` array
- No mechanism for text
- No reusability

### PROPOSED Button JSON

```json
{
  "id": "instance_button_order",
  "name": "Button: Order Now",
  "type": "INSTANCE",
  "x": 100,
  "y": 200,
  "width": 160,
  "height": 48,
  "mainComponent": "component_button_primary",
  "overrides": {
    "text_button_primary_label": {
      "text": "Order Now"
    }
  }
}
```

**Advantages:**

- Compact (references component)
- Text via override
- Reusable

**Plus Design System has this:**

```json
{
  "id": "component_button_primary",
  "name": "Button / Primary",
  "type": "COMPONENT",
  "x": 0,
  "y": 0,
  "width": 160,
  "height": 48,
  "backgroundColor": { "r": 0.96, "g": 0.65, "b": 0.38 },
  "cornerRadius": 8,
  "layoutMode": "HORIZONTAL",
  "children": [
    {
      "id": "text_button_primary_label",
      "name": "Label",
      "type": "TEXT",
      "text": "Button",
      "style": {
        "fontFamily": "Inter",
        "fontSize": 16,
        "fontWeight": 600,
        "fills": [{ "type": "SOLID", "color": { "r": 1, "g": 1, "b": 1 } }]
      }
    }
  ]
}
```

**Once:** Define everything
**Many times:** Reference with overrides

---

## Implementation Complexity

### Code Changes Required

```
CURRENT APPROACH:
❌ Works with rectangles
❌ Can't extract button text
❌ No image support
❌ No design system

PROPOSED APPROACH:
✅ Add component factory (40 lines)
✅ Update button handling (10 lines)
✅ Replace arrow function (2 lines)
✅ Add image detection (5 lines)
✅ Add design system frame (15 lines)

Total: ~70 lines added/modified
Complexity: SIMPLE - mostly copy-paste from docs
```

---

## Figma UI Experience

### CURRENT (What You See Now)

```
🎨 Figma File
└── Menu Page
    ├── 📦 Button (Rectangle)
    │   └─ 😞 No text inside
    ├── 📦 Button (Rectangle)
    │   └─ 😞 No text inside
    ├── → (Text)
    ├── → (Text)
    └── → (Text)

Nothing organized. Can't batch-edit. Hard to maintain.
```

### PROPOSED (What You'll See)

```
🎨 Figma File
├── ⭐ Design System
│   ├── 🎨 Button / Primary        [Component - editable]
│   ├── 🎨 Button / Secondary      [Component - editable]
│   ├── ➡️ Arrow / Right            [Component - editable]
│   ├── ➡️ Arrow / Left             [Component - editable]
│   ├── 🖼️ Image / Placeholder      [Component - editable]
│   └── 📱 Icon / Facebook          [Component - editable]
│
└── Menu Page
    ├── 🔗 Button: Order Now       [Instance - linked to Button/Primary]
    ├── 🔗 Button: Add to Cart     [Instance - linked to Button/Primary]
    ├── 🔗 Arrow                   [Instance - linked to Arrow/Right]
    ├── 🔗 Product Image           [Instance - linked to Image/Placeholder]
    └── ...

Right-click any 🔗 → "Go to main component" → Edit all at once!
```

---

## Why Components Are Better

| Aspect                | Rectangle Approach    | Component Approach              |
| --------------------- | --------------------- | ------------------------------- |
| **Button Text**       | ❌ Missing            | ✅ Extracted & visible          |
| **Consistency**       | 🟡 Manual per button  | ✅ Automatic from component     |
| **Updates**           | ❌ Change each button | ✅ Change component, all update |
| **Reusability**       | ❌ Duplicated code    | ✅ One definition, many uses    |
| **Design System**     | ❌ No                 | ✅ Yes - organized library      |
| **Figma UI**          | 🟡 Just frames        | ✅ Components + Instances       |
| **Scalability**       | 🟡 Gets messy         | ✅ Clean and organized          |
| **Maintenance**       | ❌ Hard               | ✅ Easy                         |
| **Developer Handoff** | 🟡 Confusing          | ✅ Crystal clear                |
| **File Size**         | Similar               | Similar                         |

---

## Success Criteria

After implementation, you should see:

✅ **Design System frame** at the top with all components
✅ **Button instances** with text visible (e.g., "Order Now")
✅ **Arrow instances** instead of text nodes
✅ **Image instances** in the design
✅ **No warnings** when importing to Figma
✅ **Component badges** (🔗) on instances in Figma UI
✅ Ability to **right-click any instance** and edit the main component

---

## Next: Implementation

Ready to implement? Follow **COMPONENT_QUICK_START.md** for step-by-step instructions.

Or start with **Section 1** of **COMPONENT_IMPLEMENTATION.md** to understand the full code.
