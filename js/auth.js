// ========================================
// AUTHENTICATION - تسجيل الدخول
// ========================================

// ===== [1] تعريف دالة الإشعارات =====
function notify(e) {
    // محاولة استخدام PU.tNtf من النافذة الرئيسية (إذا كنا في popup)
    try {
        if (window.opener && window.opener.PU && typeof window.opener.PU.tNtf === 'function') {
            window.opener.PU.tNtf(e);
            return;
        }
    } catch(err) {}
    
    // محاولة استخدام PU.tNtf من النافذة الحالية
    try {
        if (window.PU && typeof window.PU.tNtf === 'function') {
            window.PU.tNtf(e);
            return;
        }
    } catch(err) {}
    
    // الطريقة الاحتياطية: alert
    alert(e);
    console.log('[إشعار]', e);
}

// ===== [2] جلب معلومات المستخدم =====
async function getUserInfo(token) {
    try {
        notify("جارٍ تسجيل الدخول، يرجى الانتظار...");
        
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: "Bearer " + token }
        });
        
        if (!res.ok) throw new Error("فشل جلب معلومات المستخدم");
        
        const data = await res.json();
        const user = { 
            name: data.name, 
            email: data.email, 
            image: data.picture 
        };

        // حفظ بيانات المستخدم
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userPicture", data.picture);
        
        if (!localStorage.getItem("userJoinDate")) {
            localStorage.setItem("userJoinDate", new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            }));
        }

        // إرسال رسالة إلى النافذة الرئيسية
        if (window.opener && !window.opener.closed) {
            const origin = window.location.origin;
            window.opener.postMessage({ type: "loginSuccess", user: user }, origin);
            window.opener.postMessage({ type: "storageUpdate" }, origin);
            notify(`✅ أهلاً بك، ${data.name}!`);
            setTimeout(() => window.close(), 1500);
        } else {
            const redirect = new URLSearchParams(window.location.search).get("cbu") || "/";
            notify(`✅ أهلاً بك، ${data.name}!`);
            setTimeout(() => { window.location.href = redirect; }, 1000);
        }
        
    } catch (error) {
        console.error("Error:", error);
        notify("❌ فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }
}

// ===== [3] تهيئة Google OAuth =====
let client = null;

function initAuth() {
    // التحقق من وجود مكتبة Google
    if (typeof google === "undefined" || !google.accounts) {
        notify("❌ جاري تحميل مكتبة جوجل...");
        setTimeout(initAuth, 1000);
        return;
    }
    
    try {
        client = google.accounts.oauth2.initTokenClient({
            client_id: "36053852280-iqmfrcu1m2vd8ai6sc4e10r6afaiiln0.apps.googleusercontent.com",
            scope: "openid profile email",
            callback: function(response) {
                if (response && response.access_token) {
                    getUserInfo(response.access_token);
                } else {
                    notify("❌ لم يتم العثور على رمز الوصول.");
                }
            }
        });
        
        const btn = document.getElementById("custom-google-btn");
        if (btn) {
            // إزالة أي مستمعات قديمة
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener("click", function(e) {
                e.preventDefault();
                if (client) {
                    client.requestAccessToken();
                } else {
                    notify("❌ جاري تهيئة المصادقة...");
                    setTimeout(() => {
                        if (client) client.requestAccessToken();
                    }, 500);
                }
            });
            
            console.log("✅ زر Google جاهز");
        } else {
            console.warn("⚠️ زر Google غير موجود");
        }
        
        if (window.opener) {
            try { window.resizeTo(500, 600); } catch(e) {}
        }
        
    } catch (error) {
        console.error("❌ خطأ في تهيئة OAuth:", error);
        notify("❌ حدث خطأ في تهيئة المصادقة.");
    }
}

// ===== [4] تشغيل تلقائي =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initAuth, 500);
    });
} else {
    setTimeout(initAuth, 500);
}

// تصدير الدوال
export { initAuth, notify, getUserInfo };
