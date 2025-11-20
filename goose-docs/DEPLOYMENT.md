# 🚀 Deployment Guide

This guide will help you deploy your Jekyll recipe site to GitHub Pages (free hosting!).

## Prerequisites

- A GitHub account (free at [github.com](https://github.com))
- Git installed on your computer
- Your recipe content ready to go

## Option 1: Deploy to GitHub Pages (Recommended)

GitHub Pages will automatically build your Jekyll site for you - no local setup required!

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `family-recipes`)
4. Make it Public (required for free GitHub Pages)
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open Terminal/Command Prompt and run these commands:

```bash
cd ~/new-jekyll-recipe-starter

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Jekyll recipe site"

# Add your GitHub repository as remote (replace with your username and repo name)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Pages" (left sidebar)
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

### Step 4: Wait for Deployment

- GitHub will automatically build your site
- This takes 1-3 minutes
- You'll see a green checkmark when it's ready
- Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Step 5: Update Base URL

Edit `_config.yml` and update the `baseurl`:

```yaml
baseurl: "/YOUR-REPO-NAME"  # e.g., "/family-recipes"
```

Commit and push this change:

```bash
git add _config.yml
git commit -m "Update baseurl for GitHub Pages"
git push
```

Wait another minute for the site to rebuild.

## Option 2: Custom Domain (Optional)

Want to use your own domain like `recipes.yourfamily.com`?

### Step 1: Add CNAME File

Create a file named `CNAME` in the root directory:

```
recipes.yourfamily.com
```

### Step 2: Configure DNS

Add these DNS records with your domain provider:

For subdomain (recipes.yourfamily.com):
```
Type: CNAME
Name: recipes
Value: YOUR-USERNAME.github.io
```

For apex domain (yourfamily.com):
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### Step 3: Enable Custom Domain in GitHub

1. Go to repository Settings → Pages
2. Enter your custom domain
3. Wait for DNS check to complete
4. Enable "Enforce HTTPS" (recommended)

## Making Updates

After your initial deployment, updating is easy:

```bash
# Make your changes (add recipes, edit content, etc.)

# Stage changes
git add .

# Commit with a message
git commit -m "Added grandma's apple pie recipe"

# Push to GitHub
git push

# GitHub will automatically rebuild and deploy (1-3 minutes)
```

## Testing Before Deployment

### Option 1: Local Testing (Requires Ruby)

If you have Ruby installed:

```bash
# Install dependencies (first time only)
bundle install

# Run local server
bundle exec jekyll serve

# Open http://localhost:4000 in your browser
```

### Option 2: Use GitHub's Build

Just push to GitHub and check the live site. If there are errors:

1. Go to repository → Actions tab
2. Click on the latest workflow run
3. Check for error messages
4. Fix issues and push again

## Common Issues

### Site Shows 404 or Broken Styles

**Problem**: `baseurl` is incorrect in `_config.yml`

**Solution**: 
- For `username.github.io/repo-name`, use `baseurl: "/repo-name"`
- For custom domain, use `baseurl: ""`

### Images Not Showing

**Problem**: Image paths are incorrect

**Solution**: Use relative URLs in front matter:
```yaml
image: /assets/images/recipes/recipe-name/hero.jpg
```

### Build Fails on GitHub

**Problem**: Syntax error in YAML front matter or config

**Solution**: 
1. Check Actions tab for error details
2. Validate YAML at [yamllint.com](http://www.yamllint.com/)
3. Ensure all front matter has proper formatting

### Changes Not Appearing

**Problem**: Browser cache or GitHub build delay

**Solution**:
1. Wait 2-3 minutes for GitHub to rebuild
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Actions tab to see if build completed

## Monitoring Your Site

### Check Build Status

1. Go to your repository on GitHub
2. Click "Actions" tab
3. See all builds and their status
4. Click on any build to see details

### View Build Logs

If a build fails:
1. Actions tab → Click failed build
2. Click "build" job
3. Expand sections to see error messages

## Performance Tips

### Optimize Images

Before uploading images:
1. Resize to recommended dimensions
2. Compress using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - ImageOptim (Mac)

### Enable Caching

GitHub Pages automatically handles caching, but you can help:
- Use consistent image names
- Don't rename files unnecessarily
- Let browsers cache assets

## Security

### HTTPS

- GitHub Pages provides free HTTPS
- Always enable "Enforce HTTPS" in settings
- Required for custom domains after DNS propagates

### Private Recipes

If you need private recipes:
- GitHub Pages requires public repositories for free hosting
- Consider GitHub Pro ($4/month) for private repos
- Or use Netlify/Vercel which offer private repos on free tier

## Backup

Your repository IS your backup, but for extra safety:

```bash
# Clone to another location
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git backup-folder

# Or download ZIP from GitHub
# Repository page → Code button → Download ZIP
```

## Getting Help

### GitHub Pages Documentation
- [Official Docs](https://docs.github.com/en/pages)
- [Jekyll Docs](https://jekyllrb.com/docs/)

### Troubleshooting
1. Check Actions tab for build errors
2. Review this guide's Common Issues section
3. Search GitHub Issues for similar problems
4. Create an issue in your repository

## Next Steps

After deployment:
1. ✅ Add more recipes
2. ✅ Customize colors and branding
3. ✅ Share your site with family
4. ✅ Set up custom domain (optional)
5. ✅ Add Google Analytics (optional)

---

Happy cooking and happy deploying! 🎉
