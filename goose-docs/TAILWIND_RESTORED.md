# Tailwind CSS Build Restored

## Summary

Tailwind CSS compilation has been **restored** to the build process with minimal Node.js dependency.

## What Changed

### Added Files
- ✅ `package.json` - Minimal Node.js configuration (only Tailwind CSS)
- ✅ `src/input.css` - Tailwind source file with custom styles

### Updated Files
- ✅ `.github/workflows/deploy.yml` - Added Node.js + Tailwind build step
- ✅ `.github/workflows/ci.yml` - Added Node.js + Tailwind build step  
- ✅ `assets/css/main.css` - Now generated from `src/input.css`

### Configuration

**`package.json`** (73 packages, ~9s install):
```json
{
  "name": "kitchen-alxdr-ca",
  "version": "1.0.0",
  "description": "Kitchen Alexander - Recipe website",
  "private": true,
  "scripts": {
    "css:dev": "tailwindcss -i ./src/input.css -o ./assets/css/main.css --watch",
    "css:build": "tailwindcss -i ./src/input.css -o ./assets/css/main.css --minify",
    "build": "npm run css:build"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.18"
  }
}
```

## Why This Approach?

1. **Source Control**: We now have the source CSS file (`src/input.css`) in the repo
2. **Automatic Compilation**: CSS is rebuilt on every deploy/CI run
3. **Customization**: Easy to modify Tailwind styles without manual compilation
4. **Minimal Dependency**: Only Tailwind CSS (no other Node packages)
5. **Fast**: ~300ms compilation time

## Local Development

### Build CSS Once
```bash
cd ~/kitchen.alxdr.ca
./bin/npm install
./bin/npm run css:build
```

### Watch for Changes (Development)
```bash
# Terminal 1: Watch and rebuild CSS on changes
./bin/npm run css:dev

# Terminal 2: Run Jekyll with live reload
./bin/bundle exec jekyll serve --livereload
```

### Full Build
```bash
# Install dependencies
./bin/npm install

# Build CSS
./bin/npm run css:build

# Build Jekyll site
./bin/bundle exec jekyll build
```

## CI/CD Workflow

### GitHub Actions Build Process
1. Checkout code
2. Setup Node.js 20 with npm cache
3. Setup Ruby 3.1 with bundler cache
4. Install Node dependencies (`npm ci`)
5. Build Tailwind CSS (`npm run css:build`)
6. Build Jekyll site
7. Deploy to GitHub Pages

### Build Time
- **npm install**: ~5-10 seconds (with cache)
- **Tailwind build**: ~300ms
- **Jekyll build**: ~3-4 seconds
- **Total**: ~8-15 seconds

## Modifying Styles

### Edit Source CSS
Edit `src/input.css` to add custom styles or modify Tailwind configuration:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .my-custom-class {
    @apply bg-primary-600 text-white p-4 rounded-lg;
  }
}
```

### Edit Tailwind Config
Edit `tailwind.config.js` to change colors, fonts, etc.:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#your-color-here',
        }
      }
    }
  }
}
```

### Rebuild
```bash
./bin/npm run css:build
```

## File Structure

```
kitchen.alxdr.ca/
├── src/
│   └── input.css          # ← Source Tailwind CSS
├── assets/
│   └── css/
│       └── main.css       # ← Generated (committed)
├── package.json           # ← Minimal Node config
├── tailwind.config.js     # ← Tailwind configuration
└── .gitignore             # ← Ignores node_modules/
```

## What's Committed

- ✅ `src/input.css` - Source file
- ✅ `assets/css/main.css` - Generated CSS (for faster builds)
- ✅ `package.json` - Dependency config
- ✅ `tailwind.config.js` - Tailwind config
- ❌ `node_modules/` - Not committed (in `.gitignore`)
- ❌ `package-lock.json` - Not committed (in `.gitignore`)

**Note**: We commit the generated CSS so that:
1. Builds are faster (CSS doesn't need to be rebuilt if unchanged)
2. Git diffs show CSS changes
3. Fallback if Node.js build fails

## Benefits

### Compared to No Node.js
- ✅ Can modify Tailwind styles easily
- ✅ Automatic CSS compilation
- ✅ Source control for CSS
- ⚠️ Adds ~10 seconds to CI/CD builds
- ⚠️ Requires Node.js locally to modify styles

### Compared to Full Node.js Setup
- ✅ Minimal dependencies (only Tailwind)
- ✅ Fast install (~9 seconds)
- ✅ Simple configuration
- ✅ No complex build tools

## Troubleshooting

### CSS Not Updating
```bash
# Rebuild CSS
./bin/npm run css:build

# Clear Jekyll cache
rm -rf _site .jekyll-cache

# Rebuild Jekyll
./bin/bundle exec jekyll build
```

### Node Modules Missing
```bash
# Reinstall
./bin/npm install
```

### Build Fails in CI
- Check that `src/input.css` exists
- Check that `tailwind.config.js` is valid
- Check GitHub Actions logs for errors

## Related Documentation

- `NODE_REMOVAL.md` - Previous Ruby-only approach (superseded)
- `DEPLOYMENT.md` - Deployment instructions
- `CI_CD_SUMMARY.md` - CI/CD pipeline details
- `QUICK_START.md` - Getting started guide

## Migration Notes

This restores the Tailwind build process that was removed in the previous iteration. The decision to restore it was made because:

1. The theme creator intended for styles to be customizable
2. Having the source CSS file makes future modifications easier
3. The Node.js dependency is minimal (only Tailwind CLI)
4. Build time impact is acceptable (~10 seconds in CI/CD)

---

**Status**: ✅ **Active**  
**Build Method**: Node.js + Tailwind CLI  
**Dependencies**: 73 npm packages (Tailwind + deps)  
**Build Time**: ~300ms (CSS) + ~3s (Jekyll) = ~3.3s total

**Date**: November 20, 2025  
**Assistant**: Goose AI
