var g_sCanvasName = "A1MainCanvas"
, g_nWidthRatio = 0.6
, g_eViewport = {
        w: window.innerWidth
        , h: window.innerHeight
}
, g_eCanvas = {
    elem: document.getElementById(g_sCanvasName)
    , w: 1024-32 //Making sure the gamefiled is odd in terms of multiple of 32 //g_eViewport.w * g_nWidthRatio
    , h: 576-32 //(g_eViewport.w * g_nWidthRatio) / 2
}
, g_eContext = null
, g_oPlayer = null
, g_pEntities = {};	//Holds all entities identified by their unique name

//Make sure jQuery is loaded else we can't use the hotkey plugin
$(document).ready(function() {
    function canvasInit(){
        //Center the g_eCanvas and scale it
        g_eCanvas.elem.style.position = "fixed";
        g_eCanvas.elem.style.top = (g_eViewport.h - g_eCanvas.h) / 2 + "px";
        g_eCanvas.elem.style.left = (g_eViewport.w - g_eCanvas.w) / 2 + "px";
        g_eCanvas.elem.setAttribute("width", g_eCanvas.w);
        g_eCanvas.elem.setAttribute("height", g_eCanvas.h);
        g_eCanvas.elem.style.top = (g_eViewport.h - g_eCanvas.h) / 2;
        g_eCanvas.elem.style.left = (g_eViewport.w - g_eCanvas.w) / 2;

        g_eContext = g_eCanvas.elem.getContext("2d");
    }

    function init(){
        //Create a maze playfield
        g_oMaze = new A1Maze(g_oFieldSize.w, g_oFieldSize.h, "Maze");
        g_oMaze.init();
        var startNode = g_oMaze.generate(true);
        g_pEntities[g_oMaze.uniqueName] = g_oMaze;
        //Create the player
        g_oPlayer = new A1Player(startNode, "Player");
        //Player should be the highest z-index so add it last... need to implement z-indexing!
        g_pEntities[g_oPlayer.uniqueName] = g_oPlayer;
    }

    canvasInit();
    init();
    window.onresize = canvasInit;

	function gameloop() {
        //Only manipulate the game if the Maze was fully generated.
        if(g_oMaze.isReady){
            update(A1getTimeDiff());
            draw();
        }

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