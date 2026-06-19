// ========================================
// AUTHENTICATION - تسجيل الدخول
// ========================================

// ===== [1] دالة الإشعارات (باستخدام تنسيقات القالب) =====
function notify(message, isAlt = false) {
    // البحث عن حاوية الإشعارات في القالب
    const container = document.querySelector('.tNtf');
    if (!container) {
        console.warn('⚠️ عنصر .tNtf غير موجود في الصفحة');
        return;
    }
    
    // البحث عن عنصر الإشعار الداخلي
    let toast = container.querySelector('*');
    if (!toast) {
        // إذا لم يكن هناك عنصر داخلي، أنشئ واحداً
        toast = document.createElement('div');
        container.appendChild(toast);
    }
    
    // تعيين النص
    toast.textContent = message;
    
    // إضافة/إزالة الصنف alt (للتنبيهات البديلة)
    if (isAlt) {
        container.classList.add('alt');
    } else {
        container.classList.remove('alt');
    }
    
    // إعادة تشغيل الأنيميشن
    container.style.animation = 'none';
    toast.style.animation = 'none';
    
    // فرض إعادة التدفق
    void container.offsetWidth;
    
    // إعادة تفعيل الأنيميشن
    container.style.animation = '';
    toast.style.animation = '';
}

// ===== [2] جلب معلومات المستخدم =====
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
            notify("✅ تم تسجيل الدخول بنجاح!");
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
            notify("✅ تم تسجيل الدخول بنجاح!");
            setTimeout(() => { window.location.href = redirect; }, 1000);
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        notify("❌ فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }
}

// ===== [3] تهيئة Google OAuth =====
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
    }
}

// ===== [4] تشغيل تلقائي =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

export { initAuth, notify };
