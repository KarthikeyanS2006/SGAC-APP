/* ========================================
   MODERN COLLEGE WEBSITE - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ========== STICKY NAVBAR ==========
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when window is resized to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========== TAB SWITCHING (Enhanced) ==========
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Get target tab from onclick attribute or data-tab attribute
            let targetTab = this.getAttribute('data-tab');
            if (!targetTab) {
                // Extract from onclick="openTab(event, 'tabname')"
                const onclick = this.getAttribute('onclick');
                if (onclick) {
                    const match = onclick.match(/openTab\s*\(\s*\w+\s*,\s*['"](\w+)['"]/);
                    if (match) targetTab = match[1];
                }
            }

            if (!targetTab) return;

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                // Also remove onclick-based active
                btn.style.backgroundColor = '';
            });
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            this.style.backgroundColor = 'var(--color-primary-dark)';
            
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            }
        });
    });

    // ========== DROPDOWN MENU (Mobile) ==========
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown');

    dropdownToggles.forEach(item => {
        const link = item.querySelector('.nav-link');
        const menu = item.querySelector('.dropdown-menu');

        if (link && menu) {
            link.addEventListener('click', function (e) {
                // On mobile, toggle dropdown
                if (window.innerWidth <= 768 || window.matchMedia('(max-width: 768px)').matches) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdownToggles.forEach(other => {
                        if (other !== item) {
                            const otherMenu = other.querySelector('.dropdown-menu');
                            if (otherMenu) otherMenu.style.display = 'none';
                        }
                    });
                    
                    const isShown = menu.style.display === 'block';
                    menu.style.display = isShown ? 'none' : 'block';
                }
            });
        }
    });

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== ACTIVE TAB INITIALIZATION ==========
    // Set initial active tab styles
    tabButtons.forEach(button => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = 'var(--color-primary-dark)';
        }
    });

    // ========== LIGHTBOX FUNCTIONALITY ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => ({
            src: item.querySelector('img').src,
            caption: item.querySelector('.gallery-overlay span')?.textContent || ''
        }));

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                openLightbox(images[currentIndex]);
            });
        });

        function openLightbox(image) {
            lightboxImg.src = image.src;
            lightboxCaption.textContent = image.caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        document.querySelector('.lightbox-ok').addEventListener('click', closeLightbox);
        
        document.querySelector('.lightbox-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            openLightbox(images[currentIndex]);
        });

        document.querySelector('.lightbox-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            openLightbox(images[currentIndex]);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') currentIndex = (currentIndex - 1 + images.length) % images.length;
            if (e.key === 'ArrowRight') currentIndex = (currentIndex + 1) % images.length;
            openLightbox(images[currentIndex]);
        });
    }

});
