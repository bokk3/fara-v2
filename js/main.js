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
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}
