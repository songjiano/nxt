(function(doc, win) {
    //rem默认1rem = 100px；
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth <= 320) {
                docEl.style.fontSize = '16px';
            } else {
                docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);