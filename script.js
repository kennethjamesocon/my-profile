document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoadingScreen();
    initScrollProgress();
    initBackToTop();
    initMobileMenu();
    initAnimations();
    initNavigation();
    initFormValidation();
    initSkillAnimations();
    initSkillPercentageAnimation();
});

function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        // Wait for window load instead of fixed timeout
        window.addEventListener('load', () => {
            loadingScreen.classList.add('fade-in');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        });
    }
}

function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }
}

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 300);
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));
}

function initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

function initFormValidation() {
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', (e) => {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value || !email.value || !message.value) {
                e.preventDefault();
                alert('Please fill in all required fields');
                return;
            }
            
            const mailtoUrl = `mailto:kennethjamesocon3@gmail.com?subject=${
                encodeURIComponent(subject.value || 'Contact Request')
            }&body=${encodeURIComponent(
                `Name: ${name.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`
            )}`;
            
            window.open(mailtoUrl, '_blank');
            
            // Reset form
            name.value = email.value = subject.value = message.value = '';
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
}

function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => entry.target.style.width = width, 100);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Scroll progress bar - Stable version without animation
const scrollProgress = document.getElementById('scrollProgress');
// Remove any transition styles that might be present
scrollProgress.style.transition = 'none';

window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // Directly set the width without animation
    scrollProgress.style.width = scrollPercentage + '%';
});