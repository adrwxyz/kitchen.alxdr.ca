# GitHub Copilot Instructions for kitchen.alxdr.ca

## Repository Overview

This is a recipe website built with Jekyll and Tailwind CSS. It displays recipes from the Alexander Kitchen at [kitchen.alxdr.ca](https://kitchen.alxdr.ca).

## Technology Stack

- **Jekyll**: Static site generator
- **Tailwind CSS v4**: CSS framework for styling
- **Ruby 3.1+**: Required for Jekyll
- **Node.js 20+**: Required for Tailwind CSS build

## Project Structure

- `_recipes/`: Recipe collection files (Markdown)
- `_layouts/`: Jekyll layout templates
- `_includes/`: Reusable Jekyll components (header, footer, recipe cards, etc.)
- `assets/`: Static assets (CSS, JavaScript, images)
- `src/`: Source files for Tailwind CSS
- `_config.yml`: Jekyll configuration

## Building the Project

### Install Dependencies

```bash
# Install Ruby dependencies
bundle install

# Install Node.js dependencies
npm install
```

### Build Commands

```bash
# Build Tailwind CSS (production)
npm run css:build

# Watch Tailwind CSS for changes (development)
npm run css:dev

# Build Jekyll site
bundle exec jekyll build

# Serve Jekyll site locally
bundle exec jekyll serve
```

### Testing

The CI workflow validates:
- Tailwind CSS builds successfully
- Jekyll site builds without errors
- Critical files are present in the build output

## Code Conventions

### Theme and UI Changes

**IMPORTANT**: Every change to the theme or UI **MUST** include before and after screenshots or videos in the PR description.

This includes changes to:
- CSS styles and Tailwind classes
- Layout files (`_layouts/`)
- Include files (`_includes/`)
- Visual components (recipe cards, headers, footers, etc.)
- Color schemes or theme settings
- Any other visual elements

### Screenshots/Videos Guidelines

1. Capture screenshots that clearly show the affected areas
2. Include both **before** (current state) and **after** (proposed changes) views
3. For interactive elements, consider using short videos or GIFs
4. Screenshots should be taken at common viewport sizes (mobile, tablet, desktop)
5. Add clear labels to indicate which is before vs. after

Example PR description format:
```markdown
## Changes

Brief description of what changed.

## Visual Changes

### Before
![Before Screenshot](url-to-before-screenshot)

### After
![After Screenshot](url-to-after-screenshot)
```

## Pull Request Process

### Required Steps for ALL Pull Requests

1. **Assign Copilot Reviewer**: Every PR must have GitHub Copilot Reviewer assigned for automated code review
2. **CI Validation**: Ensure all CI checks pass
3. **Visual Documentation**: For theme/UI changes, include before/after screenshots or videos

### PR Checklist

- [ ] Code changes are tested locally
- [ ] Build passes (`npm run css:build && bundle exec jekyll build`)
- [ ] For theme/UI changes: Before and after screenshots/videos included
- [ ] GitHub Copilot Reviewer assigned to the PR
- [ ] PR description clearly explains the changes

## File Editing Guidelines

### Jekyll Templates

- Use consistent indentation (2 spaces)
- Follow Liquid template syntax best practices
- Keep layouts DRY (Don't Repeat Yourself)

### Tailwind CSS

- Use Tailwind utility classes whenever possible
- Avoid custom CSS unless necessary
- Follow the Tailwind CSS v4 syntax
- Source files are in `src/input.css`

### Recipe Files

- Recipe files are in `_recipes/` directory
- Use Markdown format with YAML front matter
- Required front matter fields typically include: title, description, servings, prep time, cook time, ingredients, instructions

## Common Tasks

### Adding a New Recipe

1. Create a new Markdown file in `_recipes/`
2. Add required front matter
3. Write recipe content in Markdown
4. Build and test locally
5. Create PR with screenshots of how the recipe appears on the site

### Modifying Styles

1. Edit `src/input.css` for custom styles
2. Run `npm run css:dev` to watch for changes
3. Test changes in browser
4. Capture before/after screenshots
5. Run `npm run css:build` for production build
6. Create PR with visual documentation

### Updating Layouts or Components

1. Modify the appropriate file in `_layouts/` or `_includes/`
2. Test with `bundle exec jekyll serve`
3. Capture before/after screenshots showing the affected pages
4. Create PR with visual documentation and Copilot Reviewer assigned

## Getting Help

- Review existing recipes and layouts for examples
- Check the Jekyll documentation: https://jekyllrb.com/docs/
- Check the Tailwind CSS documentation: https://tailwindcss.com/docs
- Refer to `_config.yml` for site configuration options
