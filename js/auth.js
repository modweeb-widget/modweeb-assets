function notify(e) {
    const o = document.getElementById("toastMessage");
    if (o) {
        o.innerText = e;
        o.classList.add("active");
        setTimeout(() => o.classList.remove("active"), 3000);
    }
}

async function getUserInfo(e) {
    try {
        notify("جارٍ تسجيل الدخول، يرجى الانتظار...");
        const t = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: "Bearer " + e }
        });
        if (!t.ok) throw new Error("Failed to fetch user info");
        const o = await t.json();
        const a = { name: o.name, email: o.email, image: o.picture };

        if (window.opener && !window.opener.closed) {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userName", o.name);
            localStorage.setItem("userEmail", o.email);
            localStorage.setItem("userPicture", o.picture);
            if (!localStorage.getItem("userJoinDate")) {
                localStorage.setItem("userJoinDate", new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));
            }
            const origin = window.location.origin;
            window.opener.postMessage({ type: "loginSuccess", user: a }, origin);
            window.opener.postMessage({ type: "storageUpdate" }, origin);
            notify("تم تسجيل الدخول بنجاح!");
            setTimeout(() => window.close(), 1500);
        } else {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userName", o.name);
            localStorage.setItem("userEmail", o.email);
            localStorage.setItem("userPicture", o.picture);
            if (!localStorage.getItem("userJoinDate")) {
                localStorage.setItem("userJoinDate", new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));
            }
            const cbu = new URLSearchParams(window.location.search).get("cbu") || "/";
            notify("تم تسجيل الدخول بنجاح!");
            setTimeout(() => { window.location.href = cbu; }, 1000);
        }
    } catch (e) {
        console.error("Error fetching user info:", e);
        notify("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }
}

let client;
function initAuth() {
    if (typeof google !== "undefined" && google.accounts) {
        client = google.accounts.oauth2.initTokenClient({
            client_id: "36053852280-iqmfrcu1m2vd8ai6sc4e10r6afaiiln0.apps.googleusercontent.com",
            scope: "openid profile email",
            callback: e => {
                if (e && e.access_token) {
                    getUserInfo(e.access_token);
                } else {
                    notify("لم يتم العثور على رمز الوصول. يرجى المحاولة مرة أخرى.");
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
        notify("فشل تحميل مكتبة جوجل للمصادقة. يرجى التحقق من اتصالك بالإنترنت.");
    }
}

if (typeof google !== "undefined" && google.accounts) {
    initAuth();
} else {
    window.onload = function() {
        if (typeof google !== "undefined" && google.accounts) {
            initAuth();
        } else {
            console.error("Google GSI library failed to load");
        }
    };
}

export { initAuth, notify };
