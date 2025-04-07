document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Simple form submission (example)
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);

            // Show success message with improved styling
            this.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We'll get back to you soon.</p>
                </div>`;
        });
    }
    
    // Simple animation for crypto icons
    const animateCryptoIcons = () => {
        const btcIcon = document.querySelector('.crypto-icon.btc');
        const ethIcon = document.querySelector('.crypto-icon.eth');
        
        if (btcIcon && ethIcon) {
            setInterval(() => {
                // Animate BTC icon
                const btcX = 10 + Math.random() * 10;
                const btcY = 20 + Math.random() * 10;
                btcIcon.style.left = `${btcX}%`;
                btcIcon.style.top = `${btcY}%`;
                
                // Animate ETH icon
                const ethX = 15 + Math.random() * 10;
                const ethY = 25 + Math.random() * 10;
                ethIcon.style.right = `${ethX}%`;
                ethIcon.style.bottom = `${ethY}%`;
            }, 3000);
        }
    };
    
    animateCryptoIcons();

    // Canvas Animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.createElement('div');
    container.id = 'canvas-container';
    document.body.prepend(container);
    container.appendChild(canvas);

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 179, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particles = Array.from({ length: 100 }, () => new Particle());

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle1, i) => {
            particles.slice(i + 1).forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 179, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Smooth scroll for navigation links
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

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.service-card, .project-card');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Add counter animation for stats
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-count'), 10);
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            const startValue = 0;
            
            const updateCounter = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smoother animation
                const easeOutQuad = progress * (2 - progress);
                const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuad);
                
                stat.textContent = currentValue + (targetValue > 10 ? '+' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
    };
    
    // Run counter animation when scrolled into view
    const aboutSection = document.querySelector('#about');
    const handleScroll = () => {
        if (aboutSection) {
            const sectionTop = aboutSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 200) {
                animateStats();
                window.removeEventListener('scroll', handleScroll);
            }
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check for stats
    setTimeout(handleScroll, 1000);

    // Add cursor effect
    const cursorEffect = document.createElement('div');
    cursorEffect.classList.add('cursor-effect');
    document.body.appendChild(cursorEffect);

    document.addEventListener('mousemove', (e) => {
        cursorEffect.style.left = `${e.clientX}px`;
        cursorEffect.style.top = `${e.clientY}px`;
    });

    // Enhance cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorEffect.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursorEffect.style.mixBlendMode = 'plus-lighter';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorEffect.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorEffect.style.mixBlendMode = 'screen';
        });
    });

    // Hide cursor effect on touch devices
    if ('ontouchstart' in window) {
        cursorEffect.style.display = 'none';
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('show') && !e.target.closest('nav')) {
            navLinks.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
