# Cloudflare Pages Configuration Guide

## The Problem

Your CSS and JS files are being served as `text/html` (404 error pages) instead of the actual files. This means Cloudflare Pages isn't finding them.

## Solution

### 1. Check Your Build Configuration in Cloudflare Dashboard

Go to your Cloudflare Pages project settings and ensure:

**Build Configuration:**
- **Framework preset:** None (or Static HTML)
- **Build command:** Leave empty (no build needed)
- **Build output directory:** `/` (root directory)
- **Root directory:** `/` (or leave empty)

### 2. Verify File Paths

Make sure your repository structure on GitHub/GitLab matches:
```
/
├── css/
│   ├── custom.css
│   └── custom.min.css
├── js/
│   ├── main.js
│   └── main.min.js
├── images/
├── index.html
├── _headers
└── _redirects
```

### 3. Check Branch

Ensure Cloudflare Pages is deploying from the correct branch (usually `main` or `master`).

### 4. Clear Cloudflare Cache

After fixing the configuration:
1. Go to Cloudflare Dashboard
2. Navigate to Caching → Configuration
3. Click "Purge Everything"

### 5. Force Redeploy

In Cloudflare Pages:
1. Go to your project
2. Click on the latest deployment
3. Click "Retry deployment" or push a new commit

## Common Issues

### Issue: Build output directory is wrong
**Fix:** Set it to `/` (root) since this is a static site with no build process

### Issue: Files are in a subdirectory
**Fix:** If your files are in a subdirectory like `dist/` or `public/`, set that as the build output directory

### Issue: .gitignore is excluding files
**Fix:** Check your `.gitignore` file isn't excluding `css/` or `js/` folders

## Testing

After deployment, check the Network tab in browser DevTools:
- CSS file should return `Content-Type: text/css`
- JS file should return `Content-Type: application/javascript`
- Status should be `200 OK`, not `404`

## Alternative: Use CDN Links

If the issue persists, you can temporarily use the minified versions via a CDN by uploading them to Cloudflare R2 or another CDN, but this shouldn't be necessary for a properly configured static site.
