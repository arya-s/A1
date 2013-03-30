//--
// A1Core
// Represents the Core of the A1 Engine with its submodules
// You should not need to change this module, just make sure you hook your game to it
// All the drawing code you might need is wrapped in here. If not, feel free to use the canvas
// Author: arya-s
define(["A1Time", "A1Game"], function(A1Time, A1Game) {
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
			console.log(this);
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
		console.log(this.debug);
		this.update(A1Time.getDifference());
		this.draw();
		requestAnimFrame(this.run.bind(this));
	};

	A1Core.prototype.update = function(dt) {
		if(this.game !== undefined){
			this.game.update(dt);
		}
		if(this.debug){
			this.updateFPS();
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

	A1Core.prototype.updateFPS = function() {
		//Make FPS readable
		var now = A1Time.now;
		if(now - 50 > this.lastFPS){
			this.lastFPS = now;
			this.fps = A1Time.getFPS();
		}
	};

	A1Core.prototype.drawFPS = function() {
		this.canvas.context.font = "35pt Arial";
		this.canvas.context.fillStyle = "blue";
		this.canvas.context.fillText(this.fps.toString(), 20, 50);
	};

	return A1Core;
});