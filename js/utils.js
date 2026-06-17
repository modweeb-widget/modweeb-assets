/* ========================================
   MODWEEB DESIGN - UTILITIES
   Version: 1.0.0
   Author: Modweeb
   ======================================== */

import CONFIG from './config.js';

// ===== [1] دالة الإشعارات =====
export function notify(message) {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;
    
    toast.innerText = message;
    toast.classList.add('active');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ===== [2] جلب الـ IP =====
export async function getIP() {
    try {
        const response = await fetch(CONFIG.API_IPIFY);
        const data = await response.json();
        return data.ip;
    } catch (e) {
        return 'غير معروف';
    }
}

// ===== [3] جلب نظام التشغيل =====
export function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'ويندوز';
    if (ua.includes('Mac')) return 'ماك';
    if (ua.includes('Linux')) return 'لينكس';
    if (ua.includes('Android')) return 'أندرويد';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'آيفون/آيباد';
    return 'غير معروف';
}

// ===== [4] الوقت الحالي =====
export function getCurrentTime() {
    return new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// ===== [5] تنسيق التاريخ =====
export function formatDate(dateString) {
    if (!dateString || dateString === 'undefined' || dateString === 'null') {
        return 'غير محدد';
    }
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'غير محدد';
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    } catch (e) {
        return 'غير محدد';
    }
}

// ===== [6] جلب بيانات المستخدم =====
export function getUserData() {
    const keys = CONFIG.STORAGE_KEYS;
    return {
        isLoggedIn: localStorage.getItem(keys.USER_LOGGED_IN) === 'true',
        name: localStorage.getItem(keys.USER_NAME),
        picture: localStorage.getItem(keys.USER_PICTURE),
        email: localStorage.getItem(keys.USER_EMAIL),
        joinDate: localStorage.getItem(keys.USER_JOIN_DATE)
    };
}

// ===== [7] جلب الجلسات =====
export function getSessions() {
    try {
        const data = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_SESSIONS);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

// ===== [8] حفظ الجلسات =====
export function saveSessions(sessions) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.USER_SESSIONS, JSON.stringify(sessions));
}

// ===== [9] تصدير الكل =====
export default {
    notify,
    getIP,
    getOS,
    getCurrentTime,
    formatDate,
    getUserData,
    getSessions,
    saveSessions
};
