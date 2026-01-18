# Coach Dance Website - Content Management Guide

Welcome to your website! This guide will help you update and maintain your website content without needing technical expertise.

## Table of Contents

1. [File Structure](#file-structure)
2. [Updating Text Content](#updating-text-content)
3. [Managing Gallery Images](#managing-gallery-images)
4. [Updating Contact Information](#updating-contact-information)
5. [Modifying Service Descriptions](#modifying-service-descriptions)
6. [Changing Colors](#changing-colors)
7. [Tips and Best Practices](#tips-and-best-practices)

## File Structure

Your website is organized into the following folders:

```
coach-dance-website/
├── index.html              # Main website file (all content is here)
├── css/
│   ├── custom.css          # Your custom styles and colors
│   └── custom.min.css      # Minified version (auto-generated)
├── js/
│   ├── main.js             # Website functionality
│   └── main.min.js         # Minified version (auto-generated)
├── images/
│   ├── hero/               # Hero section background images
│   ├── gallery/            # Gallery images
│   ├── services/           # Service section images
│   ├── about/              # About section images
│   ├── logo.png            # Website logo
│   └── logo-text.png       # Logo with text
├── assets/
│   └── icons/              # Additional icons
└── README.md               # This guide
```

## Updating Text Content

All text content is located in the `index.html` file. Look for HTML comments that mark editable sections (they look like `<!-- EDITABLE: Section Name -->`).

### Hero Section

**Location:** Find the section with `id="home"` in index.html

```html
<!-- EDITABLE: Hero Section Content -->
<h1 class="display-3 fw-bold">Transform Your Body & Mind</h1>
<p class="lead">Professional Sport Coaching & Dance Instruction</p>
```

**To update:**
1. Open `index.html` in a text editor
2. Find the hero section (marked with comments)
3. Change the text between the `<h1>` and `<p>` tags
4. Save the file

### About Section

**Location:** Find the section with `id="about"` in index.html

```html
<!-- EDITABLE: About Section Content -->
<h3>Professional Background</h3>
<p>Your biography text here...</p>
```

**To update:**
1. Locate the about section in `index.html`
2. Update the biography text, qualifications, and experience
3. Save the file

### Footer Copyright

**Location:** Find the `<footer>` element at the bottom of index.html

```html
<!-- EDITABLE: Footer Copyright -->
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

## Managing Gallery Images

### Adding New Gallery Images

1. **Prepare your image:**
   - Resize to appropriate dimensions (recommended: 800x600px)
   - Optimize for web (use tools like TinyPNG.com)
   - Save with a descriptive filename (e.g., `dance-class-2024.jpg`)

2. **Upload the image:**
   - Place the image in the `images/gallery/` folder

3. **Add to the gallery in index.html:**
   - Find the gallery section (`id="gallery"`)
   - Look for the comment `<!-- EDITABLE: Gallery Images -->`
   - Copy an existing gallery item and modify it:

```html
<div class="col-md-4 col-sm-6">
  <div class="gallery-item">
    <img src="images/gallery/your-new-image.jpg" 
         alt="Description of your image" 
         class="img-fluid" 
         data-bs-toggle="modal" 
         data-bs-target="#galleryModal" 
         data-image="images/gallery/your-new-image.jpg">
  </div>
</div>
```

4. **Important:** Always provide a descriptive `alt` text for accessibility

### Removing Gallery Images

1. Find the gallery item in `index.html`
2. Delete the entire `<div class="col-md-4 col-sm-6">...</div>` block
3. Optionally, delete the image file from `images/gallery/` folder

## Updating Contact Information

### Email Address

**Location:** Find the contact section (`id="contact"`) in index.html

```html
<!-- EDITABLE: Contact Email -->
<p><i class="bi bi-envelope"></i> <a href="mailto:coach@example.com">coach@example.com</a></p>
```

**To update:**
1. Change both instances of the email address (in `href="mailto:..."` and the visible text)
2. Save the file

### Phone Number

```html
<!-- EDITABLE: Contact Phone -->
<p><i class="bi bi-phone"></i> <a href="tel:+1234567890">+1 (234) 567-890</a></p>
```

**To update:**
1. Change the phone number in `href="tel:..."` (no spaces or special characters)
2. Change the visible phone number (can include formatting)
3. Save the file

### Social Media Links

```html
<!-- EDITABLE: Social Media Links -->
<div class="social-links mt-4">
  <a href="https://facebook.com/yourpage" class="btn btn-outline-primary" aria-label="Facebook">
    <i class="bi bi-facebook"></i>
  </a>
  <a href="https://instagram.com/yourprofile" class="btn btn-outline-primary" aria-label="Instagram">
    <i class="bi bi-instagram"></i>
  </a>
</div>
```

**To update:**
1. Replace the URLs in `href="..."` with your social media profile links
2. To add more social networks, copy an existing link and change the icon class
3. Available icons: `bi-facebook`, `bi-instagram`, `bi-linkedin`, `bi-twitter`, `bi-youtube`

### Form Submission Email (Formspree)

**Location:** Find the contact form in index.html

```html
<form id="contactForm" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
```

**To update:**
1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Replace `YOUR-FORM-ID` with your actual Formspree form ID
4. Save the file

## Modifying Service Descriptions

**Location:** Find the services section (`id="services"`) in index.html

### Sport Coaching Service

```html
<!-- EDITABLE: Sport Coaching Service -->
<div class="service-card card h-100">
  <div class="card-body">
    <h3 class="card-title">Sport Coaching</h3>
    <p class="card-text">Your service description here...</p>
    <ul class="service-features">
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li>Feature 3</li>
    </ul>
  </div>
</div>
```

**To update:**
1. Change the service title in `<h3>`
2. Update the description in `<p class="card-text">`
3. Modify the feature list items
4. Add or remove `<li>` items as needed

### Dance Teaching Service

Follow the same process as above for the dance teaching service card.

## Changing Colors

All colors are defined using CSS variables in the `css/custom.css` file. This makes it easy to change the entire color scheme in one place.

**Location:** Open `css/custom.css` and find the `:root` section at the top

```css
:root {
  --primary-color: #FF6B6B;      /* Main brand color (buttons, accents) */
  --secondary-color: #4ECDC4;    /* Secondary color (headings, links) */
  --accent-color: #9B59B6;       /* Accent color (highlights, hover) */
  --text-dark: #2D3748;          /* Main text color */
  --text-medium: #718096;        /* Secondary text color */
  --bg-light: #F7FAFC;           /* Light background color */
  --white: #FFFFFF;              /* White color */
}
```

### How to Change Colors

1. **Choose your new colors:**
   - Use a color picker tool or website like [Coolors.co](https://coolors.co)
   - Get the hex code (e.g., `#FF6B6B`)

2. **Update the CSS variables:**
   - Open `css/custom.css`
   - Replace the hex codes with your new colors
   - Save the file

3. **Test your changes:**
   - Open `index.html` in a web browser
   - Check that all elements look good with the new colors
   - Ensure text is readable (good contrast)

### Color Usage Guide

- **Primary Color:** Used for main buttons, active navigation, important accents
- **Secondary Color:** Used for headings, secondary buttons, links
- **Accent Color:** Used for hover effects, highlights, special elements
- **Text Colors:** Used for body text and secondary text
- **Background Colors:** Used for section backgrounds and cards

## Tips and Best Practices

### Images

1. **Always optimize images** before uploading:
   - Use [TinyPNG.com](https://tinypng.com) or similar tools
   - Target file size: under 500KB for regular images, under 1MB for hero images
   - Recommended dimensions: 800x600px for gallery, 1920x1080px for hero

2. **Use descriptive filenames:**
   - Good: `dance-class-spring-2024.jpg`
   - Bad: `IMG_1234.jpg`

3. **Always add alt text** for accessibility:
   - Describe what's in the image
   - Be specific and concise

### Text Content

1. **Keep it concise:** Web visitors scan rather than read
2. **Use headings:** Break up long text with subheadings
3. **Highlight key information:** Use bold or lists for important points

### Testing Changes

After making changes:

1. **Save all files**
2. **Open index.html in a web browser** (or refresh if already open)
3. **Test on mobile:** Resize your browser window or use browser dev tools
4. **Check all links:** Make sure email, phone, and social media links work
5. **Test the contact form:** Submit a test message to verify it works

### Backup

Before making major changes:

1. **Create a backup:** Copy the entire website folder
2. **Name it with a date:** e.g., `coach-dance-website-backup-2024-01-18`
3. **Keep recent backups:** Store at least 2-3 recent versions

### Getting Help

If you encounter issues:

1. **Check your changes:** Compare with the backup to see what changed
2. **Validate HTML:** Use [validator.w3.org](https://validator.w3.org)
3. **Check browser console:** Press F12 in your browser to see error messages
4. **Restore from backup:** If something breaks, restore from your backup

### Uploading to Web Hosting

To publish your changes:

1. **Connect via FTP/SFTP:** Use FileZilla or your hosting provider's file manager
2. **Upload changed files:** Only upload files you modified
3. **Test live site:** Visit your website URL and verify changes
4. **Clear cache:** Press Ctrl+F5 (or Cmd+Shift+R on Mac) to see latest version

## Common Tasks Quick Reference

| Task | File to Edit | Section to Find |
|------|--------------|-----------------|
| Change hero text | index.html | `id="home"` |
| Update services | index.html | `id="services"` |
| Edit about section | index.html | `id="about"` |
| Add gallery image | index.html | `id="gallery"` |
| Change email | index.html | `id="contact"` |
| Update phone | index.html | `id="contact"` |
| Modify colors | css/custom.css | `:root` section |
| Change logo | images/ | Replace logo.png |

## Need More Help?

This website is built with:
- **HTML5:** Structure and content
- **Bootstrap 5:** Layout and components
- **Custom CSS:** Colors and styling
- **JavaScript:** Interactive features

For more advanced customization, you may need to consult:
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [HTML Tutorial](https://www.w3schools.com/html/)
- [CSS Tutorial](https://www.w3schools.com/css/)

---

**Last Updated:** January 2024  
**Website Version:** 1.0
