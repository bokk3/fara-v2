/**
 * Blog Post Page JavaScript
 * Loads and renders individual blog post from markdown file
 */

document.addEventListener('DOMContentLoaded', function() {
  loadBlogPost();
});

/**
 * Load and display blog post
 */
async function loadBlogPost() {
  // Get slug from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  if (!slug) {
    showError();
    return;
  }
  
  try {
    // Load blog posts index to get post metadata
    const indexResponse = await fetch('blog/blog-posts.json');
    if (!indexResponse.ok) {
      throw new Error('Failed to load blog index');
    }
    
    const indexData = await indexResponse.json();
    const post = indexData.posts.find(p => p.slug === slug);
    
    if (!post) {
      showError();
      return;
    }
    
    // Load markdown content
    const contentResponse = await fetch(`blog/posts/${post.file}`);
    if (!contentResponse.ok) {
      throw new Error('Failed to load post content');
    }
    
    const markdown = await contentResponse.text();
    
    // Render post
    renderPost(post, markdown);
    
  } catch (error) {
    console.error('Error loading blog post:', error);
    showError();
  }
}

/**
 * Render blog post
 * @param {Object} post - Post metadata
 * @param {string} markdown - Markdown content
 */
function renderPost(post, markdown) {
  // Hide loading, show content
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('postHeader').style.display = 'block';
  document.getElementById('postContent').style.display = 'block';
  
  // Set page title
  document.getElementById('pageTitle').textContent = `${post.title} - Movetofit.be`;
  document.title = `${post.title} - Movetofit.be`;
  
  // Set meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', post.excerpt);
  }
  
  // Set header content
  document.getElementById('postCategory').textContent = post.category;
  document.getElementById('postTitle').textContent = post.title;
  document.getElementById('postDate').textContent = formatDate(post.date);
  document.getElementById('postReadTime').textContent = post.readTime;
  
  // Parse and render markdown
  const htmlContent = marked.parse(markdown);
  document.getElementById('postBody').innerHTML = htmlContent;
}

/**
 * Show error state
 */
function showError() {
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('errorState').style.display = 'block';
}

/**
 * Format date to Dutch locale
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-BE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
