/* ========================================
   MODWEEB DESIGN - AUTHENTICATION
   Version: 1.0.0
   Author: Modweeb
   ======================================== */

import CONFIG from './config.js';
import { notify, getIP, getOS, getCurrentTime, getSessions, saveSessions } from './utils.js';

class AuthManager {
    constructor() {
        this.clientId = CONFIG.GOOGLE_CLIENT_ID;
        this.client = null;
        this.init();
    }
    
    init() {
        if (typeof google !== 'undefined' && google.accounts) {
            this.initGSI();
        } else {
            window.onload = () => {
                if (typeof google !== 'undefined' && google.accounts) {
                    this.initGSI();
                }
            };
        }
    }
    
    initGSI() {
        this.client = google.accounts.oauth2.initTokenClient({
            client_id: this.clientId,
            scope: CONFIG.GOOGLE_SCOPE,
            callback: (response) => this.handleAuthResponse(response)
        });
        
        const btn = document.getElementById('custom-google-btn');
        if (btn) {
            btn.addEventListener('click', () => this.client.requestAccessToken());
        }
        
        if (window.opener) {
            try { window.resizeTo(500, 600); } catch(e) {}
        }
    }
    
    async handleAuthResponse(response) {
        if (response && response.access_token) {
            await this.getUserInfo(response.access_token);
        } else {
            notify('لم يتم العثور على رمز الوصول');
        }
    }
    
    async getUserInfo(token) {
        try {
            notify('جارٍ تسجيل الدخول...');
            
            const res = await fetch(CONFIG.API_GOOGLE_USERINFO, {
                headers: { Authorization: 'Bearer ' + token }
            });
            
            if (!res.ok) throw new Error('فشل جلب معلومات المستخدم');
            
            const data = await res.json();
            this.saveUserData(data);
            this.notifySuccess();
            
        } catch (error) {
            console.error('Error:', error);
            notify('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        }
    }
    
    saveUserData(data) {
        const keys = CONFIG.STORAGE_KEYS;
        
        localStorage.setItem(keys.USER_LOGGED_IN, 'true');
        localStorage.setItem(keys.USER_NAME, data.name);
        localStorage.setItem(keys.USER_EMAIL, data.email);
        localStorage.setItem(keys.USER_PICTURE, data.picture);
        
        if (!localStorage.getItem(keys.USER_JOIN_DATE)) {
            localStorage.setItem(keys.USER_JOIN_DATE, CONFIG.DEFAULTS.JOIN_DATE);
        }
        
        this.addSession();
        this.sendToOpener(data);
    }
    
    addSession() {
        const sessions = getSessions();
        const newSession = {
            id: Date.now(),
            time: getCurrentTime(),
            os: getOS(),
            ip: 'جاري التحميل...',
            isCurrent: true
        };
        
        getIP().then(ip => {
            newSession.ip = ip;
            const filtered = sessions.filter(s => !s.isCurrent);
            filtered.push(newSession);
            saveSessions(filtered);
        });
        
        const filtered = sessions.filter(s => !s.isCurrent);
        filtered.push(newSession);
        saveSessions(filtered);
    }
    
    sendToOpener(data) {
        if (window.opener && !window.opener.closed) {
            const user = {
                name: data.name,
                email: data.email,
                image: data.picture
            };
            const origin = window.location.origin;
            window.opener.postMessage({ type: 'loginSuccess', user: user }, origin);
            window.opener.postMessage({ type: 'storageUpdate' }, origin);
        }
    }
    
    notifySuccess() {
        notify('✅ تم تسجيل الدخول بنجاح!');
        
        setTimeout(() => {
            if (window.opener && !window.opener.closed) {
                window.close();
            } else {
                const redirect = new URLSearchParams(window.location.search).get('cbu') || '/';
                window.location.href = redirect;
            }
        }, 1500);
    }
    
    logout() {
        const keys = CONFIG.STORAGE_KEYS;
        localStorage.removeItem(keys.USER_LOGGED_IN);
        localStorage.removeItem(keys.USER_NAME);
        localStorage.removeItem(keys.USER_EMAIL);
        localStorage.removeItem(keys.USER_PICTURE);
        localStorage.removeItem(keys.USER_JOIN_DATE);
        localStorage.removeItem(keys.USER_SESSIONS);
        
        notify('✅ تم تسجيل الخروج بنجاح');
        
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({ type: 'logoutSuccess' }, window.location.origin);
            setTimeout(() => window.close(), 1200);
        } else {
            setTimeout(() => window.location.reload(), 1200);
        }
    }
}

// ===== [2] ربط AuthManager بالنافذة =====
let authInstance = null;

export function initAuth() {
    if (!authInstance) {
        authInstance = new AuthManager();
    }
    return authInstance;
}

// ===== [3] دالة مساعدة لزر الخروج =====
export function performLogout() {
    if (authInstance) {
        authInstance.logout();
    } else {
        const auth = new AuthManager();
        auth.logout();
    }
}

// تشغيل تلقائي
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

export default AuthManager;
