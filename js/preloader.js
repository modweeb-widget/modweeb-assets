// ========================================
// PRELOADER - شاشة التحميل
// ========================================

(function() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        console.warn("⚠️ Preloader غير موجود");
        return;
    }
    
    // ===== [1] إجبار الظهور =====
    preloader.classList.add('e');
    preloader.style.display = 'flex';
    
    // ===== [2] إخفاء بعد 1.5 ثانية =====
    setTimeout(function() {
        preloader.classList.add('h');
        // إزالة العنصر بعد انتهاء الأنيميشن
        setTimeout(function() {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 800);
    }, 1500);
    
    console.log("✅ Preloader initialized");
})();
