//--
// A1Game
// Represents a Game that will be updated and then rendered by A1Core
// In order to work, init(), update(timeDifference) and draw() have to be implemented.
// For drawing purposes you need to specify a hook method which takes a core as its parameter.
// The core can be used for rendering (wrapper methods), or directly for accessing the canvas.
// Author: arya-s
define(["A1Core", "A1Time", "A1Maze", "A1Player"], function(A1Core, A1Time, A1Maze, A1Player) {
	function A1Game(w, h, resources){
		this.width = w;
		this.height = h;
		this.resources = resources;
		//Keeps track of all the entities in this game
		this.pEntities = {};
	}

	//Hooks the core to this game, the core is used to render to the canvas
	A1Game.prototype.hook = function(core) {
		this.core = core;
	};

	A1Game.prototype.init = function() {
		//Create a maze playfield
		this.maze = new A1Maze(this.width, this.height, "Maze", this.core, this.resources);
		this.maze.init();
        var startNode = this.maze.generate(true);
        this.pEntities[this.maze.uniqueName] = this.maze;
        //Create the player
        var player = new A1Player(startNode, "Player", this.core, this.resources, this.maze);
        //Player should be the highest z-index so add it last... need to implement z-indexing!
        this.pEntities[player.uniqueName] = player;
	};

	A1Game.prototype.update = function(dt) {
		if(this.maze.isReady){
			for(var e in this.pEntities){
				this.pEntities[e].update(dt);
			}
		}
	};

	A1Game.prototype.draw = function() {
		if(this.maze.isReady){
			this.core.clearCanvas();
			for(var e in this.pEntities){
				this.pEntities[e].draw();
			}
        }
	};

	return A1Game;
});
