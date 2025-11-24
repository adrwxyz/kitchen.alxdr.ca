// Main JavaScript functionality
(function() {
  // Mobile navigation toggle
  function initMobileNav() {
    const navToggle = document.querySelector('#nav-toggle');
    const navMobile = document.querySelector('#nav-mobile');
    
    if (navToggle && navMobile) {
      navToggle.addEventListener('click', () => {
        navMobile.classList.toggle('hidden');
        const isOpen = !navMobile.classList.contains('hidden');
        navToggle.setAttribute('aria-expanded', isOpen);
      });
      
      // Close mobile nav when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMobile.contains(e.target)) {
          navMobile.classList.add('hidden');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Close mobile nav on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !navMobile.classList.contains('hidden')) {
          navMobile.classList.add('hidden');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }
  
  // Lazy loading images
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
      document.body.appendChild(script);
    }
  }
  
  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  }
  
  // Back to top button
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Register service worker for PWA
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }
  
  // Initialize all features
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initLazyLoading();
    initSmoothScroll();
    initBackToTop();
    registerServiceWorker();
  });
})();
