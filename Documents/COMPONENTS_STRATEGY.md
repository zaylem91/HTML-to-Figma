# Figma Components Strategy: Images & Arrows

## Problem Analysis

Currently you have:

- ✅ **Buttons** - Grey with no text (text extraction issue)
- ❌ **Images** - Not being converted
- ❌ **Arrows** - Simple text, not vectors

## Solution: Use Figma Components

**Why Components?**

1. ✅ **Fully compatible** - Native Figma data type
2. ✅ **Reusable** - Define once, use many times
3. ✅ **No vector issues** - Components are managed by Figma, not raw SVG paths
4. ✅ **Maintainable** - Update all instances by updating the main component
5. ✅ **Professional** - Design system approach

---

## Component Architecture

### Layer 1: Component Definitions (Library)

Create a "Design System" frame at the top of the file containing all component definitions:

```
Design System
├── Buttons
│   ├── Button / Primary
│   ├── Button / Secondary
│   └── Button / Large
├── Icons
│   ├── Arrow / Right
│   ├── Arrow / Left
│   ├── Arrow / Up
│   └── Arrow / Down
├── Images
│   ├── Image / Placeholder
│   ├── Image / Product
│   └── Image / Hero
└── Social
    ├── Icon / Facebook
    ├── Icon / Instagram
    └── Icon / Twitter
```

### Layer 2: Component Instances

In your actual page layouts, you reference these components:

```
Menu Page
├── Header
│   ├── Logo [Image Component Instance]
│   └── Menu Button [Button Component Instance]
├── Menu Items
│   ├── Item 1
│   │   ├── Item Image [Image Component Instance]
│   │   ├── Item Name [TEXT]
│   │   └── More Info [Arrow Component Instance → Right Arrow]
│   └── Item 2...
└── Footer
    └── Social Links
        ├── [Icon / Facebook Instance]
        ├── [Icon / Instagram Instance]
        └── [Icon / Twitter Instance]
```

---

## FigmaJsonNode Component Properties

### Component Definition (Main Component)

```javascript
const buttonPrimaryComponent = {
  id: `component_button_primary_${Date.now()}`,
  name: "Button / Primary",
  type: "COMPONENT", // ← This is the key property!
  x: 0,
  y: 0,
  width: 160,
  height: 48,

  // All standard properties work
  backgroundColor: { r: 0.96, g: 0.65, b: 0.38 }, // #F4A460
  cornerRadius: 8,
  layoutMode: "HORIZONTAL",
  primaryAxisSizingMode: "AUTO",
  counterAxisSizingMode: "AUTO",
  paddingTop: 12,
  paddingRight: 24,
  paddingBottom: 12,
  paddingLeft: 24,
  itemSpacing: 8,
  primaryAxisAlignItems: "CENTER",
  counterAxisAlignItems: "CENTER",

  // Children nodes (for button label)
  children: [
    {
      id: `text_button_primary_label_${Date.now()}`,
      name: "Label",
      type: "TEXT",
      x: 0,
      y: 0,
      width: 100,
      height: 24,
      text: "Button",
      style: {
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 600,
        fills: [
          {
            type: "SOLID",
            color: { r: 1, g: 1, b: 1 }, // White
          },
        ],
      },
    },
  ],
};
```

### Component Instance (In Your Design)

```javascript
const buttonInstance = {
  id: `instance_button_${Math.random().toString(36).substr(2, 9)}`,
  name: "Button Instance",
  type: "INSTANCE", // ← References a component
  x: 100,
  y: 200,
  width: 160,
  height: 48,
  mainComponent: `component_button_primary_${Date.now()}`, // ID of the component

  // Can override some properties
  overrides: {
    [`text_button_primary_label_${Date.now()}`]: {
      text: "Click Me", // Custom text for this instance
    },
  },
};
```

---

## Implementation Plan

### 1. Create Component Library Functions

```javascript
// Create all component definitions
function createComponentLibrary() {
  return {
    buttons: {
      primary: createButtonPrimaryComponent(),
      secondary: createButtonSecondaryComponent(),
      large: createButtonLargeComponent(),
    },
    arrows: {
      right: createArrowRightComponent(),
      left: createArrowLeftComponent(),
      up: createArrowUpComponent(),
      down: createArrowDownComponent(),
    },
    images: {
      placeholder: createImagePlaceholderComponent(),
      product: createImageProductComponent(),
      hero: createImageHeroComponent(),
    },
    social: {
      facebook: createSocialIconComponent("facebook"),
      instagram: createSocialIconComponent("instagram"),
      twitter: createSocialIconComponent("twitter"),
    },
  };
}

// Create individual component definition
function createButtonPrimaryComponent() {
  return {
    id: "component_button_primary",
    name: "Button / Primary",
    type: "COMPONENT", // ← KEY PROPERTY
    x: 0,
    y: 0,
    width: 160,
    height: 48,
    backgroundColor: { r: 0.96, g: 0.65, b: 0.38 },
    cornerRadius: 8,
    layoutMode: "HORIZONTAL",
    primaryAxisSizingMode: "AUTO",
    counterAxisSizingMode: "AUTO",
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
    itemSpacing: 8,
    primaryAxisAlignItems: "CENTER",
    counterAxisAlignItems: "CENTER",
    children: [
      {
        id: "text_button_label",
        name: "Label",
        type: "TEXT",
        x: 0,
        y: 0,
        width: 100,
        height: 24,
        text: "Button",
        style: {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: 600,
          fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
        },
      },
    ],
  };
}
```

### 2. Create Component Instance Functions

```javascript
function createButtonInstance(text, style = "primary") {
  const componentId = `component_button_${style}`;
  return {
    id: `instance_button_${Math.random().toString(36).substr(2, 9)}`,
    name: `Button: ${text}`,
    type: "INSTANCE", // ← KEY PROPERTY
    x: 0,
    y: 0,
    width: 160,
    height: 48,
    mainComponent: componentId,
    overrides: {
      text_button_label: {
        text: text,
      },
    },
  };
}

function createArrowInstance(direction) {
  const arrows = {
    right: { name: "Right Arrow", text: "→" },
    left: { name: "Left Arrow", text: "←" },
    up: { name: "Up Arrow", text: "↑" },
    down: { name: "Down Arrow", text: "↓" },
  };

  const arrow = arrows[direction] || arrows.right;
  const componentId = `component_arrow_${direction}`;

  return {
    id: `instance_arrow_${Math.random().toString(36).substr(2, 9)}`,
    name: arrow.name,
    type: "INSTANCE",
    x: 0,
    y: 0,
    width: 24,
    height: 24,
    mainComponent: componentId,
  };
}

function createImageInstance(imagePath, alt = "") {
  return {
    id: `instance_image_${Math.random().toString(36).substr(2, 9)}`,
    name: `Image: ${alt || imagePath}`,
    type: "INSTANCE",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    mainComponent: "component_image_placeholder",
    metadata: {
      source: imagePath,
      alt: alt,
    },
  };
}
```

### 3. Update Button Text Extraction

Current issue: Buttons have no text. Fix:

```javascript
// BEFORE (Line 930)
if (isButton && (directText || buttonText)) {
  const textNode = createTextNode(directText || buttonText, elementStyles);
  // ... but this creates a separate node

// AFTER
if (isButton) {
  // Extract text properly
  const btnText = directText || buttonText || $element.text().trim() || "Button";

  // Create button instance with text
  const btnInstance = createButtonInstance(btnText, "primary");
  node = btnInstance;  // Replace the rectangle with instance
  children.push(btnInstance); // Add to children instead of parent
}
```

### 4. Update Arrow Handling

```javascript
// BEFORE (Line 431)
function createArrowNode(text, elementStyles) {
  // Creates TEXT node with arrow unicode

// AFTER
function createArrowNode(text, elementStyles) {
  const direction = detectArrowDirection(text);
  return createArrowInstance(direction);
}

function detectArrowDirection(text) {
  if (text.includes("→") || text.includes("▶")) return "right";
  if (text.includes("←") || text.includes("◀")) return "left";
  if (text.includes("↑")) return "up";
  if (text.includes("↓")) return "down";
  return "right"; // default
}
```

### 5. Handle Images

```javascript
// NEW: Detect and handle images
function isImage($element) {
  return $element.prop("tagName") === "IMG";
}

// When converting elements:
if (isImage($element)) {
  const src = $element.attr("src");
  const alt = $element.attr("alt") || "";
  const imgInstance = createImageInstance(src, alt);
  children.push(imgInstance);
}
```

---

## JSON Output Structure with Components

```javascript
{
  "frames": [
    {
      id: "frame_design_system",
      name: "Design System",
      type: "FRAME",
      x: 0,
      y: 0,
      width: 1200,
      height: 800,
      children: [
        // Component definitions (COMPONENT type)
        {
          id: "component_button_primary",
          name: "Button / Primary",
          type: "COMPONENT",  // ← This makes it a component
          // ... properties
          children: [/* button content */]
        },
        {
          id: "component_arrow_right",
          name: "Arrow / Right",
          type: "COMPONENT",
          // ... properties
        }
        // ... more components
      ]
    },
    {
      id: "frame_menu",
      name: "Menu Page",
      type: "FRAME",
      x: 1250,
      y: 0,
      children: [
        {
          id: "instance_button_123",
          name: "Button: Order Now",
          type: "INSTANCE",  // ← This is an instance
          mainComponent: "component_button_primary",
          // ... properties
        },
        {
          id: "instance_arrow_456",
          name: "Arrow: Next",
          type: "INSTANCE",
          mainComponent: "component_arrow_right"
        }
      ]
    }
  ]
}
```

---

## Benefits You Get

| Feature                 | Current            | With Components                                |
| ----------------------- | ------------------ | ---------------------------------------------- |
| **Button Text**         | ❌ Missing         | ✅ Full control via overrides                  |
| **Arrow Styling**       | 🟡 TEXT nodes      | ✅ Consistent, reusable components             |
| **Images**              | ❌ Missing         | ✅ Image placeholders with metadata            |
| **Updates**             | Manual per element | 🟡 Change main component, all instances update |
| **Figma Compatibility** | ✅ Good            | ✅ Perfect (native type)                       |
| **Maintainability**     | 🟡 Scattered       | ✅ Organized library                           |

---

## Migration Steps

1. **Create component definitions** → Add Component Library frame
2. **Replace button rectangles** → Convert to Button / Primary instances
3. **Replace arrow text nodes** → Convert to Arrow instances
4. **Add image components** → Create Image placeholder components
5. **Update instance creation** → Use new helper functions
6. **Test in Figma** → Import and verify all instances render correctly

---

## Figma API Documentation

### Official FigmaJsonNode Properties for Components

```typescript
interface FigmaJsonNode {
  // Required
  id: string;
  name: string;
  type: "COMPONENT" | "INSTANCE"; // Our new types
  x: number;
  y: number;
  width: number;
  height: number;

  // Component-specific
  mainComponent?: string; // (INSTANCE) ID of the main component
  componentSetId?: string; // Group of similar components

  // Component properties
  children?: FigmaJsonNode[];

  // All standard properties still work
  backgroundColor?: Color;
  cornerRadius?: number;
  layoutMode?: "HORIZONTAL" | "VERTICAL";
  // ... etc
}
```

---

## Next Steps

Ready to implement? Here's what I recommend:

1. **Phase 1: Button Components**
   - Fix button text extraction
   - Create Button component definitions
   - Replace button rectangles with instances
2. **Phase 2: Arrow Components**
   - Create Arrow components (right, left, up, down)
   - Replace arrow text nodes with instances
3. **Phase 3: Image Components**
   - Create Image placeholder components
   - Handle img HTML elements properly
   - Store image metadata in components

Would you like me to implement these changes to `html-to-figma.mjs`?
