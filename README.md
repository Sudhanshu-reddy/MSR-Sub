# DMCMICS 2025 - International Conference Website

A responsive, modern website for the DMCMICS 2025 International Conference built with HTML5, CSS3, and JavaScript.

## Conference Details

- **Title**: De Gruyter Mathematics, Computing, and Management in Interdisciplinary Convergence Studies (DMCMICS 2025)
- **Date**: June 03 & 04, 2025
- **Venue**: Anjuman Institute of Technology and Management, Bhatkal, Karnataka, India
- **Organized by**: Anjuman Institute of Technology and Management (AITM)

## Features

### Pages
- **Home**: Conference overview, organizers, patrons, convenors, and quick links
- **About Us**: Detailed conference information, objectives, themes, and institute details
- **Committee**: Complete list of organizing committee, patrons, convenors, and various sub-committees
- **Registration**: Online registration form with fee calculator and paper submission
- **Program**: Detailed conference schedule with timeline
- **Contact**: Contact information, location map, FAQ, and contact form

### Technical Features
- **Responsive Design**: Mobile-first approach, works on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Mobile menu, form validation, smooth scrolling
- **Accessibility**: Keyboard navigation, screen reader support
- **Performance**: Optimized loading, lazy image loading
- **SEO Friendly**: Proper meta tags, semantic HTML

### Technologies Used
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Flexbox, Grid, animations, responsive design
- **JavaScript**: ES6+, DOM manipulation, form handling
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Roboto font family

## File Structure

```
dmcmics-2025/
├── index.html              # Home page
├── about.html              # About Us page
├── committee.html          # Committee page
├── registration.html       # Registration page
├── program.html            # Program page
├── contact.html            # Contact page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── script.js          # Main JavaScript
│   ├── registration.js    # Registration form logic
│   └── contact.js         # Contact form logic
├── images/                 # Image assets
│   ├── conference-bg.jpg  # Hero background
│   ├── page-hero-bg.jpg   # Page hero background
│   ├── aitm-logo.png      # Institute logo
│   └── aitm-campus.jpg    # Campus image
└── README.md              # This file
```

## Setup Instructions

1. **Clone or Download**: Download all files to your local machine
2. **Web Server**: Run on a local web server (Apache, Nginx) or use Python's built-in server:
   ```bash
   cd dmcmics-2025
   python -m http.server 8000
   ```
3. **Browser**: Open `http://localhost:8000` in your web browser

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
The website uses a blue color scheme. To change colors, modify these CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
}
```

### Content
- Update conference details in the HTML files
- Modify committee members in `committee.html`
- Change program schedule in `program.html`
- Update contact information in `contact.html`

### Images
Replace placeholder images in the `images/` folder with your actual images:
- `conference-bg.jpg`: Main hero background (recommended size: 1920x1080px)
- `page-hero-bg.jpg`: Page hero backgrounds (recommended size: 1920x400px)
- `aitm-logo.png`: Institute logo (recommended size: 200x100px)
- `aitm-campus.jpg`: Campus photo (recommended size: 800x400px)

## Features Overview

### Navigation
- Fixed header with smooth scroll navigation
- Mobile-responsive hamburger menu
- Active page highlighting

### Forms
- Registration form with fee calculation
- Contact form with validation
- Newsletter subscription
- Form data persistence

### Interactive Elements
- Animated cards and buttons
- Timeline program display
- FAQ accordion
- Office hours indicator
- Countdown timer

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Skip links for screen readers

## Development

### Adding New Pages
1. Create new HTML file following the existing structure
2. Add navigation link in all page headers
3. Include shared footer and scripts
4. Add page-specific content and styling

### JavaScript Modules
- `script.js`: Core functionality (navigation, animations, utilities)
- `registration.js`: Registration form handling
- `contact.js`: Contact form and interactive elements

### CSS Architecture
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth animations and transitions
- Optimized for performance

## License

This project is created for educational and demonstration purposes. Feel free to use and modify as needed.

## Contact

For technical support or customization requests:
- Email: info@dmcmics2025.com
- Website: https://dmcmics2025.com

---

**DMCMICS 2025** - Advancing knowledge through interdisciplinary convergence.