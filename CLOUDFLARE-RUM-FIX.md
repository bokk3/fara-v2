# Cloudflare RUM Analytics CORS/Integrity Error Fix

## The Problem

You're seeing these errors:
- CORS request blocked for `https://static.cloudflareinsights.com/beacon.min.js`
- Integrity hash mismatch

## Why This Happens

Cloudflare automatically injects the RUM analytics script, but:
1. The integrity hash might be outdated or incorrect
2. CORS headers might not be properly configured
3. The script might be cached with old headers

## Solutions

### Solution 1: Disable and Re-enable Web Analytics (Recommended)

1. Go to **Cloudflare Dashboard** → Your domain → **Speed** → **Web Analytics**
2. **Disable** Web Analytics
3. Wait 1 minute
4. **Re-enable** Web Analytics
5. This will regenerate the script with correct integrity hashes

### Solution 2: Use Cloudflare Dashboard Settings

1. Go to **Cloudflare Dashboard** → Your domain → **Speed** → **Optimization**
2. Check if "Auto Minify" is enabled for JavaScript
3. If yes, try disabling it temporarily to see if it fixes the issue
4. Also check "Rocket Loader" - disable if enabled

### Solution 3: Clear All Caches

1. **Cloudflare Cache:**
   - Dashboard → Caching → Configuration → Purge Everything

2. **Browser Cache:**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Or open in Incognito/Private mode

3. **Cloudflare Pages Cache:**
   - Go to Pages project → Deployments
   - Retry the latest deployment

### Solution 4: Check Cloudflare Settings

Go to **Cloudflare Dashboard** → Your domain → **Security** → **Settings**

Make sure these are NOT blocking the analytics:
- Security Level: Not set to "I'm Under Attack"
- Browser Integrity Check: Can be enabled (shouldn't affect this)

### Solution 5: Manual Script Installation (Alternative)

If automatic injection keeps failing, you can manually add the Web Analytics script:

1. Go to **Cloudflare Dashboard** → **Web Analytics**
2. Get your **Site Token**
3. Add this script to your HTML `<head>` section:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
```

Replace `YOUR_TOKEN_HERE` with your actual token.

### Solution 6: Disable SRI (Not Recommended for Production)

If you're testing and want to bypass integrity checks temporarily:

1. This requires Cloudflare Workers or Page Rules
2. Not recommended for production sites
3. Better to fix the root cause

## Testing

After applying a solution:

1. **Clear browser cache** (Ctrl+F5)
2. **Open DevTools** → Network tab
3. **Reload the page**
4. Check if `beacon.min.js` loads successfully (Status 200)
5. Check Console for any errors

## Expected Behavior

When working correctly:
- No CORS errors in console
- No integrity errors in console
- Network tab shows `beacon.min.js` with Status 200
- Web Analytics data appears in Cloudflare Dashboard (may take a few minutes)

## Still Not Working?

If none of these work:

1. **Contact Cloudflare Support** - This might be a Cloudflare-side issue
2. **Check Cloudflare Status** - Visit status.cloudflare.com
3. **Try a different browser** - Rule out browser-specific issues
4. **Check if it's domain-specific** - Test on a different domain

## Note

The error you're seeing is specifically about:
- **CORS**: Cross-Origin Resource Sharing policy
- **Integrity**: Subresource Integrity (SRI) hash mismatch

Both suggest the script being loaded doesn't match what Cloudflare expects. This is usually fixed by re-enabling the feature or clearing caches.
