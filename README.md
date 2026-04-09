# Luxe Café - Premium Cat Café Website

![Luxe Café Banner](https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&h=400&fit=crop)

##  About

Luxe Café is a modern, feature-rich website for a premium hybrid cat café. This website showcases our unique blend of specialty coffee, gourmet food, and an interactive cat lounge experience.

##  Features

### Core Features
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Hero Carousel** - Eye-catching image slider with smooth transitions
- **Interactive Navigation** - Auto-hide navbar with smooth scrolling
- **Back to Top Button** - Easy navigation for long pages

###  Menu & Ordering
- **Dynamic Menu Display** - Categorized menu with filter functionality (Coffee, Food, Dessert)
- **Menu Carousel** - Horizontal scrolling menu cards with smooth navigation
- **Online Ordering System** - Complete food ordering with cart functionality
- **Order Type Selection** - Choose between Dine-in or Takeaway
- **Real-time Price Calculator** - Automatic calculation with service charge, packaging fee, and tax
- **WhatsApp Integration** - Orders sent directly via WhatsApp

###  Cat Café Experience
- **Meet Our Cats Section** - Detailed profiles of 8 resident cats
- **Cat Gender Filter** - Filter cats by Male/Female with carousel navigation
- **Expandable Cat Details** - Fun facts, personality traits, and best visiting times
- **Cat Lounge Information** - Entry fees, capacity, and operating hours

###  VIP Meeting Room
- **Dynamic Pricing System** - Real-time price calculation based on:
  - Duration (hourly/full-day)
  - Number of attendees
  - Additional facilities (Projector, Video Conference, Catering)
  - Weekend surcharge
  - Full-day discounts
- **Booking Form** - Complete reservation system

###  Loyalty Program
- **Phone Number Tracking** - No password required, track by phone only
- **Points System** - Earn 1 point for every Rp 10,000 spent
- **Welcome Bonus** - 50 points for new members
- **Member Tiers** - Bronze, Silver, Gold with escalating benefits
- **Order History** - View past purchases and points earned
- **Rewards Catalog** - Redeem points for free items and discounts

###  Additional Features
- **Testimonials** - Customer reviews with ratings
- **Gallery** - Lightbox image gallery with zoom functionality
- **Contact Form** - Integrated contact section
- **Facilities Showcase** - Highlight VIP rooms, cat lounge, scenic views, WiFi
- **Social Media Integration** - Connected Instagram, Facebook, Twitter links

##  Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with:
  - CSS Grid & Flexbox layouts
  - CSS Variables for theming
  - Smooth animations and transitions
  - Responsive design with media queries
- **JavaScript (ES6+)** - Interactive features:
  - Carousel functionality
  - Filter systems
  - Form validation
  - Real-time calculations
  - localStorage for data persistence
- **Font Awesome** - Icon library
- **Unsplash API** - High-quality placeholder images

##  Project Structure

uxe-cafe/
│
├── index.html          # Main HTML file
├── style.css          # Main stylesheet
├── script.js          # Main JavaScript file
├── README.md          # Project documentation
└── .gitignore         # Git ignore file

##  Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git (for version control)

### Customization

#### Update Cafe Information
- **Name & Branding**: Search and replace "Luxe Café" with your cafe name
- **Phone Number**: Update WhatsApp number in script.js and HTML
- **Social Media Links**: Update footer social media URLs
- **Images**: Replace Unsplash URLs with your own cafe photos

#### Pricing Configuration
Edit these values in `script.js`:

```javascript
// VIP Room Pricing
const VIP_PRICING = {
    baseRate: 200000,        // Base rate per hour
    // ... other settings
};

// Order System
const ORDER_CONFIG = {
    serviceCharge: 0.10,     // 10% for dine-in
    tax: 0.11,              // 11% tax
    packagingFee: 5000      // Packaging fee for takeaway
};

// Loyalty System
function calculatePoints(amount) {
    return Math.floor(amount / 10000); // Rp 10,000 = 1 point
}
```

#### Theme Colors
Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #b8860b;      /* Gold */
    --primary-dark: #8b6914;       /* Darker gold */
    --primary-light: #daa520;      /* Lighter gold */
    --secondary-color: #2c2c2c;    /* Dark gray */
    /* ... */
}
```

##  Data Storage

This website uses **localStorage** for:
- Loyalty program member data
- Order history tracking
- Shopping cart persistence

**Note**: Data is stored locally in the browser. For production, consider implementing a backend database.

##  Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: Below 768px

##  Security Features

- Input validation for all forms
- Phone number normalization
- XSS prevention in user inputs
- Secure external links (`rel="noopener noreferrer"`)

##  Design Features

- **Color Scheme**: Warm gold and cream tones for luxury feel
- **Typography**: Modern sans-serif fonts
- **Animations**: Smooth transitions and hover effects
- **Icons**: Font Awesome icon library
- **Images**: High-quality photos from Unsplash

##  Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

##  Known Issues

- None currently reported

##  Future Enhancements

- [ ] Backend integration for real order processing
- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] Admin dashboard for order management
- [ ] Email notifications
- [ ] SMS verification for loyalty program
- [ ] Multi-language support (EN/ID)
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA) features

##  Author

**Your Name**
- GitHub: [@alifaguslerian](https://github.com/alifaguslerian)
- Instagram: [@yr.lifeqxz_](https://instagram.com/yr.lifeqxz_)

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Font Awesome](https://fontawesome.com)
- Inspiration from modern café websites worldwide

##  Support

For support, email hello@luxecafe.com or join our WhatsApp community.

---

**Made with  and  by alifaguslerian**

 Star this repo if you like it!
