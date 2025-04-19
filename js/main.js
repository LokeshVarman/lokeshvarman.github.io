document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener function
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('.nav-menu .nav-link', true);
    
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Mobile nav toggle
     */
    on('click', '.hamburger', function(e) {
        select('.hamburger').classList.toggle('active');
        select('.nav-menu').classList.toggle('active');
    });

    /**
     * Close mobile nav when clicking on a nav item
     */
    on('click', '.nav-link', function(e) {
        select('.hamburger').classList.remove('active');
        select('.nav-menu').classList.remove('active');
    }, true);

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top');
    
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('show');
            } else {
                backtotop.classList.remove('show');
            }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Form submission handling
     */
    const contactForm = select('#contactForm');
    const formStatus = select('#formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you'd send the form data to a server
            // For the GitHub Pages demo, we'll just show a success message
            const name = select('#name').value;
            const email = select('#email').value;
            const subject = select('#subject').value;
            const message = select('#message').value;
            
            if (name && email && subject && message) {
                // Simulate form submission success
                formStatus.innerHTML = "Thank you for your message! In a real implementation, this would be sent to a server.";
                formStatus.classList.add('success');
                formStatus.style.display = 'block';
                
                // Reset the form
                contactForm.reset();
                
                // Hide the message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.classList.remove('success');
                }, 5000);
            } else {
                formStatus.innerHTML = "Please fill in all fields.";
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
                
                // Hide the message after 3 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.classList.remove('error');
                }, 3000);
            }
        });
    }

    /**
     * Smooth scroll for internal links
     */
    on('click', 'a[href*="#"]', function(e) {
        if (this.hash && !this.hash.includes('=')) {
            e.preventDefault();
            
            let navbar = select('#header');
            let section = select(this.hash);
            
            if (navbar && section) {
                let header_height = navbar.offsetHeight;
                let section_pos = section.offsetTop;
                
                window.scrollTo({
                    top: section_pos - header_height,
                    behavior: 'smooth'
                });
            }
        }
    }, true);

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        const fadeInElements = document.querySelectorAll('.section-title, .skill-item, .project-card, .timeline-item, .cert-item, .affiliation-item');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 1s forwards';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeInElements.forEach(el => {
            el.style.opacity = '0';
            fadeInObserver.observe(el);
        });
    });

    /**
     * Add CSS animation
     */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
