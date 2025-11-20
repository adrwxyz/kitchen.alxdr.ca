# Node.js Removal - Ruby-Only Build

## Summary

The Jekyll site has been configured to build using **Ruby only** - no Node.js or npm required!

## What Changed

### Removed
- ❌ No `package.json` needed
- ❌ No `node_modules` directory
- ❌ No npm build steps in CI/CD
- ❌ Removed old Gatsby workflow (`.github/workflows/main.yml`)

### Kept
- ✅ Pre-compiled Tailwind CSS (`assets/css/main.css` - 27KB)
- ✅ `tailwind.config.js` (just a config file, doesn't require Node.js to exist)
- ✅ All Jekyll functionality
- ✅ All custom JavaScript (search, theme, lightbox, recipe features)

## How It Works

The Tailwind CSS was **pre-compiled by the theme creator** and included in the original Jekyll theme as `assets/css/main.css` (27KB). When you copied the theme to your site during migration, this compiled CSS came with it.

Jekyll simply copies this static CSS file to the `_site` directory during build - no compilation step needed! The CSS contains all the Tailwind utility classes used by the theme's HTML templates.

### Where Did the CSS Come From?

The original `new-jekyll-recipe-starter` theme creator:
1. Created a Tailwind configuration (`tailwind.config.js`)
2. Used Node.js + Tailwind CLI to compile the CSS
3. **Committed the compiled CSS** to the theme repository
4. Documented that users would need Node.js to *modify* styles

During your migration, we:
1. Copied the entire theme (including pre-compiled CSS)
2. Realized the CSS was already compiled and committed
3. Removed Node.js from the build process since it's not needed
4. Updated CI/CD to skip the compilation step

**Result:** You inherited a working, compiled CSS file that doesn't need to be rebuilt unless you want to change the styling.

### Local Development

```bash
# Build the site
./bin/bundle exec jekyll build

# Serve locally with live reload
./bin/bundle exec jekyll serve --livereload

# Or with custom port
./bin/bundle exec jekyll serve --port 4001 --livereload
```

### CI/CD

The GitHub Actions workflows have been updated:

**`.github/workflows/deploy.yml`**
- Removed Node.js setup
- Removed npm install/build steps
- Now only uses Ruby + Jekyll

**`.github/workflows/ci.yml`**
- Removed Node.js setup
- Removed npm install/build steps
- Verifies CSS file exists (should be committed)
- Validates Jekyll build

## If You Need to Modify Tailwind CSS

If you ever need to change Tailwind styles, you have two options:

### Option 1: Use Tailwind Standalone CLI (Recommended)
Download the standalone Tailwind CLI binary (no Node.js required):

```bash
# Download standalone CLI
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64
mv tailwindcss-macos-arm64 tailwindcss

# Build CSS
./tailwindcss -i assets/css/input.css -o assets/css/main.css --minify

# Watch for changes
./tailwindcss -i assets/css/input.css -o assets/css/main.css --watch
```

### Option 2: Use Ruby Gem (Future)
There's a `tailwindcss-ruby` gem that could be added to the Gemfile if needed.

### Option 3: Temporary Node.js (If Necessary)
If you absolutely need npm temporarily:

```bash
# Create minimal package.json
cat > package.json << 'EOF'
{
  "name": "kitchen-alxdr-ca",
  "private": true,
  "scripts": {
    "build": "tailwindcss -i assets/css/input.css -o assets/css/main.css --minify",
    "watch": "tailwindcss -i assets/css/input.css -o assets/css/main.css --watch"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
EOF

# Install and build
npm install
npm run build

# Then remove Node.js artifacts
rm -rf node_modules package-lock.json
```

**Important:** Don't commit `package.json`, `package-lock.json`, or `node_modules` to the repo.

## Benefits

1. **Simpler Setup**: Only Ruby/Jekyll required for development
2. **Faster CI/CD**: No npm install step (saves ~30-60 seconds per build)
3. **Smaller Repo**: No `node_modules` or lock files
4. **Less Maintenance**: Fewer dependencies to update
5. **Cleaner**: One language ecosystem instead of two

## Files

- ✅ `assets/css/main.css` - Pre-compiled Tailwind CSS (committed)
- ✅ `tailwind.config.js` - Tailwind configuration (kept for reference)
- ✅ `Gemfile` - Ruby dependencies only
- ❌ `package.json` - Not needed (removed)
- ❌ `package-lock.json` - Not needed (removed)
- ❌ `node_modules/` - Not needed (never created)

## Verification

```bash
# Verify Jekyll builds without Node.js
cd ~/kitchen.alxdr.ca
./bin/bundle exec jekyll build

# Should complete successfully with output:
# Configuration file: /Users/adrw/kitchen.alxdr.ca/_config.yml
#             Source: /Users/adrw/kitchen.alxdr.ca
#        Destination: /Users/adrw/kitchen.alxdr.ca/_site
#       Generating... 
#        Jekyll Feed: Generating feed for posts
#                     done in ~3-4 seconds.
```

## Related Documentation

- `DEPLOYMENT.md` - Deployment process
- `CI_CD_SUMMARY.md` - CI/CD pipeline details
- `QUICK_START.md` - Getting started guide
