// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Animate elements on scroll
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Countdown timer for conference
function updateCountdown() {
    const conferenceDate = new Date('2025-06-03T00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = conferenceDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update countdown display if element exists
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add hover effects to cards
document.querySelectorAll('.link-card, .speaker-card, .objective-card, .theme-card, .member-card, .patron-card, .convenor-card, .direction-card, .faq-item, .emergency-card, .payment-option, .note-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to body
    document.body.classList.add('loading');

    // Initialize countdown
    updateCountdown();

    // Add current year to footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Subtle parallax for hero sections
    const heroElements = document.querySelectorAll('.hero::before, .page-hero::before');
    heroElements.forEach(el => {
        el.style.transform = `translateY(${rate}px)`;
    });
}, 16)); // ~60fps

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const emailInputs = form.querySelectorAll('input[type="email"]');
        const phoneInputs = form.querySelectorAll('input[type="tel"]');

        let isValid = true;

        emailInputs.forEach(input => {
            if (input.value && !validateEmail(input.value)) {
                alert('Please enter a valid email address');
                isValid = false;
                input.focus();
            }
        });

        phoneInputs.forEach(input => {
            if (input.value && !validatePhone(input.value)) {
                alert('Please enter a valid phone number');
                isValid = false;
                input.focus();
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add smooth transitions to all interactive elements
document.querySelectorAll('button, .btn, a').forEach(element => {
    element.style.transition = 'all 0.3s ease';
});

// Conference theme color scheme
const themeColors = {
    primary: '#3498db',
    secondary: '#2c3e50',
    accent: '#e74c3c',
    success: '#27ae60',
    warning: '#f39c12'
};

// Apply theme colors dynamically
document.documentElement.style.setProperty('--primary-color', themeColors.primary);
document.documentElement.style.setProperty('--secondary-color', themeColors.secondary);
document.documentElement.style.setProperty('--accent-color', themeColors.accent);

// Accessibility improvements
document.querySelectorAll('a, button, input, select, textarea').forEach(element => {
    if (!element.getAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
    }
});

// Add skip to main content link for accessibility
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    transition: top 0.3s;
`;
document.body.insertBefore(skipLink, document.body.firstChild);

// Show skip link on focus
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

// Add main content id to first section
const firstSection = document.querySelector('section');
if (firstSection) {
    firstSection.id = 'main-content';
}