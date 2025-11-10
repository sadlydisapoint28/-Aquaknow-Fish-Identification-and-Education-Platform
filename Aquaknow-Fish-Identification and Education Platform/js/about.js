// About Page JavaScript

// About Page Specific JavaScript

// About Page Specific JavaScript

// Smooth scrolling for anchor links
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

// Add scroll animations
function addScrollAnimations() {
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

    // Observe all sections
    document.querySelectorAll('.mission-content, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add interactive effects for mission highlights
document.addEventListener('DOMContentLoaded', function() {
    const highlights = document.querySelectorAll('.mission-highlights li');

    highlights.forEach((highlight, index) => {
        highlight.style.animationDelay = `${index * 0.2}s`;

        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.borderLeftColor = 'var(--tropical-teal)';
        });

        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(10px) scale(1)';
            this.style.borderLeftColor = 'var(--coral-pink)';
        });
    });
});

// Add floating animation to mission icon
document.addEventListener('DOMContentLoaded', function() {
    const missionIcon = document.querySelector('.mission-icon');
    if (missionIcon) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = missionIcon.style.transform || 'translateY(0px)';
            const currentY = parseInt(currentTransform.match(/-?\d+/) || [0])[0];
            const newY = currentY + (floatDirection * 5);

            if (Math.abs(newY) > 15) {
                floatDirection *= -1;
            }

            missionIcon.style.transform = `translateY(${newY}px)`;
        }, 100);
    }
});

// Add contact form functionality (if contact form exists)
document.addEventListener('DOMContentLoaded', function() {
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const email = this.querySelector('a[href^="mailto:"]');
            const phone = this.querySelector('a[href^="tel:"]');

            if (email) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'H' to go to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add team member interaction
document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach(card => {
        const avatar = card.querySelector('.team-avatar');

        card.addEventListener('mouseenter', function() {
            avatar.style.transform = 'rotate(360deg) scale(1.1)';
            avatar.style.transition = 'transform 0.6s ease';
        });

        card.addEventListener('mouseleave', function() {
            avatar.style.transform = 'rotate(0deg) scale(1)';
        });

        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1)';
            }, 200);
        });
    });
});



// Add easter egg - Konami code
document.addEventListener('DOMContentLoaded', function() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];

    document.addEventListener('keydown', function(e) {
        userInput.push(e.code);
        userInput = userInput.slice(-konamiCode.length);

        if (userInput.join(',') === konamiCode.join(',')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s ease-in-out';

            // Add rainbow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 2000);
        }
    });
});

console.log('🐠 About page JavaScript loaded successfully!');
