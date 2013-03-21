//Make sure jQuery is loaded else we can't use the hotkey plugin
$(document).ready(function() {
	// shim layer with setTimeout fallback
	//@see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	var last = new Date();

	function gameloop() {
		var dt = new Date() - last;

		update(dt);
		draw();

		requestAnimFrame(gameloop);
	}

	//Start the game loop
	gameloop();

	function draw() {
		g_eContext.clearRect(0, 0, g_eViewport.w, g_eViewport.h);
		for(var e in g_pEntities){
			g_pEntities[e].draw();
		}
	}

	function update(dt) {
		for(var e in g_pEntities){
			g_pEntities[e].update(dt);
		}
	}
});