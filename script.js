document.addEventListener('DOMContentLoaded', function() {
        // --- Mobile Menu Toggle ---
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarMenu = document.getElementById('navbarMenu');
        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', () => navbarMenu.classList.toggle('is-active'));
        }

        // --- Change Navbar on Scroll ---
        const mainNavbar = document.getElementById('main-navbar');
        // A threshold of 10 means the change happens almost immediately after scrolling
        const scrollThreshold = 10; 
        
        if (mainNavbar) {
            window.addEventListener('scroll', () => {
                // Use toggle with the second argument for clean add/remove logic
                mainNavbar.classList.toggle('is-scrolled', window.scrollY > scrollThreshold);
            });
        }
    });

    // Carousel functionality
class HeroCarousel {
    constructor() {
        this.carousel = document.querySelector('.hero-carousel');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.playBtn = document.querySelector('.play-btn');
        this.pauseBtn = document.querySelector('.pause-btn');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = 5000; // 5 seconds
        this.autoplayTimer = null;
        this.isPlaying = true;
        
        this.init();
    }
    
    init() {
        // Start autoplay
        this.startAutoplay();
        
        // Event listeners for navigation
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.prevSlide();
            this.startAutoplay();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.nextSlide();
            this.startAutoplay();
        });
        
        // Event listeners for indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.stopAutoplay();
                this.goToSlide(index);
                this.startAutoplay();
            });
        });
        
        // Event listeners for play/pause
        this.playBtn.addEventListener('click', () => {
            this.startAutoplay();
            this.togglePlayPause(true);
        });
        
        this.pauseBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.togglePlayPause(false);
        });
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            if (this.isPlaying) {
                this.startAutoplay();
            }
        });
        
        // Touch swipe support for mobile
        this.setupTouchEvents();
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show current slide and indicator
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.showSlide(index);
        }
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoplayInterval);
        this.isPlaying = true;
    }
    
    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
        this.isPlaying = false;
    }
    
    togglePlayPause(playing) {
        this.isPlaying = playing;
        if (playing) {
            this.playBtn.classList.add('active');
            this.pauseBtn.classList.remove('active');
        } else {
            this.playBtn.classList.remove('active');
            this.pauseBtn.classList.add('active');
        }
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, {passive: true});
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Swipe left - next slide
            this.stopAutoplay();
            this.nextSlide();
            this.startAutoplay();
        } else if (endX - startX > swipeThreshold) {
            // Swipe right - previous slide
            this.stopAutoplay();
            this.prevSlide();
            this.startAutoplay();
        }
    }
}

// Existing navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    const carousel = new HeroCarousel();
    
    // Existing navbar scroll effect
    const navbar = document.getElementById('main-navbar');
    const toggleButton = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // Toggle mobile menu
    toggleButton.addEventListener('click', function() {
        navbarMenu.classList.toggle('is-active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('is-active');
        });
    });
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});