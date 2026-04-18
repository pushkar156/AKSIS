// === Loader and Animation Logic ===
window.addEventListener('DOMContentLoaded', function () {
  // Loader overlay logic
  const loader = document.querySelector('.loader-overlay');
  const fadeMain = document.querySelector('.fadein-main');
  setTimeout(() => {
    if (loader) loader.classList.add('hide');
    setTimeout(() => {
      if (loader) loader.style.display = 'none';
      if (fadeMain) fadeMain.classList.add('visible');
    }, 700);
  }, 1000); // 1.5s loader

  // Scroll reveal logic
  const revealEls = document.querySelectorAll('.scroll-reveal');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.92;
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add('revealed');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu logic
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const keysMenuBtn = document.getElementById('keysMenuBtn');
    const keysSubmenu = document.getElementById('keys-submenu');
    const menuItemsWithSubmenu = document.querySelectorAll('.menu-item.has-submenu');
    const submenus = document.querySelectorAll('.submenu');
    const body = document.body;

    function closeMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        // Close all submenus
        submenus.forEach(submenu => submenu.classList.remove('active'));
        menuItemsWithSubmenu.forEach(item => item.classList.remove('active'));
        body.style.overflow = 'auto';
    }
    function openMenu() {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
        body.style.overflow = 'hidden';
    }
    hamburger.addEventListener('click', function() {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    closeMenuBtn.addEventListener('click', closeMenu);

    // Toggle submenu for Keys
    keysMenuBtn.addEventListener('click', function() {
        const isActive = keysSubmenu.classList.contains('active');
        // Close all submenus
        submenus.forEach(submenu => submenu.classList.remove('active'));
        menuItemsWithSubmenu.forEach(item => item.classList.remove('active'));
        // Toggle current
        if (!isActive) {
            keysSubmenu.classList.add('active');
            keysMenuBtn.classList.add('active');
        }
    });

    // Toggle submenu for Expertise
    const expertiseMenuBtn = document.getElementById('expertiseMenuBtn');
    const expertiseSubmenu = document.getElementById('expertise-submenu');
    expertiseMenuBtn.addEventListener('click', function() {
        const isActive = expertiseSubmenu.classList.contains('active');
        submenus.forEach(submenu => submenu.classList.remove('active'));
        menuItemsWithSubmenu.forEach(item => item.classList.remove('active'));
        if (!isActive) {
            expertiseSubmenu.classList.add('active');
            expertiseMenuBtn.classList.add('active');
        }
    });

    // Toggle submenu for About
    const aboutMenuBtn = document.getElementById('aboutMenuBtn');
    const aboutSubmenu = document.getElementById('about-submenu');
    aboutMenuBtn.addEventListener('click', function() {
        const isActive = aboutSubmenu.classList.contains('active');
        submenus.forEach(submenu => submenu.classList.remove('active'));
        menuItemsWithSubmenu.forEach(item => item.classList.remove('active'));
        if (!isActive) {
            aboutSubmenu.classList.add('active');
            aboutMenuBtn.classList.add('active');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active')) {
            const menuContent = document.querySelector('.menu-content');
            if (!menuContent.contains(event.target) && !hamburger.contains(event.target)) {
                closeMenu();
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            closeMenu();
        }
    });

    // Product slider functionality
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let scrollAmount = 0;
    const slideWidth = 300; // Width of slide + gap

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - slideWidth, 0);
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            scrollAmount = Math.min(scrollAmount + slideWidth, slider.scrollWidth - slider.clientWidth);
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update scroll position when user scrolls manually
        slider.addEventListener('scroll', () => {
            scrollAmount = slider.scrollLeft;
        });
    }

    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentSlide = 0;

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function scrollToCard(index) {
        const card = cards[index];
        testimonialsSlider.scrollTo({
            left: card.offsetLeft - testimonialsSlider.offsetLeft,
            behavior: 'smooth'
        });
        currentSlide = index;
        updateDots();
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToCard(index));
    });

    // Auto-scroll functionality
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % cards.length;
            scrollToCard(currentSlide);
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start/stop auto-scroll on hover
    testimonialsSlider.addEventListener('mouseenter', stopAutoScroll);
    testimonialsSlider.addEventListener('mouseleave', startAutoScroll);

    // Start auto-scroll initially
    startAutoScroll();

    // Handle scroll snap on mobile
    testimonialsSlider.addEventListener('scroll', () => {
        const scrollPosition = testimonialsSlider.scrollLeft;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
        
        currentSlide = Math.round(scrollPosition / cardWidth);
        updateDots();
    });

    // Initialize active state
    updateDots();

    // --- NAVBAR DROPDOWN/ACCORDION LOGIC ---
    const keysBtn = document.getElementById('keys-btn');
    const keysDropdown = document.getElementById('keys-dropdown');
    const navKeys = document.querySelector('.nav-item.nav-keys');

    function isDesktop() {
        return window.innerWidth > 768;
    }

    // Show/hide dropdown on click (desktop)
    keysBtn.addEventListener('click', function(e) {
        if (isDesktop()) {
            e.preventDefault();
            navKeys.classList.toggle('active');
        }
    });

    // Hide dropdown on click outside (desktop)
    document.addEventListener('mousedown', function(e) {
        if (isDesktop() && navKeys.classList.contains('active')) {
            if (!navKeys.contains(e.target)) {
                navKeys.classList.remove('active');
            }
        }
    });

    // Mobile: robust accordion for Keys (class-based)
    function closeMobileDropdown() {
        navKeys.classList.remove('open');
        keysBtn.classList.remove('open');
    }
    function openMobileDropdown() {
        navKeys.classList.add('open');
        keysBtn.classList.add('open');
    }
    keysBtn.addEventListener('click', function(e) {
        if (!isDesktop()) {
            e.preventDefault();
            if (navKeys.classList.contains('open')) {
                closeMobileDropdown();
            } else {
                openMobileDropdown();
            }
        }
    });
    // Close dropdown if you tap outside (mobile)
    document.addEventListener('mousedown', function(e) {
        if (!isDesktop() && navKeys.classList.contains('open')) {
            if (!navKeys.contains(e.target)) {
                closeMobileDropdown();
            }
        }
    });
    // Hide dropdown on resize
    window.addEventListener('resize', function() {
        if (isDesktop()) {
            keysDropdown.style.display = '';
            keysBtn.classList.remove('open');
            navKeys.classList.remove('active');
            navKeys.classList.remove('open');
        } else {
            closeMobileDropdown();
            navKeys.classList.remove('active');
        }
    });

    // --- NAVBAR ANIMATED ACTIVE LINK LOGIC ---
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.desktop-nav .nav-anim-link');
        let found = false;
        navLinks.forEach(link => {
            link.classList.remove('active');
            // For hash links
            if (link.hash && window.location.hash && link.hash === window.location.hash) {
                link.classList.add('active');
                found = true;
            }
            // For page links
            if (!found && link.pathname && window.location.pathname.endsWith(link.pathname)) {
                link.classList.add('active');
                found = true;
            }
        });
        // Default: if no match, set first link as active
        if (!found && navLinks.length) navLinks[0].classList.add('active');
    }

    document.querySelectorAll('.desktop-nav .nav-anim-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for hash links
            if (this.hash && this.hash.startsWith('#')) {
                e.preventDefault();
                window.location.hash = this.hash;
                setActiveNavLink();
            }
        });
    });

    setActiveNavLink();
    window.addEventListener('hashchange', setActiveNavLink);
}); 