/* ========================================
   MODWEEB DESIGN - THEME CONTROLLER
   Version: 1.0.0
   Author: Modweeb
   ======================================== */

import CONFIG from './config.js';

class ThemeManager {
    constructor() {
        this.container = document.querySelector('.login-fullpage');
        this.toggleBtn = document.getElementById('theme-toggle-btn');
        this.moonIcon = document.getElementById('moon-icon');
        this.sunIcon = document.getElementById('sun-icon');
        
        if (!this.container || !this.toggleBtn) return;
        
        this.init();
    }
    
    init() {
        const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
        
        if (savedTheme === 'dark') {
            this.enableDarkMode();
        } else {
            this.enableLightMode();
        }
        
        this.toggleBtn.addEventListener('click', () => this.toggle());
    }
    
    toggle() {
        const isDark = this.container.classList.contains('dark-mode');
        
        if (isDark) {
            this.enableLightMode();
        } else {
            this.enableDarkMode();
        }
        
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, isDark ? 'light' : 'dark');
    }
    
    enableDarkMode() {
        this.container.classList.add('dark-mode');
        this.applyStyles(true);
        if (this.moonIcon) this.moonIcon.style.display = 'block';
        if (this.sunIcon) this.sunIcon.style.display = 'none';
    }
    
    enableLightMode() {
        this.container.classList.remove('dark-mode');
        this.applyStyles(false);
        if (this.moonIcon) this.moonIcon.style.display = 'none';
        if (this.sunIcon) this.sunIcon.style.display = 'block';
    }
    
    applyStyles(isDark) {
        const root = document.documentElement;
        
        if (isDark) {
            root.style.setProperty('--bodyB', '#1a1a1a');
            root.style.setProperty('--bodyC', '#e5e5e5');
            root.style.setProperty('--contentB', '#2d2d2d');
            root.style.setProperty('--contentL', '#404040');
            root.style.setProperty('--headC', '#ffffff');
            root.style.setProperty('--white', '#ffffff');
            root.style.setProperty('--notifB', '#1f2937');
            root.style.setProperty('--notifC', '#e5e5e5');
            if (this.moonIcon) this.moonIcon.style.stroke = '#ffffff';
            if (this.sunIcon) this.sunIcon.style.stroke = '#ffffff';
        } else {
            root.style.setProperty('--bodyB', '#f9fafb');
            root.style.setProperty('--bodyC', '#1f2937');
            root.style.setProperty('--contentB', '#ffffff');
            root.style.setProperty('--contentL', '#e5e7eb');
            root.style.setProperty('--headC', '#111827');
            root.style.setProperty('--white', '#ffffff');
            root.style.setProperty('--notifB', '#1f2937');
            root.style.setProperty('--notifC', '#ffffff');
            if (this.moonIcon) this.moonIcon.style.stroke = 'var(--bodyC)';
            if (this.sunIcon) this.sunIcon.style.stroke = 'var(--bodyC)';
        }
    }
}

// ===== [2] تهيئة تلقائية =====
let themeInstance = null;

export function initTheme() {
    if (!themeInstance) {
        themeInstance = new ThemeManager();
    }
    return themeInstance;
}

// تشغيل تلقائي
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

export default ThemeManager;
