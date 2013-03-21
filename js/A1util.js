var g_oTime = {
	now: 0
	, diff: 0
	, last: 0
};

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

function A1getTimeDiff(){
	g_oTime.now = Date.now();
	//Time since last frame [s]
	g_oTime.diff = (g_oTime.now - g_oTime.last) / 1000; 
	g_oTime.last = g_oTime.now;

	return g_oTime.diff;
}