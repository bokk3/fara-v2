# Social Sharing Setup Guide

## What I've Added

I've added Open Graph and Twitter Card meta tags to your website so that when people share your site on social media, it will display beautifully with:
- Your logo
- The slogan "Van stilzitten naar stralen ✨"
- A description
- A preview image

## What You Need to Do

### 1. Create a Social Sharing Image (OG Image)

You need to create an image file called `og-image.jpg` and place it in the `images/` folder.

**Image Specifications:**
- **Size:** 1200 x 630 pixels (this is the standard for Facebook, LinkedIn, Twitter)
- **Format:** JPG or PNG
- **File size:** Keep under 1MB for fast loading

**What to Include in the Image:**
- Your MoveToFit.be logo
- The slogan: "Van stilzitten naar stralen ✨"
- Optional: A background image showing sports/dance activity
- Optional: Your photo
- Use your brand colors (the green/teal palette)

**Design Tips:**
- Keep important content in the center (some platforms crop the edges)
- Use high contrast text so it's readable
- Make the logo and slogan prominent
- Test on a mobile device to ensure text is readable

**Tools You Can Use:**
- Canva (free, has social media templates)
- Figma (free)
- Photoshop
- Any graphic design tool

### 2. Update the URL

In `index.html`, find these lines and update the URL to your actual domain:

```html
<meta property="og:url" content="https://movetofit.be/">
<meta property="og:image" content="https://movetofit.be/images/og-image.jpg">
```

Replace `https://movetofit.be/` with your actual website URL.

### 3. Test Your Social Sharing

After uploading your og-image.jpg and deploying your site, test how it looks:

**Facebook/LinkedIn:**
- Go to: https://developers.facebook.com/tools/debug/
- Enter your website URL
- Click "Scrape Again" to refresh the cache
- You'll see a preview of how your site will appear when shared

**Twitter:**
- Go to: https://cards-dev.twitter.com/validator
- Enter your website URL
- You'll see a preview of the Twitter card

**WhatsApp:**
- Just paste your URL in a WhatsApp chat (to yourself)
- You'll see the preview

### 4. Optional: Create Multiple Sizes

For best results across all platforms, you can create additional sizes:
- **Square (1:1):** 1200 x 1200 pixels (for Instagram, WhatsApp)
- **Portrait (4:5):** 1080 x 1350 pixels (for Instagram Stories)

Save these as:
- `images/og-image-square.jpg`
- `images/og-image-portrait.jpg`

## What's Already Configured

✅ Open Graph meta tags (Facebook, LinkedIn, WhatsApp)
✅ Twitter Card meta tags
✅ SEO meta tags (description, keywords, author)
✅ Favicon link (uses your logo.png)
✅ Canonical URL
✅ Dutch locale (nl_BE)

## Quick Checklist

- [ ] Create og-image.jpg (1200 x 630 pixels)
- [ ] Place it in the `images/` folder
- [ ] Update the URL in meta tags to your actual domain
- [ ] Upload to your web hosting
- [ ] Test with Facebook Debugger
- [ ] Test with Twitter Card Validator
- [ ] Share on WhatsApp to test

## Example OG Image Layout

```
┌─────────────────────────────────────────┐
│                                         │
│         [MoveToFit.be Logo]            │
│                                         │
│    Van stilzitten naar stralen ✨      │
│                                         │
│  Professionele Sportcoaching & Dansles │
│              met Fara Truyens          │
│                                         │
│     [Optional: Background Image]       │
│                                         │
└─────────────────────────────────────────┘
```

## Need Help?

If you need help creating the image, you can:
1. Use Canva's "Facebook Post" template (it's the right size)
2. Hire a designer on Fiverr (search "social media image")
3. Ask a friend with design skills

The most important thing is to have your logo and slogan clearly visible!
