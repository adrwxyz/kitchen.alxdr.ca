# AGENTS.md

Notes for AI agents and developers working on this repo.

## Toolchain

### Ruby

Ruby is managed via **[Hermit](https://github.com/cashapp/hermit)** — do NOT use rbenv, rvm, or asdf here.

The Ruby version is pinned in `bin/.ruby-X.Y.Z.pkg`. To check the current version:

```bash
ls bin/.ruby-*.pkg
```

To activate the Hermit environment (so `ruby`, `bundle`, etc. resolve correctly):

```bash
. bin/activate-hermit
```

### Updating Ruby

When Renovate bumps the Ruby version, it renames the `.pkg` file in `bin/` and updates CI workflows. If `bundle install` fails after a Ruby major version bump, check for gem compatibility issues in `Gemfile.lock` (e.g. gems with hardcoded upper-bound Ruby version constraints).

To regenerate the lockfile after a Ruby version bump:

```bash
. bin/activate-hermit
bundle lock --update
```

## CI

Workflows live in `.github/workflows/`:
- `ci.yml` — validates the build
- `deploy.yml` — deploys to production

---

## Recipe Front Matter

Recipes live in `_recipes/` and use the `recipe` layout (`_layouts/recipe.html`). The layout renders a structured two-column page: ingredients sidebar (sticky) on the left, numbered instructions on the right.

**Always prefer structured front matter over prose markdown** for ingredients and steps. The layout renders these with checkboxes, numbered circles, and Schema.org microdata. Plain markdown in the body is only rendered as an "Additional Content" block below the instructions — it has no interactivity.

### Supported front matter fields

```yaml
layout: recipe           # required
title: ''                # required
description: ''
image: /assets/images/recipes/<slug>/hero.jpeg
date: "YYYY-MM-DDTHH:MM:SS.000Z"
categories:
  - "Chicken"            # see existing recipes for category values
tags: []
difficulty: Easy         # Easy | Medium | Hard
prep_time: '15 min'
cook_time: '30 min'
total_time: '45 min'
servings: '4'
```

### `ingredients` — flat list (simple recipes)

```yaml
ingredients:
  - 2 lbs chicken breast, sliced
  - 1 tbsp olive oil
  - Salt and pepper
```

### `ingredients` — sectioned list (recipes with multiple components)

Use `section` + `items` when the recipe has distinct groups (marinade, sauce, filling, etc.):

```yaml
ingredients:
  - section: Filling
    items:
      - 1 cup short grain rice, soaked and strained
      - 1 lb ground beef
  - section: Cooking Liquid
    items:
      - 3 tomatoes, diced and sautéed
      - Beef stock or broth to cover half the pot
```

### `instructions` — flat list of step strings

Each string becomes a numbered circle in the layout. Keep steps atomic — one action per step.

```yaml
instructions:
  - Combine all seasoning ingredients in a small bowl.
  - Toss chicken with seasoning until evenly coated.
  - Heat oil in a cast-iron skillet over medium-high heat.
```

### `notes` — optional tips, rendered in a yellow callout box

```yaml
notes:
  - Rice expands during cooking — do not overfill the vegetables.
  - Serve with warm bread and plain yoghurt.
```

### `nutrition` — optional macros grid

```yaml
nutrition:
  calories: '450 kcal'
  protein: '32g'
  carbs: '28g'
  fat: '18g'
```

### `gallery` — optional step-by-step photo grid

```yaml
gallery:
  - image: /assets/images/recipes/stuffed-vegetables/step-1.jpg
    caption: Hollowed zucchini ready to fill
  - image: /assets/images/recipes/stuffed-vegetables/step-2.jpg
    caption: Filled and ready to simmer
```

### `image` — omit when no hero photo exists

**Do NOT set `image: ''`.** Empty strings are truthy in Liquid — the layout will render a broken `<img src="">` instead of the gradient placeholder.

```yaml
# ✅ Correct — omit the key entirely when there is no image
layout: recipe
title: My Recipe

# ❌ Wrong — empty string is truthy, breaks the card
image: ''
```

When a real image is available, use the full path:

```yaml
image: /assets/images/recipes/<slug>/hero.jpeg
```

The `recipe-card.html` include falls through to a `bg-gradient-to-br from-primary-500 to-secondary-500` placeholder only when `page.image` is `nil` (key absent). The same applies to the hero image block in `_layouts/recipe.html`.

### When to use prose markdown vs. structured front matter

| Situation | Use |
|-----------|-----|
| Simple recipe, one set of ingredients | `ingredients` flat list + `instructions` list |
| Multi-component recipe (marinade, sauce, filling…) | `ingredients` sectioned + `instructions` list |
| Extra context, tips, source links | Markdown body (rendered below instructions) |
| Cooking notes / gotchas | `notes` list (yellow callout box) |
| Recipe too complex for linear steps (e.g. parallel tracks) | Markdown body for the steps, `ingredients` front matter still recommended |
