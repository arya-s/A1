//--
// A1Game
// Represents a Game that will be updated and then rendered by A1Core
// The canvas dimensions can be altered by setting this.canvasDimensions using A1util.makeCanvasDimensions which takes width-unitSize, height-unitSize and unitSize (=1 for tilebased games)
// If this.canvasDimensions is not set, a fallback of 320x240x1 will be used.
// In order to work, init(), update(timeDifference) and draw() have to be implemented.
// For drawing purposes you need to specify a hook method which takes a core as its parameter.
// If you have assets, place them into assets() and return an object that follows the predefined pattern
// The core can be used for rendering (wrapper methods), or directly for accessing the canvas.
// Author: arya-s
define(["A1Time", "A1util", "A1Maze", "A1Player"], function(A1Time, A1util, A1Maze, A1Player) {
	function A1Game(resources){
		this.canvasDimensions = A1util.makeCanvasDimensions(1024, 576, 32);
		this.width = 31;
		this.height = 17;
		this.resources = null;
		//Keeps track of all the entities in this game
		this.pEntities = {};
	}

	//Hooks the core to this game, the core is used to render to the canvas
	A1Game.prototype.hook = function(core) {
		this.core = core;
	};

	A1Game.prototype.assets = function() {
		//Assets should follow this format strictly in order to be loaded properly. 
		//Properties: order (array), files (obj), resources (empty obj)
		//tileTypes: an array containing the tile type names in desired order
		//tilePaths: an object with tile types as keys, and an array of paths to the desired tile(s)
		//setResources: a function to set the resources once loaded (typically: function(res){ that.resources = res})
		var that = this;
		return {
			tileTypes: ['wall', 'floor', 'player', 'frontier'],
			tilePaths: {
				'wall': ['res/brick_dark4.png'],
				'floor': [
						'res/cobble_blood1.png',
						'res/cobble_blood2.png',
						'res/cobble_blood3.png',
						'res/cobble_blood4.png',
						'res/cobble_blood5.png',
						'res/cobble_blood8.png',
						'res/cobble_blood9.png',
						'res/cobble_blood10.png'
						],
				'player': ['res/deep_elf_knight.png'],
				'frontier': ['res/cobble_blood12.png']
			},
			setResources: function(res){
				that.resources = res;
			}
		};
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
