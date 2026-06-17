/* ================= [1] Preloader ================= */
(function() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    // هل تم عرض preloader من قبل في هذه الجلسة (نفس التبويب)؟
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
})();
