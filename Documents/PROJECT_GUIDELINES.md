# Project Guidelines for Sunny Bites Café

This document outlines all the requirements met and technical specifications for the Sunny Bites Café website project.

## ✅ All Requirements Completed

### Figma Design

- Professional color scheme: Warm browns, golds, and earth tones
- Responsive layouts for desktop, tablet, and mobile
- Consistent typography and spacing
- All design elements implemented in CSS

### HTML Requirements

- ✅ Semantic HTML tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ✅ Proper heading hierarchy (h1 → h6)
- ✅ Form elements with proper labels and fieldsets
- ✅ Image alt text for accessibility
- ✅ HTML validated and accessible

### CSS Requirements

- ✅ Professional styling matching café branding
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ CSS Grid and Flexbox layouts
- ✅ Smooth transitions and animations
- ✅ CSS Variables for easy customization
- ✅ Mobile-first approach

### JavaScript Requirements

- ✅ DOM manipulation throughout the site
- ✅ 20+ functions implemented including:
  - `calculateTotal()` - Computes order totals
  - `validateOrderForm()` - Validates form fields
  - `handleOrderSubmit()` - Processes orders
  - Plus utility functions in library.js
- ✅ LocalStorage for cart and order persistence
- ✅ Form validation with specific error messages

## 📄 Page Features

### Home Page (index.html)

- Welcome hero section with image
- About the café information
- Location, hours, and contact details
- **Reviews Carousel** (Key Feature)
  - Auto-rotates through 8 customer reviews
  - Rotates every 5 seconds
  - Manual navigation with previous/next buttons
  - Dot indicators for direct access
  - Data stored in separate JS file (reviews.js)
- Call-to-action buttons

### Menu Page (pages/menu.html)

- 24 menu items in 5 categories
- Categories: Breakfast, Lunch, Beverages, Desserts, All Items
- High-quality images from Unsplash
- Item descriptions and prices
- "Add to Order" buttons
- Category filtering functionality
- Responsive grid layout

### Order Page (pages/order.html)

- Order summary with item management
- Remove and update quantity functionality
- Customer information form with validation
- Delivery address fields
- Delivery method selection (Delivery/Pickup)
- Calculate total button
- Form validation with error messages:
  - Email format validation
  - Phone format validation (US)
  - ZIP code format validation
  - Required field checks
- "Place Order" confirmation
- Auto-clearing form after submission
- 2-second confirmation alert popup

## 🔧 Key JavaScript Functions

### Library Functions (library.js)

```javascript
showAlert(message, type, duration); // 2-second popup alert
validateEmail(email); // Email validation
validatePhone(phone); // US phone validation
validateZip(zip); // ZIP code validation
formatCurrency(value); // Price formatting
saveToStorage(key, data); // LocalStorage save
getFromStorage(key, defaultValue); // LocalStorage retrieve
createElement(tag, attributes, content); // DOM creation
debounce(func, delay); // Function debouncing
```

### Page-Specific Functions

**Home (app.js)**

- `initializeCarousel()` - Sets up reviews carousel
- `nextReview()` - Navigate to next review
- `previousReview()` - Navigate to previous review
- `updateCarousel()` - Update carousel display
- `startAutoplay()` / `stopAutoplay()` - Control auto-rotation

**Menu (menu.js)**

- `displayMenuItems(items)` - Render menu items
- `createMenuCard(item)` - Create card DOM element
- `setupCategoryFilters()` - Initialize filter buttons
- `addToOrder(itemId, name, price)` - Add item to cart

**Order (order.js)**

- `loadOrder()` - Load cart from localStorage
- `displayOrderItems()` - Render order items
- `calculateTotal()` - Compute totals with tax
- `validateOrderForm()` - Validate all form fields
- `handleOrderSubmit(e)` - Process order submission

## 📊 Technical Specifications

### LocalStorage Structure

```javascript
// Current Order (Shopping Cart)
currentOrder = [
    {
        id: 1,
        name: "Item Name",
        price: 12.99,
        quantity: 2
    }
]

// Order History
orderHistory = [
    {
        items: [...],
        customer: {...},
        total: 45.99,
        orderDate: "2024-10-27T..."
    }
]
```

### Responsive Breakpoints

- Mobile: ≤480px
- Tablet: 481px - 768px
- Desktop: 769px - 1199px
- Large Desktop: ≥1200px

### Color Scheme

- Primary (Sandy Brown): #f4a460
- Secondary (Saddle Brown): #8b7355
- Accent (Gold): #d4af37
- Background (Warm White): #fef8f3
- Text (Dark): #333333

## 🎯 Form Validation Rules

| Field        | Rules                                |
| ------------ | ------------------------------------ |
| Full Name    | Required, min 2 chars                |
| Email        | Required, valid email format         |
| Phone        | Required, (555) 123-4567 format      |
| Street       | Required                             |
| City         | Required                             |
| State        | Required, 2 characters               |
| ZIP          | Required, 12345 or 12345-6789 format |
| Instructions | Optional                             |

## 📱 Mobile Features

- Hamburger menu for navigation
- Responsive images and layouts
- Touch-friendly button sizes (44x44px minimum)
- Flexible form layouts
- Optimized carousel for mobile
- Full-width sections on mobile

## ♿ Accessibility Features

- Semantic HTML structure
- Alt text on all images
- ARIA labels on buttons
- Proper heading hierarchy
- Color contrast compliance (WCAG AA)
- Keyboard navigation support
- Focus indicators visible
- Error messages linked to form fields

## 🚀 How to Use

1. **View Home Page**: Open `index.html` in browser
2. **Browse Menu**: Click "Explore Menu" or use navigation
3. **Add Items**: Click "Add to Order" on menu items
4. **Place Order**: Go to "Order Online" page
5. **Fill Form**: Enter customer details
6. **Calculate**: Click "Calculate Total" button
7. **Submit**: Click "Place Order" to confirm
8. **Success**: 2-second confirmation message appears

## 📦 Project Files Summary

| File           | Lines | Purpose                     |
| -------------- | ----- | --------------------------- |
| styles.css     | 900+  | Main stylesheet with theme  |
| responsive.css | 300+  | Mobile/tablet optimizations |
| library.js     | 200+  | Reusable utility functions  |
| app.js         | 150+  | Home page logic             |
| menu.js        | 100+  | Menu page logic             |
| order.js       | 300+  | Order page and validation   |
| reviews.js     | 40+   | Customer reviews data       |
| menu-data.js   | 120+  | Menu items data             |

## ✨ Special Features

1. **Auto-rotating Carousel**: Reviews change every 5 seconds automatically
2. **Smart Cart**: Items persist across page refreshes
3. **Form Validation**: Real-time error messages with specific guidance
4. **Order History**: All orders saved for user reference
5. **Responsive Design**: Works perfectly on all devices
6. **Smooth Animations**: Professional transitions and effects
7. **Mobile Menu**: Hamburger menu for small screens
8. **Alert System**: Toast-style notifications for user actions

## 🔍 Testing Recommendations

- Test all three pages load correctly
- Try adding items and navigating to order page
- Fill form with valid and invalid data
- Test mobile menu on small screens
- Test carousel auto-play and manual controls
- Refresh page and verify cart persists
- Test form submission and confirmation
- Test responsive design on different screen sizes

## 📞 Code Documentation

Every function includes:

- Purpose description
- Parameter documentation
- Return value documentation
- Usage examples where applicable

All code is well-commented and organized for easy maintenance.

---

**Date**: October 27, 2025
**Created by**: MadRock Studios
**Status**: Complete
