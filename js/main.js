// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal-text, .reveal-item');

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Parallax scrolling effect
function parallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
    });
}

// Active navigation highlight
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Event listeners
window.addEventListener('scroll', () => {
    reveal();
    parallax();
    updateActiveNav();
});

window.addEventListener('load', () => {
    reveal();
    updateActiveNav();
});

// Navbar animation on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Timeline animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.5
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});

// Hero section animation
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const avatarContainer = document.querySelector('.avatar-container');
    
    // Activate hero elements after a short delay
    setTimeout(() => {
        heroContent.classList.add('active');
        avatarContainer.classList.add('active');
    }, 300);
});

// Avatar slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.avatar-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideshow();
            startSlideshow();
        });
    });

    // Start slideshow
    startSlideshow();

    // Pause slideshow when hovering over avatar
    const avatarContainer = document.querySelector('.avatar-container');
    avatarContainer.addEventListener('mouseenter', stopSlideshow);
    avatarContainer.addEventListener('mouseleave', startSlideshow);
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const navbar = document.querySelector('.navbar');
    const navCenter = document.querySelector('.nav-center');
    const rightSection = document.querySelector('.right-section');

    menuButton.addEventListener('click', () => {
        navbar.classList.toggle('collapsed');
        navCenter.classList.toggle('active');
        rightSection.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navCenter.classList.contains('active')) {
            navbar.classList.remove('collapsed');
            navCenter.classList.remove('active');
            rightSection.classList.remove('active');
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbar.classList.remove('collapsed');
            navCenter.classList.remove('active');
            rightSection.classList.remove('active');
        }
    });
});
