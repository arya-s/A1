var g_oTime = {
	now: 0
	, diff: 0
	, last: 0
}
, g_oTiles = {
	//wall
	0: "#AAA"
	//floor
	, 1: "#663"
	//player
	, 2: "#00A"
}
, g_oFieldSize = {
	w: 31
	, h: 17
	, unitSize: 32
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

function A1random(min, max){
	return Math.floor((Math.random()*max)+min);
}

function A1Node(x, y){
	this.x = x;
	this.y = y;
}