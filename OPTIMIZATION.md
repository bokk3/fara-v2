# Performance Optimization Documentation

## File Minification

This document describes the CSS and JavaScript minification process for the Coach Dance Website.

### Minification Results

The following files have been minified for production use:

#### CSS Files
- **Original**: `css/custom.css` - 35.6 KB (2010 lines)
- **Minified**: `css/custom.min.css` - 22.9 KB (1 line)
- **Reduction**: 12.7 KB (35.6% smaller)

#### JavaScript Files
- **Original**: `js/main.js` - 18.8 KB (629 lines)
- **Minified**: `js/main.min.js` - 7.8 KB (1 line)
- **Reduction**: 11.0 KB (58.6% smaller)

#### Total Savings
- **Combined reduction**: 23.7 KB (43.5% smaller)
- **Page load improvement**: Faster initial page load and reduced bandwidth usage

### How to Use Minified Files

For **production deployment**, update the HTML file to use the minified versions:

```html
<!-- Replace this: -->
<link rel="stylesheet" href="css/custom.css">
<script src="js/main.js"></script>

<!-- With this: -->
<link rel="stylesheet" href="css/custom.min.css">
<script src="js/main.min.js"></script>
```

For **development**, continue using the original unminified files for easier debugging.

### Regenerating Minified Files

If you make changes to the CSS or JavaScript files, regenerate the minified versions using these commands:

#### Minify CSS
```bash
npx clean-css-cli css/custom.css -o css/custom.min.css
```

#### Minify JavaScript
```bash
npx terser js/main.js -o js/main.min.js -c -m
```

### Tools Used

- **clean-css-cli**: CSS minification tool that removes whitespace, comments, and optimizes CSS
- **terser**: JavaScript minification tool that compresses and mangles code while preserving functionality

### Performance Impact

The minified files provide the following benefits:

1. **Reduced bandwidth**: 43.5% smaller file sizes mean less data transfer
2. **Faster page loads**: Smaller files download and parse faster
3. **Better mobile experience**: Reduced data usage for mobile users
4. **Improved SEO**: Faster page loads contribute to better search rankings

### File Size Requirements

According to Requirement 9.2, CSS and JavaScript files should be minimized. The minified versions meet this requirement:

- ✅ CSS file is reasonably sized at 22.9 KB
- ✅ JavaScript file is reasonably sized at 7.8 KB
- ✅ Combined size of 30.7 KB is well within acceptable limits for a static website

### Notes

- The original unminified files are kept for development and maintenance
- Both versions are included in the repository
- The HTML file currently references the unminified versions for development
- Update to minified versions before deploying to production
- No build process is required - minification can be done manually when needed

### Image Optimization (Task 12.1)

**Status**: Pending

Image optimization (Task 12.1) has been deferred. When ready to optimize images:

1. **Compress images** using tools like:
   - TinyPNG (https://tinypng.com/)
   - ImageOptim (Mac)
   - Squoosh (https://squoosh.app/)

2. **Target file sizes**:
   - Regular images: < 500 KB
   - Hero images: < 1 MB

3. **Convert to WebP** with JPEG fallback:
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="Description">
   </picture>
   ```

4. **Ensure appropriate dimensions** - don't use oversized images

Once images are added to the project, run them through optimization tools before deployment.
