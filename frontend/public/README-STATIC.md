# Central Vista Farms - Static HTML/CSS/JS Version

This is the pure HTML, CSS, and JavaScript version of the Central Vista Farms landing page. It provides the same functionality and design as the React version but uses vanilla web technologies.

## Files

- `index-static.html` - Main HTML file with all page content
- `styles.css` - Complete CSS styling with brand colors and animations
- `script.js` - JavaScript for interactivity and form handling

## Features

### ✨ Design & Styling
- **Brand Colors**: Custom olive/army green palette (#242e06, #3d4a0a, #5a6b10, #7a8e1a)
- **Typography**: Montserrat font family with weight variations (300-900)
- **Animations**: Smooth scroll animations, floating orbs, hover effects
- **Responsive**: Mobile-first design with breakpoints for tablets and desktops

### 🎯 Functionality
- **Form Validation**: Real-time validation with error messages
- **API Integration**: Connects to FastAPI backend for lead submission
- **Scroll Animations**: Elements animate into view as you scroll
- **Sticky CTA**: Mobile sticky bar appears after scrolling
- **Toast Notifications**: Success/error messages for form submissions
- **Smooth Scrolling**: Animated scroll to contact form

### 📱 Responsive Features
- Mobile-first approach
- Single-column layouts on mobile
- Adaptive typography
- Touch-optimized interactions
- Sticky mobile CTA bar

## How to Use

### Option 1: Direct Access
Simply open the files in a web browser:
1. Navigate to: `https://elite-farmlands.preview.emergentagent.com/index-static.html`
2. The page will load with all functionality

### Option 2: Local Development
1. Copy all three files (`index-static.html`, `styles.css`, `script.js`) to a directory
2. Open `index-static.html` in a web browser
3. For API functionality, ensure the FastAPI backend is running

### Option 3: Serve Locally
```bash
# Using Python's built-in server
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server

# Then visit: http://localhost:8000/index-static.html
```

## API Configuration

The page automatically connects to the backend API at:
```javascript
const API_URL = `${window.location.origin}/api`;
```

### API Endpoints Used:
- `POST /api/leads` - Submit contact form data

### Request Format:
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "company": "Farmland Inquiry"
}
```

## Customization

### Updating Brand Colors
Edit the CSS variables in `styles.css`:
```css
/* Brand Colors */
--primary: #242e06;
--secondary: #3d4a0a;
--tertiary: #5a6b10;
--accent: #7a8e1a;
```

### Changing Content
All content is in `index-static.html`. Key sections:
- Hero Section (line ~30)
- Problem/Agitation (line ~150)
- Elite Asset Benefits (line ~220)
- Bangalore Advantage (line ~300)
- Central Vista Farms Project (line ~380)
- Contact Form (line ~500)

### Modifying Animations
Animation settings in `styles.css`:
- Scroll animations: `.scroll-animate` class
- Float animations: `@keyframes float`
- Hover effects: Individual component styles

## Browser Compatibility

✅ **Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

⚠️ **Features with fallbacks:**
- CSS backdrop-filter (graceful degradation)
- Scroll animations (works without in older browsers)
- CSS Grid (fallback to single column)

## Performance

### Optimization Features:
- Minimal external dependencies (only Google Fonts)
- Efficient CSS animations
- Lazy scroll animations
- Debounced scroll handlers
- Optimized form validation

### Loading Times:
- HTML: ~50KB
- CSS: ~25KB
- JavaScript: ~5KB
- **Total**: ~80KB (excluding fonts)
- **Target Load Time**: <2 seconds

## Differences from React Version

### What's the Same:
✅ Visual design and branding
✅ All animations and interactions
✅ Form validation logic
✅ API integration
✅ Responsive behavior
✅ Accessibility features

### What's Different:
- ❌ No component reusability
- ❌ No React state management
- ❌ No JSX syntax
- ✅ Faster initial load (no React bundle)
- ✅ Easier to understand for non-React developers
- ✅ Better SEO out of the box

## Maintenance

### Adding New Sections:
1. Add HTML structure in `index-static.html`
2. Add styling in `styles.css`
3. Add scroll animation class: `class="scroll-animate"`
4. Add interactivity in `script.js` if needed

### Updating Styles:
- All styles are in `styles.css`
- Use existing CSS classes for consistency
- Follow the BEM-like naming convention

### Adding JavaScript Functionality:
- Add functions to `script.js`
- Initialize in `DOMContentLoaded` event
- Expose global functions if needed for HTML onclick handlers

## Deployment

### Static Hosting:
This version can be deployed to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Traditional web hosting

### With Backend:
Deploy both:
1. Static files to CDN/hosting
2. FastAPI backend to server
3. Configure CORS in backend to allow frontend domain

## Troubleshooting

### Form Not Submitting:
- Check browser console for errors
- Verify API_URL in `script.js`
- Ensure backend is running
- Check CORS settings

### Animations Not Working:
- Check browser compatibility
- Verify CSS is loading correctly
- Check for JavaScript errors in console

### Styling Issues:
- Clear browser cache
- Check if `styles.css` is loading
- Verify font loading from Google Fonts

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are in the same directory
3. Ensure backend API is accessible
4. Test in different browsers

## License

© 2025 Central Vista Farms. All rights reserved.
