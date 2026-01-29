# Quick Start Guide - Sunny Bites Café

## 🚀 Getting Started

### Option 1: Open Directly in Browser

```bash
# Simply open the index.html file in your default browser
open index.html
```

### Option 2: Use Python Live Server

```bash
# Start a local web server
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

### Option 3: Use Node.js Live Server

```bash
# Install globally (if not already installed)
npm install -g live-server

# Run live server in project directory
live-server
```

## 📂 File Structure Quick Reference

```
📁 Sunny Bites Café Website
├── 📄 index.html                 ← START HERE
├── 📁 pages/
│   ├── 📄 menu.html              ← Browse menu
│   └── 📄 order.html             ← Place order
├── 📁 css/
│   ├── 📄 styles.css             ← Main styling
│   └── 📄 responsive.css         ← Mobile styling
├── 📁 js/
│   ├── 📄 library.js             ← Utility functions
│   ├── 📄 reviews.js             ← Review data
│   ├── 📄 menu-data.js           ← Menu items
│   ├── 📄 app.js                 ← Home page logic
│   ├── 📄 menu.js                ← Menu logic
│   └── 📄 order.js               ← Order logic
└── 📁 assets/
    └── 📁 images/               ← Image storage
```

## 🎨 Features at a Glance

### Home Page

✨ **Features:**

- Auto-rotating customer reviews (changes every 5 seconds)
- About the café section
- Location & contact information
- Beautiful hero image
- Quick navigation buttons

### Menu Page

✨ **Features:**

- 24 menu items with images
- 5 categories (Breakfast, Lunch, Beverages, Desserts)
- Category filtering buttons
- "Add to Order" buttons for each item
- Professional pricing display

### Order Page

✨ **Features:**

- Shopping cart display
- Remove/update item quantities
- Customer information form
- Address delivery fields
- Delivery method selection (Delivery/Pickup)
- Total calculation with tax
- Form validation with error messages
- Order confirmation (2-second popup)

## 💾 Data Persistence

Everything is saved automatically in your browser:

- 🛒 **Shopping Cart**: Items saved in localStorage
- 📋 **Order History**: All completed orders saved
- 📝 **Form Data**: Not saved (cleared after submission)

## ✅ Form Validation

The order form validates:

- ✓ Full name (required, 2+ characters)
- ✓ Email address (valid format)
- ✓ Phone number (US format: (555) 123-4567)
- ✓ Street address (required)
- ✓ City (required)
- ✓ State (2 characters, e.g., CA)
- ✓ ZIP code (12345 or 12345-6789 format)

## 🎯 Quick Tasks

### Add Item to Order

1. Go to Menu page
2. Click "Add to Order" button
3. See confirmation message

### Place an Order

1. Go to Order Online page
2. Review your items
3. Click "Calculate Total"
4. Fill in your information
5. Click "Place Order"
6. Confirm submission

### Change Menu Category

1. Go to Menu page
2. Click category buttons (All, Breakfast, Lunch, etc.)
3. View filtered items

### Browse Reviews

1. On Home page, scroll to reviews section
2. Reviews auto-rotate every 5 seconds
3. Use ← → buttons for manual control
4. Click dots to jump to specific review

## 🌐 Responsive Design

The website works perfectly on:

- 📱 **Mobile**: 360px and above
- 📱 **Tablet**: 768px and above
- 💻 **Desktop**: 1200px and above

## 🎨 Color Scheme

| Color           | Use                         |
| --------------- | --------------------------- |
| 🟠 Sandy Brown  | Primary buttons, highlights |
| 🟤 Saddle Brown | Text, secondary elements    |
| ✨ Gold         | Special accents             |

## 🔧 Customization Guide

### Change Colors

Edit `:root` variables in `css/styles.css`:

```css
:root {
  --primary-color: #f4a460; /* Change button color */
  --secondary-color: #8b7355; /* Change text color */
  --accent-color: #d4af37; /* Change accent color */
}
```

### Add Menu Items

Edit `js/menu-data.js`:

```javascript
{
    id: 25,
    name: "New Dish Name",
    category: "breakfast",
    description: "Description here",
    price: 9.99,
    image: "https://images.unsplash.com/..."
}
```

### Add Reviews

Edit `js/reviews.js`:

```javascript
{
    text: "Review text here",
    author: "Author Name",
    rating: "★★★★★"
}
```

### Change Carousel Speed

Edit `js/app.js`, find `startAutoplay()`:

```javascript
carouselAutoplay = setInterval(() => {
  nextReview();
}, 5000); // Change 5000 to desired milliseconds
```

## 🐛 Troubleshooting

### Images Not Loading

- Check internet connection (images are from Unsplash CDN)
- Try refreshing the page
- Clear browser cache

### Form Not Submitting

- Check all required fields are filled
- Ensure phone number follows format: (555) 123-4567
- Ensure ZIP code format is correct

### Cart Items Disappearing

- Browser localStorage may have storage limit
- Try clearing old orders from browser data
- Reduce number of items in cart

### Mobile Menu Not Working

- Try refreshing the page
- Check browser window width
- Clear browser cache

## 📱 Browser Compatibility

Tested and working on:

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Project Statistics

- **Total Files**: 13
- **HTML Pages**: 3
- **CSS Files**: 2
- **JavaScript Files**: 6
- **Menu Items**: 24
- **Customer Reviews**: 8
- **Total Lines of Code**: 3000+
- **Responsive Breakpoints**: 4
- **Form Fields**: 8
- **Categories**: 5

## 🎓 Learning Points

This project demonstrates:

- Semantic HTML5
- Advanced CSS (Grid, Flexbox, Variables)
- JavaScript DOM manipulation
- Form validation techniques
- LocalStorage API usage
- Responsive web design
- Carousel implementation
- Event handling
- Error handling
- Professional code organization

## 🚀 Deployment

Ready to deploy to:

- 🌍 GitHub Pages
- 🌍 Netlify
- 🌍 Vercel
- 🌍 Any static web hosting

No build tools required - just upload files as-is!

## 📝 Notes

- All external images come from Unsplash (free, high-quality)
- No backend/database required
- No API calls needed
- Pure HTML, CSS, JavaScript
- Works offline after first load
- No dependencies or npm packages required

## 🎯 Next Steps

1. **Open** the website in your browser
2. **Test** all three pages
3. **Try** adding items and placing an order
4. **Customize** colors and content as needed
5. **Deploy** to GitHub or hosting service
6. **Share** the link!

---

**Status**: Ready to Use ✅  
**Last Updated**: October 27, 2025  
**Created by**: MadRock Studios  
**Questions?** Check README.md or PROJECT_GUIDELINES.md for detailed documentation
