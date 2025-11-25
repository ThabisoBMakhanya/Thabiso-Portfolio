// DOM Elements
const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");
const darkModeToggle = document.querySelector(".dark-mode-toggle");
const header = document.getElementById("header");
const playBtn = document.querySelector(".play-btn");
const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Toggle Mobile Menu
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
});

// Close Mobile Menu
function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

closeMenu.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = darkModeToggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("bx-moon");
        icon.classList.add("bx-sun");
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove("bx-sun");
        icon.classList.add("bx-moon");
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector("i");
    icon.classList.remove("bx-moon");
    icon.classList.add("bx-sun");
}

// Header Scroll Effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Play Button Animation
playBtn.addEventListener("click", () => {
    playBtn.innerHTML = '<i class="bx bx-check"></i>';
    playBtn.style.backgroundColor = "var(--first-color)";
    playBtn.style.color = "var(--third-color)";
    
    setTimeout(() => {
        playBtn.innerHTML = '<i class="bx bx-play"></i>';
        playBtn.style.backgroundColor = "var(--second-color)";
        playBtn.style.color = "var(--black-color)";
    }, 2000);
});

// Smooth Scrolling for Anchor Links
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// Add click event to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        smoothScroll(targetId);
    });
});

// Add click event to mobile navigation links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        smoothScroll(targetId);
        closeMobileMenu();
    });
});

// Hire Me Button Functionality
const hireMeButtons = document.querySelectorAll('.hire-me-btn');
hireMeButtons.forEach(button => {
    button.addEventListener('click', () => {
        smoothScroll('#contact');
        closeMobileMenu();
    });
});

// Add intersection observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service and project cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});