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
                menuToggle.setAttribute('aria-expanded', 'false');
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
    
    // Create blockchain node connections
    const createNodeConnections = () => {
        const illustrations = document.querySelectorAll('.blockchain-illustration');
        
        illustrations.forEach(illustration => {
            const nodes = illustration.querySelectorAll('.blockchain-node');
            
            if (nodes.length < 2) return;
            
            // Remove any existing connections
            const existingConnections = illustration.querySelectorAll('.node-connection');
            existingConnections.forEach(conn => conn.remove());
            
            // Create connections between nodes
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    // Only create some connections, not all possible ones
                    if (Math.random() < 0.6) {
                        createConnection(nodes[i], nodes[j], illustration);
                    }
                }
            }
        });
    };
    
    const createConnection = (node1, node2, container) => {
        const connection = document.createElement('div');
        connection.classList.add('node-connection');
        
        const updatePosition = () => {
            const rect1 = node1.getBoundingClientRect();
            const rect2 = node2.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Calculate positions relative to the container
            const x1 = rect1.left + rect1.width / 2 - containerRect.left;
            const y1 = rect1.top + rect1.height / 2 - containerRect.top;
            const x2 = rect2.left + rect2.width / 2 - containerRect.left;
            const y2 = rect2.top + rect2.height / 2 - containerRect.top;
            
            // Calculate distance and angle
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            // Position the connection
            connection.style.width = `${length}px`;
            connection.style.left = `${x1}px`;
            connection.style.top = `${y1}px`;
            connection.style.transform = `rotate(${angle}deg)`;
        };
        
        updatePosition();
        container.appendChild(connection);
        
        // Update position on window resize
        window.addEventListener('resize', updatePosition);
    };
    
    // Initialize connections
    createNodeConnections();
    
    // Animate nodes periodically
    setInterval(() => {
        const nodes = document.querySelectorAll('.blockchain-node:not(.floating)');
        
        nodes.forEach(node => {
            const randomAngle = Math.random() * 20 - 10; // Random angle between -10 and 10 degrees
            node.style.transform = `rotate(${randomAngle}deg)`;
        });
        
        // Recreate connections after node animation
        setTimeout(createNodeConnections, 500);
    }, 5000);

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
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#7c3aed' : '#3b82f6';
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
            ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
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
                    
                    // Create gradient for connection line
                    const gradient = ctx.createLinearGradient(
                        particle1.x, particle1.y, 
                        particle2.x, particle2.y
                    );
                    
                    gradient.addColorStop(0, particle1.color + Math.floor((0.1 * (1 - distance / 150)) * 255).toString(16).padStart(2, '0'));
                    gradient.addColorStop(1, particle2.color + Math.floor((0.1 * (1 - distance / 150)) * 255).toString(16).padStart(2, '0'));
                    
                    ctx.strokeStyle = gradient;
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

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.service-card, .project-card, .feature-card, .event-card, .faq-item');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial styles for reveal elements
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transitionDelay = `${index * 0.1}s`;
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
    const handleStatsScroll = () => {
        if (aboutSection) {
            const sectionTop = aboutSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 200) {
                animateStats();
                window.removeEventListener('scroll', handleStatsScroll);
            }
        }
    };
    
    window.addEventListener('scroll', handleStatsScroll);
    handleStatsScroll(); // Initial check

    // Typewriter effect for main heading
    const typewriterElement = document.querySelector('.hero h1');
    if (typewriterElement) {
        const originalText = typewriterElement.innerHTML;
        typewriterElement.innerHTML = '';
        
        let charIndex = 0;
        const typeNextChar = () => {
            if (charIndex < originalText.length) {
                typewriterElement.innerHTML = originalText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeNextChar, 50); // Adjust typing speed here
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeNextChar, 500);
    }

    // Add event listeners for FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const heading = item.querySelector('h3');
        const content = item.querySelector('p');
        
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease';
        content.style.opacity = '0';
        
        heading.style.cursor = 'pointer';
        heading.style.display = 'flex';
        heading.style.justifyContent = 'space-between';
        heading.style.alignItems = 'center';
        
        // Add toggle indicator
        const indicator = document.createElement('span');
        indicator.innerHTML = '<i class="fas fa-plus"></i>';
        indicator.style.fontSize = '0.8rem';
        indicator.style.transition = 'transform 0.3s ease';
        heading.appendChild(indicator);
        
        heading.addEventListener('click', () => {
            const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('p');
                    const otherIndicator = otherItem.querySelector('h3 span i');
                    
                    otherContent.style.maxHeight = '0';
                    otherContent.style.opacity = '0';
                    
                    if (otherIndicator) {
                        otherIndicator.className = 'fas fa-plus';
                    }
                }
            });
            
            // Toggle current item
            if (isOpen) {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                indicator.querySelector('i').className = 'fas fa-plus';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                indicator.querySelector('i').className = 'fas fa-minus';
            }
        });
    });

    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.btn.primary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary-hover), var(--primary))`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = 'var(--primary)';
        });
    });

    // Mark active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    const markActiveLink = () => {
        const scrollPosition = window.scrollY + 200; // Offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active from all links
                navLinks.querySelectorAll('a').forEach(link => {
                    link.removeAttribute('aria-current');
                });
                
                // Add active to current link
                const activeLink = navLinks.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        });
    };
    
    window.addEventListener('scroll', markActiveLink);
    markActiveLink(); // Initial check

    // Make revealed elements stay revealed
    const revealedCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealedObserver = new IntersectionObserver(revealedCallback, {
        root: null,
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        revealedObserver.observe(element);
    });
});
