window.oTime = {
	now: 0,
	diff: 0,
	last: 0
},
window.oTiles = {
	//wall
	0: null,
	//floor
	1: null,
	//player
	2: null
},
window.oFieldSize = {
	w: 31,
	h: 17,
	unitSize: 32
},
window.sCanvasName = "A1MainCanvas",
window.nWidthRatio = 0.6,
window.eViewport = {
    w: window.innerWidth,
    h: window.innerHeight
},
window.eCanvas = {
    elem: document.getElementById(window.sCanvasName),
    w: 1024-32, //Making sure the gamefiled is odd in terms of multiple of 32 //window.eViewport.w * window.nWidthRatio
    h: 576-32 //(window.eViewport.w * window.nWidthRatio) / 2
},
window.eContext = null;

function canvasInit(){
	//Center the window.eCanvas and scale it
	window.eCanvas.elem.style.position = "fixed";
	window.eCanvas.elem.style.top = (window.eViewport.h - window.eCanvas.h) / 2 + "px";
	window.eCanvas.elem.style.left = (window.eViewport.w - window.eCanvas.w) / 2 + "px";
	window.eCanvas.elem.setAttribute("width", window.eCanvas.w);
	window.eCanvas.elem.setAttribute("height", window.eCanvas.h);
	window.eCanvas.elem.style.top = (window.eViewport.h - window.eCanvas.h) / 2;
	window.eCanvas.elem.style.left = (window.eViewport.w - window.eCanvas.w) / 2;
	window.eContext = window.eCanvas.elem.getContext("2d");

	//Load the tiles
	initTiles();
}
canvasInit();
window.onresize = canvasInit;

// shim layer with setTimeout fallback
//@see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function initTiles(){
        //Wall
        A1loadTile("res/brick_dark4.png", 0);
        //Floor
        A1loadTile("res/cobble_blood1.png", 1);
        //Player
        A1loadTile("res/deep_elf_knight.png", 2);
}


function A1clamp(val, min, max){
    return Math.min(Math.max(val, min), max);
}

function A1getTimeDiff(){
	window.oTime.now = Date.now();
	//Time since last frame [s]
	window.oTime.diff = (window.oTime.now - window.oTime.last) / 1000;
	window.oTime.last = window.oTime.now;

	return window.oTime.diff;
}

function A1random(min, max){
	return Math.floor((Math.random()*max)+min);
}

function A1loadTile(url, identifier){
	var img = new Image();
	img.onload = function(){
		window.oTiles[identifier] = img;
	}
    img.src = url;
}