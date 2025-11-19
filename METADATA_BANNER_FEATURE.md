# Recipe Metadata Banner Feature ✅

**Date:** 2025-11-19  
**Status:** Complete

## Summary

Modified the recipe layout to hide empty metadata fields (prep time, cook time, total time, servings) and display a helpful banner at the bottom of recipes prompting users to contribute missing information.

## Changes Made

### 1. Conditional Metadata Grid Display

**Before:** The recipe info grid always displayed at the top, even when all fields were empty, showing empty boxes.

**After:** The grid only displays if at least one metadata field has a non-empty value.

**Implementation:**
```liquid
{% assign has_metadata = false %}
{% if page.prep_time and page.prep_time != '' %}{% assign has_metadata = true %}{% endif %}
{% if page.cook_time and page.cook_time != '' %}{% assign has_metadata = true %}{% endif %}
{% if page.total_time and page.total_time != '' %}{% assign has_metadata = true %}{% endif %}
{% if page.servings and page.servings != '' %}{% assign has_metadata = true %}{% endif %}

{% if has_metadata %}
  <!-- Show the grid -->
{% endif %}
```

### 2. Missing Metadata Banner

**Added:** A friendly, informative banner at the bottom of recipes that lack metadata.

**Design:**
- Blue color scheme (info/help style)
- Icon with information symbol
- Clear heading: "Help Improve This Recipe"
- Explanation of missing information
- Bulleted list of what's needed:
  - Prep Time
  - Cook Time
  - Total Time
  - Servings
- Encouraging message about helping others

**Implementation:**
```liquid
{% unless has_metadata %}
  <!-- Show the banner -->
{% endunless %}
```

## Visual Design

### Banner Styling
- **Background:** Light blue (`bg-blue-50`) in light mode, dark blue with transparency (`bg-blue-900/20`) in dark mode
- **Border:** Left border in blue (`border-blue-500`)
- **Shadow:** Subtle shadow for depth
- **Icon:** Information circle icon in blue
- **Layout:** Flexbox with icon on left, content on right
- **Typography:** Clear hierarchy with bold heading, regular text, and italic encouragement

### Responsive Design
- Banner is full-width on mobile
- Maintains padding and spacing on all screen sizes
- Icon stays aligned at top on all devices

## Current State

### All 84 Recipes
- **With metadata:** 0 recipes (0%)
- **Without metadata:** 84 recipes (100%)

All recipes currently show the banner since no recipes have timing or serving information filled in.

## Testing Performed

### Test 1: Recipe Without Metadata (Bibimbap)
- ✅ Metadata grid does NOT display
- ✅ Banner DOES display at bottom
- ✅ Banner shows all expected content

### Test 2: Recipe With Metadata (Test with Coconut Milk Banana Bread)
- ✅ Metadata grid DOES display with all 4 fields
- ✅ Banner does NOT display
- ✅ Grid shows correct values (15 min prep, 60 min cook, 75 min total, 8 servings)

### Test 3: Build & Serve
- ✅ Jekyll builds without errors
- ✅ Site serves correctly
- ✅ All pages load properly

## User Experience

### Before
Users saw an empty metadata grid at the top of every recipe, which looked incomplete and unprofessional.

### After
- **Recipes with metadata:** Clean, informative grid at top showing timing and servings
- **Recipes without metadata:** No empty boxes, just a helpful banner at bottom encouraging contributions

## Benefits

1. **Cleaner UI:** No empty boxes cluttering the recipe page
2. **User Engagement:** Encourages community contributions
3. **Progressive Enhancement:** As metadata is added, recipes automatically show the grid
4. **Transparency:** Users know information is missing and can help fill it in
5. **Flexibility:** Works for both structured and inline recipe formats

## Future Enhancements

### Potential Additions
1. **Contribution Form:** Link banner to a form where users can submit metadata
2. **Partial Metadata:** Show grid even if only some fields are filled
3. **GitHub Integration:** Link to edit recipe file directly on GitHub
4. **Crowdsourcing:** Track who contributed metadata
5. **Verification:** Allow multiple users to verify timing information

### Easy Wins
- Add metadata to popular recipes first
- Extract timing info from recipe instructions where mentioned
- Use original source recipes to infer metadata

## How to Add Metadata

To add metadata to a recipe, edit the frontmatter:

```yaml
---
layout: recipe
title: "Recipe Name"
prep_time: '15'    # minutes
cook_time: '60'    # minutes
total_time: '75'   # minutes
servings: '8'      # number of servings
---
```

**Important:** Values must be strings (in quotes) and represent minutes for time fields.

## Files Modified

- `_layouts/recipe.html` - Added conditional logic and banner

## Documentation

This feature is now part of the standard recipe layout and will automatically apply to:
- All existing recipes (84 recipes show banner)
- All future recipes without metadata
- Automatically hides when metadata is added

## Conclusion

Successfully implemented a user-friendly solution that:
- Hides empty metadata fields
- Encourages community contributions
- Maintains clean, professional appearance
- Works automatically for all recipes

The banner provides a gentle nudge for users to contribute while maintaining a polished look for the recipe site.
