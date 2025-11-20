# ⚡ Quick Start Guide

Get your recipe site up and running in 10 minutes!

## 🎯 What You'll Get

- ✅ Beautiful recipe website
- ✅ Search functionality
- ✅ Dark/light mode
- ✅ Mobile responsive
- ✅ Free hosting on GitHub Pages

## 📋 Before You Start

You need:
- [ ] A GitHub account (free at [github.com](https://github.com))
- [ ] Git installed ([download here](https://git-scm.com/downloads))
- [ ] 10 minutes of time

**Note**: For local development, you'll also need Ruby and Bundler. But for just deploying to GitHub Pages, the above is enough!

## 🚀 Steps

### 1. Download This Theme

```bash
# Download or clone this repository
cd ~
git clone https://github.com/yourusername/new-jekyll-recipe-starter.git my-recipes
cd my-recipes
```

Or download the ZIP and extract it.

### 2. Customize Your Site

Edit `_config.yml`:

```yaml
title: Smith Family Recipes          # Change this
description: Our favorite recipes    # Change this
author:
  name: The Smith Family            # Change this
  email: smith@example.com          # Change this
```

### 3. Add Your First Recipe

Create `_recipes/chocolate-cake.md`:

```yaml
---
layout: recipe
title: "Chocolate Cake"
description: "The best chocolate cake ever"
date: 2024-01-15
categories: [Desserts]
tags: [chocolate, cake]
difficulty: Easy
prep_time: 20
cook_time: 35
total_time: 55
servings: 8

ingredients:
  - "2 cups flour"
  - "1 cup sugar"
  - "1/2 cup cocoa powder"

instructions:
  - "Mix dry ingredients"
  - "Add wet ingredients"
  - "Bake at 350°F for 35 minutes"
---

This has been our family favorite for years!
```

### 4. Deploy to GitHub

```bash
# Initialize git
git init
git add .
git commit -m "My recipe site"

# Create repository on GitHub (github.com)
# Then run these commands (replace with your info):

git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

**Note**: The CSS is already compiled - no build step needed!

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select branch: **main**
4. Click **Save**
5. Wait 2-3 minutes

Your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

### 6. Update Base URL

Edit `_config.yml`:

```yaml
baseurl: "/YOUR-REPO"  # e.g., "/family-recipes"
```

Push the change:

```bash
git add _config.yml
git commit -m "Update baseurl"
git push
```

## ✅ You're Done!

Your recipe site is now live! 🎉

## 📝 Next Steps

### Add More Recipes

Just create more files in `_recipes/`:

```bash
_recipes/
  ├── chocolate-cake.md
  ├── apple-pie.md
  ├── spaghetti.md
  └── ...
```

### Add Images

1. Create folder: `assets/images/recipes/recipe-name/`
2. Add your image: `hero.jpg`
3. Reference in recipe front matter:
   ```yaml
   image: /assets/images/recipes/recipe-name/hero.jpg
   ```

### Customize Colors

See [NODE_REMOVAL.md](NODE_REMOVAL.md) for instructions on modifying Tailwind CSS if needed. The CSS is pre-compiled, so no build step is required for normal use.

### Update Content

- **Homepage**: Edit `index.html`
- **About page**: Edit `pages/about.md`
- **Categories**: Edit files in `categories/`

## 🔄 Making Updates

Every time you want to update your site:

```bash
# 1. Make your changes (add recipes, edit files, etc.)

# 2. Commit and push
git add .
git commit -m "Added new recipe"
git push

# 3. Wait 2-3 minutes for GitHub to rebuild
```

## 🆘 Need Help?

### Site Not Loading?
- Wait 3-5 minutes after first deployment
- Check that `baseurl` in `_config.yml` matches your repo name
- Hard refresh browser (Ctrl+Shift+R)

### Images Not Showing?
- Check image paths start with `/assets/`
- Verify image files are committed to git
- Check file names match exactly (case-sensitive)

### Build Failed?
1. Go to repository → **Actions** tab
2. Click on the failed build
3. Look for error messages
4. Fix the issue and push again

## 📚 More Resources

- [Full README](README.md) - Complete documentation
- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [Jekyll Docs](https://jekyllrb.com/docs/) - Jekyll documentation

## 🎨 Customization Ideas

Once you're comfortable:
- [ ] Add your own logo
- [ ] Change color scheme
- [ ] Add more categories
- [ ] Create custom pages
- [ ] Add Google Analytics
- [ ] Set up custom domain

## 💡 Pro Tips

1. **Write recipes in batches** - Add 5-10 recipes at once
2. **Use consistent naming** - `recipe-name.md` (lowercase, hyphens)
3. **Optimize images first** - Compress before uploading
4. **Test locally** - Install Jekyll to preview changes
5. **Commit often** - Small commits are easier to track

## 🎉 Share Your Site!

Once it's live, share with:
- Family members
- Friends
- Social media
- Recipe communities

---

**Questions?** Check the [README](README.md) or create an issue on GitHub.

Happy cooking! 👨‍🍳👩‍🍳
