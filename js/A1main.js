// shim layer with setTimeout fallback
//@see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

//Actual game loop
(function gameloop() {
    requestAnimFrame(gameloop);
    update();
    draw();
})();

function draw() {
	g_eContext.clearRect(0, 0, 100, 100);
	g_eContext.fillStyle = 'yellow';
	g_eContext.moveTo(0, 100 / 2);
	g_eContext.lineTo(100 / 2, 0);
	g_eContext.lineTo(100, 100 / 2);
	g_eContext.lineTo(100 / 2, 100);
	g_eContext.lineTo(0, 100 / 2);
	g_eContext.fill();
}

function update(){
}