document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    // --- Theme Toggle Logic ---
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggleBtn.querySelector('i').className = 'bx bxs-moon'; // Change to moon icon for light mode
        } else {
            body.classList.remove('light-mode');
            themeToggleBtn.querySelector('i').className = 'bx bxs-sun'; // Change to sun icon for dark mode
        }
        localStorage.setItem('theme', theme); // Save preference
    }

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        // If no preference saved, check OS preference
        setTheme('light');
    } else {
        setTheme('dark'); // Default to dark if no preference or OS preference is dark
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    // --- Mobile Menu Toggle Logic ---
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x'); // Toggles hamburger to 'X' icon
        navbar.classList.toggle('active'); // Toggles active class for navbar visibility
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // --- Current Year for Copyright ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
