document.addEventListener('DOMContentLoaded', function () {
    // MOBILE NAVIGATION
    {
        // Mobile navigation elements
        const hamburgerBtn = document.querySelector('.header__hamburger');
        const navMobile = document.querySelector('.nav-mobile');
        const navMobileOverlay = document.querySelector('.nav-mobile__overlay');
        const navMobileClose = document.querySelector('.nav-mobile__close');
        const navMobileButtons = navMobile ? navMobile.querySelectorAll('button, a, [tabindex]') : [];

        // Mobile navigation functions
        function toggleMobileNavAccessibility(isOpen) {
        const navMobile = document.querySelector('.nav-mobile');
        const interactiveElements = navMobile.querySelectorAll('button, a, [tabindex]');
        
        interactiveElements.forEach(el => {
            if (isOpen) {
            el.removeAttribute('tabindex');
            el.removeAttribute('aria-hidden');
            } else {
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-hidden', 'true');
            }
        });
        }

        function openNavMobile() {
            hamburgerBtn.classList.add('header__hamburger--hide');
            navMobile.classList.add('nav-mobile--active');
            navMobileOverlay.classList.add('nav-mobile__overlay--active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            navMobile.setAttribute('aria-hidden', 'false');

            // Enable all interactive buttons/links
            navMobileButtons.forEach(el => {
                el.disabled = false;
                el.style.opacity = '1';
                el.style.pointerEvents = 'auto';
                el.removeAttribute('tabindex');
            });

            document.body.style.overflow = 'hidden';
        }

        function closeNavMobile() {
            navMobile.classList.remove('nav-mobile--active');
            navMobileOverlay.classList.remove('nav-mobile__overlay--active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            navMobile.setAttribute('aria-hidden', 'true');

            // Disable all interactive buttons/links
            navMobileButtons.forEach(el => {
                el.disabled = true;
                el.style.opacity = '0.5';
                el.style.pointerEvents = 'none';
                el.setAttribute('tabindex', '-1');
            });

            document.body.style.overflow = '';

            // Restore hamburger button after nav animation
            setTimeout(() => {
                hamburgerBtn.classList.remove('header__hamburger--hide');
            }, 200);
        }

        // Mobile navigation event listeners
        if (hamburgerBtn && navMobile) {
            hamburgerBtn.addEventListener('click', openNavMobile);
            navMobileButtons.forEach((btn) => {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.pointerEvents = 'none';
            });
        }
        
        if (navMobileClose) navMobileClose.addEventListener('click', closeNavMobile);
        if (navMobileOverlay) navMobileOverlay.addEventListener('click', closeNavMobile);
        
        // Escape key to close mobile nav
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMobile.classList.contains('nav-mobile--active')) {
                closeNavMobile();
            }
        });

        // Checks if nav is open, if it is and tab nav leaves it closeNavMobile
        document.addEventListener('focusin', (e) => {
            if (!navMobile.classList.contains('nav-mobile--active')) return;

            // If the newly focused element is NOT inside navMobile
            if (!navMobile.contains(e.target) && e.target !== hamburgerBtn) {
                closeNavMobile();
            }
        });
    }
    // FOOTER YEAR UPDATE
    {
        // Set current year in footer
        document.querySelectorAll('.footer-credit__year').forEach((el) => {
            el.textContent = new Date().getFullYear();
        });
    }
    // THEME TOGGLE
    {  
        // Theme toggle functionality
        const themeToggles = document.querySelectorAll('.mode-toggle');
        
        function setTheme(mode) {
            document.body.classList.toggle('theme--light', mode === 'light');
            document.body.classList.toggle('theme--dark', mode === 'dark');
            localStorage.setItem('theme', mode);
        }
        
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme === 'light' ? 'light' : 'dark');
        
        themeToggles.forEach((btn) => {
            btn.addEventListener('click', () => {
                setTheme(document.body.classList.contains('theme--light') ? 'dark' : 'light');
            });
        });
    }
    // CAROUSEL, LAZY LOADING, DRAG & SWIPE
    {
        // Carousel functionality
        const carouselPages = document.querySelector('.carousel__pages');
        const carouselDots = document.querySelectorAll('.carousel__dot');
        const prevBtn = document.querySelector('.carousel__arrow--left');
        const nextBtn = document.querySelector('.carousel__arrow--right');
        let currentPage = 0;
        const totalPages = document.querySelectorAll('.carousel__page').length;

        const carousel = document.querySelector('.carousel');
        let scrollbar, thumb;
        
        if (carousel) {
            scrollbar = document.createElement('div');
            scrollbar.className = 'carousel__scrollbar';
            thumb = document.createElement('div');
            thumb.className = 'carousel__thumb';
            scrollbar.appendChild(thumb);
            carousel.appendChild(scrollbar);
        }

        function updateCarousel() {
            if (!carouselPages) return;
            
            const pageWidth = carouselPages.offsetWidth;
            carouselPages.style.transition = 'transform 0.5s ease';
            carouselPages.style.transform = `translateX(-${currentPage * pageWidth}px)`;
            
            carouselDots.forEach((dot, index) => {
                dot.classList.toggle('carousel__dot--active', index === currentPage);
            });
            
            updateScrollThumb();
        }

        function updateScrollThumb() {
            if (!carouselPages || !scrollbar) return;
            
            const currentPageEl = document.querySelectorAll('.carousel__page')[currentPage];
            if (!currentPageEl) return;
            
            const scrollHeight = currentPageEl.scrollHeight;
            const clientHeight = currentPageEl.clientHeight;
            
            if (scrollHeight > clientHeight) {
                const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
                const thumbPosition = (currentPageEl.scrollTop / scrollHeight) * clientHeight;
                
                thumb.style.height = `${Math.max(thumbHeight, 20)}px`;
                thumb.style.top = `${thumbPosition}px`;
                scrollbar.style.display = 'block';
            } else {
                scrollbar.style.display = 'none';
            }
        }

        // Scrollbar dragging functionality
        let isScrolling = false;

        if (thumb) {
            thumb.addEventListener('mousedown', (e) => {
                isScrolling = true;
                document.body.style.cursor = 'grabbing';
                e.preventDefault();
            });
        }

        document.addEventListener('mousemove', (e) => {
            if (!isScrolling || !carouselPages) return;
            
            const currentPageEl = document.querySelectorAll('.carousel__page')[currentPage];
            if (!currentPageEl) return;
            
            const scrollHeight = currentPageEl.scrollHeight;
            const clientHeight = currentPageEl.clientHeight;
            const scrollbarRect = scrollbar.getBoundingClientRect();
            const yPosition = e.clientY - scrollbarRect.top;
            const scrollPosition = (yPosition / clientHeight) * scrollHeight;
            
            currentPageEl.scrollTop = scrollPosition;
            updateScrollThumb();
        });

        document.addEventListener('mouseup', () => {
            isScrolling = false;
            document.body.style.cursor = '';
        });

        if (carouselPages) {
            document.querySelectorAll('.carousel__page').forEach(page => {
                page.addEventListener('scroll', updateScrollThumb);
            });
        }

        // Carousel navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentPage = (currentPage + 1) % totalPages;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentPage = (currentPage - 1 + totalPages) % totalPages;
                updateCarousel();
            });
        }

        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentPage = index;
                updateCarousel();
            });
        });

        // Drag and swipe functionality
        let isDragging = false;
        let isMouseDragging = false;
        let dragStartX = 0, dragCurrentX = 0, dragDelta = 0;
        let dragThreshold = 60;
        let isTouch = false;
        let startX = 0, startY = 0, currentX = 0, currentY = 0;
        let isHorizontalIntent = null;

        if (carouselPages) {
            // Mouse events
            carouselPages.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDragging = true;
                isMouseDragging = true;
                dragStartX = e.pageX;
                dragCurrentX = dragStartX;
                carouselPages.classList.add('carousel__pages--dragging');
                document.body.style.cursor = 'pointer';
            });

            // Touch events
            carouselPages.addEventListener('touchstart', (e) => {
                isTouch = true;
                isDragging = true;
                isHorizontalIntent = null;
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                dragStartX = startX;
                dragCurrentX = startX;
                carouselPages.classList.add('carousel__pages--dragging');
            }, { passive: false });

            carouselPages.addEventListener('touchmove', (e) => {
                if (!isDragging || !isTouch) return;
                
                currentX = e.touches[0].pageX;
                currentY = e.touches[0].pageY;
                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                if (isHorizontalIntent === null) {
                    isHorizontalIntent = Math.abs(deltaX) > Math.abs(deltaY);
                }

                if (isHorizontalIntent) {
                    e.preventDefault();
                    dragCurrentX = currentX;
                    dragDelta = dragCurrentX - dragStartX;
                    carouselPages.style.transition = 'none';
                    const pageWidth = carouselPages.offsetWidth;
                    carouselPages.style.transform = `translateX(${-currentPage * pageWidth + dragDelta}px)`;
                }
            }, { passive: false });

            carouselPages.addEventListener('touchend', () => {
                if (!isTouch) return;
                
                carouselPages.style.transition = '';
                document.body.style.cursor = '';
                
                if (isHorizontalIntent) {
                    const pageWidth = carouselPages.offsetWidth;
                    if (Math.abs(dragDelta) > dragThreshold) {
                        if (dragDelta < 0 && currentPage < totalPages - 1) currentPage++;
                        else if (dragDelta > 0 && currentPage > 0) currentPage--;
                    }
                    updateCarousel();
                }
                
                isDragging = false;
                isTouch = false;
                isHorizontalIntent = null;
                dragDelta = 0;
            }, { passive: true });
        }

        // Global mouse events for dragging
        document.addEventListener('mousemove', (e) => {
            if (!isDragging || !isMouseDragging || !carouselPages) return;
            
            dragCurrentX = e.pageX;
            dragDelta = dragCurrentX - dragStartX;
            carouselPages.style.transition = 'none';
            const pageWidth = carouselPages.offsetWidth;
            carouselPages.style.transform = `translateX(${-currentPage * pageWidth + dragDelta}px)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging || !isMouseDragging || !carouselPages) return;
            
            carouselPages.classList.remove('carousel__pages--dragging');
            document.body.style.cursor = '';
            carouselPages.style.transition = '';
            
            const pageWidth = carouselPages.offsetWidth;
            if (Math.abs(dragDelta) > dragThreshold) {
                if (dragDelta < 0 && currentPage < totalPages - 1) currentPage++;
                else if (dragDelta > 0 && currentPage > 0) currentPage--;
            }
            
            updateCarousel();
            isDragging = false;
            isMouseDragging = false;
            dragDelta = 0;
        });

        document.addEventListener('mouseleave', () => {
            if (!isDragging || !isMouseDragging || !carouselPages) return;
            
            carouselPages.classList.remove('carousel__pages--dragging');
            document.body.style.cursor = '';
            carouselPages.style.transition = '';
            updateCarousel();
            isDragging = false;
            isMouseDragging = false;
            dragDelta = 0;
        });

        // Lazy load project images
        const lazyBackgrounds = document.querySelectorAll('.project-card__background');

        const lazyLoad = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bg = entry.target;
                    const src = bg.dataset.src;
                    
                    if (src) {
                        bg.style.backgroundImage = `url(${src})`;
                        bg.classList.add('loaded');

                        const card = bg.closest('.project-card');
                        if (card) {
                            card.classList.remove('skeleton');
                            const skeletonContent = card.querySelector('.skeleton-content');
                            if (skeletonContent) {
                                skeletonContent.style.display = 'none';
                            }
                        }
                        
                        observer.unobserve(bg);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(lazyLoad, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        });

        lazyBackgrounds.forEach((bg) => observer.observe(bg));

        updateCarousel();
        updateScrollThumb();

        // Add keyboard navigation for carousel cards
        function initKeyboardNavigation() {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
                });
            });
        }

        // Store carousel page for tab navigation
        document.addEventListener('focusin', (e) => {
            const focusedCard = e.target.closest('.project-card');
            if (!focusedCard || !carouselPages) return;

            // Find which page contains the focused card
            const pageIndex = Array.from(document.querySelectorAll('.carousel__page')).findIndex(page =>
                page.contains(focusedCard)
            );

            // Update current page if different
            if (pageIndex !== -1 && pageIndex !== currentPage) {
                currentPage = pageIndex;
                updateCarousel();
            }
        });

        // Update existing keyboard navigation to handle page changes
        function initKeyboardNavigation() {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                    // Handle tab navigation between pages
                    else if (e.key === 'Tab') {
                        setTimeout(() => {
                            const activeElement = document.activeElement;
                            const activeCard = activeElement.closest('.project-card');
                            if (!activeCard || !carouselPages) return;

                            const pageIndex = Array.from(document.querySelectorAll('.carousel__page')).findIndex(page =>
                                page.contains(activeCard)
                            );

                            if (pageIndex !== -1 && pageIndex !== currentPage) {
                                currentPage = pageIndex;
                                updateCarousel();
                            }
                        }, 10);
                    }
                });
            });
        }
    }

    toggleMobileNavAccessibility(false);
    initKeyboardNavigation();

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
            updateScrollThumb();
        }, 250);
    });
});