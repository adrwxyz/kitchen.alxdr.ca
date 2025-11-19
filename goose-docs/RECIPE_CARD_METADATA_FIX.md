# Recipe Card Metadata Fix ✅

**Date:** 2025-11-19  
**Status:** Complete

## Summary

Updated recipe cards on the homepage, categories, and index pages to hide empty metadata fields (time, servings) while still showing populated fields like difficulty.

## Changes Made

### Recipe Card Template (`_includes/recipe-card.html`)

**Before:** Recipe cards always showed the metadata section, even when time and servings were empty strings.

**After:** Recipe cards now:
1. Check if any metadata field has a non-empty value
2. Only display the metadata section if at least one field is populated
3. Hide individual fields that are empty

### Implementation

Added conditional logic to check for empty values:

```liquid
{% assign has_card_metadata = false %}
{% if recipe.total_time and recipe.total_time != '' %}{% assign has_card_metadata = true %}{% endif %}
{% if recipe.servings and recipe.servings != '' %}{% assign has_card_metadata = true %}{% endif %}
{% if recipe.difficulty and recipe.difficulty != '' %}{% assign has_card_metadata = true %}{% endif %}

{% if has_card_metadata %}
  <!-- Show metadata section -->
{% endif %}
```

Each individual field also checks for empty values:
- `{% if recipe.total_time and recipe.total_time != '' %}`
- `{% if recipe.servings and recipe.servings != '' %}`
- `{% if recipe.difficulty and recipe.difficulty != '' %}`

## Current State

### All 84 Recipes on Cards
- **Total Time:** Hidden (all empty)
- **Servings:** Hidden (all empty)
- **Difficulty:** Showing (all populated with Easy/Medium/Hard)

### Visual Result
Recipe cards now show:
- Title
- Description (if present)
- Difficulty badge only
- Categories (up to 2)

No empty time or servings fields clutter the cards.

## Testing Performed

### Test 1: Homepage Recipe Cards
- ✅ No empty time fields showing
- ✅ No empty servings fields showing
- ✅ Difficulty badges showing correctly (populated field)
- ✅ Cards look clean and uncluttered

### Test 2: Bibimbap Card
- ✅ Shows only "Medium" difficulty badge
- ✅ No time or servings displayed
- ✅ Card layout looks professional

### Test 3: Build & Serve
- ✅ Jekyll builds without errors
- ✅ All pages load correctly
- ✅ Recipe cards render properly

## Consistency with Recipe Pages

This change is consistent with the recipe page behavior:
- **Recipe Pages:** Hide metadata grid when all fields empty, show banner
- **Recipe Cards:** Hide metadata section when all fields empty

Both follow the same principle: don't show empty data.

## Benefits

1. **Cleaner UI:** No empty fields on recipe cards
2. **Professional Look:** Cards only show relevant information
3. **Consistent:** Matches recipe page behavior
4. **Flexible:** Automatically shows fields when populated
5. **Progressive:** As metadata is added, fields automatically appear

## Future Behavior

When metadata is added to recipes:

### Example: Add time to Bibimbap
```yaml
total_time: '45'
servings: '4'
```

**Result:** Card will automatically show:
- ⏱️ 45 min
- 👥 4 servings
- 🎯 Medium

No code changes needed - it's automatic!

## Files Modified

- `_includes/recipe-card.html` - Added conditional metadata display logic

## Related Features

This complements the recipe page metadata feature:
- Recipe pages hide metadata grid and show banner when empty
- Recipe cards hide metadata section when empty
- Both provide clean, professional appearance

## Conclusion

Recipe cards now intelligently hide empty metadata fields while showing populated ones. This creates a cleaner, more professional appearance across all recipe listing pages (homepage, categories, tags, etc.).

All 84 recipes currently show only difficulty badges on their cards, with no empty time or servings fields cluttering the display.
