(function() {
    const container = document.querySelector('.login-fullpage');
    const themeToggle = document.getElementById('theme-toggle-btn');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    if (!container || !themeToggle || !moonIcon || !sunIcon) return;
    const savedTheme = localStorage.getItem('standalone-theme');
    if (savedTheme === 'dark') {
        container.classList.add('dark-mode');
        applyDarkModeStyles(container);
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
    themeToggle.addEventListener('click', () => {
        container.classList.toggle('dark-mode');
        const isDark = container.classList.contains('dark-mode');
        localStorage.setItem('standalone-theme', isDark ? 'dark' : 'light');
        applyDarkModeStyles(container);
        if (isDark) {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    });
    function applyDarkModeStyles(ce) {
        if (ce.classList.contains('dark-mode')) {
            document.documentElement.style.setProperty('--bodyB', '#1a1a1a');
            document.documentElement.style.setProperty('--bodyC', '#e5e5e5');
            document.documentElement.style.setProperty('--contentB', '#2d2d2d');
            document.documentElement.style.setProperty('--contentL', '#404040');
            document.documentElement.style.setProperty('--headC', '#ffffff');
            document.documentElement.style.setProperty('--white', '#ffffff');
            document.documentElement.style.setProperty('--notifB', '#1f2937');
            document.documentElement.style.setProperty('--notifC', '#e5e5e5');
            themeToggle.style.background = '#2d2d2d';
            themeToggle.style.borderColor = '#404040';
            document.querySelectorAll('.social-link').forEach(el => {
                el.style.background = '#2d2d2d';
                el.style.borderColor = '#404040';
            });
        } else {
            document.documentElement.style.setProperty('--bodyB', '#f9fafb');
            document.documentElement.style.setProperty('--bodyC', '#1f2937');
            document.documentElement.style.setProperty('--contentB', '#ffffff');
            document.documentElement.style.setProperty('--contentL', '#e5e7eb');
            document.documentElement.style.setProperty('--headC', '#111827');
            document.documentElement.style.setProperty('--white', '#ffffff');
            document.documentElement.style.setProperty('--notifB', '#1f2937');
            document.documentElement.style.setProperty('--notifC', '#ffffff');
            themeToggle.style.background = '#ffffff';
            themeToggle.style.borderColor = '#e5e7eb';
            document.querySelectorAll('.social-link').forEach(el => {
                el.style.background = '#ffffff';
                el.style.borderColor = '#e5e7eb';
            });
        }
    }
})();
export function initTheme() {}
