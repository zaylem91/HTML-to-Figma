# Component Implementation Guide

## Quick Reference: What Changes in Code

### Before (Current - Rectangles + Text)

```javascript
// Current approach
const buttonNode = {
  type: "RECTANGLE",
  backgroundColor: {...},
  children: [textNode]  // Text is a separate child
};
```

### After (Components)

```javascript
// New approach - Step 1: Define component once
const buttonPrimaryComponent = {
  type: "COMPONENT", // ← Changed
  id: "component_button_primary",
  // ... properties
};

// Step 2: Use it many times as instances
const buttonInstance = {
  type: "INSTANCE", // ← New type
  mainComponent: "component_button_primary",
  overrides: {
    // ← Override content
    text_label: { text: "Click Me" },
  },
};
```

---

## Complete Code Implementation

### Section 1: Component Factory Functions

Add these functions to `html-to-figma.mjs` (around line 500):

```javascript
// ============================================
// COMPONENT DEFINITIONS & INSTANCES
// ============================================

// Store component IDs for reference
const COMPONENTS = {
  BUTTON_PRIMARY: "component_button_primary",
  BUTTON_SECONDARY: "component_button_secondary",
  ARROW_RIGHT: "component_arrow_right",
  ARROW_LEFT: "component_arrow_left",
  ARROW_UP: "component_arrow_up",
  ARROW_DOWN: "component_arrow_down",
  IMAGE_PLACEHOLDER: "component_image_placeholder",
  ICON_FACEBOOK: "component_icon_facebook",
  ICON_INSTAGRAM: "component_icon_instagram",
  ICON_TWITTER: "component_icon_twitter",
};

/**
 * Create Button Primary Component (Main Component Definition)
 */
function createButtonPrimaryComponent() {
  return {
    id: COMPONENTS.BUTTON_PRIMARY,
    name: "Button / Primary",
    type: "COMPONENT", // ← KEY: This is a COMPONENT
    x: 0,
    y: 0,
    width: 160,
    height: 48,
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
    children: [
      {
        id: "text_button_primary_label",
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
          lineHeightPx: 24,
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
}

/**
 * Create Button Secondary Component
 */
function createButtonSecondaryComponent() {
  return {
    id: COMPONENTS.BUTTON_SECONDARY,
    name: "Button / Secondary",
    type: "COMPONENT",
    x: 0,
    y: 0,
    width: 160,
    height: 48,
    backgroundColor: { r: 0.55, g: 0.45, b: 0.33 }, // #8B7355
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
        id: "text_button_secondary_label",
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
          lineHeightPx: 24,
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
}

/**
 * Create Arrow Component (Right Arrow)
 */
function createArrowRightComponent() {
  return {
    id: COMPONENTS.ARROW_RIGHT,
    name: "Arrow / Right",
    type: "COMPONENT",
    x: 0,
    y: 0,
    width: 24,
    height: 24,
    children: [
      {
        id: "text_arrow_right_icon",
        name: "Icon",
        type: "TEXT",
        x: 0,
        y: 0,
        width: 24,
        height: 24,
        text: "→",
        style: {
          fontFamily: "Inter",
          fontSize: 20,
          fontWeight: 400,
          fills: [
            {
              type: "SOLID",
              color: { r: 0.2, g: 0.2, b: 0.2 }, // Dark gray
            },
          ],
        },
      },
    ],
  };
}

/**
 * Create Arrow Left Component
 */
function createArrowLeftComponent() {
  return {
    id: COMPONENTS.ARROW_LEFT,
    name: "Arrow / Left",
    type: "COMPONENT",
    x: 0,
    y: 0,
    width: 24,
    height: 24,
    children: [
      {
        id: "text_arrow_left_icon",
        name: "Icon",
        type: "TEXT",
        x: 0,
        y: 0,
        width: 24,
        height: 24,
        text: "←",
        style: {
          fontFamily: "Inter",
          fontSize: 20,
          fontWeight: 400,
          fills: [
            {
              type: "SOLID",
              color: { r: 0.2, g: 0.2, b: 0.2 },
            },
          ],
        },
      },
    ],
  };
}

/**
 * Create Arrow Up Component
 */
function createArrowUpComponent() {
  return {
    id: COMPONENTS.ARROW_UP,
    name: "Arrow / Up",
    type: "COMPONENT",
    x: 0,
    y: 0,
    width: 24,
    height: 24,
    children: [
      {
        id: "text_arrow_up_icon",
        name: "Icon",
        type: "TEXT",
        x: 0,
        y: 0,
        width: 24,
        height: 24,
        text: "↑",
        style: {
          fontFamily: "Inter",
          fontSize: 20,
          fontWeight: 400,
          fills: [
            {
              type: "SOLID",
              color: { r: 0.2, g: 0.2, b: 0.2 },
            },
          ],
        },
      },
    ],
  };
}

/**
 * Create Arrow Down Component
 */
function createArrowDownComponent() {
  return {
    id: COMPONENTS.ARROW_DOWN,
    name: "Arrow / Down",
    type: "COMPONENT",
    x: 0,
    y: 0,
    width: 24,
    height: 24,
    children: [
      {
        id: "text_arrow_down_icon",
        name: "Icon",
        type: "TEXT",
        x: 0,
        y: 0,
        width: 24,
        height: 24,
        text: "↓",
        style: {
          fontFamily: "Inter",
          fontSize: 20,
          fontWeight: 400,
          fills: [
            {
              type: "SOLID",
              color: { r: 0.2, g: 0.2, b: 0.2 },
            },
          ],
        },
      },
    ],
  };
}

/**
 * Create Image Placeholder Component
 */
function createImagePlaceholderComponent() {
  return {
    id: COMPONENTS.IMAGE_PLACEHOLDER,
    name: "Image / Placeholder",
    type: "COMPONENT",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    backgroundColor: { r: 0.93, g: 0.93, b: 0.93 }, // Light gray
    cornerRadius: 4,
    children: [
      {
        id: "text_image_placeholder",
        name: "Placeholder Text",
        type: "TEXT",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        text: "[Image]",
        layoutMode: "HORIZONTAL",
        primaryAxisAlignItems: "CENTER",
        counterAxisAlignItems: "CENTER",
        style: {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: 400,
          fills: [
            {
              type: "SOLID",
              color: { r: 0.6, g: 0.6, b: 0.6 }, // Medium gray
            },
          ],
        },
      },
    ],
  };
}

/**
 * Create Social Icon Component (Generic)
 */
function createSocialIconComponent(platform) {
  const icons = {
    facebook: { name: "Facebook", symbol: "f" },
    instagram: { name: "Instagram", symbol: "📷" },
    twitter: { name: "Twitter", symbol: "𝕏" },
  };

  const icon = icons[platform] || icons.facebook;

  return {
    id: `component_icon_${platform}`,
    name: `Icon / ${icon.name}`,
    type: "COMPONENT",
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    children: [
      {
        id: `text_icon_${platform}`,
        name: "Symbol",
        type: "TEXT",
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        text: icon.symbol,
        style: {
          fontFamily: "Inter",
          fontSize: 24,
          fontWeight: 600,
          fills: [
            {
              type: "SOLID",
              color: { r: 0.2, g: 0.2, b: 0.2 },
            },
          ],
        },
      },
    ],
  };
}

/**
 * Create all component definitions
 */
function createComponentLibrary() {
  return [
    createButtonPrimaryComponent(),
    createButtonSecondaryComponent(),
    createArrowRightComponent(),
    createArrowLeftComponent(),
    createArrowUpComponent(),
    createArrowDownComponent(),
    createImagePlaceholderComponent(),
    createSocialIconComponent("facebook"),
    createSocialIconComponent("instagram"),
    createSocialIconComponent("twitter"),
  ];
}

// ============================================
// COMPONENT INSTANCES
// ============================================

/**
 * Create Button Instance (uses the primary or secondary component)
 */
function createButtonInstance(text, style = "primary", buttonId = null) {
  const componentId =
    style === "secondary"
      ? COMPONENTS.BUTTON_SECONDARY
      : COMPONENTS.BUTTON_PRIMARY;

  const labelTextId =
    style === "secondary"
      ? "text_button_secondary_label"
      : "text_button_primary_label";

  return {
    id:
      buttonId || `instance_button_${Math.random().toString(36).substr(2, 9)}`,
    name: `Button: ${text}`,
    type: "INSTANCE", // ← KEY: This is an INSTANCE
    x: 0,
    y: 0,
    width: 160,
    height: 48,
    mainComponent: componentId, // ← References the component
    overrides: {
      [labelTextId]: {
        text: text, // ← Override the text
      },
    },
  };
}

/**
 * Create Arrow Instance
 */
function createArrowInstance(direction = "right") {
  const componentIds = {
    right: COMPONENTS.ARROW_RIGHT,
    left: COMPONENTS.ARROW_LEFT,
    up: COMPONENTS.ARROW_UP,
    down: COMPONENTS.ARROW_DOWN,
  };

  const componentId = componentIds[direction] || componentIds.right;
  const names = {
    right: "Right Arrow",
    left: "Left Arrow",
    up: "Up Arrow",
    down: "Down Arrow",
  };

  return {
    id: `instance_arrow_${direction}_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    name: names[direction],
    type: "INSTANCE",
    x: 0,
    y: 0,
    width: 24,
    height: 24,
    mainComponent: componentId,
  };
}

/**
 * Create Image Instance
 */
function createImageInstance(src, alt = "") {
  return {
    id: `instance_image_${Math.random().toString(36).substr(2, 9)}`,
    name: `Image: ${alt || src}`,
    type: "INSTANCE",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    mainComponent: COMPONENTS.IMAGE_PLACEHOLDER,
    metadata: {
      source: src,
      alt: alt,
    },
  };
}

/**
 * Create Social Icon Instance
 */
function createSocialIconInstance(platform) {
  return {
    id: `instance_icon_${platform}_${Math.random().toString(36).substr(2, 9)}`,
    name: `Icon: ${platform}`,
    type: "INSTANCE",
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    mainComponent: `component_icon_${platform}`,
  };
}

/**
 * Detect arrow direction from text/symbol
 */
function detectArrowDirection(text) {
  const symbol = text.trim();
  if (symbol.includes("→") || symbol.includes("▶") || symbol.includes("❯")) {
    return "right";
  } else if (
    symbol.includes("←") ||
    symbol.includes("◀") ||
    symbol.includes("❮")
  ) {
    return "left";
  } else if (symbol.includes("↑") || symbol.includes("▲")) {
    return "up";
  } else if (symbol.includes("↓") || symbol.includes("▼")) {
    return "down";
  }
  return "right"; // default
}
```

### Section 2: Update convertElement() Function

Replace the button handling section (around line 751) with:

```javascript
// FIND THIS (lines ~751-760):
if (isButton) {
  // Buttons: use CSS sizes or reasonable defaults
  finalWidth = parseSize(elementStyles["width"]) || 160;
  finalHeight = parseSize(elementStyles["height"]) || 48;
  nodeType = "RECTANGLE";
}

// REPLACE WITH THIS:
if (isButton) {
  // Extract button text EARLY
  const directText = $element
    .contents()
    .filter((i, el) => el.type === "text")
    .text()
    .trim();
  const buttonText = directText || $element.text().trim() || "Button";

  // Create button INSTANCE instead of rectangle
  const btnStyle = classList.includes("btn-secondary")
    ? "secondary"
    : "primary";
  const buttonInstance = createButtonInstance(buttonText, btnStyle);

  // Will be processed as instance below
  finalWidth = buttonInstance.width;
  finalHeight = buttonInstance.height;
  nodeType = "INSTANCE"; // ← KEY: Changed type
}
```

### Section 3: Update Arrow Handling

Replace the createArrowNode() function (around line 431):

```javascript
// FIND THIS:
function createArrowNode(text, elementStyles) {
  const arrowSymbol = text.trim();
  let arrowText = "→";
  let arrowName = "Arrow";

  // ... (all the old arrow logic)

  const arrowNode = {
    id: `arrow_${Math.random().toString(36).substr(2, 9)}`,
    name: arrowName,
    type: "TEXT",
    // ...
  };

  return arrowNode;
}

// REPLACE WITH THIS:
function createArrowNode(text, elementStyles) {
  const direction = detectArrowDirection(text);
  return createArrowInstance(direction);
}
```

### Section 4: Add Image Detection

Add this function around line 700 (before convertElement):

```javascript
/**
 * Check if element is an image
 */
function isImage($element) {
  return $element.prop("tagName") === "IMG" || $element.is("img");
}

/**
 * Check if element contains images
 */
function hasImages($element) {
  return $element.find("img").length > 0;
}
```

### Section 5: Update convertElement() for Images

Add this in convertElement() (around line 700, before isButton check):

```javascript
// Add near the start of convertElement, after isButton/isCard checks:

const isImg = isImage($element);
const containsImages = !isImg && hasImages($element);

if (isImg) {
  const src = $element.attr("src") || "";
  const alt = $element.attr("alt") || "image";
  const imgInstance = createImageInstance(src, alt);

  // Return image instance
  return imgInstance;
}
```

### Section 6: Create Design System Frame

Update the main conversion function to add components:

```javascript
// In convertToFigmaDesign() function, around line 1050:

// Create the design system frame with all components
const componentLibrary = createComponentLibrary();

// Create Design System frame to hold all components
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

// Add design system frame FIRST in frames array
const frames = [designSystemFrame];

// Then add your regular page frames
frames.push(...convertedFrames);

const figmaDesign = {
  frames: frames,
  metadata: {
    generatedAt: new Date().toISOString(),
    components: Object.keys(COMPONENTS).length,
  },
};
```

---

## Testing Checklist

After implementing these changes:

```javascript
// Run this validation:
const issues = [];

// Check 1: Components are present
if (!data.frames[0].children?.some((c) => c.type === "COMPONENT")) {
  issues.push("No COMPONENT types found in Design System frame");
}

// Check 2: Instances reference components
data.frames.forEach((frame) => {
  frame.children?.forEach((child) => {
    if (child.type === "INSTANCE" && !child.mainComponent) {
      issues.push(`INSTANCE ${child.name} has no mainComponent`);
    }
  });
});

// Check 3: Button instances have text overrides
const buttonInstances = data.frames.flatMap((f) =>
  (f.children || []).filter(
    (c) => c.type === "INSTANCE" && c.mainComponent.includes("button")
  )
);
buttonInstances.forEach((btn) => {
  if (!btn.overrides || Object.keys(btn.overrides).length === 0) {
    issues.push(`Button ${btn.name} has no text override`);
  }
});

// Check 4: All required components exist
const componentIds = new Set(data.frames[0].children?.map((c) => c.id) || []);
Object.values(COMPONENTS).forEach((compId) => {
  if (!componentIds.has(compId)) {
    issues.push(`Missing component: ${compId}`);
  }
});

if (issues.length === 0) {
  console.log("✅ All component validations passed!");
} else {
  console.log("❌ Issues found:");
  issues.forEach((i) => console.log(`  - ${i}`));
}
```

---

## Benefits Summary

| Aspect            | Rectangle + Text                 | Components                    |
| ----------------- | -------------------------------- | ----------------------------- |
| **Button Text**   | Separate child node, no override | Text embedded, easily changed |
| **Arrows**        | Static TEXT nodes                | Reusable COMPONENT            |
| **Images**        | N/A                              | IMAGE placeholder instances   |
| **Update All**    | Manual per instance              | Change main component once    |
| **Figma UI**      | Shows as group                   | Shows as instance with badge  |
| **Design System** | None                             | Automatic library             |
| **Handoff**       | Design + code                    | Design only, devs change text |

Ready to implement? Let me know which section you want to add first!
