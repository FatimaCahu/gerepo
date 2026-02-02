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

const hola = "h";