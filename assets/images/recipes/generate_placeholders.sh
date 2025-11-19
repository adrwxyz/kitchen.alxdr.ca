#!/bin/bash
# Generate SVG placeholder images for recipes

recipes=(
  "chocolate-chip-cookies:🍪 Chocolate Chip Cookies:#8B4513"
  "homemade-pizza:🍕 Homemade Pizza:#FF6347"
  "banana-bread:🍌 Banana Bread:#FFD700"
  "chicken-stir-fry:🍜 Chicken Stir-Fry:#FF8C00"
  "caesar-salad:🥗 Caesar Salad:#90EE90"
  "blueberry-muffins:🧁 Blueberry Muffins:#6495ED"
)

for recipe in "${recipes[@]}"; do
  IFS=':' read -r dir title color <<< "$recipe"
  cat > "${dir}/hero.svg" << EOF
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="64" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">
    ${title}
  </text>
</svg>
EOF
  echo "Created ${dir}/hero.svg"
done
