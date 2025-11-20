// Recipe-specific functionality
(function() {
  // Servings adjuster
  function initServingsAdjuster() {
    const adjuster = document.querySelector('.servings-adjuster');
    if (!adjuster) return;
    
    const decreaseBtn = adjuster.querySelector('.decrease-servings');
    const increaseBtn = adjuster.querySelector('.increase-servings');
    const valueDisplay = adjuster.querySelector('.servings-value');
    const originalServings = parseInt(valueDisplay.textContent);
    
    let currentServings = originalServings;
    
    const updateIngredients = (multiplier) => {
      const ingredients = document.querySelectorAll('.ingredient-amount');
      ingredients.forEach(ingredient => {
        const original = parseFloat(ingredient.dataset.original);
        if (!isNaN(original)) {
          const newAmount = (original * multiplier).toFixed(2);
          ingredient.textContent = newAmount.replace(/\.?0+$/, ''); // Remove trailing zeros
        }
      });
    };
    
    decreaseBtn.addEventListener('click', () => {
      if (currentServings > 1) {
        currentServings--;
        valueDisplay.textContent = currentServings;
        updateIngredients(currentServings / originalServings);
        
        // Visual feedback
        adjuster.style.transform = 'scale(0.95)';
        setTimeout(() => { adjuster.style.transform = 'scale(1)'; }, 100);
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      currentServings++;
      valueDisplay.textContent = currentServings;
      updateIngredients(currentServings / originalServings);
      
      // Visual feedback
      adjuster.style.transform = 'scale(1.05)';
      setTimeout(() => { adjuster.style.transform = 'scale(1)'; }, 100);
    });
  }
  
  // Ingredient checkboxes persistence
  function initIngredientCheckboxes() {
    const checkboxes = document.querySelectorAll('.ingredient-checkbox');
    const recipeId = document.querySelector('.recipe-content')?.dataset.recipeId;
    
    if (!recipeId) return;
    
    const storageKey = `recipe-${recipeId}-ingredients`;
    
    // Load saved state
    const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
    checkboxes.forEach((checkbox, index) => {
      if (savedState[index]) {
        checkbox.checked = true;
      }
    });
    
    // Save state on change
    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('change', () => {
        const state = JSON.parse(localStorage.getItem(storageKey) || '{}');
        state[index] = checkbox.checked;
        localStorage.setItem(storageKey, JSON.stringify(state));
      });
    });
  }
  
  // Print recipe
  function initPrintButton() {
    const printBtn = document.querySelector('.print-recipe');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
  
  // Share recipe
  function initShareButton() {
    const shareBtn = document.querySelector('.share-recipe');
    if (!shareBtn) return;
    
    if (navigator.share) {
      shareBtn.addEventListener('click', async () => {
        try {
          await navigator.share({
            title: document.title,
            text: document.querySelector('meta[name="description"]')?.content || '',
            url: window.location.href
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      });
    } else {
      // Fallback: copy to clipboard
      shareBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalText = shareBtn.textContent;
          shareBtn.textContent = 'Link copied!';
          setTimeout(() => {
            shareBtn.textContent = originalText;
          }, 2000);
        });
      });
    }
  }
  
  // Initialize all recipe features
  document.addEventListener('DOMContentLoaded', () => {
    initServingsAdjuster();
    initIngredientCheckboxes();
    initPrintButton();
    initShareButton();
  });
})();
