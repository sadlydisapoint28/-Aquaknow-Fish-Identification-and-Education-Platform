// Theme management
class ThemeManager {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.getElementById('themeToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.navLinks = document.querySelector('.nav-links');
        
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.isMenuOpen = false;
        
        this.initialize();
    }

    initialize() {
        // Set initial theme
        if (this.isDarkMode) {
            this.body.classList.add('dark-mode');
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Add event listeners
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.mobileMenu.addEventListener('click', () => this.toggleMobileMenu());

        // Add smooth transitions for theme changes
        document.documentElement.style.setProperty('--transition-time', '0.3s');
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.body.classList.toggle('dark-mode');
        
        // Update theme toggle icon
        this.themeToggle.innerHTML = this.isDarkMode 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('darkMode', this.isDarkMode);

        // Add animation
        this.themeToggle.classList.add('rotate');
        setTimeout(() => this.themeToggle.classList.remove('rotate'), 500);
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navLinks.classList.toggle('active');
        
        // Update menu icon
        this.mobileMenu.innerHTML = this.isMenuOpen 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();

    // Add CSS for theme toggle animation
    const style = document.createElement('style');
    style.textContent = `
        .rotate {
            animation: rotate 0.5s ease-in-out;
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        .theme-toggle,
        .mobile-menu {
            transition: transform 0.3s ease;
        }

        .theme-toggle:hover,
        .mobile-menu:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
}); 