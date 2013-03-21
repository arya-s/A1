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
		g_oPlayer.draw();
	}

	function update(dt) {
		if (keydown.space) {
			g_oPlayer.shoot();
		}

		if (keydown.left) {
			g_oPlayer.x -= 5;
		}

		if (keydown.right) {
			g_oPlayer.x += 5;
		}

		if (keydown.up) {
			g_oPlayer.y -= 5;
		}

		if (keydown.down) {
			g_oPlayer.y += 5;
		}

		//Clamp so we don't move the character out of the screen
		g_oPlayer.x = clamp(g_oPlayer.x, 0, g_eCanvas.w - g_oPlayer.w);
		g_oPlayer.y = clamp(g_oPlayer.y, 0, g_eCanvas.h - g_oPlayer.h);
	}
});