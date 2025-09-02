// Portfolio JavaScript - KAVIN P
// Modern minimalist interactions with creative animations

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Scroll animations
    initScrollAnimations();
    
    // Interactive elements
    initInteractiveElements();
    
    // Form handling
    initFormHandling();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Mobile menu
    initMobileMenu();
    
    // Loading animations
    initLoadingAnimations();
});

// Navigation Functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButtons = document.querySelectorAll('.hero-cta .btn');
    
    [...navLinks, ...ctaButtons].forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const hamburger = document.querySelector('.hamburger');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to animated elements
    const animatedElements = document.querySelectorAll(`
        .skill-category,
        .project-card,
        .stat-item,
        .cert-card,
        .contact-item,
        .achievement-highlight,
        .stat-card
    `);
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.05}s`; // Reduced from 0.1s to 0.05s for faster animation
        observer.observe(element);
    });
    
    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3; // Reduced from 0.5 to 0.3 for smoother, faster parallax
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Project card tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Animated counters for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        countObserver.observe(stat);
    });
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.textContent);
    let count = 0;
    const increment = target / 30;
    
    const updateCount = () => {
        if (count < target) {
            count += increment;
            element.textContent = Math.ceil(count) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    updateCount();
}

// Form Handling with EmailJS
function initFormHandling() {
    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
    
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formInputs = contactForm.querySelectorAll('.form-input');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Simple validation
            let isValid = true;
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#C1121F';
                    isValid = false;
                } else {
                    input.style.borderColor = '#FDF0D5';
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            try {
                // Prepare email template parameters
                const templateParams = {
                    from_name: formData.get('from_name'),
                    from_email: formData.get('from_email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    to_name: 'KAVIN P',
                    to_email: 'kavin22cs024@gmail.com',
                    reply_to: formData.get('from_email')
                };
                
                // Send email using EmailJS
                const response = await emailjs.send(
                    'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                    'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                    templateParams
                );
                
                if (response.status === 200) {
                    // Success
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    
                    // Send auto-reply to sender
                    await sendAutoReply(templateParams);
                } else {
                    throw new Error('Failed to send message');
                }
                
            } catch (error) {
                console.error('EmailJS Error:', error);
                
                // Fallback to mailto link
                const mailtoFallback = () => {
                    const subject = encodeURIComponent(formData.get('subject'));
                    const body = encodeURIComponent(
                        `Name: ${formData.get('from_name')}\n` +
                        `Email: ${formData.get('from_email')}\n\n` +
                        `Message:\n${formData.get('message')}`
                    );
                    const mailtoLink = `mailto:kavin22cs024@gmail.com?subject=${subject}&body=${body}`;
                    window.open(mailtoLink, '_blank');
                    
                    showNotification('Opening your default email client. If it doesn\'t work, please email me directly at kavin22cs024@gmail.com', 'info');
                };
                
                // Show error with fallback option
                showNotificationWithAction(
                    'Failed to send via web form. Would you like to use your email client instead?',
                    'error',
                    'Open Email Client',
                    mailtoFallback
                );
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim()) {
                    input.style.borderColor = '#669BBC';
                } else {
                    input.style.borderColor = '#FDF0D5';
                }
            });
            
            input.addEventListener('focus', () => {
                input.style.borderColor = '#669BBC';
            });
        });
    }
}

// Auto-reply function
async function sendAutoReply(originalParams) {
    try {
        const autoReplyParams = {
            to_name: originalParams.from_name,
            to_email: originalParams.from_email,
            from_name: 'KAVIN P',
            subject: 'Thank you for contacting me!',
            message: `Hi ${originalParams.from_name},\n\nThank you for reaching out! I have received your message regarding "${originalParams.subject}" and will get back to you as soon as possible.\n\nBest regards,\nKAVIN P\nUI/UX Designer & Software Engineer\nkavin22cs024@gmail.com`
        };
        
        await emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_AUTO_REPLY_TEMPLATE_ID', // Replace with your auto-reply template ID
            autoReplyParams
        );
    } catch (error) {
        console.log('Auto-reply failed:', error);
        // Don't show error to user for auto-reply failure
    }
}

// Enhanced Notification System with Action Button
function showNotificationWithAction(message, type, actionText, actionCallback) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'info' ? 'ℹ' : '⚠'}</span>
            <div class="notification-text">
                <span class="notification-message">${message}</span>
                ${actionText ? `<button class="notification-action">${actionText}</button>` : ''}
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const bgColor = type === 'success' ? '#669BBC' : type === 'info' ? '#003049' : '#C1121F';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 1001;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 350px;
        min-width: 300px;
    `;
    
    // Style content
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-text').style.cssText = `
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    `;
    
    const actionBtn = notification.querySelector('.notification-action');
    if (actionBtn) {
        actionBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 0.25rem;
        `;
        
        actionBtn.addEventListener('mouseenter', () => {
            actionBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        actionBtn.addEventListener('mouseleave', () => {
            actionBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        actionBtn.addEventListener('click', () => {
            if (actionCallback) actionCallback();
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 8 seconds (longer for action notifications)
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 8000);
}

// Original Notification System
function showNotification(message, type) {
    showNotificationWithAction(message, type, null, null);
}

// Loading Animations
function initLoadingAnimations() {
    // Animate hero elements on load
    window.addEventListener('load', () => {
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-subtitle, .hero-description, .hero-cta');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 300); // Reduced delay from 200ms intervals + 500ms to 100ms + 300ms
        });
    });
}

// Utility Functions
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

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Enhanced Custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    
    // Main cursor ring
    cursor.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid #C1121F;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease-out;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
        backdrop-filter: blur(2px);
    `;
    
    // Inner dot
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: #780000;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.1s ease-out;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    // Smooth cursor following
    function updateCursor() {
        // Smooth following for main cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Faster following for dot
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Magnetic effect for buttons and links
        const magneticElements = document.querySelectorAll('.btn, .nav-link');
        magneticElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
            
            if (distance < 80) {
                const pullStrength = (80 - distance) / 80;
                const pullX = (centerX - e.clientX) * pullStrength * 0.3;
                const pullY = (centerY - e.clientY) * pullStrength * 0.3;
                
                mouseX += pullX;
                mouseY += pullY;
            }
        });
    });
    
    // Start animation loop
    updateCursor();
    
    // Enhanced cursor interactions for different elements
    const interactiveElements = {
        'a, button, .btn': {
            scale: '1.5',
            borderColor: '#669BBC',
            dotScale: '1.5',
            dotColor: '#669BBC'
        },
        '.project-card': {
            scale: '2',
            borderColor: '#003049',
            dotScale: '2',
            dotColor: '#003049'
        },
        '.skill-item': {
            scale: '1.3',
            borderColor: '#FDF0D5',
            dotScale: '1.2',
            dotColor: '#C1121F'
        },
        '.nav-link': {
            scale: '1.2',
            borderColor: '#780000',
            dotScale: '0.8',
            dotColor: '#780000'
        },
        'input, textarea': {
            scale: '0.8',
            borderColor: '#669BBC',
            dotScale: '3',
            dotColor: '#669BBC'
        }
    };
    
    Object.entries(interactiveElements).forEach(([selector, styles]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(-50%, -50%) scale(${styles.scale})`;
                cursor.style.borderColor = styles.borderColor;
                cursorDot.style.transform = `translate(-50%, -50%) scale(${styles.dotScale})`;
                cursorDot.style.background = styles.dotColor;
                
                // Add pulsing animation for buttons
                if (element.matches('button, .btn')) {
                    cursor.style.animation = 'cursorPulse 0.6s ease-in-out infinite alternate';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#C1121F';
                cursor.style.animation = 'none';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.background = '#780000';
            });
            
            // Click animation
            element.addEventListener('mousedown', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            element.addEventListener('mouseup', () => {
                setTimeout(() => {
                    cursor.style.transform = `translate(-50%, -50%) scale(${styles.scale || 1})`;
                    cursorDot.style.transform = `translate(-50%, -50%) scale(${styles.dotScale || 1})`;
                }, 100);
            });
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Cursor trail effect
    const trailElements = [];
    const trailLength = 5;
    
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${8 - i}px;
            height: ${8 - i}px;
            background: rgba(193, 18, 31, ${0.4 - i * 0.08});
            border-radius: 50%;
            pointer-events: none;
            z-index: ${9998 - i};
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease-out;
        `;
        document.body.appendChild(trail);
        trailElements.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    // Update trail positions
    function updateTrail() {
        for (let i = trailElements.length - 1; i > 0; i--) {
            trailElements[i].x += (trailElements[i - 1].x - trailElements[i].x) * 0.3;
            trailElements[i].y += (trailElements[i - 1].y - trailElements[i].y) * 0.3;
            
            trailElements[i].element.style.left = trailElements[i].x + 'px';
            trailElements[i].element.style.top = trailElements[i].y + 'px';
        }
        
        if (trailElements.length > 0) {
            trailElements[0].x = dotX;
            trailElements[0].y = dotY;
            trailElements[0].element.style.left = dotX + 'px';
            trailElements[0].element.style.top = dotY + 'px';
        }
        
        requestAnimationFrame(updateTrail);
    }
    
    // Start trail animation
    updateTrail();
    
    // Show/hide cursor when entering/leaving window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
}

// Initialize enhanced custom cursor on desktop devices only
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    initCustomCursor();
    document.body.classList.add('cursor-active');
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #669BBC !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);