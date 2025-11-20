/**
 * Lightbox for Recipe Gallery Images
 * Expands images when clicked for better viewing
 */

(function() {
  'use strict';

  // Create lightbox HTML structure
  function createLightbox() {
    const lightboxHTML = `
      <div id="lightbox" class="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image viewer" style="display: none;">
        <button id="lightbox-close" class="lightbox-close" aria-label="Close lightbox">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <button id="lightbox-prev" class="lightbox-nav lightbox-prev" aria-label="Previous image">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button id="lightbox-next" class="lightbox-nav lightbox-next" aria-label="Next image">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <div class="lightbox-content">
          <img id="lightbox-image" src="" alt="" class="lightbox-image">
          <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>
        
        <div id="lightbox-counter" class="lightbox-counter"></div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add inline styles for proper lightbox behavior
    const style = document.createElement('style');
    style.textContent = `
      .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .lightbox-image {
        max-width: 100%;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }
      
      .lightbox-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 16px;
        border-radius: 0 0 8px 8px;
      }
      
      .lightbox-close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10000;
        transition: background-color 0.2s;
      }
      
      .lightbox-close:hover {
        background: rgba(0, 0, 0, 0.8);
      }
      
      .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10000;
        transition: background-color 0.2s;
      }
      
      .lightbox-nav:hover {
        background: rgba(0, 0, 0, 0.8);
      }
      
      .lightbox-prev {
        left: 20px;
      }
      
      .lightbox-next {
        right: 20px;
      }
      
      .lightbox-counter {
        position: absolute;
        top: 20px;
        left: 20px;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 500;
        z-index: 10000;
      }
      
      @media (max-width: 768px) {
        .lightbox-nav {
          width: 50px;
          height: 50px;
        }
        
        .lightbox-prev {
          left: 10px;
        }
        
        .lightbox-next {
          right: 10px;
        }
        
        .lightbox-close {
          top: 10px;
          right: 10px;
        }
        
        .lightbox-counter {
          top: 10px;
          left: 10px;
          font-size: 14px;
          padding: 8px 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize lightbox
  function initLightbox() {
    // Create lightbox if it doesn't exist
    if (!document.getElementById('lightbox')) {
      createLightbox();
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentIndex = 0;
    let galleryImages = [];

    // Find all gallery images
    const galleryContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3.gap-4');
    if (!galleryContainer) return;

    const imageElements = galleryContainer.querySelectorAll('img');
    
    // Build gallery images array
    galleryImages = Array.from(imageElements).map(img => ({
      src: img.src,
      alt: img.alt,
      caption: img.alt
    }));

    if (galleryImages.length === 0) return;

    // Open lightbox
    function openLightbox(index) {
      currentIndex = index;
      updateLightboxImage();
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus on close button for accessibility
      closeBtn.focus();
    }

    // Close lightbox
    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }

    // Update lightbox image
    function updateLightboxImage() {
      const image = galleryImages[currentIndex];
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = image.caption;
      lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;

      // Show/hide navigation buttons
      prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
      nextBtn.style.display = currentIndex < galleryImages.length - 1 ? 'block' : 'none';
    }

    // Navigate to previous image
    function showPrevImage() {
      if (currentIndex > 0) {
        currentIndex--;
        updateLightboxImage();
      }
    }

    // Navigate to next image
    function showNextImage() {
      if (currentIndex < galleryImages.length - 1) {
        currentIndex++;
        updateLightboxImage();
      }
    }

    // Add click handlers to gallery images
    imageElements.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
      
      // Add keyboard accessibility
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `View larger image: ${img.alt}`);
      
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
        switch(e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            showPrevImage();
            break;
          case 'ArrowRight':
            showNextImage();
            break;
        }
      }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next image
          showNextImage();
        } else {
          // Swipe right - previous image
          showPrevImage();
        }
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
