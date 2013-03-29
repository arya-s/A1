window.oTime = {
	now: 0,
	diff: 0,
	last: 0
},
window.oTiles = {},
window.pTileNames = [],
window.nTiles = 0,
window.nLoaded = 0,
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
window.eContext = null,
window.bRunning = false;

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
}
//Load the tiles
initTiles();
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
	window.nTiles = 14;
	A1loadTile('wall', 'res/brick_dark4.png');
	A1loadTile('floor', 'res/cobble_blood1.png'); 
	A1loadTile('floor', 'res/cobble_blood2.png');
	A1loadTile('floor', 'res/cobble_blood3.png');
	A1loadTile('floor', 'res/cobble_blood4.png');
	A1loadTile('floor', 'res/cobble_blood5.png');
	A1loadTile('floor', 'res/cobble_blood8.png');
	A1loadTile('floor', 'res/cobble_blood9.png');
	A1loadTile('floor', 'res/cobble_blood10.png');
	A1loadTile('player', 'res/deep_elf_knight.png');
	A1loadTile('frontier', 'res/cobble_blood12.png');
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

function A1loadTile(identifier, url){
	var unique = false;
	if(window.oTiles[identifier] === undefined){
		window.oTiles[identifier] = [];
		unique = true;
	}

	var img = new Image();
	img.onload = function(){
		window.nLoaded++;
		if(unique){
			window.pTileNames.push(identifier);
		}
		window.oTiles[identifier].push(img);
		if(window.nLoaded === window.nTiles){
			//All tiles loaded, start the gameloop
			window.bRunning = true;
			console.log(window.oTiles);
		}
	};
	img.src = url;
}

function A1getTile(tile, idx){
	if(typeof tile === "number"){
		return window.oTiles[window.pTileNames[tile]][idx];
	} else if(typeof tile === "string"){
		return window.oTiles[tile][idx];
	}
	//TODO: return empty tile
}

function A1clearCanvas(){
	window.eContext.clearRect(0, 0, window.eViewport.w, window.eViewport.h);
}

function A1drawImage(img, x, y){
	window.eContext.drawImage(img, x * window.oFieldSize.unitSize, y * window.oFieldSize.unitSize);
}