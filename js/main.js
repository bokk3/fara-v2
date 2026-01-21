/**
 * Main JavaScript for Coach Dance Website
 * 
 * This file contains custom JavaScript functionality for the website.
 * Additional functions will be added in subsequent tasks.
 */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Coach Dance Website loaded successfully');
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize active section highlighting
  initActiveSectionHighlighting();
  
  // Initialize gallery lightbox
  initGalleryLightbox();
  
  // Initialize contact form
  initContactForm();
  
  // Set current year in footer
  setCurrentYear();
  
  // Initialize image error handling
  initImageErrorHandling();
  
  // Additional initialization will be added in subsequent tasks
});

/**
 * Initialize smooth scrolling for navigation links
 * Handles anchor link clicks and scrolls smoothly to target sections
 * with offset for fixed navbar height
 */
function initSmoothScroll() {
  // Get all navigation links that start with #
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#" without a target
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Get navbar height for offset
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Calculate target position with offset
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: true
          });
        }
      }
    });
  });
}

/**
 * Initialize active section highlighting
 * Detects current section in viewport and updates active class on nav links
 * Uses throttling to improve performance
 */
function initActiveSectionHighlighting() {
  let isThrottled = false;
  const throttleDelay = 100; // milliseconds
  
  // Throttled scroll handler
  function handleScroll() {
    if (isThrottled) return;
    
    isThrottled = true;
    setTimeout(() => {
      updateActiveNavLink();
      isThrottled = false;
    }, throttleDelay);
  }
  
  // Add scroll event listener with throttling
  window.addEventListener('scroll', handleScroll);
  
  // Initial call to set active state on page load
  updateActiveNavLink();
}

/**
 * Update active class on navigation links based on current scroll position
 */
function updateActiveNavLink() {
  // Get all sections with IDs
  const sections = document.querySelectorAll('section[id]');
  
  // Get navbar height for offset calculation
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  
  // Current scroll position with offset
  const scrollPosition = window.scrollY + navbarHeight + 100;
  
  // Find the current section
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    // Check if scroll position is within this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });
  
  // If we're at the very top of the page, set home as active
  if (window.scrollY < 100) {
    currentSection = 'home';
  }
  
  // Update active class on nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Don't modify active state for non-anchor links (like blog.html)
    if (!href.startsWith('#')) {
      return;
    }
    
    link.classList.remove('active');
    
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
  
  // Special case: Highlight blog link when in blog-preview section
  const blogLink = document.querySelector('a.nav-link[href="blog.html"]');
  if (blogLink && currentSection === 'blog-preview') {
    blogLink.classList.add('active');
  }
}

/**
 * Initialize gallery lightbox functionality
 * Handles gallery image clicks and opens modal with enlarged image
 * Supports keyboard navigation (Escape to close, Enter/Space to open)
 * Also handles horizontal carousel navigation with arrows
 */
function initGalleryLightbox() {
  // Get all gallery images
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const modalImage = document.getElementById('modalImage');
  const galleryModal = document.getElementById('galleryModal');
  
  if (!modalImage || !galleryModal) {
    console.warn('Gallery modal elements not found');
    return;
  }
  
  // Add click event listeners to all gallery images
  galleryImages.forEach(img => {
    // Make images keyboard accessible
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    
    // Click handler
    img.addEventListener('click', function() {
      openGalleryModal(this, modalImage);
    });
    
    // Keyboard handler (Enter or Space key)
    img.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalleryModal(this, modalImage);
        
        // Open the modal using Bootstrap's API
        const modal = new bootstrap.Modal(galleryModal);
        modal.show();
      }
    });
  });
  
  // Add keyboard support for closing modal with Escape key
  galleryModal.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = bootstrap.Modal.getInstance(galleryModal);
      if (modal) {
        modal.hide();
      }
    }
  });
  
  // Clear modal image when modal is hidden (cleanup)
  galleryModal.addEventListener('hidden.bs.modal', function() {
    modalImage.setAttribute('src', '');
    modalImage.setAttribute('alt', '');
  });
  
  // Focus management: return focus to trigger element when modal closes
  let lastFocusedElement = null;
  
  galleryModal.addEventListener('show.bs.modal', function() {
    lastFocusedElement = document.activeElement;
  });
  
  galleryModal.addEventListener('hidden.bs.modal', function() {
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  });
  
  // Initialize carousel navigation
  initGalleryCarousel();
}

/**
 * Open gallery modal with specified image
 * @param {HTMLImageElement} imgElement - The image element that was clicked
 * @param {HTMLImageElement} modalImage - The modal image element to update
 */
function openGalleryModal(imgElement, modalImage) {
  // Get image source and alt text from data attributes
  const imageSrc = imgElement.getAttribute('data-image');
  const imageAlt = imgElement.getAttribute('alt');
  
  // Update modal image
  if (imageSrc) {
    modalImage.setAttribute('src', imageSrc);
    modalImage.setAttribute('alt', imageAlt || 'Galerij afbeelding');
  }
}

/**
 * Initialize gallery carousel navigation with arrow buttons
 */
function initGalleryCarousel() {
  const galleryTrack = document.querySelector('.gallery-track');
  const prevButton = document.querySelector('.gallery-arrow-prev');
  const nextButton = document.querySelector('.gallery-arrow-next');
  
  if (!galleryTrack || !prevButton || !nextButton) {
    console.warn('Gallery carousel elements not found');
    return;
  }
  
  // Scroll amount (one item width + gap)
  const scrollAmount = 400 + 24; // item width + gap
  
  // Previous button click handler
  prevButton.addEventListener('click', function() {
    scrollGallery(-scrollAmount);
  });
  
  // Previous button keyboard handler
  prevButton.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollGallery(-scrollAmount);
    }
  });
  
  // Next button click handler
  nextButton.addEventListener('click', function() {
    scrollGallery(scrollAmount);
  });
  
  // Next button keyboard handler
  nextButton.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollGallery(scrollAmount);
    }
  });
  
  // Scroll function
  function scrollGallery(amount) {
    galleryTrack.scrollBy({
      left: amount,
      behavior: 'smooth'
    });
  }
  
  // Optional: Hide/show arrows based on scroll position
  function updateArrowVisibility() {
    const scrollLeft = galleryTrack.scrollLeft;
    const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    
    // Update prev arrow state
    if (scrollLeft <= 0) {
      prevButton.style.opacity = '0.5';
      prevButton.style.cursor = 'default';
      prevButton.setAttribute('aria-disabled', 'true');
    } else {
      prevButton.style.opacity = '1';
      prevButton.style.cursor = 'pointer';
      prevButton.setAttribute('aria-disabled', 'false');
    }
    
    // Update next arrow state
    if (scrollLeft >= maxScroll - 5) { // -5 for tolerance
      nextButton.style.opacity = '0.5';
      nextButton.style.cursor = 'default';
      nextButton.setAttribute('aria-disabled', 'true');
    } else {
      nextButton.style.opacity = '1';
      nextButton.style.cursor = 'pointer';
      nextButton.setAttribute('aria-disabled', 'false');
    }
  }
  
  // Update arrow visibility on scroll
  galleryTrack.addEventListener('scroll', updateArrowVisibility);
  
  // Initial arrow visibility check
  updateArrowVisibility();
  
  // Update on window resize
  window.addEventListener('resize', updateArrowVisibility);
  
  // Add keyboard navigation for gallery track (arrow keys)
  galleryTrack.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollGallery(-scrollAmount);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollGallery(scrollAmount);
    }
  });
}

/**
 * Initialize contact form validation and submission
 * Handles form validation, submission via Formspree, and user feedback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (!form || !formStatus) {
    console.warn('Contact form elements not found');
    return;
  }
  
  // Add form submit event listener
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Get checkboxes
    const privacyCheck = form.querySelector('#privacyCheck');
    const termsCheck = form.querySelector('#termsCheck');
    
    // CRITICAL: Check if both checkboxes are checked BEFORE any other validation
    if (!privacyCheck.checked || !termsCheck.checked) {
      // Mark checkboxes as invalid
      if (!privacyCheck.checked) {
        privacyCheck.classList.add('is-invalid');
        privacyCheck.classList.remove('is-valid');
      }
      if (!termsCheck.checked) {
        termsCheck.classList.add('is-invalid');
        termsCheck.classList.remove('is-valid');
      }
      
      // Add validation class to form
      form.classList.add('was-validated');
      
      // Show error message
      formStatus.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Let op!</strong> Je moet akkoord gaan met het privacybeleid en de algemene voorwaarden om een bericht te versturen.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Sluiten"></button>
        </div>
      `;
      
      // Scroll to error message
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      return false;
    }
    
    // Validate form
    if (!validateForm(form)) {
      return false;
    }
    
    // If validation passes, submit the form
    await submitForm(form, formStatus);
  });
  
  // Add real-time validation on blur for better UX
  const formInputs = form.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    // Clear validation state on input
    input.addEventListener('input', function() {
      if (this.classList.contains('is-invalid')) {
        this.classList.remove('is-invalid');
      }
    });
  });
  
  // Add validation for checkboxes on change
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      validateCheckbox(this);
    });
  });
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateForm(form) {
  let isValid = true;
  
  // Get all required fields
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  const privacyCheck = form.querySelector('#privacyCheck');
  const termsCheck = form.querySelector('#termsCheck');
  
  // Validate name field
  if (!validateField(nameInput)) {
    isValid = false;
  }
  
  // Validate email field
  if (!validateField(emailInput)) {
    isValid = false;
  }
  
  // Validate message field
  if (!validateField(messageInput)) {
    isValid = false;
  }
  
  // Validate privacy checkbox
  if (!validateCheckbox(privacyCheck)) {
    isValid = false;
  }
  
  // Validate terms checkbox
  if (!validateCheckbox(termsCheck)) {
    isValid = false;
  }
  
  // Add Bootstrap validation class to form
  form.classList.add('was-validated');
  
  return isValid;
}

/**
 * Validate individual form field
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to validate
 * @returns {boolean} - True if field is valid, false otherwise
 */
function validateField(field) {
  if (!field) return true;
  
  // Check if field is required and empty
  if (field.hasAttribute('required') && !field.value.trim()) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    return false;
  }
  
  // Validate email format
  if (field.type === 'email' && field.value.trim()) {
    if (!validateEmail(field.value.trim())) {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      return false;
    }
  }
  
  // Field is valid
  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
  return true;
}

/**
 * Validate checkbox field
 * @param {HTMLInputElement} checkbox - The checkbox to validate
 * @returns {boolean} - True if checkbox is checked, false otherwise
 */
function validateCheckbox(checkbox) {
  if (!checkbox) return true;
  
  // Check if checkbox is required and not checked
  if (checkbox.hasAttribute('required') && !checkbox.checked) {
    checkbox.classList.add('is-invalid');
    checkbox.classList.remove('is-valid');
    return false;
  }
  
  // Checkbox is valid
  checkbox.classList.remove('is-invalid');
  checkbox.classList.add('is-valid');
  return true;
}

/**
 * Validate email format using regex
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Submit form via Formspree
 * @param {HTMLFormElement} form - The form to submit
 * @param {HTMLElement} statusElement - Element to display status messages
 */
async function submitForm(form, statusElement) {
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Verzenden...';
  
  // Clear previous status messages
  statusElement.innerHTML = '';
  
  try {
    // Get form data
    const formData = new FormData(form);
    
    // Submit to Formspree
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Success
      displaySuccessMessage(statusElement);
      form.reset();
      form.classList.remove('was-validated');
      
      // Clear validation classes
      const formInputs = form.querySelectorAll('input, textarea');
      formInputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
      });
    } else {
      // Error response from server
      displayErrorMessage(statusElement);
    }
  } catch (error) {
    // Network or other error
    console.error('Form submission error:', error);
    displayErrorMessage(statusElement);
  } finally {
    // Restore button state
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

/**
 * Display success message to user
 * @param {HTMLElement} statusElement - Element to display message in
 */
function displaySuccessMessage(statusElement) {
  statusElement.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <i class="bi bi-check-circle-fill me-2"></i>
      <strong>Bedankt!</strong> Je bericht is succesvol verzonden. Ik neem binnenkort contact met je op!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Sluiten"></button>
    </div>
  `;
}

/**
 * Display error message to user
 * @param {HTMLElement} statusElement - Element to display message in
 */
function displayErrorMessage(statusElement) {
  statusElement.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <strong>Oeps!</strong> Er is een probleem opgetreden bij het verzenden van je bericht. Probeer het opnieuw of neem direct contact met me op via e-mail.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Sluiten"></button>
    </div>
  `;
}

/**
 * Set current year in footer copyright
 */
function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Initialize image error handling for all images on the page
 * Applies error handling to prevent broken image icons from displaying
 */
function initImageErrorHandling() {
  // Get all images on the page
  const images = document.querySelectorAll('img');
  
  // Apply error handler to each image
  images.forEach(img => {
    // Add error event listener
    img.addEventListener('error', function() {
      handleImageError(this);
    });
    
    // Also check if image is already in error state (for cached errors)
    if (!img.complete || img.naturalHeight === 0) {
      // Image hasn't loaded yet or failed to load
      img.addEventListener('load', function() {
        // Image loaded successfully, no action needed
      });
    }
  });
}

/**
 * Handle image loading errors by replacing with fallback placeholder
 * @param {HTMLImageElement} img - The image element that failed to load
 */
function handleImageError(img) {
  // Prevent infinite loop if placeholder also fails
  if (img.classList.contains('image-error')) {
    return;
  }
  
  // Mark image as having an error
  img.classList.add('image-error');
  
  // Create a placeholder using SVG data URI
  const placeholderSvg = createPlaceholderSvg(img.alt || 'Image not available');
  
  // Set the placeholder as the image source
  img.src = placeholderSvg;
  
  // Update alt text to indicate the image is unavailable
  if (!img.alt || img.alt.trim() === '') {
    img.alt = 'Afbeelding niet beschikbaar';
  }
  
  // Log error for debugging (can be removed in production)
  console.warn('Afbeelding kon niet worden geladen:', img.dataset.image || img.getAttribute('data-image') || 'onbekende bron');
}

/**
 * Create an SVG placeholder image as a data URI
 * @param {string} altText - The alt text to display in the placeholder
 * @returns {string} - Data URI for the SVG placeholder
 */
function createPlaceholderSvg(altText) {
  // Truncate alt text if too long
  const displayText = altText.length > 30 ? altText.substring(0, 27) + '...' : altText;
  
  // Create SVG with neutral gray background and icon
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#e9ecef"/>
      <g transform="translate(200, 150)">
        <circle cx="0" cy="-20" r="30" fill="#adb5bd" opacity="0.5"/>
        <path d="M -40 20 L -40 -10 L 40 -10 L 40 20 Z" fill="#adb5bd" opacity="0.5"/>
        <circle cx="-15" cy="-25" r="8" fill="#6c757d" opacity="0.7"/>
        <path d="M -40 20 L -10 -5 L 10 5 L 40 -15 L 40 20 Z" fill="#6c757d" opacity="0.7"/>
      </g>
      <text x="200" y="260" font-family="Arial, sans-serif" font-size="14" fill="#6c757d" text-anchor="middle">
        ${displayText}
      </text>
    </svg>
  `;
  
  // Convert SVG to data URI
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}


/**
 * Cookie Consent Management
 * Handles GDPR-compliant cookie consent and loads analytics scripts only after consent
 */

// Initialize cookie consent on page load
document.addEventListener('DOMContentLoaded', function() {
  initCookieConsent();
});

/**
 * Initialize cookie consent banner
 */
function initCookieConsent() {
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptButton = document.getElementById('cookieAccept');
  const declineButton = document.getElementById('cookieDecline');
  
  if (!cookieBanner || !acceptButton || !declineButton) {
    console.warn('Cookie banner elements not found');
    return;
  }
  
  // Check if user has already made a choice
  const cookieConsent = getCookieConsent();
  
  if (cookieConsent === null) {
    // No choice made yet, show banner
    cookieBanner.style.display = 'block';
  } else if (cookieConsent === 'accepted') {
    // User accepted, load analytics
    loadAnalytics();
  }
  // If declined, do nothing (no analytics loaded)
  
  // Accept button handler
  acceptButton.addEventListener('click', function() {
    setCookieConsent('accepted');
    hideCookieBanner();
    loadAnalytics();
  });
  
  // Decline button handler
  declineButton.addEventListener('click', function() {
    setCookieConsent('declined');
    hideCookieBanner();
  });
}

/**
 * Get cookie consent status from localStorage
 * @returns {string|null} - 'accepted', 'declined', or null if not set
 */
function getCookieConsent() {
  return localStorage.getItem('cookieConsent');
}

/**
 * Set cookie consent status in localStorage
 * @param {string} status - 'accepted' or 'declined'
 */
function setCookieConsent(status) {
  localStorage.setItem('cookieConsent', status);
  localStorage.setItem('cookieConsentDate', new Date().toISOString());
}

/**
 * Hide cookie banner with animation
 */
function hideCookieBanner() {
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    cookieBanner.style.animation = 'slideDown 0.4s ease-out';
    setTimeout(() => {
      cookieBanner.style.display = 'none';
    }, 400);
  }
}

/**
 * Load analytics scripts (Google Analytics and Cloudflare)
 * Only called after user consent
 */
function loadAnalytics() {
  // Load Google Analytics
  loadGoogleAnalytics();
  
  // Load Cloudflare Analytics
  loadCloudflareAnalytics();
}

/**
 * Load Google Analytics script
 */
function loadGoogleAnalytics() {
  // Create and load gtag.js script
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-DWDZZ6XQ7J';
  document.head.appendChild(gtagScript);
  
  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-DWDZZ6XQ7J', {
    'anonymize_ip': true // IP anonymization for GDPR compliance
  });
  
  console.log('Google Analytics loaded');
}

/**
 * Load Cloudflare Analytics script
 */
function loadCloudflareAnalytics() {
  const cfScript = document.createElement('script');
  cfScript.defer = true;
  cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  cfScript.setAttribute('data-cf-beacon', '{"token": "bbbde03f2364406bb3d864912150e838"}');
  document.head.appendChild(cfScript);
  
  console.log('Cloudflare Analytics loaded');
}

// Add slideDown animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);


/**
 * Load Latest Blog Posts for Homepage Preview
 * Displays the 3 most recent blog posts
 */
async function loadLatestBlogPosts() {
  const latestPostsContainer = document.getElementById('latestPosts');
  
  if (!latestPostsContainer) {
    return; // Not on homepage
  }
  
  try {
    // Fetch blog posts index
    const response = await fetch('blog/blog-posts.json');
    
    if (!response.ok) {
      throw new Error('Failed to load blog posts');
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    if (posts.length === 0) {
      latestPostsContainer.innerHTML = '<p class="text-center text-muted py-3">Nog geen blog artikelen beschikbaar.</p>';
      return;
    }
    
    // Sort by date (newest first) and take top 3
    const latestPosts = posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    
    // Clear loading state
    latestPostsContainer.innerHTML = '';
    
    // Create preview items
    latestPosts.forEach(post => {
      const previewItem = createBlogPreviewItem(post);
      latestPostsContainer.appendChild(previewItem);
    });
    
  } catch (error) {
    console.error('Error loading latest blog posts:', error);
    latestPostsContainer.innerHTML = '<p class="text-center text-muted py-3">Kon blog artikelen niet laden.</p>';
  }
}

/**
 * Create a blog preview item element
 * @param {Object} post - Post data
 * @returns {HTMLElement} - Preview item element
 */
function createBlogPreviewItem(post) {
  const item = document.createElement('a');
  item.href = `blog-post.html?slug=${post.slug}`;
  item.className = 'blog-preview-item';
  
  const formattedDate = formatDateShort(post.date);
  
  item.innerHTML = `
    <div class="blog-preview-content">
      <span class="blog-preview-category">${post.category}</span>
      <h3 class="blog-preview-title">${post.title}</h3>
      <div class="blog-preview-meta">
        <span class="blog-preview-date">
          <i class="bi bi-calendar3"></i>
          ${formattedDate}
        </span>
        <span class="blog-preview-read-time">
          <i class="bi bi-clock"></i>
          ${post.readTime} min
        </span>
      </div>
    </div>
    <div class="blog-preview-arrow">
      <i class="bi bi-arrow-right"></i>
    </div>
  `;
  
  return item;
}

/**
 * Format date to short Dutch format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
function formatDateShort(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Load latest blog posts on homepage
document.addEventListener('DOMContentLoaded', function() {
  loadLatestBlogPosts();
});
