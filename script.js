document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section'); // Get all section elements

    // --- Theme Toggle Logic ---
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggleBtn.querySelector('i').className = 'bx bxs-moon'; // Moon icon for light mode
        } else {
            body.classList.remove('light-mode');
            themeToggleBtn.querySelector('i').className = 'bx bxs-sun'; // Sun icon for dark mode
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
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // --- Smooth Scrolling & Active Navbar Link Logic ---
    window.addEventListener('scroll', () => {
        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the link corresponding to the current section in view
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150; // Adjust offset as needed for header height
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            }
        });

        // For the header shadow on scroll (optional, if you want it to appear only when scrolling)
        // const header = document.querySelector('.header');
        // if (window.scrollY > 50) {
        //     header.classList.add('scrolled');
        // } else {
        //     header.classList.remove('scrolled');
        // }
    });

    // --- Scroll Reveal Animation ---
    // Intersection Observer for animating sections into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                // observer.unobserve(entry.target); // Optional: uncomment if you want animation to run only once
            } else {
                // entry.target.classList.remove('show-animate'); // Optional: uncomment if you want animation to reset when scrolling away
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- Current Year for Copyright ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
