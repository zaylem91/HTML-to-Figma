/**
 * Browser Console Script: Extract Page to JSON for Figma
 * 
 * USAGE:
 * 1. Open any website in your browser
 * 2. Open DevTools Console (F12 or Cmd+Option+I)
 * 3. Paste this entire script and press Enter
 * 4. Copy the generated JSON
 * 5. Paste into the Figma plugin
 * 
 * This script captures the visual structure of the page with accurate:
 * - Positions and dimensions
 * - Colors and backgrounds
 * - Text content and styles
 * - Borders, shadows, and effects
 * - Layout properties (flexbox, grid)
 */

(function() {
  console.log('🎨 Starting page extraction for Figma...');
  
  /**
   * Get computed styles for an element with all relevant CSS properties
   */
  function getRelevantStyles(element, computed) {
    const styles = {};
    
    // Layout
    styles.display = computed.display;
    styles.position = computed.position;
    styles.flexDirection = computed.flexDirection;
    styles.justifyContent = computed.justifyContent;
    styles.alignItems = computed.alignItems;
    styles.gap = computed.gap;
    styles.gridGap = computed.gridGap;
    
    // Colors
    styles.color = computed.color;
    styles.backgroundColor = computed.backgroundColor;
    
    // Typography
    styles.fontFamily = computed.fontFamily;
    styles.fontSize = computed.fontSize;
    styles.fontWeight = computed.fontWeight;
    styles.lineHeight = computed.lineHeight;
    styles.letterSpacing = computed.letterSpacing;
    styles.textAlign = computed.textAlign;
    styles.textDecoration = computed.textDecoration;
    styles.textTransform = computed.textTransform;
    styles.textShadow = computed.textShadow;
    styles.whiteSpace = computed.whiteSpace;
    
    // Borders and radius
    styles.borderWidth = computed.borderWidth;
    styles.borderColor = computed.borderColor;
    styles.borderStyle = computed.borderStyle;
    styles.borderRadius = computed.borderRadius;
    
    // Effects
    styles.boxShadow = computed.boxShadow;
    styles.opacity = computed.opacity;
    styles.visibility = computed.visibility;
    
    // Spacing
    styles.padding = computed.padding;
    styles.margin = computed.margin;
    styles.paddingTop = computed.paddingTop;
    styles.paddingRight = computed.paddingRight;
    styles.paddingBottom = computed.paddingBottom;
    styles.paddingLeft = computed.paddingLeft;
    
    // Overflow
    styles.overflow = computed.overflow;
    styles.overflowX = computed.overflowX;
    styles.overflowY = computed.overflowY;
    
    // Z-index
    styles.zIndex = computed.zIndex;
    
    // Object fit for images
    if (element.tagName === 'IMG') {
      styles.objectFit = computed.objectFit;
    }
    
    // Remove default/inherited values that don't affect layout
    Object.keys(styles).forEach(key => {
      if (styles[key] === 'none' || 
          styles[key] === 'normal' || 
          styles[key] === 'auto' ||
          styles[key] === 'static' ||
          styles[key] === 'rgba(0, 0, 0, 0)' ||
          styles[key] === '') {
        delete styles[key];
      }
    });
    
    return styles;
  }
  
  /**
   * Check if element should be captured
   */
  function shouldCapture(element) {
    if (!element || !(element instanceof Element)) return false;
    
    // Skip script, style, noscript tags
    const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK', 'HEAD'];
    if (skipTags.includes(element.tagName)) return false;
    
    // Skip hidden elements
    const computed = window.getComputedStyle(element);
    if (computed.display === 'none' || 
        computed.visibility === 'hidden' ||
        computed.opacity === '0') {
      return false;
    }
    
    // Skip elements with no size
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Get text content from element (excluding children)
   */
  function getDirectTextContent(element) {
    let text = '';
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      }
    }
    return text.trim();
  }
  
  /**
   * Convert DOM element to JSON node
   */
  function elementToJson(element, depth = 0, parentRect = null) {
    if (!shouldCapture(element) || depth > 50) return null;
    
    const rect = element.getBoundingClientRect();
    const computed = window.getComputedStyle(element);
    const styles = getRelevantStyles(element, computed);
    
    // Determine node type
    let nodeType = element.tagName.toLowerCase();
    
    // Handle text nodes specially
    const directText = getDirectTextContent(element);
    const hasOnlyText = element.childNodes.length === 1 && 
                        element.childNodes[0].nodeType === Node.TEXT_NODE;
    
    if (hasOnlyText && directText) {
      nodeType = 'text';
    }
    
    // Create node object
    const node = {
      type: nodeType,
      id: element.id || undefined,
      classes: element.className ? element.className.split(' ').filter(Boolean) : undefined,
      styles: styles,
      position: {
        absolute: {
          x: parentRect ? rect.left - parentRect.left : rect.left,
          y: parentRect ? rect.top - parentRect.top : rect.top,
          width: rect.width,
          height: rect.height
        }
      }
    };
    
    // Add text content
    if (nodeType === 'text' || hasOnlyText) {
      node.text = directText || element.textContent?.trim();
    }
    
    // Add special attributes
    if (element.tagName === 'IMG') {
      node.alt = element.alt;
      node.src = element.src;
    }
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      node.placeholder = element.placeholder;
      node.value = element.value;
      node.styles.type = element.type;
    }
    
    if (element.tagName === 'A') {
      node.href = element.href;
    }
    
    // Process children
    const children = [];
    for (let child of element.children) {
      const childNode = elementToJson(child, depth + 1, rect);
      if (childNode) {
        children.push(childNode);
      }
    }
    
    // Add text-only children as text nodes
    for (let childNode of element.childNodes) {
      if (childNode.nodeType === Node.TEXT_NODE) {
        const text = childNode.textContent?.trim();
        if (text && text.length > 0 && !hasOnlyText) {
          children.push({
            type: 'text',
            text: text,
            styles: {
              fontFamily: computed.fontFamily,
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              color: computed.color
            },
            position: {
              absolute: {
                width: rect.width,
                height: parseFloat(computed.fontSize) || 16
              }
            }
          });
        }
      }
    }
    
    if (children.length > 0) {
      node.children = children;
    }
    
    return node;
  }
  
  /**
   * Extract the entire page or a specific element
   */
  function extractPage(selector = 'body') {
    const rootElement = document.querySelector(selector);
    if (!rootElement) {
      console.error(`❌ Element not found: ${selector}`);
      return null;
    }
    
    console.log(`📦 Extracting: ${selector}`);
    const json = elementToJson(rootElement);
    
    if (!json) {
      console.error('❌ Failed to extract page structure');
      return null;
    }
    
    // Add metadata
    const result = {
      type: 'CANVAS',
      name: document.title || 'Extracted Page',
      url: window.location.href,
      extractedAt: new Date().toISOString(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      children: [json]
    };
    
    return result;
  }
  
  // Extract the page
  const pageJson = extractPage('body');
  
  if (pageJson) {
    // Copy to clipboard
    const jsonString = JSON.stringify(pageJson, null, 2);
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonString).then(() => {
        console.log('✅ Page extracted successfully!');
        console.log('📋 JSON copied to clipboard!');
        console.log('📊 Stats:', {
          totalNodes: countNodes(pageJson),
          url: pageJson.url,
          viewport: pageJson.viewport
        });
        console.log('');
        console.log('🎨 Now paste this into the Figma plugin!');
      }).catch(err => {
        console.log('✅ Page extracted successfully!');
        console.log('⚠️ Could not copy to clipboard automatically.');
        console.log('📋 Copy the JSON below:');
        console.log(jsonString);
      });
    } else {
      console.log('✅ Page extracted successfully!');
      console.log('📋 Copy the JSON below:');
      console.log(jsonString);
    }
    
    // Store in global variable for easy access
    window.figmaJson = pageJson;
    console.log('💾 Also saved to: window.figmaJson');
  }
  
  function countNodes(node) {
    let count = 1;
    if (node.children) {
      for (let child of node.children) {
        count += countNodes(child);
      }
    }
    return count;
  }
  
  console.log('');
  console.log('💡 Tip: To extract a specific element, run:');
  console.log('   extractPage("#my-element-id")');
  
  // Export function for custom extractions
  window.extractPage = extractPage;
  
})();
