/**
 * Blog Listing Page JavaScript
 * Loads and displays all blog posts from blog-posts.json
 */

document.addEventListener('DOMContentLoaded', function() {
  loadBlogPosts();
});

/**
 * Load and display all blog posts
 */
async function loadBlogPosts() {
  const blogPostsContainer = document.getElementById('blogPosts');
  const noPostsMessage = document.getElementById('noPosts');
  
  try {
    // Fetch blog posts index
    const response = await fetch('blog/blog-posts.json');
    
    if (!response.ok) {
      throw new Error('Failed to load blog posts');
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    // Clear loading spinner
    blogPostsContainer.innerHTML = '';
    
    if (posts.length === 0) {
      // Show no posts message
      noPostsMessage.style.display = 'block';
      return;
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create post cards
    posts.forEach(post => {
      const postCard = createPostCard(post);
      blogPostsContainer.appendChild(postCard);
    });
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    blogPostsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: #F56565;"></i>
        <h3 class="mt-3">Fout bij laden van blog artikelen</h3>
        <p class="text-muted">Probeer de pagina opnieuw te laden.</p>
      </div>
    `;
  }
}

/**
 * Create a blog post card element
 * @param {Object} post - Post data
 * @returns {HTMLElement} - Post card element
 */
function createPostCard(post) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4';
  
  const formattedDate = formatDate(post.date);
  
  col.innerHTML = `
    <a href="blog-post.html?slug=${post.slug}" class="blog-card-link">
      <div class="card blog-card">
        <div class="blog-card-image"></div>
        <div class="card-body">
          <span class="blog-card-category">${post.category}</span>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-date">
            <i class="bi bi-calendar3 me-2"></i>${formattedDate}
            <span class="mx-2">•</span>
            <i class="bi bi-clock me-2"></i>${post.readTime} min
          </p>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <span class="btn btn-primary btn-sm mt-2">
            Lees meer <i class="bi bi-arrow-right ms-2"></i>
          </span>
        </div>
      </div>
    </a>
  `;
  
  return col;
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
