/* ========================================
   MODWEEB DESIGN - CONFIGURATION
   Version: 1.0.0
   Author: Modweeb
   ======================================== */

export const CONFIG = {
    APP_NAME: 'Modweeb',
    APP_VERSION: '1.0.0',
    
    // Google OAuth
    GOOGLE_CLIENT_ID: '36053852280-iqmfrcu1m2vd8ai6sc4e10r6afaiiln0.apps.googleusercontent.com',
    GOOGLE_SCOPE: 'openid profile email',
    
    // API
    API_IPIFY: 'https://api.ipify.org?format=json',
    API_GOOGLE_USERINFO: 'https://www.googleapis.com/oauth2/v3/userinfo',
    
    // Storage Keys
    STORAGE_KEYS: {
        USER_LOGGED_IN: 'userLoggedIn',
        USER_NAME: 'userName',
        USER_EMAIL: 'userEmail',
        USER_PICTURE: 'userPicture',
        USER_JOIN_DATE: 'userJoinDate',
        USER_SESSIONS: 'userSessions',
        THEME: 'standalone-theme',
        PRELOADER_SHOWN: 'preloaderShown'
    },
    
    // Defaults
    DEFAULTS: {
        AVATAR: 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff',
        JOIN_DATE: new Date().toISOString()
    }
};

export default CONFIG;
