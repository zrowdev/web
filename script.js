document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
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
            
            // Replace with actual form submission logic
            console.log('Form submitted:', formValues);
            
            // Show success message (example)
            this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for your message! We\'ll get back to you soon.</p></div>';
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
});
