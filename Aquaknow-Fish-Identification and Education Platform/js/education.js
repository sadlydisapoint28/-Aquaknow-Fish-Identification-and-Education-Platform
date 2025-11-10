// Education Page JavaScript

// Education Page Specific JavaScript

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

    // Observe all cards and sections
    document.querySelectorAll('.category-card, .anatomy-card, .nutrition-card, .tip-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add interactive hover effects for category cards
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click-to-expand functionality for fish examples
document.addEventListener('DOMContentLoaded', function() {
    const fishExamples = document.querySelectorAll('.fish-examples');

    fishExamples.forEach(example => {
        const list = example.querySelector('ul');
        const header = example.querySelector('h4');

        if (list && header) {
            // Initially collapse on mobile
            if (window.innerWidth <= 768) {
                list.style.maxHeight = '0';
                list.style.overflow = 'hidden';
                list.style.transition = 'max-height 0.3s ease';
                header.style.cursor = 'pointer';
                header.innerHTML += ' <span style="float: right;">▼</span>';

                header.addEventListener('click', function() {
                    const arrow = this.querySelector('span');
                    if (list.style.maxHeight === '0px' || !list.style.maxHeight) {
                        list.style.maxHeight = list.scrollHeight + 'px';
                        arrow.innerHTML = '▲';
                    } else {
                        list.style.maxHeight = '0';
                        arrow.innerHTML = '▼';
                    }
                });
            }
        }
    });
});

// Add floating animation to hero decorations
document.addEventListener('DOMContentLoaded', function() {
    const decorations = document.querySelectorAll('.decoration');

    decorations.forEach((decoration, index) => {
        decoration.style.animationDelay = `${index * 0.5}s`;

        // Add random floating movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            decoration.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
});



// Add copy-to-clipboard functionality for facts
document.addEventListener('DOMContentLoaded', function() {
    const factElements = document.querySelectorAll('.category-facts p');

    factElements.forEach(fact => {
        fact.style.cursor = 'pointer';
        fact.title = 'Click to copy this fact';

        fact.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = '✓ Copied to clipboard!';
                this.style.color = 'var(--tropical-teal)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(() => {
                console.log('Copy failed');
            });
        });
    });
});



// Add search functionality for education content
document.addEventListener('DOMContentLoaded', function() {
    // Create search box (optional feature)
    function createSearchBox() {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            display: none;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search education content...';
        searchInput.style.cssText = `
            width: 200px;
            padding: 8px;
            border: 2px solid var(--ocean-blue);
            border-radius: 5px;
            outline: none;
        `;

        searchContainer.appendChild(searchInput);
        document.body.appendChild(searchContainer);

        // Toggle search with Ctrl+F
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
                if (searchContainer.style.display === 'block') {
                    searchInput.focus();
                }
            }
        });

        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const textElements = document.querySelectorAll('p, li, h3, h4');

            textElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (searchTerm && text.includes(searchTerm)) {
                    element.style.backgroundColor = 'yellow';
                    element.style.transition = 'background-color 0.3s ease';
                } else {
                    element.style.backgroundColor = '';
                }
            });

            if (!searchTerm) {
                textElements.forEach(element => {
                    element.style.backgroundColor = '';
                });
            }
        });
    }

    createSearchBox();
});

// Add print functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add print button
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Print';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--ocean-blue);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    printButton.addEventListener('click', function() {
        window.print();
    });

    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });

    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });

    document.body.appendChild(printButton);
});

console.log('🌊 Education page JavaScript loaded successfully!');
