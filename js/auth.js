// ========================================
// AUTHENTICATION - تسجيل الدخول
// ========================================

// ===== [1] تعريف دالة الإشعارات (بنفس طريقة المثال) =====
// إذا لم تكن موجودة مسبقاً، نعرفها لتسجيل في وحدة التحكم
if (typeof notify !== 'function') {
    window.notify = function(e) {
        // استخدم النظام الموجود، وإلا اطبع في console
        if (window.PU && typeof PU.tNtf === 'function') {
            PU.tNtf(e);
        } else if (window.opener && window.opener.PU && typeof window.opener.PU.tNtf === 'function') {
            // محاولة استخدام PU.tNtf من النافذة الرئيسية إذا كنا في popup
            window.opener.PU.tNtf(e);
        } else {
            console.log('[إشعار]', e);
        }
    };
}
// ============================================================

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
        setTimeout(() => {
            if (typeof google === "undefined" || !google.accounts) {
                console.warn("⚠️ Google GSI still not loaded, retrying...");
                initAuth();
            }
        }, 3000);
    }
}

// ===== [4] تشغيل تلقائي =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    setTimeout(initAuth, 100);
}

// تصدير الدوال
export { initAuth, notify };
