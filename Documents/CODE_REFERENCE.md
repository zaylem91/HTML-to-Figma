# Code Reference Guide - Sunny Bites Café

## 🎯 Key JavaScript Code Snippets

### 1. Alert System (library.js)

```javascript
// Display success alert (auto-hides after 2 seconds)
showAlert("Item added to your order!", "success", 2000);

// Display error alert
showAlert("Please fix the errors in your form", "error", 2000);

// Display warning alert
showAlert("Quantity must be at least 1", "warning", 2000);
```

### 2. Form Validation (library.js)

```javascript
// Validate email
validateEmail("user@example.com"); // returns true/false

// Validate phone (US format)
validatePhone("(555) 123-4567"); // returns true/false

// Validate ZIP code
validateZip("90210"); // returns true/false
validateZip("90210-1234"); // returns true/false
```

### 3. LocalStorage Usage (library.js)

```javascript
// Save data
const cartItems = [{ id: 1, name: "Item", price: 10 }];
saveToStorage("currentOrder", cartItems);

// Retrieve data
const cart = getFromStorage("currentOrder", []);

// Clear specific key
removeFromStorage("currentOrder");

// Clear all storage
clearAllStorage();
```

### 4. Carousel Implementation (app.js)

```javascript
// Initialize carousel
initializeCarousel();

// Navigate reviews
nextReview(); // Go to next review
previousReview(); // Go to previous review
goToReview(2); // Jump to specific review

// Control autoplay
startAutoplay(); // Start auto-rotation (every 5 seconds)
stopAutoplay(); // Stop auto-rotation
```

### 5. Add Item to Order (menu.js)

```javascript
// Called when "Add to Order" button is clicked
addToOrder(itemId, itemName, itemPrice);

// Example:
addToOrder(1, "Acai Power Bowl", 12.99);

// Shows alert and saves to localStorage
```

### 6. Order Management (order.js)

```javascript
// Load cart from storage
loadOrder();

// Display items
displayOrderItems();

// Update quantity
updateItemQuantity(index, newQuantity);

// Remove item
removeFromOrder(itemIndex);

// Calculate total
calculateTotal();
```

### 7. Form Validation (order.js)

```javascript
// Validate entire form
const validation = validateOrderForm();
// Returns: { isValid: boolean, errors: array }

if (validation.isValid) {
  // Process order
} else {
  // Show errors
  validation.errors.forEach((error) => console.log(error));
}
```

### 8. Handle Order Submission (order.js)

```javascript
// Automatically called on form submit
function handleOrderSubmit(e) {
  e.preventDefault();

  // Validates form
  // Saves to order history
  // Shows 2-second confirmation
  // Clears form
  // Resets cart
}
```

---

## 📊 Data Structures

### Menu Item Structure

```javascript
{
    id: 1,
    name: "Acai Power Bowl",
    category: "breakfast",
    description: "Organic acai base with granola, berries, coconut, and honey drizzle",
    price: 12.99,
    image: "https://images.unsplash.com/..."
}
```

### Order Item Structure

```javascript
{
    id: 1,
    name: "Acai Power Bowl",
    price: 12.99,
    quantity: 2
}
```

### Customer Order Structure

```javascript
{
    items: [
        { id: 1, name: "Item", price: 12.99, quantity: 2 },
        { id: 2, name: "Item", price: 8.99, quantity: 1 }
    ],
    customer: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "(555) 123-4567",
        address: {
            street: "123 Main St",
            city: "City",
            state: "CA",
            zip: "90210"
        },
        specialInstructions: "No onions please",
        deliveryMethod: "delivery" // or "pickup"
    },
    orderDate: "2024-10-27T12:30:00Z",
    subtotal: 22.97,
    tax: 2.297,
    deliveryFee: 5.00,
    total: 30.267
}
```

### Review Structure

```javascript
{
    text: "Absolutely love Sunny Bites! The smoothie bowls are incredibly fresh...",
    author: "Sarah Mitchell",
    rating: "★★★★★"
}
```

---

## 🎨 CSS Custom Properties (Variables)

Located in `css/styles.css`:

```css
:root {
  --primary-color: #f4a460; /* Sandy Brown - Buttons */
  --secondary-color: #8b7355; /* Saddle Brown - Text */
  --accent-color: #d4af37; /* Gold - Accents */
  --text-dark: #333333; /* Main text */
  --text-light: #666666; /* Secondary text */
  --background-light: #fef8f3; /* Warm White background */
  --background-white: #ffffff; /* Pure white */
  --border-color: #e0d5c7; /* Borders */
  --success-color: #4caf50; /* Success alerts */
  --error-color: #f44336; /* Error alerts */
  --warning-color: #ff9800; /* Warning alerts */

  --transition-speed: 0.3s;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

### How to Customize Colors

```css
/* Change primary button color */
:root {
  --primary-color: #your-color;
}

/* All primary buttons will automatically update */
.btn-primary {
  background-color: var(--primary-color);
}
```

---

## 🔄 Function Flow Diagrams

### Add to Order Flow

```
User clicks "Add to Order"
    ↓
addToOrder(id, name, price) called
    ↓
Load currentOrder from localStorage
    ↓
Check if item already exists
    ├─ YES: Increase quantity
    └─ NO: Add new item
    ↓
Save updated order to localStorage
    ↓
Show confirmation alert
```

### Place Order Flow

```
User submits form
    ↓
handleOrderSubmit(e) called
    ↓
Prevent default form submission
    ↓
validateOrderForm()
    ├─ NOT VALID: Show errors, return
    └─ VALID: Continue
    ↓
Gather order data
    ↓
Load orderHistory from localStorage
    ↓
Add new order to history
    ↓
Save orderHistory back to localStorage
    ↓
Show confirmation alert (2 seconds)
    ↓
Clear form
    ↓
Reset order cart
    ↓
Reset total display
```

### Form Validation Flow

```
Form submit
    ↓
validateOrderForm()
    ↓
Check each field:
    ├─ fullName: required, min 2 chars
    ├─ email: required, valid format
    ├─ phone: required, valid format
    ├─ street: required
    ├─ city: required
    ├─ state: required, 2 chars
    ├─ zip: required, valid format
    └─ specialInstructions: optional
    ↓
For each error:
    ├─ Add error text to errors array
    ├─ Mark field with .error class
    └─ Display error message
    ↓
Return { isValid: boolean, errors: array }
```

### Carousel Auto-play Flow

```
Page loads
    ↓
initializeCarousel()
    ↓
Create review cards from reviews array
    ↓
Create dot indicators
    ↓
Setup click handlers
    ↓
startAutoplay()
    ↓
setInterval every 5000ms
    ↓
nextReview() called
    ↓
updateCarousel()
    ↓
User hovers on carousel → stopAutoplay()
    ↓
User leaves carousel → startAutoplay()
```

---

## 📱 Responsive Breakpoints in CSS

```css
/* Mobile (default styles) */
/* Applies to 360px and above */

/* Tablet (768px and below) */
@media (max-width: 768px) {
  /* Tablet-specific styles */
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
  /* Mobile-specific styles */
}

/* Large Desktop (1200px and above) */
@media (min-width: 1200px) {
  /* Desktop-specific styles */
}
```

---

## 🧪 Common Testing Scenarios

### Test Adding Item

1. Open menu page
2. Click "Add to Order" on any item
3. See "Item added to your order!" message
4. Go to Order page
5. Verify item appears in cart

### Test Form Validation

1. Go to Order page
2. Fill only name field
3. Click "Place Order"
4. See "Email address is required" error
5. Verify form doesn't submit

### Test Phone Validation

1. Go to Order page
2. Enter "555-123-4567" in phone
3. Should accept (matches US format)
4. Enter "not-a-phone"
5. Should show error

### Test Cart Persistence

1. Go to Menu page
2. Add item to order
3. Refresh page
4. Go to Order page
5. Verify item still in cart

### Test Mobile Menu

1. Open page on mobile (< 768px)
2. Click hamburger menu
3. See navigation items
4. Click a link
5. Menu closes

---

## 🐛 Debugging Tips

### Check Console

```javascript
// View cart contents
console.log(getFromStorage("currentOrder", []));

// View order history
console.log(getFromStorage("orderHistory", []));

// Check for errors
// Open DevTools (F12 or Ctrl+Shift+I)
// Check Console tab for any errors
```

### Test Validation

```javascript
// Test email validation
validateEmail("test@example.com"); // true
validateEmail("invalid-email"); // false

// Test phone validation
validatePhone("(555) 123-4567"); // true
validatePhone("555-123-4567"); // true
validatePhone("invalid"); // false

// Test ZIP validation
validateZip("90210"); // true
validateZip("90210-1234"); // true
validateZip("902"); // false
```

### Manual Alert Testing

```javascript
// Test alert types
showAlert("Success!", "success");
showAlert("Error!", "error");
showAlert("Warning!", "warning");

// Test duration
showAlert("5 second alert", "success", 5000);
```

---

## 📚 Files Quick Reference

| File           | Purpose     | Key Functions                            |
| -------------- | ----------- | ---------------------------------------- |
| `library.js`   | Utilities   | showAlert, validate*, format*, storage\* |
| `reviews.js`   | Data        | reviews array                            |
| `menu-data.js` | Data        | menuItems array                          |
| `app.js`       | Home logic  | carousel, autoplay, navigation           |
| `menu.js`      | Menu logic  | filter, display, addToOrder              |
| `order.js`     | Order logic | validate, calculate, submit              |

---

## 🚀 Useful Commands

### View in Browser

```bash
# macOS - Open index.html
open index.html

# Linux/Windows - Open with default browser
firefox index.html
chrome index.html
```

### Start Local Server

```bash
# Python 3
python3 -m http.server 8000

# Node.js (requires npm)
npm install -g live-server
live-server
```

### Browser DevTools

```
Windows/Linux: F12 or Ctrl+Shift+I
macOS: Cmd+Option+I or Cmd+Shift+C
```

---

## � SEO & Structured Data

### 1. External Social Media Meta Tags (meta-\*.js)

```javascript
// Home Page Social Meta - meta-home.js
function initializeHomeSocialMeta() {
  const metaTags = [
    {
      property: "og:title",
      content: "Sunny Bites Café - Healthy Organic Meals in Toronto",
    },
    { property: "og:description", content: "Fresh, healthy, organic meals..." },
    { property: "og:type", content: "restaurant" },
    { property: "og:url", content: "https://sunnybites.ca" },
    {
      property: "og:image",
      content: "https://sunnybites.ca/assets/images/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    // ... more tags
  ];

  metaTags.forEach((tag) => {
    const meta = document.createElement("meta");
    if (tag.property) meta.setAttribute("property", tag.property);
    if (tag.name) meta.setAttribute("name", tag.name);
    meta.setAttribute("content", tag.content);
    document.head.appendChild(meta);
  });
}

// Auto-initializes on page load
// Used in: meta-home.js, meta-menu.js, meta-order.js
```

**Files:**

- `js/meta-home.js` - Home page Open Graph & Twitter Cards
- `js/meta-menu.js` - Menu page social meta tags
- `js/meta-order.js` - Order page social meta tags

### 2. JSON-LD Structured Data (seo-\*.js)

```javascript
// Organization Schema - seo-home.js
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Sunny Bites Café",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Wellness Street",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5H 2N2",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "43.6532",
    longitude: "-79.3832",
  },
  telephone: "+1-416-555-1234",
  servesCuisine: ["Organic", "Healthy", "Vegetarian", "Vegan"],
  priceRange: "$$",
};

// Menu Schema - seo-menu.js
const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Sunny Bites Café Menu",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Breakfast",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "Acai Power Bowl",
          description: "Organic acai base with granola...",
          offers: {
            "@type": "Offer",
            price: "12.99",
            priceCurrency: "CAD",
          },
        },
      ],
    },
  ],
};

// Breadcrumb Schema - All pages
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sunnybites.ca",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Menu",
      item: "https://sunnybites.ca/menu.html",
    },
  ],
};

// Dynamic Injection Function
function initializeHomeSEO() {
  const schemas = [
    organizationSchema,
    localBusinessSchema,
    aggregateRatingSchema,
    websiteSchema,
    breadcrumbSchema,
  ];

  schemas.forEach((schema, index) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = `seo-schema-${index}`;
    document.head.appendChild(script);
  });

  console.log("Home page SEO structured data initialized");
}
```

**Files:**

- `js/seo-home.js` - Organization, LocalBusiness, Rating, Website, Breadcrumb schemas
- `js/seo-menu.js` - Menu, MenuItem sections with prices
- `js/seo-order.js` - Service, Delivery, Order schemas

**Schema Types Used:**

- **Organization** - Business information
- **LocalBusiness** - Location, hours, payment methods
- **Restaurant** - Cuisine types, price range, menu URL
- **AggregateRating** - Customer ratings (4.8/5, 156 reviews)
- **Menu/MenuSection/MenuItem** - Complete menu structure
- **Service** - Online ordering service
- **FoodEstablishment** - Delivery methods
- **WebPage** - Page metadata
- **BreadcrumbList** - Navigation paths

### 3. Provincial Tax System (order.js)

```javascript
// Dynamic Canadian Provincial Tax Rates
const PROVINCIAL_TAX_RATES = {
  AB: { rate: 0.05, name: "GST" },
  BC: { rate: 0.12, name: "GST + PST" },
  MB: { rate: 0.12, name: "GST + PST" },
  NB: { rate: 0.15, name: "HST" },
  NL: { rate: 0.15, name: "HST" },
  NS: { rate: 0.15, name: "HST" },
  ON: { rate: 0.13, name: "HST" },
  PE: { rate: 0.15, name: "HST" },
  QC: { rate: 0.14975, name: "GST + QST" },
  SK: { rate: 0.11, name: "GST + PST" },
  NT: { rate: 0.05, name: "GST" },
  NU: { rate: 0.05, name: "GST" },
  YT: { rate: 0.05, name: "GST" },
};

// Dynamic Tax Calculation
function updateOrderSummary() {
  const provinceSelect = document.getElementById("province");
  const selectedProvince = provinceSelect?.value || "ON";
  const taxInfo = PROVINCIAL_TAX_RATES[selectedProvince];

  const tax = subtotal * taxInfo.rate;
  const taxPercentage = (taxInfo.rate * 100).toFixed(2).replace(/\.?0+$/, "");

  // Update tax label dynamically
  document.getElementById(
    "taxLabel"
  ).textContent = `${taxInfo.name} (${taxPercentage}%):`;
  document.getElementById("tax").textContent = formatCurrency(tax);
}

// Province change listener
provinceSelect.addEventListener("change", updateOrderSummary);
```

### 4. Input Auto-Formatting (order.js)

```javascript
// Phone Number Formatting: 123-123-1234
function formatPhoneInput(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ""); // Remove non-digits

  if (value.length > 10) value = value.slice(0, 10);

  let formattedValue = "";
  if (value.length > 0) formattedValue = value.slice(0, 3);
  if (value.length > 3) formattedValue += "-" + value.slice(3, 6);
  if (value.length > 6) formattedValue += "-" + value.slice(6, 10);

  input.value = formattedValue;
}

// Postal Code Formatting: A1B 2C3
function formatPostalCodeInput(event) {
  const input = event.target;
  let value = input.value.replace(/\s/g, "").toUpperCase();

  if (value.length > 6) value = value.slice(0, 6);

  let formattedValue = "";
  if (value.length > 0) formattedValue = value.slice(0, 3);
  if (value.length > 3) formattedValue += " " + value.slice(3, 6);

  input.value = formattedValue;
}

// Attach to inputs
phoneInput.addEventListener("input", formatPhoneInput);
postalCodeInput.addEventListener("input", formatPostalCodeInput);
```

---

## �📖 Documentation Structure

- **README.md**: Complete project overview
- **PROJECT_GUIDELINES.md**: Technical requirements
- **QUICK_START.md**: Getting started guide
- **TESTING_CHECKLIST.md**: Testing procedures
- **CODE_REFERENCE.md**: This file - code snippets
- **SEO_IMPLEMENTATION.md**: SEO and structured data guide

---

## ✨ Pro Tips

1. **Customize Colors Easily**

   - All colors are CSS variables
   - Change one variable to theme entire site

2. **Add New Menu Items**

   - Just add to `menuItems` array in `menu-data.js`
   - Everything updates automatically

3. **Add Customer Reviews**

   - Add to `reviews` array in `reviews.js`
   - Carousel will include automatically

4. **Debug Form Issues**

   - Open DevTools Console
   - Check validation errors
   - View field error messages

5. **Test on Mobile**

   - Use browser DevTools (Ctrl+Shift+I)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test all breakpoints

6. **Verify SEO Implementation**

   - Open DevTools Console - check for SEO initialization messages
   - View Page Source - look for injected JSON-LD scripts
   - Use Google Rich Results Test
   - Test social sharing with Facebook/Twitter debuggers

7. **Performance Tips**
   - Images load from CDN (no local storage needed)
   - LocalStorage is instant
   - No database queries (all client-side)

---

**Last Updated**: October 27, 2025  
**Created by**: MadRock Studios  
**Status**: Ready for Reference  
**Version**: 1.0
