// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Define the API URL
    const API_URL = "https://app-test-rojhj.kinsta.app";

    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    
    // Add close button to mobile navigation
    if (menuBtn && nav) {
        // Create close button element
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        nav.appendChild(closeBtn);
        
        // Toggle menu on click
        menuBtn.addEventListener('click', function() {
            nav.classList.add('active');
        });
        
        // Close menu on close button click
        closeBtn.addEventListener('click', function() {
            nav.classList.remove('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
                nav.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.padding = '15px 0';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            // Highlight current section in navigation
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    document.querySelectorAll('.nav a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            try {
                // Send data to server
                const response = await fetch(`${API_URL}/api/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert(`Error: ${data.error || 'Something went wrong. Please try again.'}`);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to submit the form. Please try again later.');
            }
        });
    }
    
    // Handle Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get email value
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            try {
                // Send data to server
                const response = await fetch(`${API_URL}/api/subscribe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Thank you for subscribing to our newsletter!');
                    newsletterForm.reset();
                } else {
                    alert(`Error: ${data.error || 'Something went wrong. Please try again.'}`);
                }
            } catch (error) {
                console.error('Error subscribing:', error);
                alert('Failed to subscribe. Please try again later.');
            }
        });
    }
    
    // Reveal animations on scroll (simple implementation)
    const revealElements = document.querySelectorAll('.feature-card, .download-info, .app-preview, .contact-form, .contact-info');
    
    function revealOnScroll() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
    
    // Connect to Python App Feature (updated functionality)
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Update the href to point to the app's download URL
            window.location.href = `${API_URL}/app_connect.py`;
            console.log('User clicked the download button');
        });
    }
    
    // Check API status on page load
    async function checkApiStatus() {
        try {
            const response = await fetch(`${API_URL}/api/status`);
            const data = await response.json();
            console.log('API Status:', data);
            
            // You could display a status indicator on the page if needed
        } catch (error) {
            console.error('API Status Check Failed:', error);
        }
    }
    
    // Run the API status check
    checkApiStatus();
}); 