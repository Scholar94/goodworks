// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    navbar.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // In a real application, this would send to your server
            console.log('Form submitted:', data);
            
            // Show success message
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showMessage('There was an error sending your message. Please try again.', 'error');
            console.error('Contact form error:', error);
        }
    });
}

// Newsletter Signup
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        try {
            // In a real application, this would send to your server
            console.log('Newsletter signup:', email);
            
            // Show success message
            showMessage('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        } catch (error) {
            showMessage('There was an error with your subscription. Please try again.', 'error');
            console.error('Newsletter error:', error);
        }
    });
}

// Show message function
function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.classList.add('fade-out');
        setTimeout(() => {
            messageEl.remove();
        }, 300);
    }, 5000);
}

// Initialize sermon players
function initSermonPlayers() {
    document.querySelectorAll('.play-sermon').forEach(button => {
        button.addEventListener('click', function() {
            const sermonCard = this.closest('.sermon-card');
            const audio = sermonCard.querySelector('audio');
            
            if (audio) {
                if (audio.paused) {
                    audio.play();
                    this.textContent = 'Pause';
                } else {
                    audio.pause();
                    this.textContent = 'Listen';
                }
            }
        });
    });
}

// Initialize event RSVP buttons
function initEventRSVP() {
    document.querySelectorAll('.event-rsvp').forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            
            // In a real app, this would open an RSVP modal
            showMessage(`RSVP for "${eventTitle}" would be processed here`, 'info');
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSermonPlayers();
    initEventRSVP();
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}