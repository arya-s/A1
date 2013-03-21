var g_sCanvasName = "A1MainCanvas"
, g_nWidthRatio = 0.6
, g_eViewport = {
        w: window.innerWidth
        , h: window.innerHeight
}
, g_eCanvas = {
    elem: document.getElementById(g_sCanvasName)
    , w: 1024 //g_eViewport.w * g_nWidthRatio
    , h: 576 //(g_eViewport.w * g_nWidthRatio) / 2
}
, g_eContext = null
, g_oPlayer = null
, g_pEntities = {}	//Holds all entities identified by their unique name
, g_oPlayingfield = null;

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
            , x: 0
            , y: 0
            , w: 32
            , h: 32
            , speed: 250
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
                    g_oPlayer.x -= this.speed*dt;
                }
                if (keydown.right || keydown.d) {
                    g_oPlayer.x += this.speed*dt;
                }
                if (keydown.up || keydown.w) {
                    g_oPlayer.y -= this.speed*dt;
                }
                if (keydown.down || keydown.s) {
                    g_oPlayer.y += this.speed*dt;
                }

                //Clamp so we don't move the character out of the screen
                g_oPlayer.x = A1clamp(g_oPlayer.x, 0, g_eCanvas.w - g_oPlayer.w);
                g_oPlayer.y = A1clamp(g_oPlayer.y, 0, g_eCanvas.h - g_oPlayer.h);
            }
        };

        createPlayfield(32, 18, 32);

        //Add to entities
        g_pEntities[g_oPlayer.uniqueName] = g_oPlayer;
    }

    init();
    window.onresize = init;

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

    function createPlayfield(width, height, fieldSize){
        g_oPlayingfield = {
            uniqueName: "Playfield"
            , w: width
            , h: height
            , drawFieldSize: fieldSize
            , field: []
            , draw: function(){
                for(var row=0; row<this.h; row++){
                    for(var col=0; col<this.w; col++){
                        var fillColor;
                        switch(this.field[row][col]){
                            case 0:
                                //Wall
                                fillColor = "#AAA";
                                break;
                            case 1:
                                //Walkable
                                fillColor = "#663";
                                break;
                            case 2:
                                fillColor = g_oPlayer.color;
                                break;
                            default:
                        }

                        g_eContext.fillStyle = fillColor;
                        g_eContext.fillRect(col*this.drawFieldSize, row*this.drawFieldSize, this.drawFieldSize, this.drawFieldSize);
                    }
                }
            }
            , update: function(dt){
                //Empty for now
            }
        };

        //Fill the field with walkables first.
        for(var row=0; row<height; row++){
            g_oPlayingfield.field[row] = [];
            for(var col=0; col<width; col++){
                g_oPlayingfield.field[row][col] = 1;
            }
        }

        //put some arbitray walls
        for(var i=0; i<128; i++){
            var x = Math.floor((Math.random()*32));
            var y = Math.floor((Math.random()*18));
            g_oPlayingfield.field[y][x] = 0;
        }

        //Add to entities
        g_pEntities[g_oPlayingfield.uniqueName] = g_oPlayingfield;
    }
});

