//--
// A1Core
// Represents the Core of the A1 Engine with its submodules
// You should not need to change this module, just make sure you hook your game to it
// All the drawing code you might need is wrapped in here. If not, feel free to use the canvas
// Author: arya-s
define(["A1Time", "A1util"], function(A1Time, A1util) {
	function A1Core(canvasDimensions, canvasName){
		this.canvas = {
			dimensions: canvasDimensions,
			name: canvasName,
			element: null,
			context: null
		};
		this.viewport = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.debug = false;
		this.lastFPS = 0;
		this.fps = 0;

		//Enable debugging on pressing "p"
		$(document).bind('keypress', 'p', (function(){
			this.debug = !this.debug;
		}).bind(this));
	}

	A1Core.prototype.hook = function(game) {
		this.game = game;
	};

	A1Core.prototype.init = function() {
		this.initCanvas();
		if(this.game !== undefined){
			this.game.init();
		}
	};

	A1Core.prototype.run = function() {
		this.update(A1Time.getDifference());
		this.draw();
		requestAnimFrame(this.run.bind(this));
	};

	A1Core.prototype.update = function(dt) {
		if(this.game !== undefined){
			this.game.update(dt);
		}
	};

	A1Core.prototype.draw = function() {
		if(this.game !== undefined){
			this.game.draw();
		}
		if(this.debug){
			this.drawFPS();
		}
	};

	A1Core.prototype.initCanvas = function() {
		this.canvas.element = document.getElementById(this.canvas.name),
		this.canvas.element.style.position = "fixed";
		this.canvas.element.style.top = (this.viewport.height - this.canvas.dimensions.height) / 2 + "px";
		this.canvas.element.style.left = (this.viewport.width - this.canvas.dimensions.width) / 2 + "px";
		this.canvas.element.setAttribute("width", this.canvas.dimensions.width);
		this.canvas.element.setAttribute("height", this.canvas.dimensions.height);
		this.canvas.element.style.top = (this.viewport.height - this.canvas.dimensions.height) / 2;
		this.canvas.element.style.left = (this.viewport.width - this.canvas.dimensions.width) / 2;
		this.canvas.context = this.canvas.element.getContext("2d");
	};

	//shim layer with setTimeout fallback
	//@see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	A1Core.prototype.clearCanvas = function() {
		this.canvas.context.clearRect(0, 0, this.canvas.dimensions.width, this.canvas.dimensions.height);
	};

	A1Core.prototype.drawImage = function(img, x, y) {
		this.canvas.context.drawImage(img, x*this.canvas.dimensions.unitSize, y*this.canvas.dimensions.unitSize);
	};

	A1Core.prototype.drawFPS = function() {
		this.drawText(A1Time.getFPS().toString(), this.canvas.dimensions.width-90, 50, "35pt Arial", "yellow");
	};

	//---- Core drawing function wrappers
	A1Core.prototype.clearCanvas = function() {
		this.canvas.context.clearRect(0, 0, this.canvas.dimensions.width, this.canvas.dimensions.height);
	};

	A1Core.prototype.drawImage = function(img, x, y) {
		this.canvas.context.drawImage(img, x*this.canvas.dimensions.unitSize, y*this.canvas.dimensions.unitSize);
	};

	A1Core.prototype.drawText = function(text, x, y, font, color) {
		this.canvas.context.font = A1util.defaultValue(font, "10pt Arial");
		this.canvas.context.fillStyle = A1util.defaultValue(color, "black");
		this.canvas.context.fillText(text, x, y);
	};
	//-----------------------------------


	return A1Core;
});