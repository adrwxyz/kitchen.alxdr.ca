// Theme switcher (dark/light mode)
(function() {
  const STORAGE_KEY = 'theme-preference';
  
  const getColorPreference = () => {
    if (localStorage.getItem(STORAGE_KEY)) {
      return localStorage.getItem(STORAGE_KEY);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  const setPreference = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    reflectPreference(theme);
  };
  
  const reflectPreference = (theme) => {
    // Use Tailwind's dark mode class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    const toggleBtn = document.querySelector('#theme-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      
      // Update icon
      const sunIcon = toggleBtn.querySelector('.sun-icon');
      const moonIcon = toggleBtn.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    }
  };
  
  const onClick = () => {
    const currentTheme = localStorage.getItem(STORAGE_KEY) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setPreference(newTheme);
  };
  
  // Set initial theme
  reflectPreference(getColorPreference());
  
  // Remove preload class after a brief delay
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.remove('preload');
    }, 100);
  });
  
  // Listen for toggle button clicks
  window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('#theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', onClick);
    }
    
    // Sync with system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches}) => {
      const newTheme = matches ? 'dark' : 'light';
      setPreference(newTheme);
    });
  });
})();
