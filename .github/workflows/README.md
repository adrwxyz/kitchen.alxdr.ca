# GitHub Actions Workflows

This directory contains GitHub Actions workflows for continuous integration and deployment.

## Workflows

### 1. CI - Build Validation (`ci.yml`)

**Triggers**:
- Pull requests to `main` or `master` branches
- Pushes to `main` or `master` branches

**Purpose**: Validates that the site builds correctly before merging

**Steps**:
1. ✅ Checkout code
2. ✅ Setup Node.js (v18) and Ruby (v3.1)
3. ✅ Install dependencies (npm and bundler)
4. ✅ Build Tailwind CSS
5. ✅ Verify CSS file was generated
6. ✅ Build Jekyll site
7. ✅ Verify Jekyll build output
8. ✅ Check for critical files
9. ✅ Generate build summary

**Use Case**: 
- Runs on every PR to ensure changes don't break the build
- Provides quick feedback to contributors
- Prevents broken code from being merged

**Status Badge**:
```markdown
![CI](https://github.com/yourusername/your-repo/workflows/CI%20-%20Build%20Validation/badge.svg)
```

### 2. Deploy to GitHub Pages (`deploy.yml`)

**Triggers**:
- Pushes to `main` or `master` branches
- Manual workflow dispatch

**Purpose**: Builds and deploys the site to GitHub Pages

**Steps**:
1. ✅ Checkout code
2. ✅ Setup Node.js and Ruby
3. ✅ Install dependencies
4. ✅ Build Tailwind CSS
5. ✅ Build Jekyll site with proper baseurl
6. ✅ Upload build artifact
7. ✅ Deploy to GitHub Pages

**Use Case**:
- Automatically deploys when changes are merged to main/master
- Can be manually triggered from Actions tab
- Ensures production site is always up-to-date

**Status Badge**:
```markdown
![Deploy](https://github.com/yourusername/your-repo/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

## Workflow Diagram

```
Pull Request Created
        ↓
    CI Workflow
        ↓
   Build & Validate
        ↓
    ✅ or ❌
        ↓
   Merge to Main
        ↓
  Deploy Workflow
        ↓
Build & Deploy to Pages
        ↓
   Site Updated 🎉
```

## Setup Instructions

### For GitHub Pages Deployment

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save

2. **Configure Repository**:
   - The workflows are already configured
   - No additional setup needed!

3. **First Deployment**:
   - Push to `main` or `master` branch
   - Or manually trigger from Actions tab
   - Wait 2-3 minutes for deployment

### For Custom Domain

If using a custom domain:

1. Add `CNAME` file to repository root:
   ```
   yourdomain.com
   ```

2. Configure DNS with your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: yourusername.github.io
   ```

3. Enable HTTPS in GitHub Pages settings

## Environment Variables

The workflows use these environment variables:

- `JEKYLL_ENV`: Set to `production` for optimized builds
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
- `base_path`: Automatically configured by `actions/configure-pages`

## Caching

Both workflows use caching to speed up builds:

- **npm cache**: Caches `node_modules` based on `package-lock.json`
- **bundler cache**: Caches Ruby gems based on `Gemfile.lock`

This reduces build time from ~3 minutes to ~1 minute on subsequent runs.

## Troubleshooting

### Build Fails on CI

1. **Check the logs**: Click on the failed workflow run
2. **Common issues**:
   - Missing `package-lock.json`: Run `npm install` locally and commit
   - Missing `Gemfile.lock`: Run `bundle install` locally and commit
   - Tailwind CSS errors: Check `tailwind.config.js` syntax
   - Jekyll errors: Check `_config.yml` and front matter

### Deployment Fails

1. **Check GitHub Pages settings**: Ensure "GitHub Actions" is selected as source
2. **Check permissions**: Workflows need `pages: write` permission (already configured)
3. **Check branch**: Ensure you're pushing to `main` or `master`

### Site Not Updating

1. **Check workflow status**: Go to Actions tab and verify deployment succeeded
2. **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. **Wait a few minutes**: GitHub Pages can take 2-5 minutes to update
4. **Check baseurl**: Ensure `_config.yml` has correct `baseurl` for your repo

## Customization

### Change Build Node/Ruby Versions

Edit the workflow files:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change version here

- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    ruby-version: '3.2'  # Change version here
```

### Add Additional Checks

Add steps to `ci.yml`:

```yaml
- name: Run tests
  run: npm test

- name: Lint CSS
  run: npm run lint:css

- name: Check links
  run: bundle exec htmlproofer ./_site
```

### Deploy to Different Branch

Change the trigger in `deploy.yml`:

```yaml
on:
  push:
    branches: ["production"]  # Deploy from production branch
```

## Best Practices

1. **Always create PRs**: Let CI validate before merging
2. **Review CI logs**: Check for warnings even if build passes
3. **Test locally first**: Run `npm run build && bundle exec jekyll build`
4. **Keep dependencies updated**: Regularly update Node.js, Ruby, and gems
5. **Monitor build times**: Optimize if builds take too long

## Status Badges

Add to your README.md:

```markdown
# My Recipe Site

[![CI](https://github.com/yourusername/your-repo/workflows/CI%20-%20Build%20Validation/badge.svg)](https://github.com/yourusername/your-repo/actions)
[![Deploy](https://github.com/yourusername/your-repo/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/yourusername/your-repo/actions)
```

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll CI/CD Guide](https://jekyllrb.com/docs/continuous-integration/)
- [Tailwind CSS CLI](https://tailwindcss.com/docs/installation)

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review workflow logs in the Actions tab
3. Create an issue in the repository
4. Check GitHub Status for platform issues

---

**Note**: These workflows are optimized for GitHub Pages deployment. For other hosting providers (Netlify, Vercel, etc.), you may need to modify the deployment steps.
