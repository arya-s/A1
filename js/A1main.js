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
, g_pEntities = {}	//Holds all entities identified by their unique name
, g_oPlayingfield = null;

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
        var maze = new Maze(g_oFieldSize.w, g_oFieldSize.h);
        maze.init();
        var startNode = maze.generate();

        //Create the player
        g_oPlayer = {
            uniqueName: "Player"
            , color: g_oTiles[2]
            , node: new A1Node(0, 0)
            , w: g_oFieldSize.unitSize
            , h: g_oFieldSize.unitSize
            , speed: 250
            , draw: function(){
                g_eContext.fillStyle = this.color;
                g_eContext.fillRect(this.node.x, this.node.y, this.w, this.h);
            }
            , shoot: function(){
                console.log("Shootin'");
            }
            , update: function(dt){
                if (keydown.space) {
                    g_oPlayer.shoot();
                }
                if (keydown.left || keydown.a) {
                    g_oPlayer.node.x -= this.speed*dt;
                }
                if (keydown.right || keydown.d) {
                    g_oPlayer.node.x += this.speed*dt;
                }
                if (keydown.up || keydown.w) {
                    g_oPlayer.node.y -= this.speed*dt;
                }
                if (keydown.down || keydown.s) {
                    g_oPlayer.node.y += this.speed*dt;
                }

                //Clamp so we don't move the character out of the screen
                g_oPlayer.node.x = A1clamp(g_oPlayer.node.x, 0, g_eCanvas.w - g_oPlayer.w);
                g_oPlayer.node.y = A1clamp(g_oPlayer.node.y, 0, g_eCanvas.h - g_oPlayer.h);
            }
        };

        createPlayfield();

        //Add to entities
        g_pEntities[g_oPlayer.uniqueName] = g_oPlayer;
    }

    canvasInit();
    init();
    window.onresize = canvasInit;

	function gameloop() {
		update(A1getTimeDiff());
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

    function createPlayfield(){
        g_oPlayingfield = {
            uniqueName: "Playfield"
            , w: g_oFieldSize.w
            , h: g_oFieldSize.h
            , unitSize: g_oFieldSize.unitSize
            , field: []
            , draw: function(){
                for(var row=0; row<this.h; row++){
                    for(var col=0; col<this.w; col++){
                        //Select the representation stored in g_oTiles for the current value in the field
                        g_eContext.fillStyle = g_oTiles[this.field[row][col]];
                        g_eContext.fillRect(col*this.unitSize, row*this.unitSize, this.unitSize, this.unitSize);
                    }
                }
            }
            , update: function(dt){
                //Empty for now
            }
        };

        //Fill the field with walkables first.
        for(var row=0; row<g_oPlayingfield.h; row++){
            g_oPlayingfield.field[row] = [];
            for(var col=0; col<g_oPlayingfield.w; col++){
                g_oPlayingfield.field[row][col] = 1;
            }
        }

        //put some arbitray walls
        for(var i=0; i<96; i++){
            var x = A1random(0, g_oFieldSize.w);
            var y = A1random(0, g_oFieldSize.h);
            g_oPlayingfield.field[y][x] = 0;
        }

        //Add to entities
        g_pEntities[g_oPlayingfield.uniqueName] = g_oPlayingfield;
    }
});

