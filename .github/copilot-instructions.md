# GitHub Copilot Instructions for kitchen.alxdr.ca

## Repository Overview

This is a recipe website built with Jekyll and Tailwind CSS. It displays recipes from the Alexander Kitchen at [kitchen.alxdr.ca](https://kitchen.alxdr.ca).

## Technology Stack

- **Jekyll**: Static site generator
- **Tailwind CSS v4**: CSS framework for styling
- **Ruby 3.1+**: Required for Jekyll
- **Node.js 20+**: Required for Tailwind CSS build

## Project Structure

- `_recipes/`: Recipe collection files (Markdown) - **ALL new recipes go here**
- `_layouts/`: Jekyll layout templates
- `_includes/`: Reusable Jekyll components (header, footer, recipe cards, etc.)
- `assets/`: Static assets (CSS, JavaScript, images)
- `src/`: Source files for Tailwind CSS
- `_config.yml`: Jekyll configuration
- `old/`: **Archived content - DO NOT modify or add files here**

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

- **Recipe files are ONLY in `_recipes/` directory**
- **NEVER add or modify files in the `./old` directory** - this contains archived content from previous site versions
- Use Markdown format with YAML front matter
- Required front matter fields: title, description, servings, prep_time, cook_time, total_time, ingredients, instructions
- Optional fields: image (hero image path), gallery (array of images with captions), notes, nutrition, difficulty, tags, categories
- Image paths should be `/assets/images/recipes/[recipe-slug]/[image-name].jpg`

## Common Tasks

### Adding a New Recipe

**IMPORTANT**: Recipes should ONLY be added to the `_recipes/` directory. DO NOT add or modify anything in the `./old` directory, which contains archived content from previous versions of the site.

#### When Adding a Recipe from a URL

If a URL is provided as the recipe source:

1. **Fetch the recipe content** from the provided URL:
   - Extract ingredients list (with quantities and units)
   - Extract step-by-step instructions
   - Extract serving size information
   - Extract prep time, cook time, and total time if available
   - Note: Recipe information is typically found at the bottom of the page

2. **Download images** from the source URL:
   - Download the main/hero image and save it to `/assets/images/recipes/[recipe-slug]/hero.jpg`
   - Download additional images for the gallery (2-5 images showing different steps or the final dish)
   - Save gallery images to `/assets/images/recipes/[recipe-slug]/` with descriptive names
   - Ensure image filenames are lowercase and use hyphens (e.g., `step-1.jpg`, `final-dish.jpg`)

3. **Create the recipe file** in `_recipes/[recipe-name].md` with proper front matter:
   ```yaml
   ---
   layout: recipe
   title: Recipe Title
   description: 'Brief description of the recipe'
   image: /assets/images/recipes/recipe-slug/hero.jpg
   date: "YYYY-MM-DDTHH:MM:SS.SSSZ"
   categories:
     - "Category Name"
   tags: []
   difficulty: Easy|Medium|Hard
   prep_time: '15'  # in minutes (numeric string)
   cook_time: '30'  # in minutes (numeric string)
   total_time: '45'  # in minutes (numeric string)
   servings: '4'    # numeric string
   ingredients:
     - "ingredient 1"
     - "ingredient 2"
   instructions:
     - "Step 1 instructions"
     - "Step 2 instructions"
   gallery:
     - image: /assets/images/recipes/recipe-slug/image1.jpg
       caption: "Image description"
     - image: /assets/images/recipes/recipe-slug/image2.jpg
       caption: "Image description"
   ---
   
   Additional notes or information about the recipe.
   
   Source: [Source Name](source-url)
   ```

4. **Include source attribution**:
   - Add a "Source:" line at the bottom of the recipe content linking to the original recipe
   - Format: `Source: [Website Name](https://url-to-recipe)`

5. **Create the PR**:
   - Build the site locally with `bundle exec jekyll serve`
   - Navigate to the new recipe page in your browser
   - Take a screenshot showing the rendered recipe (include the title, image, ingredients, and at least some instructions)
   - Include the screenshot in the PR description to confirm everything is set up correctly
   - Add a section in the PR description titled "Recipe Preview" with the screenshot

#### When Adding a Recipe Manually (No URL)

1. Create a new Markdown file in `_recipes/[recipe-name].md`
2. Add required front matter (see template above)
3. Write recipe content in Markdown
4. If images are available, place them in `/assets/images/recipes/[recipe-slug]/`
5. Build and test locally with `bundle exec jekyll serve`
6. Take a screenshot of the rendered recipe
7. Create PR with screenshot showing how the recipe appears on the site

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
