/* ========================================
   MODWEEB DESIGN - CORE
   Version: 1.0.0
   Author: Modweeb
   ======================================== */

// ===== [1] استيراد جميع الموديولات =====
import './config.js';
import './utils.js';
import './preloader.js';
import './theme.js';
import './auth.js';
import './account.js';

// ===== [2] تصدير الكل =====
export { default as config } from './config.js';
export { default as utils } from './utils.js';
export { default as preloader } from './preloader.js';
export { default as theme } from './theme.js';
export { default as auth } from './auth.js';
export { default as account } from './account.js';

// ===== [3] تهيئة كاملة للصفحة =====
export function initApp() {
    console.log('🚀 Modweeb Design - v1.0.0');
    console.log('📦 Assets loaded successfully');
}

// تشغيل عند التحميل
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

export default {
    initApp
};
