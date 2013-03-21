var g_sCanvasName = "A1MainCanvas"
, g_nWidthRatio = 0.6
, g_eViewport = {
        w: window.innerWidth,
        h: window.innerHeight
}
, g_eCanvas = {
    elem: document.getElementById(g_sCanvasName),
    w: g_eViewport.w * g_nWidthRatio,
    h: (g_eViewport.w * g_nWidthRatio) / 2
}
, g_eContext = null
, g_oPlayer = null
, g_pEntities = {};  //Holds all entities identified by their unique name

//Make sure jQuery is loaded else we can't use the hotkey plugin
$(document).ready(function() {
    function init(){
        //Center the g_eCanvas and scale it
        g_eCanvas.elem.style.position = "fixed";
        g_eCanvas.elem.style.top = (g_eViewport.h - g_eCanvas.h) / 2 + "px";
        g_eCanvas.elem.style.left = (g_eViewport.w - g_eCanvas.w) / 2 + "px";
        g_eCanvas.elem.setAttribute("width", g_eCanvas.w);
        g_eCanvas.elem.setAttribute("height", g_eCanvas.h);
        g_eCanvas.elem.style.top = (g_eViewport.h - g_eCanvas.h) / 2;
        g_eCanvas.elem.style.left = (g_eViewport.w - g_eCanvas.w) / 2;

        g_eContext = g_eCanvas.elem.getContext("2d");

        //Create the player
        g_oPlayer = {
            uniqueName: "Player"
            , color: "#00A"
            , x: 270
            , y: 270
            , w: 32
            , h: 32
            , draw: function(){
                g_eContext.fillStyle = this.color;
                g_eContext.fillRect(this.x, this.y, this.w, this.h);
            }
            , shoot: function(){
                console.log("Shootin'");
            }
            , update: function(dt){
                if (keydown.space) {
                    g_oPlayer.shoot();
                }
                if (keydown.left || keydown.a) {
                    g_oPlayer.x -= 5;
                }
                if (keydown.right || keydown.d) {
                    g_oPlayer.x += 5;
                }
                if (keydown.up || keydown.w) {
                    g_oPlayer.y -= 5;
                }
                if (keydown.down || keydown.s) {
                    g_oPlayer.y += 5;
                }

                //Clamp so we don't move the character out of the screen
                g_oPlayer.x = A1clamp(g_oPlayer.x, 0, g_eCanvas.w - g_oPlayer.w);
                g_oPlayer.y = A1clamp(g_oPlayer.y, 0, g_eCanvas.h - g_oPlayer.h);
            }
        };

        //Add to entities
        g_pEntities[g_oPlayer.uniqueName] = g_oPlayer;
    }

    init();
    window.onresize = init;

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