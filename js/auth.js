// ========================================
// AUTHENTICATION - تسجيل الدخول
// ========================================

// ===== [1] دالة الإشعارات (تدعم PU.tNtf والعنصر الداخلي) =====
function notify(message) {
    // 1. محاولة استخدام PU.tNtf من النافذة الرئيسية
    if (window.opener && window.opener.PU && typeof window.opener.PU.tNtf === 'function') {
        window.opener.PU.tNtf(message);
        return;
    }
    
    // 2. محاولة استخدام PU.tNtf من النافذة الحالية
    if (window.PU && typeof window.PU.tNtf === 'function') {
        window.PU.tNtf(message);
        return;
    }
    
    // 3. استخدام عنصر .tNtf الموجود داخل login-fullpage
    const container = document.querySelector('.login-fullpage .tNtf');
    if (container) {
        let toast = container.querySelector('*');
        if (!toast) {
            toast = document.createElement('div');
            container.appendChild(toast);
        }
        toast.textContent = message;
        
        // إعادة تشغيل الأنيميشن
        container.style.animation = 'none';
        toast.style.animation = 'none';
        void container.offsetWidth;
        container.style.animation = '';
        toast.style.animation = '';
        return;
    }
    
    // 4. الطريقة الاحتياطية: console.log
    console.log('📢 [Notification]', message);
}

// ===== [2] باقي الكود كما هو =====
async function getUserInfo(token) {
    try {
        notify("جارٍ تسجيل الدخول، يرجى الانتظار...");
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: "Bearer " + token }
        });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        const user = { name: data.name, email: data.email, image: data.picture };

        if (window.opener && !window.opener.closed) {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userPicture", data.picture);
            if (!localStorage.getItem("userJoinDate")) {
                localStorage.setItem("userJoinDate", new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));
            }
            const origin = window.location.origin;
            window.opener.postMessage({ type: "loginSuccess", user: user }, origin);
            window.opener.postMessage({ type: "storageUpdate" }, origin);
            notify(`✅ أهلاً بك، ${data.name}!`);
            setTimeout(() => window.close(), 1500);
        } else {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userPicture", data.picture);
            if (!localStorage.getItem("userJoinDate")) {
                localStorage.setItem("userJoinDate", new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));
            }
            const redirect = new URLSearchParams(window.location.search).get("cbu") || "/";
            notify(`✅ أهلاً بك، ${data.name}!`);
            setTimeout(() => { window.location.href = redirect; }, 1000);
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        notify("❌ فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }
}

let client;
function initAuth() {
    if (typeof google !== "undefined" && google.accounts) {
        client = google.accounts.oauth2.initTokenClient({
            client_id: "36053852280-iqmfrcu1m2vd8ai6sc4e10r6afaiiln0.apps.googleusercontent.com",
            scope: "openid profile email",
            callback: response => {
                if (response && response.access_token) {
                    getUserInfo(response.access_token);
                } else {
                    notify("❌ لم يتم العثور على رمز الوصول. يرجى المحاولة مرة أخرى.");
                }
            }
        });
        const btn = document.getElementById("custom-google-btn");
        if (btn) {
            btn.addEventListener("click", () => client.requestAccessToken());
        }
        if (window.opener) {
            try { window.resizeTo(500, 600); } catch(e) {}
        }
    } else {
        notify("❌ فشل تحميل مكتبة جوجل للمصادقة. يرجى التحقق من اتصالك بالإنترنت.");
        setTimeout(() => {
            if (typeof google === "undefined" || !google.accounts) {
                console.warn("⚠️ Google GSI still not loaded, retrying...");
                initAuth();
            }
        }, 3000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    setTimeout(initAuth, 100);
}

export { initAuth, notify };
