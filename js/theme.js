// ========================================
// THEME - الوضع الليلي والنهاري
// ========================================

(function() {
    const container = document.querySelector('.login-fullpage');
    const themeToggle = document.getElementById('theme-toggle-btn');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    if (!container || !themeToggle || !moonIcon || !sunIcon) {
        console.warn("⚠️ عناصر الوضع الليلي غير موجودة");
        return;
    }
    
    // ===== [1] تطبيق الأنماط =====
    function applyDarkModeStyles(isDark) {
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
            
            // تحديث الأيقونات
            themeToggle.style.background = '#2d2d2d';
            themeToggle.style.borderColor = '#404040';
            
            document.querySelectorAll('.social-link').forEach(el => {
                el.style.background = '#2d2d2d';
                el.style.borderColor = '#404040';
            });
            
            // تحديث لون الأيقونات (فلتر)
            document.querySelectorAll('.social-link img, .theme-toggle img').forEach(img => {
                img.style.filter = 'brightness(0) invert(1)';
            });
            
        } else {
            root.style.setProperty('--bodyB', '#f9fafb');
            root.style.setProperty('--bodyC', '#1f2937');
            root.style.setProperty('--contentB', '#ffffff');
            root.style.setProperty('--contentL', '#e5e7eb');
            root.style.setProperty('--headC', '#111827');
            root.style.setProperty('--white', '#ffffff');
            root.style.setProperty('--notifB', '#1f2937');
            root.style.setProperty('--notifC', '#ffffff');
            
            // تحديث الأيقونات
            themeToggle.style.background = '#ffffff';
            themeToggle.style.borderColor = '#e5e7eb';
            
            document.querySelectorAll('.social-link').forEach(el => {
                el.style.background = '#ffffff';
                el.style.borderColor = '#e5e7eb';
            });
            
            // إزالة الفلتر
            document.querySelectorAll('.social-link img, .theme-toggle img').forEach(img => {
                img.style.filter = 'none';
            });
        }
    }
    
    // ===== [2] تبديل الوضع =====
    function toggleTheme() {
        const isDark = container.classList.contains('dark-mode');
        
        if (isDark) {
            container.classList.remove('dark-mode');
            applyDarkModeStyles(false);
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            localStorage.setItem('standalone-theme', 'light');
        } else {
            container.classList.add('dark-mode');
            applyDarkModeStyles(true);
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            localStorage.setItem('standalone-theme', 'dark');
        }
    }
    
    // ===== [3] استعادة الوضع المحفوظ =====
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('standalone-theme');
        
        if (savedTheme === 'dark') {
            container.classList.add('dark-mode');
            applyDarkModeStyles(true);
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            container.classList.remove('dark-mode');
            applyDarkModeStyles(false);
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }
    
    // ===== [4] ربط المستمع =====
    themeToggle.addEventListener('click', toggleTheme);
    
    // ===== [5] التشغيل =====
    loadSavedTheme();
    
    console.log("✅ Theme manager initialized");
})();

// تصدير الدالة
export function initTheme() {
    console.log("✅ Theme ready");
}
