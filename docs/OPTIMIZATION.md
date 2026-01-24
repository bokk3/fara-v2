# Website Performance Optimization Guide

This document provides step-by-step instructions to optimize the Movetofit.be website based on PageSpeed Insights recommendations.

## 1. Logo Image Optimization (Priority: HIGH)

### Current Issue
- File: `images/logo-text.png` 
- Current size: 572 KB
- Current dimensions: 765x191 pixels
- Displayed at: 112x28 pixels (desktop) and smaller on mobile
- **Estimated savings: 571.5 KB**

### Solution Steps

#### Option A: Use Online Tools (Easiest)
1. Go to https://squoosh.app/
2. Upload `images/logo-text.png`
3. Choose WebP format (right panel)
4. Set quality to 85-90%
5. Resize to 300x75 pixels (2x for retina displays)
6. Download as `logo-text.webp`
7. Upload to `images/` folder

#### Option B: Use ImageMagick (Command Line)
```bash
# Install ImageMagick first if needed
# On Mac: brew install imagemagick
# On Ubuntu: sudo apt-get install imagemagick

# Convert and optimize
convert images/logo-text.png -resize 300x75 -quality 90 images/logo-text.webp
```

#### Option C: Use Photoshop/GIMP
1. Open `images/logo-text.png`
2. Image → Image Size → Set width to 300px (maintain aspect ratio)
3. File → Export As → WebP
4. Quality: 85-90%
5. Save as `images/logo-text.webp`

### Update HTML (All Pages)

Replace in all HTML files:
```html
<!-- OLD -->
<img src="images/logo-text.png" alt="Movetofit.be - Professionele Sportcoaching & Dansles" class="navbar-logo">

<!-- NEW -->
<picture>
  <source srcset="images/logo-text.webp" type="image/webp">
  <img src="images/logo-text.png" alt="Movetofit.be - Professionele Sportcoaching & Dansles" class="navbar-logo" width="180" height="45">
</picture>
```

**Files to update:**
- index.html
- blog.html
- blog-post.html
- privacy.html
- terms.html
- 404.html

---

## 2. Render-Blocking CSS Optimization (Priority: MEDIUM)

### Current Issue
- Bootstrap CSS (27.5 KB) blocks rendering for 1,050ms
- Bootstrap Icons (14.2 KB) blocks rendering for 900ms
- Custom CSS (9.3 KB) blocks rendering for 150ms
- **Total estimated savings: 1,610ms**

### Solution: Inline Critical CSS

#### Step 1: Extract Critical CSS
The critical CSS is the minimal CSS needed for above-the-fold content. For this site, that's:
- Navigation styles
- Hero section styles
- Basic typography

#### Step 2: Defer Non-Critical CSS

Update the `<head>` section in all HTML files:

```html
<!-- Critical CSS (inline in <head>) -->
<style>
  /* Minimal critical styles - navigation and hero only */
  body{margin:0;padding-top:76px;font-family:'Open Sans',sans-serif}
  .navbar{background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.1);position:fixed;top:0;width:100%;z-index:1000;padding:1rem 0}
  .navbar-logo{height:45px;width:auto;max-width:180px}
  .hero-section{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;margin-top:-76px;padding-top:76px}
  .hero-video{position:absolute;top:-76px;left:0;width:100%;height:calc(100% + 76px);object-fit:cover;z-index:0}
  .hero-overlay{position:absolute;top:-76px;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(254,95,85,.75) 0%,rgba(230,52,98,.75) 100%);z-index:1}
  .hero-content{position:relative;z-index:2;color:#fff}
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"></noscript>

<link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></noscript>

<link rel="preload" href="css/custom.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/custom.css"></noscript>

<!-- Fallback script for older browsers -->
<script>
  !function(e){"use strict";var t=function(t,n,o){var i,r=e.document,a=r.createElement("link");if(n)i=n;else{var l=(r.body||r.getElementsByTagName("head")[0]).childNodes;i=l[l.length-1]}var d=r.styleSheets;a.rel="stylesheet",a.href=t,a.media="only x",function e(t){if(r.body)return t();setTimeout(function(){e(t)})}(function(){i.parentNode.insertBefore(a,n?i:i.nextSibling)});var f=function(e){for(var t=a.href,n=d.length;n--;)if(d[n].href===t)return e();setTimeout(function(){f(e)})};return a.addEventListener&&a.addEventListener("load",o),a.onloadcssdefined=f,f(o),a};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this);
</script>
```

---

## 3. Font Display Optimization (Priority: LOW)

### Current Issue
- Bootstrap Icons font blocks text rendering
- **Estimated savings: 30ms**

### Solution: Add font-display CSS

Create or update `css/font-optimization.css`:

```css
/* Font display optimization */
@font-face {
  font-family: 'bootstrap-icons';
  font-display: swap; /* Show fallback text immediately */
}

/* Preload critical fonts */
body {
  font-display: swap;
}
```

Add to `<head>` before other stylesheets:
```html
<link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.woff2" as="font" type="font/woff2" crossorigin>
```

---

## 4. Additional Optimizations

### A. Optimize Gallery Images

All images in `images/gallery/` should be:
- Converted to WebP format
- Resized to max 800px width
- Compressed to 80-85% quality

**Batch conversion script:**
```bash
# Install ImageMagick first
for file in images/gallery/*.jpg; do
  convert "$file" -resize 800x800\> -quality 85 "${file%.jpg}.webp"
done
```

### B. Optimize About Image

```bash
convert images/about/coach-photo.jpg -resize 600x600\> -quality 85 images/about/coach-photo.webp
```

Update in `index.html`:
```html
<picture>
  <source srcset="images/about/coach-photo.webp" type="image/webp">
  <img src="images/about/coach-photo.jpg" alt="Fara Truyens - Professionele sportcoach" class="img-fluid rounded about-image">
</picture>
```

### C. Lazy Load Images

Add `loading="lazy"` to all images except above-the-fold:

```html
<!-- Gallery images -->
<img src="images/gallery/sport-coaching-1.jpg" loading="lazy" alt="...">

<!-- About image -->
<img src="images/about/coach-photo.jpg" loading="lazy" alt="...">
```

### D. Video Optimization

Optimize `video/hero.mp4`:
1. Use HandBrake or FFmpeg
2. Target bitrate: 1-2 Mbps
3. Resolution: 1920x1080 max
4. Format: H.264 (MP4)

**FFmpeg command:**
```bash
ffmpeg -i video/hero.mp4 -vcodec h264 -crf 28 -preset slow -vf scale=1920:-2 video/hero-optimized.mp4
```

---

## 5. Implementation Priority

### Phase 1 (Immediate - Biggest Impact)
1. ✅ Optimize logo image (571 KB savings)
2. ✅ Add width/height to logo img tag
3. ✅ Convert logo to WebP with picture element

### Phase 2 (High Priority)
4. ⏳ Defer render-blocking CSS (1,610ms savings)
5. ⏳ Add critical inline CSS
6. ⏳ Optimize gallery images

### Phase 3 (Medium Priority)
7. ⏳ Add lazy loading to images
8. ⏳ Optimize about image
9. ⏳ Add font-display: swap

### Phase 4 (Low Priority)
10. ⏳ Optimize hero video
11. ⏳ Add service worker for caching
12. ⏳ Implement HTTP/2 server push

---

## 6. Testing After Changes

After each optimization:

1. **Test locally** - Ensure site still works
2. **Run PageSpeed Insights** - https://pagespeed.web.dev/
3. **Check mobile performance** - Test on actual devices
4. **Validate HTML** - https://validator.w3.org/

---

## 7. Expected Results

After implementing all optimizations:

- **LCP (Largest Contentful Paint)**: < 2.5s (currently slower)
- **FCP (First Contentful Paint)**: < 1.8s
- **Total page size**: Reduced by ~600 KB
- **PageSpeed Score**: 90+ (mobile and desktop)

---

## Need Help?

If you need assistance with any of these optimizations:
1. Logo optimization is the easiest and has the biggest impact - start there
2. Use online tools like Squoosh.app for image conversion
3. Test one change at a time to ensure nothing breaks
4. Keep backups of original files before optimizing

---

**Last Updated:** January 2026
