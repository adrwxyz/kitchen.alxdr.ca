# GitHub Actions Workflow Diagram

## Complete Development Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEVELOPER WORKFLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. Create Feature Branch
   ↓
   git checkout -b feature/new-recipe
   
2. Make Changes
   ↓
   - Add/edit recipes
   - Update styles
   - Fix bugs
   
3. Test Locally
   ↓
   npm run build
   bundle exec jekyll serve
   
4. Push & Create PR
   ↓
   git push origin feature/new-recipe
   
┌─────────────────────────────────────────────────────────────────┐
│                     CI WORKFLOW (Automatic)                     │
└─────────────────────────────────────────────────────────────────┘

Triggered: Pull Request Created/Updated

   Setup Environment
   ├── Node.js 18
   └── Ruby 3.1
   
   Install Dependencies
   ├── npm ci (with cache)
   └── bundle install (with cache)
   
   Build Tailwind CSS
   └── npm run build
   
   Verify CSS Generated
   └── Check assets/css/main.css exists
   
   Build Jekyll Site
   └── bundle exec jekyll build
   
   Verify Jekyll Build
   └── Check _site/ directory exists
   
   Check Critical Files
   ├── _site/index.html
   ├── _site/assets/css/main.css
   ├── _site/assets/js/search.js
   └── _site/assets/js/theme.js
   
   Generate Build Summary
   └── Versions, sizes, status
   
   Result: ✅ PASS or ❌ FAIL
   
┌─────────────────────────────────────────────────────────────────┐
│                     REVIEW & MERGE                              │
└─────────────────────────────────────────────────────────────────┘

If CI ✅ PASSES:
   ↓
   Code Review
   ↓
   Approve & Merge PR
   ↓
   
┌─────────────────────────────────────────────────────────────────┐
│                  DEPLOY WORKFLOW (Automatic)                    │
└─────────────────────────────────────────────────────────────────┘

Triggered: Merge to main/master

   Setup Environment
   ├── Node.js 18
   └── Ruby 3.1
   
   Install Dependencies
   ├── npm ci (with cache)
   └── bundle install (with cache)
   
   Build Tailwind CSS
   └── npm run build
   
   Configure GitHub Pages
   └── Set baseurl and paths
   
   Build Jekyll Site
   └── bundle exec jekyll build --baseurl "$baseurl"
   
   Upload Build Artifact
   └── Package _site/ directory
   
   Deploy to GitHub Pages
   └── Publish to gh-pages
   
   Result: 🚀 DEPLOYED
   
┌─────────────────────────────────────────────────────────────────┐
│                     SITE UPDATED                                │
└─────────────────────────────────────────────────────────────────┘

   Live at: https://username.github.io/repo/
   
   Time: 3-5 minutes from merge
```

## Workflow Triggers

### CI Workflow (`ci.yml`)
```yaml
Triggers:
  - pull_request → main
  - pull_request → master
  - push → main
  - push → master

Purpose:
  - Validate builds
  - Prevent broken code
  - Quick feedback
```

### Deploy Workflow (`deploy.yml`)
```yaml
Triggers:
  - push → main
  - push → master
  - workflow_dispatch (manual)

Purpose:
  - Build production site
  - Deploy to GitHub Pages
  - Keep site updated
```

## Parallel Execution

Both workflows can run simultaneously:

```
PR Created
   ├── CI Workflow (validates PR)
   └── [Waiting for merge]
   
PR Merged
   ├── CI Workflow (validates merge)
   └── Deploy Workflow (deploys site)
```

## Caching Strategy

```
First Run:
  Install npm packages    → 60s
  Install Ruby gems       → 45s
  Build Tailwind CSS      → 15s
  Build Jekyll site       → 20s
  Total: ~140s (2m 20s)

Subsequent Runs (with cache):
  Install npm packages    → 5s  (cached)
  Install Ruby gems       → 5s  (cached)
  Build Tailwind CSS      → 15s
  Build Jekyll site       → 20s
  Total: ~45s (50% faster!)
```

## Error Handling

```
Build Fails
   ↓
   Detailed Logs Available
   ↓
   Developer Notified
   ↓
   Fix & Push Again
   ↓
   CI Runs Automatically
   ↓
   Repeat Until Pass
```

## Status Indicators

### On Pull Request
```
✅ CI - Build Validation
   All checks have passed
   
   Details:
   - Tailwind CSS built successfully
   - Jekyll site built successfully
   - All critical files present
   - Build time: 1m 23s
```

### On Main Branch
```
✅ Deploy to GitHub Pages
   Deployment succeeded
   
   Details:
   - Site deployed to GitHub Pages
   - Live at: https://username.github.io/repo/
   - Deploy time: 3m 45s
```

## Best Practices

### For Contributors
1. ✅ Always wait for CI to pass
2. ✅ Fix failures promptly
3. ✅ Test locally first
4. ✅ Keep PRs focused

### For Maintainers
1. ✅ Require CI to pass before merge
2. ✅ Enable branch protection
3. ✅ Monitor workflow performance
4. ✅ Keep dependencies updated

## Quick Reference

### Check Workflow Status
```bash
# Via GitHub
https://github.com/username/repo/actions

# Via CLI (gh)
gh run list
gh run view [run-id]
```

### Manual Deployment
```bash
# Via GitHub UI
Actions → Deploy to GitHub Pages → Run workflow

# Via CLI (gh)
gh workflow run deploy.yml
```

### View Logs
```bash
# Via CLI
gh run view --log

# Via GitHub
Actions → [Workflow Run] → [Job] → [Step]
```

---

**Last Updated**: November 18, 2024  
**Workflow Version**: 1.0.0
