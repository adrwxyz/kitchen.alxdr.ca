# Recipe Description Fix

**Date**: November 19, 2025  
**Issue**: Recipe cards showing `[]` as description/byline  
**Status**: ✅ FIXED

## Problem

Many recipe cards on the homepage were displaying `[]` in the description area. This occurred because during the migration, recipes without descriptions had their `description` field set to `[]` (an empty array) instead of an empty string `''`.

## Root Cause

During the recipe migration, the Python script set:
```yaml
description: []
```

Instead of:
```yaml
description: ''
```

When Jekyll rendered the templates, `[]` was displayed as literal text instead of being treated as empty.

## Solution

Updated all recipe frontmatter to replace `description: []` with `description: ''`.

## Recipes Fixed (55 total)

1. asian-stir-fry
2. avocado-smoothie
3. beef-broth
4. beef-wine-stew
5. bibimbap
6. boiled-veal-stock
7. bolognese-sauce
8. butter-chicken
9. chocolate-roll
10. coleslaw
11. costco-butter-chicken
12. fajita-sauce
13. fesenjon-pomegranate-stew
14. french-bistro-salad-roast-vegetables
15. garlic-potato-sauce
16. grandma-wakelys-ginger-snap-cookies
17. grape-leaf-rolls
18. homemade-yoghurt
19. kanafeh
20. kebeh
21. korean-date-night
22. korean-steak-bowl
23. lasagna-bechamel
24. lentil-soup
25. light-brioche-hamburger-buns
26. mandarin-avocado-salad
27. mediterranean-grilled-chicken-salad
28. mojito
29. mushroom-soup
30. new-york-cheesecake
31. orange-cake
32. panda-express-cookbook
33. pasta
34. pesto-tomato-stuffed-chicken
35. pina-colada
36. pizza-in-3-movements
37. poached-eggs
38. pogacsa
39. pull-apart-garlic-bread
40. pulled-veal
41. rice-pudding
42. roast-chicken
43. roast-vegetables-winter-salad
44. roasted-tomato-red-pepper-soup
45. semolina-maamoul
46. semolina-pudding
47. shakshuka
48. shrimp-stir-fry
49. sourdough-bread
50. steak-grain-bowl
51. taiwan-pork-belly
52. tomato-shrimp-pasta
53. vanilla-creme-brulee
54. vietnamese-pork-noodle-bowl
55. waffles

## Changes Made

### Before
```yaml
---
layout: recipe
title: "Bibimbap"
description: []
date: "2025-01-14T23:38:57-05:00"
---
```

### After
```yaml
---
layout: recipe
title: "Bibimbap"
description: ''
date: "2025-01-14T23:38:57-05:00"
---
```

## Verification

✅ Site builds successfully  
✅ Homepage displays correctly  
✅ No `[]` visible on recipe cards  
✅ Recipe cards with descriptions show them properly  
✅ Recipe cards without descriptions show cleanly (no text)  
✅ All 84 recipes render correctly  

## Impact

- **Before**: 55 recipes showing `[]` as description
- **After**: 55 recipes showing no description (clean)
- **Recipes with descriptions**: 29 recipes display their descriptions properly

## Template Behavior

The recipe card template (`_includes/recipe-card.html`) handles empty descriptions correctly:

```liquid
{% if recipe.description %}
<p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
  {{ recipe.description | truncate: 120 }}
</p>
{% endif %}
```

When `description: ''`, the `if` condition is false and no description paragraph is rendered.

## Future Improvement

Consider adding meaningful descriptions to recipes that don't have them. Descriptions help users understand what the recipe is about before clicking through.

---

*Description fix completed by Goose AI Assistant on November 19, 2025*
