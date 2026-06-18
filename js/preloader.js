/* ========================================
   MODWEEB DESIGN - PRELOADER
   Version: 1.0.5
   Author: Modweeb
   ======================================== */

// ===== [1] SVG Preloader =====
const PRELOADER_SVG = `
<div class='pldW e' id='preloader'>
    <div class='svg-loader'>
        <svg viewBox='0 0 514 514'>
            <path class='part1' d='M195 167.9c-3.4 1.7-8 7.3-28 33.2l-8.8 11.5 14 18.2 14 18.2 3.8-3.4c6.6-6 14.2-7 21.3-2.8 2.5 1.5 19 22.2 68 85.9 6.5 8.4 13 16 14.5 17.1 6.5 4.5 15.5 5.5 20.2 2.2 2.7-1.9 43-53 43-54.5a301 301 0 0 0-24.2-30.3c-.5.2-5.5 6.4-11.1 13.7-9.5 12.4-13 16.2-14 15L273 247c-58.8-76.2-59.3-76.8-63.1-79a15.7 15.7 0 0 0-15-.1' />
            <path class='part2' d='M104 180.4c-2 1.3-4.8 4.6-6.3 7.4-5.7 10.6-4.6 20.3 3.7 31C182 322.5 204.4 351 206.1 352c7 3.7 12.7 2.8 18-2.8a948 948 0 0 0 29.2-37c.6-.8-3-6-11.3-16.8L230 280l-4.5 3.2c-8.6 6.1-19.4 4.8-27-3.4-1.7-1.8-19.4-24.3-39.3-50a1327.4 1327.4 0 0 0-39.2-49.2c-4.1-3.5-11-3.6-16-.2' />
            <path class='part3' d='M312 173.6c-2 1.2-35.7 43.5-42.7 53.4-1 1.5.4 3.8 10.3 16.6l12.4 15.7a87 87 0 0 0 13-15c6.7-8.7 12.8-15.8 13.5-15.8 1.3 0 39 47.6 44.2 56a950 950 0 0 0 35.7 45.4c3 2.4 10.8 2.6 15.2.3 10-5.1 16.2-17.1 13.4-25.6-.6-1.9-9.5-14.3-19.8-27.5L362.5 220a1046 1046 0 0 1-29-38.4c-4.1-6.6-8.5-9.5-14.4-9.5-2.5 0-5.7.8-7.1 1.6' />
            <path class='part4' d='M106.8 282.6c-24.2 31.2-24.8 32-26.3 36.4a26.2 26.2 0 0 0 4.1 24.5c4.7 6.2 12 8.2 18.3 5a830 830 0 0 0 43.3-54c.6-1.1-21.2-30.7-23.2-31.4a191 191 0 0 0-16.2 19.5m298.8-118c-3 .8-8.8 4.8-12.2 8.4a446.8 446.8 0 0 0-26.1 38c-.3 1.1 4 7.6 11.4 17.3 11 14.7 11.9 15.5 13.3 13.7l14-20a4025 4025 0 0 1 16.2-23.3c8.5-12 7-28.6-2.9-33.3a26 26 0 0 0-13.7-.8' />
        </svg>
    </div>
</div>
`;

// ===== [2] إضافة CSS للـ Preloader مباشرة =====
const PRELOADER_STYLES = `
<style>
    .pldW {
        display: none;
        direction: ltr;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: var(--bodyB, #f9fafb);
        align-items: center;
        justify-content: center;
        z-index: 99999;
        visibility: visible;
        opacity: 1;
        transition: all .8s ease;
    }
    .pldW.e { display: flex; }
    .pldW.h { opacity: 0; visibility: hidden; }
    :root:has(.pldW.e) { overflow: hidden; }
    
    .svg-loader {
        position: relative;
        width: 80px;
        height: 80px;
    }
    .svg-loader svg {
        width: 100%;
        height: 100%;
    }
    .svg-loader path {
        stroke-width: 8;
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        fill: transparent;
        transition: fill .3s ease;
    }
    
    .svg-loader .part1 {
        stroke: rgba(225,20,98,0.9);
        animation: draw 1s ease-in-out forwards, fill-part1 .3s ease-in-out 1s forwards;
    }
    .svg-loader .part2 {
        stroke: rgba(111,202,220,0.9);
        animation: draw 1s ease-in-out .25s forwards, fill-part2 .3s ease-in-out 1.25s forwards;
    }
    .svg-loader .part3 {
        stroke: rgba(61,184,143,0.9);
        animation: draw 1s ease-in-out .5s forwards, fill-part3 .3s ease-in-out 1.5s forwards;
    }
    .svg-loader .part4 {
        stroke: rgba(233,169,32,0.9);
        animation: draw 1s ease-in-out .75s forwards, fill-part4 .3s ease-in-out 1.75s forwards;
    }
    
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes fill-part1 { to { fill: rgba(225,20,98,0.9); } }
    @keyframes fill-part2 { to { fill: rgba(111,202,220,0.9); } }
    @keyframes fill-part3 { to { fill: rgba(61,184,143,0.9); } }
    @keyframes fill-part4 { to { fill: rgba(233,169,32,0.9); } }
    
    .pldW::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(225,20,98,.1) 0, rgba(111,202,220,.1) 50%, rgba(61,184,143,.1) 100%);
        animation: pulse-bg 1.5s infinite ease-out;
        z-index: -1;
    }
    @keyframes pulse-bg {
        0% { transform: translate(-50%, -50%) scale(.8); opacity: .6; }
        50% { background: radial-gradient(circle, rgba(233,169,32,.1) 0, rgba(225,20,98,.1) 50%, rgba(111,202,220,.1) 100%); }
        70% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        100% { opacity: 0; }
    }
</style>
`;

// ===== [3] دالة تهيئة Preloader =====
function initPreloader() {
    // إضافة CSS أولاً
    const styleContainer = document.createElement('div');
    styleContainer.innerHTML = PRELOADER_STYLES;
    while (styleContainer.firstChild) {
        document.head.appendChild(styleContainer.firstChild);
    }
    
    // إضافة SVG
    const container = document.getElementById('preloader-container');
    if (container) {
        container.innerHTML = PRELOADER_SVG;
    }
    
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    if (!sessionStorage.getItem('preloaderShown')) {
        sessionStorage.setItem('preloaderShown', 'true');
        preloader.classList.add('e');
        preloader.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'opacity' && getComputedStyle(preloader).opacity === '0') {
                preloader.remove();
            }
        });
        setTimeout(() => preloader.classList.add('h'), 1500);
    } else {
        preloader.style.display = 'none';
        preloader.remove();
    }
}

// ===== [4] تشغيل تلقائي =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
} else {
    initPreloader();
}

export default initPreloader;
