// Careers Image Scroller JavaScript
// This script creates a seamless, infinite, auto-scrolling image carousel for the Careers page.
// It is modular, responsive, and thoroughly commented for easy maintenance.

(function () {
  // 1. List of image paths from various categories (add/remove as needed)
  const careersScrollerImages = [
    // Expertise - Furniture
    'assets/expertise/furniture/image.png',
    'assets/expertise/furniture/image copy.png',
    'assets/expertise/furniture/image copy 2.png',
    // Expertise - Packaging
    'assets/expertise/packaging/image.png',
    'assets/expertise/packaging/image copy.png',
    // Expertise - Material Handling
    'assets/expertise/material handling/image.png',
    // Expertise - Manufacturing Capsules
    'assets/expertise/manufacturing/capsules/image.png',
    // Expertise - Processing Tablets
    'assets/expertise/processing/tablets/image.png',
    // Images - Our Expertise
    'assets/images/our expertise/image (8).png',
    'assets/images/our expertise/image (9).png',
    'assets/images/our expertise/image (10).png',
    'assets/images/our expertise/image (11).png',
  ];

  // 2. Shuffle the array for randomness
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // 3. Select enough images to fill and overflow the screen
  const NUM_IMAGES = 12;
  const shuffledImages = shuffleArray([...careersScrollerImages]);
  const selectedImages = shuffledImages.slice(0, NUM_IMAGES);

  // 4. Modular function to create an image element
  function createImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'careers-image-scroller-img';
    img.alt = 'AKSIS Careers';
    img.loading = 'lazy';
    return img;
  }

  // 5. Render images into the scroller track, then duplicate for seamless looping
  const scrollerTrack = document.querySelector('.careers-image-scroller-track');
  if (!scrollerTrack) return;

  // Clear any existing content
  scrollerTrack.innerHTML = '';

  // Create the first set of images
  selectedImages.forEach(src => {
    scrollerTrack.appendChild(createImage(src));
  });
  // Duplicate the set for seamless looping
  selectedImages.forEach(src => {
    scrollerTrack.appendChild(createImage(src));
  });

  // 6. Scrolling logic
  let scrollPosition = 0;
  let animationFrameId;
  let firstSetWidth = 0;
  const SCROLL_SPEED = 0.5; // px per frame (adjust for speed)

  // Helper: Calculate the width of one set of images
  function calculateFirstSetWidth() {
    // Sum the widths of the first NUM_IMAGES images
    let width = 0;
    const imgs = scrollerTrack.querySelectorAll('.careers-image-scroller-img');
    for (let i = 0; i < NUM_IMAGES; i++) {
      width += imgs[i].offsetWidth + parseFloat(getComputedStyle(imgs[i]).marginLeft || 0) + parseFloat(getComputedStyle(imgs[i]).marginRight || 0);
    }
    return width;
  }

  // Animation loop for seamless scroll
  function animateScroll() {
    scrollPosition -= SCROLL_SPEED;
    // When the first set has fully scrolled out of view, reset position
    if (-scrollPosition >= firstSetWidth) {
      // Reset to 0 for seamless loop
      scrollPosition = 0;
    }
    scrollerTrack.style.transform = `translateX(${scrollPosition}px)`;
    animationFrameId = requestAnimationFrame(animateScroll);
  }

  // Responsive adjustment: recalculate on resize
  function resetScroller() {
    scrollPosition = 0;
    scrollerTrack.style.transform = 'translateX(0)';
    // Wait for images to load before measuring
    setTimeout(() => {
      firstSetWidth = calculateFirstSetWidth();
    }, 100);
  }

  // Pause/resume on hover (desktop only)
  function addPauseOnHover() {
    scrollerTrack.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationFrameId);
    });
    scrollerTrack.addEventListener('mouseleave', () => {
      animateScroll();
    });
  }

  // Wait for all images to load before starting animation
  function onAllImagesLoaded(callback) {
    const imgs = scrollerTrack.querySelectorAll('.careers-image-scroller-img');
    let loaded = 0;
    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === imgs.length) callback();
        });
        img.addEventListener('error', () => {
          loaded++;
          if (loaded === imgs.length) callback();
        });
      }
    });
    if (loaded === imgs.length) callback();
  }

  // Initialize everything on DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    onAllImagesLoaded(() => {
      resetScroller();
      animateScroll();
    });
    window.addEventListener('resize', resetScroller);
    addPauseOnHover();
  });

  // All code is modular and commented for easy modification.
})(); 