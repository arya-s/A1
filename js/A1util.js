// shim layer with setTimeout fallback
//@see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function A1clamp(val, min, max){
    return Math.min(Math.max(val, min), max);
}