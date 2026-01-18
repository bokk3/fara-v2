# Design Document: Coach Dance Website

## Overview

This design specifies a static website for a sport coach and dance teacher, built using HTML, CSS framework, and plain JavaScript. The website will be deployable on classic shared webhosting without requiring Node.js or server-side processing. The design emphasizes mobile-first responsive design, modern visual components, and ease of content management.

### Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS Framework**: Bootstrap 5 (chosen for its comprehensive component library, excellent documentation, and no build process requirement)
- **JavaScript**: Plain ES6+ JavaScript for interactivity (no frameworks or build tools)
- **Icons**: Bootstrap Icons or Font Awesome (CDN-hosted)
- **Image Optimization**: Manual optimization using tools like TinyPNG before upload
- **Form Handling**: Formspree or similar service for contact form submissions (no server-side code required)

### Design Philosophy

- Mobile-first responsive design
- Progressive enhancement
- Semantic HTML for accessibility and SEO
- Minimal JavaScript dependencies
- Easy content updates through clear HTML structure
- Professional yet energetic visual design

## Architecture

### File Structure

```
coach-dance-website/
├── index.html              # Home page
├── css/
│   ├── bootstrap.min.css   # Bootstrap framework (CDN or local)
│   └── custom.css          # Custom styles and theme
├── js/
│   ├── bootstrap.bundle.min.js  # Bootstrap JS (CDN or local)
│   └── main.js             # Custom JavaScript
├── images/
│   ├── hero/               # Hero section images
│   ├── gallery/            # Gallery images
│   ├── services/           # Service icons/images
│   └── about/              # About section images
├── assets/
│   └── icons/              # Additional icons if needed
└── README.md               # Content update guide
```

### Page Structure

The website will be a single-page application (SPA) with smooth scrolling between sections:

1. **Header/Navigation**: Fixed navigation bar with logo and menu
2. **Hero Section**: Eye-catching introduction with call-to-action
3. **Services Section**: Cards displaying sport coaching and dance teaching services
4. **About Section**: Biography, qualifications, and professional photo
5. **Gallery Section**: Responsive image grid with lightbox functionality
6. **Contact Section**: Contact form and contact information
7. **Footer**: Social media links, copyright, and additional navigation

### Responsive Breakpoints

Following Bootstrap 5 conventions:
- **Mobile**: < 576px (xs)
- **Mobile Large**: 576px - 767px (sm)
- **Tablet**: 768px - 991px (md)
- **Desktop**: 992px - 1199px (lg)
- **Large Desktop**: ≥ 1200px (xl)

## Components and Interfaces

### Navigation Component

**Purpose**: Provide consistent navigation across all sections

**Structure**:
```html
<nav class="navbar navbar-expand-lg navbar-light fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#home">Logo/Name</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
        <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#gallery">Gallery</a></li>
        <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
```

**Behavior**:
- Fixed position at top of viewport
- Collapses to hamburger menu on mobile devices
- Smooth scroll to sections on link click
- Active state highlighting for current section
- Background becomes opaque on scroll

**JavaScript Interface**:
```javascript
// Smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Active section highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
```

### Hero Section Component

**Purpose**: Create an impactful first impression with key messaging

**Structure**:
```html
<section id="home" class="hero-section">
  <div class="hero-overlay"></div>
  <div class="container">
    <div class="row align-items-center min-vh-100">
      <div class="col-lg-8 mx-auto text-center">
        <h1 class="display-3 fw-bold">Transform Your Body & Mind</h1>
        <p class="lead">Professional Sport Coaching & Dance Instruction</p>
        <div class="hero-cta">
          <a href="#services" class="btn btn-primary btn-lg">Explore Services</a>
          <a href="#contact" class="btn btn-outline-light btn-lg">Get in Touch</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Styling Approach**:
- Full viewport height background image
- Overlay for text readability
- Centered content with responsive typography
- Call-to-action buttons with hover effects

### Services Section Component

**Purpose**: Display sport coaching and dance teaching services

**Structure**:
```html
<section id="services" class="services-section py-5">
  <div class="container">
    <h2 class="section-title text-center">My Services</h2>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="service-card card h-100">
          <div class="card-body">
            <div class="service-icon"><!-- Icon --></div>
            <h3 class="card-title">Sport Coaching</h3>
            <p class="card-text">Description of coaching services...</p>
            <ul class="service-features">
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="service-card card h-100">
          <div class="card-body">
            <div class="service-icon"><!-- Icon --></div>
            <h3 class="card-title">Dance Teaching</h3>
            <p class="card-text">Description of dance services...</p>
            <ul class="service-features">
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Styling Approach**:
- Card-based layout using Bootstrap cards
- Equal height cards in responsive grid
- Icons or images representing each service
- Hover effects for interactivity

### About Section Component

**Purpose**: Showcase the coach's background, qualifications, and expertise

**Structure**:
```html
<section id="about" class="about-section py-5">
  <div class="container">
    <h2 class="section-title text-center">About Me</h2>
    <div class="row align-items-center">
      <div class="col-lg-5">
        <img src="images/about/coach-photo.jpg" alt="Coach Name" class="img-fluid rounded">
      </div>
      <div class="col-lg-7">
        <h3>Professional Background</h3>
        <p>Biography text...</p>
        <h4>Qualifications & Certifications</h4>
        <ul class="qualifications-list">
          <li>Certification 1</li>
          <li>Certification 2</li>
        </ul>
        <h4>Experience</h4>
        <p>Experience details...</p>
      </div>
    </div>
  </div>
</section>
```

**Styling Approach**:
- Two-column layout (image and text)
- Stacks vertically on mobile
- Professional photo with rounded corners
- Clear typography hierarchy

### Gallery Component

**Purpose**: Display images of coaching and dance activities

**Structure**:
```html
<section id="gallery" class="gallery-section py-5">
  <div class="container">
    <h2 class="section-title text-center">Gallery</h2>
    <div class="row g-3">
      <div class="col-md-4 col-sm-6">
        <div class="gallery-item">
          <img src="images/gallery/image1.jpg" alt="Description" class="img-fluid" data-bs-toggle="modal" data-bs-target="#galleryModal" data-image="images/gallery/image1.jpg">
        </div>
      </div>
      <!-- More gallery items -->
    </div>
  </div>
</section>

<!-- Lightbox Modal -->
<div class="modal fade" id="galleryModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <img src="" alt="" class="img-fluid" id="modalImage">
      </div>
    </div>
  </div>
</div>
```

**JavaScript Interface**:
```javascript
// Lightbox functionality
function initGalleryLightbox() {
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const modalImage = document.getElementById('modalImage');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      const imageSrc = this.getAttribute('data-image');
      const imageAlt = this.getAttribute('alt');
      modalImage.setAttribute('src', imageSrc);
      modalImage.setAttribute('alt', imageAlt);
    });
  });
}
```

**Styling Approach**:
- Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Hover effects on images
- Bootstrap modal for lightbox
- Lazy loading for performance

### Contact Form Component

**Purpose**: Allow visitors to send messages to the coach

**Structure**:
```html
<section id="contact" class="contact-section py-5">
  <div class="container">
    <h2 class="section-title text-center">Get in Touch</h2>
    <div class="row">
      <div class="col-lg-6">
        <form id="contactForm" action="https://formspree.io/f/{form-id}" method="POST">
          <div class="mb-3">
            <label for="name" class="form-label">Name *</label>
            <input type="text" class="form-control" id="name" name="name" required>
            <div class="invalid-feedback">Please enter your name.</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email *</label>
            <input type="email" class="form-control" id="email" name="email" required>
            <div class="invalid-feedback">Please enter a valid email.</div>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="tel" class="form-control" id="phone" name="phone">
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Message *</label>
            <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
            <div class="invalid-feedback">Please enter a message.</div>
          </div>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
        <div id="formStatus" class="mt-3"></div>
      </div>
      <div class="col-lg-6">
        <div class="contact-info">
          <h3>Contact Information</h3>
          <p><i class="bi bi-envelope"></i> <a href="mailto:coach@example.com">coach@example.com</a></p>
          <p><i class="bi bi-phone"></i> <a href="tel:+1234567890">+1 (234) 567-890</a></p>
          <div class="social-links mt-4">
            <a href="#" class="btn btn-outline-primary"><i class="bi bi-facebook"></i></a>
            <a href="#" class="btn btn-outline-primary"><i class="bi bi-instagram"></i></a>
            <a href="#" class="btn btn-outline-primary"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**JavaScript Interface**:
```javascript
// Form validation and submission
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  form.addEventListener('submit', function(e) {
    // Bootstrap validation
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add('was-validated');
  });
  
  // Handle Formspree response
  form.addEventListener('submit', async function(e) {
    if (form.checkValidity()) {
      e.preventDefault();
      const formData = new FormData(form);
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          formStatus.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent.</div>';
          form.reset();
          form.classList.remove('was-validated');
        } else {
          formStatus.innerHTML = '<div class="alert alert-danger">Oops! There was a problem sending your message.</div>';
        }
      } catch (error) {
        formStatus.innerHTML = '<div class="alert alert-danger">Oops! There was a problem sending your message.</div>';
      }
    }
  });
}
```

**Form Service Integration**:
- Use Formspree (free tier allows 50 submissions/month)
- Alternative: FormSubmit, Basin, or mailto fallback
- No server-side code required

## Data Models

### Contact Form Data

```javascript
{
  name: String,        // Required, 1-100 characters
  email: String,       // Required, valid email format
  phone: String,       // Optional, phone number format
  message: String      // Required, 10-1000 characters
}
```

**Validation Rules**:
- Name: Required, non-empty, max 100 characters
- Email: Required, valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Phone: Optional, if provided should match phone format
- Message: Required, minimum 10 characters, max 1000 characters

### Gallery Image Data

```javascript
{
  src: String,         // Image file path
  alt: String,         // Descriptive alt text
  category: String,    // 'sport' or 'dance'
  thumbnail: String    // Optional thumbnail path for optimization
}
```

### Service Data

```javascript
{
  title: String,       // Service name
  description: String, // Service description
  features: Array,     // List of service features
  icon: String,        // Icon class or image path
  category: String     // 'sport' or 'dance'
}
```

## Color Scheme

### Primary Palette

Based on energy, professionalism, and the dynamic nature of sports and dance:

- **Primary Color**: Vibrant Coral/Orange (#FF6B6B or #FF8C42)
  - Represents energy, enthusiasm, movement
  - Used for: Primary buttons, active states, accents

- **Secondary Color**: Deep Teal/Turquoise (#4ECDC4 or #2C7A7B)
  - Represents balance, trust, professionalism
  - Used for: Secondary buttons, headings, links

- **Accent Color**: Warm Purple (#9B59B6 or #8B5CF6)
  - Represents creativity, dance, artistic expression
  - Used for: Highlights, hover states, special elements

- **Neutral Colors**:
  - Dark Gray: #2D3748 (text)
  - Medium Gray: #718096 (secondary text)
  - Light Gray: #F7FAFC (backgrounds)
  - White: #FFFFFF (cards, sections)

### Color Usage

```css
:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --accent-color: #9B59B6;
  --text-dark: #2D3748;
  --text-medium: #718096;
  --bg-light: #F7FAFC;
  --white: #FFFFFF;
}
```

## Typography

- **Headings**: 'Poppins' or 'Montserrat' (Google Fonts) - Modern, bold, energetic
- **Body Text**: 'Open Sans' or 'Inter' (Google Fonts) - Clean, readable
- **Font Sizes** (responsive):
  - H1: 2.5rem (mobile) to 4rem (desktop)
  - H2: 2rem (mobile) to 3rem (desktop)
  - H3: 1.5rem (mobile) to 2rem (desktop)
  - Body: 1rem (16px base)
  - Small: 0.875rem


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation Link Behavior

*For any* navigation link in the menu, clicking it should scroll to or display the corresponding section on the page.

**Validates: Requirements 1.2**

### Property 2: Active Section Highlighting

*For any* section that is currently visible in the viewport, the corresponding navigation link should have the active state applied.

**Validates: Requirements 1.5**

### Property 3: Service Information Completeness

*For any* service card displayed on the page, it should contain a title, description, and list of features.

**Validates: Requirements 4.3**

### Property 4: Service Visual Elements

*For any* service card displayed on the page, it should include an icon or image element.

**Validates: Requirements 4.5**

### Property 5: Gallery Image Interaction

*For any* image in the gallery, clicking it should open a modal or lightbox displaying an enlarged version of that image.

**Validates: Requirements 6.3**

### Property 6: Form Required Field Validation

*For any* required field in the contact form that is empty, attempting to submit the form should display a validation error for that field.

**Validates: Requirements 7.2**

### Property 7: Email Format Validation

*For any* string that does not match valid email format entered in the email field, the form should display an email validation error.

**Validates: Requirements 7.3**

### Property 8: Image Optimization

*For any* image file used on the website, it should be optimized for web delivery with appropriate file size (under 500KB for regular images, under 1MB for hero images).

**Validates: Requirements 9.1**

### Property 9: Image Accessibility

*For any* image element on the website, it should have a non-empty alt attribute providing descriptive text.

**Validates: Requirements 12.2**

### Property 10: Keyboard Navigation Support

*For any* interactive element (links, buttons, form inputs), it should be accessible and operable via keyboard navigation (Tab, Enter, Space keys).

**Validates: Requirements 12.4**

## Error Handling

### Form Validation Errors

**Client-Side Validation**:
- Display inline error messages below invalid fields
- Use Bootstrap's validation classes (`.is-invalid`, `.invalid-feedback`)
- Prevent form submission until all validation passes
- Clear error messages when user corrects the input

**Error Messages**:
```javascript
const errorMessages = {
  nameRequired: 'Please enter your name.',
  emailRequired: 'Please enter your email address.',
  emailInvalid: 'Please enter a valid email address.',
  messageRequired: 'Please enter a message.',
  messageTooShort: 'Message must be at least 10 characters.',
  submissionFailed: 'Oops! There was a problem sending your message. Please try again.'
};
```

### Image Loading Errors

**Fallback Strategy**:
```javascript
function handleImageError(img) {
  img.src = 'images/placeholder.jpg'; // Fallback image
  img.alt = 'Image not available';
  img.classList.add('image-error');
}

// Apply to all images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    handleImageError(this);
  });
});
```

### Navigation Errors

**Smooth Scroll Fallback**:
```javascript
function scrollToSection(targetId) {
  const target = document.querySelector(targetId);
  
  if (!target) {
    console.error(`Section ${targetId} not found`);
    return;
  }
  
  // Try smooth scroll, fallback to instant scroll
  try {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) {
    target.scrollIntoView(true);
  }
}
```

### External Service Errors

**Formspree Integration Error Handling**:
```javascript
async function submitForm(formData, formAction) {
  try {
    const response = await fetch(formAction, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return { 
      success: false, 
      error: 'Unable to send message. Please try emailing directly.' 
    };
  }
}
```

### Browser Compatibility Errors

**Feature Detection**:
```javascript
// Check for required features
function checkBrowserSupport() {
  const requiredFeatures = {
    fetch: typeof fetch !== 'undefined',
    promises: typeof Promise !== 'undefined',
    classList: 'classList' in document.createElement('div')
  };
  
  const unsupported = Object.entries(requiredFeatures)
    .filter(([feature, supported]) => !supported)
    .map(([feature]) => feature);
  
  if (unsupported.length > 0) {
    console.warn('Unsupported features:', unsupported);
    // Display graceful degradation message
    showBrowserWarning();
  }
}

function showBrowserWarning() {
  const warning = document.createElement('div');
  warning.className = 'alert alert-warning';
  warning.textContent = 'Your browser may not support all features. Please consider updating to a modern browser.';
  document.body.insertBefore(warning, document.body.firstChild);
}
```

## Testing Strategy

### Dual Testing Approach

This project will use both unit testing and property-based testing to ensure comprehensive coverage:

- **Unit Tests**: Verify specific examples, edge cases, and error conditions
- **Property Tests**: Verify universal properties across all inputs

Both testing approaches are complementary and necessary for comprehensive coverage. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Testing Framework Selection

**For JavaScript Testing**:
- **Test Runner**: Jest or Vitest (modern, fast, good ES6+ support)
- **DOM Testing**: jsdom (for simulating browser environment)
- **Property-Based Testing**: fast-check library
- **E2E Testing**: Playwright or Cypress (for cross-browser testing)

### Property-Based Testing Configuration

Each property test will:
- Run a minimum of 100 iterations to ensure comprehensive input coverage
- Reference the corresponding design document property
- Use the tag format: **Feature: coach-dance-website, Property {number}: {property_text}**

**Example Property Test Structure**:
```javascript
import fc from 'fast-check';

describe('Feature: coach-dance-website, Property 1: Navigation Link Behavior', () => {
  test('clicking any navigation link scrolls to corresponding section', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('#home', '#services', '#about', '#gallery', '#contact'),
        (sectionId) => {
          // Test that clicking link scrolls to section
          const link = document.querySelector(`a[href="${sectionId}"]`);
          const section = document.querySelector(sectionId);
          
          link.click();
          
          // Verify section is in viewport or scroll position changed
          return section !== null;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Testing Strategy

**Focus Areas for Unit Tests**:
1. **Specific Examples**: Test concrete scenarios with known inputs/outputs
2. **Edge Cases**: Empty forms, missing images, invalid data
3. **Error Conditions**: Network failures, invalid user input, missing elements
4. **Integration Points**: Form submission, modal interactions, scroll behavior

**Example Unit Test**:
```javascript
describe('Contact Form Validation', () => {
  test('empty name field shows validation error', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    
    nameInput.value = '';
    form.dispatchEvent(new Event('submit'));
    
    expect(nameInput.classList.contains('is-invalid')).toBe(true);
  });
  
  test('invalid email format shows validation error', () => {
    const emailInput = document.getElementById('email');
    
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('blur'));
    
    expect(emailInput.classList.contains('is-invalid')).toBe(true);
  });
});
```

### Testing Coverage Goals

- **Unit Tests**: Cover all error conditions, edge cases, and specific examples
- **Property Tests**: Cover all 10 correctness properties defined above
- **E2E Tests**: Cover critical user flows (navigation, form submission, gallery interaction)
- **Accessibility Tests**: Verify WCAG 2.1 Level AA compliance
- **Cross-Browser Tests**: Verify functionality in Chrome, Firefox, Safari, Edge

### Manual Testing Checklist

Since this is a static website, some aspects require manual verification:

1. **Visual Design Review**:
   - Color scheme consistency
   - Typography hierarchy
   - Spacing and alignment
   - Image quality and placement

2. **Responsive Design Testing**:
   - Test on actual mobile devices (iOS, Android)
   - Test on tablets
   - Test on various desktop resolutions

3. **Performance Testing**:
   - Page load time (target: < 3 seconds)
   - Image loading performance
   - Smooth scroll performance

4. **Accessibility Testing**:
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - Keyboard-only navigation
   - Color contrast verification

5. **Cross-Browser Testing**:
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

### Deployment Testing

Before deploying to shared webhosting:

1. **Static File Verification**:
   - Ensure no server-side code is present
   - Verify all paths are relative
   - Check that all assets are included

2. **Hosting Compatibility**:
   - Test on local web server (e.g., Python's `http.server`)
   - Verify no build process is required
   - Confirm all external CDN links are accessible

3. **Form Service Integration**:
   - Test Formspree integration with actual submissions
   - Verify email notifications are received
   - Test form validation and error handling

## Implementation Notes

### Development Workflow

1. **Setup**: Create directory structure and include Bootstrap via CDN
2. **HTML Structure**: Build semantic HTML structure for all sections
3. **Styling**: Apply custom CSS for color scheme and layout refinements
4. **JavaScript**: Implement interactivity (navigation, form validation, gallery)
5. **Content**: Add actual content, images, and copy
6. **Testing**: Run automated tests and manual testing checklist
7. **Optimization**: Optimize images, minify CSS/JS if needed
8. **Deployment**: Upload to shared webhosting via FTP/SFTP

### Content Update Guide

A README.md file will be created with instructions for common content updates:

- How to update text content
- How to add/remove gallery images
- How to update contact information
- How to modify service descriptions
- How to change colors in CSS variables

### Performance Optimization

**Image Optimization**:
- Use WebP format with JPEG fallback
- Compress images using TinyPNG or similar
- Use appropriate image dimensions (no oversized images)
- Consider lazy loading for gallery images

**CSS Optimization**:
- Use Bootstrap's customization to include only needed components
- Minimize custom CSS
- Use CSS variables for theme colors

**JavaScript Optimization**:
- Minimize custom JavaScript
- Load scripts at end of body or use defer attribute
- Avoid unnecessary DOM manipulation

### Accessibility Considerations

**Semantic HTML**:
```html
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <section id="services" aria-labelledby="services-heading">
    <h2 id="services-heading">My Services</h2>
    ...
  </section>
</main>
<footer>...</footer>
```

**ARIA Labels**:
```html
<button class="navbar-toggler" aria-label="Toggle navigation" aria-expanded="false">
  <span class="navbar-toggler-icon"></span>
</button>

<a href="#" aria-label="Visit our Facebook page">
  <i class="bi bi-facebook" aria-hidden="true"></i>
</a>
```

**Keyboard Navigation**:
- Ensure all interactive elements are focusable
- Provide visible focus indicators
- Support Tab, Enter, and Space key interactions
- Ensure modal can be closed with Escape key

### Security Considerations

**Form Security**:
- Use HTTPS for form submissions (Formspree provides this)
- Implement client-side validation (server-side handled by Formspree)
- Avoid exposing sensitive information in HTML
- Use rel="noopener noreferrer" for external links

**Content Security**:
- Sanitize any user-generated content if displayed
- Use subresource integrity (SRI) for CDN resources
- Implement Content Security Policy headers if hosting supports it

### Maintenance Plan

**Regular Updates**:
- Update Bootstrap version annually or when security patches are released
- Refresh gallery images quarterly
- Review and update service descriptions as needed
- Test cross-browser compatibility after major browser updates

**Monitoring**:
- Monitor form submissions to ensure Formspree integration is working
- Check website loading speed periodically
- Review analytics (if implemented) to understand visitor behavior
- Test on new devices and browsers as they become popular
