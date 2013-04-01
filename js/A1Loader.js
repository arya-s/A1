//--
// A1Loader
// This class can be changed as long as init() and run() are implemented.
// Typical steps:
// 1) load assets in init()
// 2) execute run() once all assets are loaded. Inside run() do:
// 3) create an A1Core and hand it the canvasdimensions and the canvas name
// 4) create an A1Game and send your loaded resource to it
// 5) hook the game to the core, the core will handle executing the game
// 6) hook the core to the game, the core will be used for rendering
// 7) call init() on the core (the core will init the game from this point)
// 8) call run() on the core to start the engine (the core will run the game from this point)
// Author: arya-s
define(["A1Core", "A1Game", "A1Time", "A1util"], function(A1Core, A1Game, A1Time, A1util) {
	function A1Loader() {
		this.resources = {
			numTiles: 0,
			numTilesLoaded: 0,
			tiles: {},
			tileTypes: [],
			getTile: function(type, idx){
				if(typeof type === "number"){
					return this.tiles[this.tileTypes[type]][idx];
				} else if(typeof type === "string"){
					return this.tiles[type][idx];
				}
				//TODO: return empty tile
			}
		};
	}

	A1Loader.prototype.init = function() {
		//Create the game
		this.a1game = new A1Game();
		//Create the core engine and hook up the game
		this.a1core = new A1Core(this.a1game);
		//Hook up the core to the game
		this.a1game.hook(this.a1core);
		//Load the game's assets
		this.loadAssets(this.a1game.assets());
		// this.loadTile('wall', 'res/brick_dark4.png');
		// this.loadTile('floor', 'res/cobble_blood1.png');
		// this.loadTile('floor', 'res/cobble_blood2.png');
		// this.loadTile('floor', 'res/cobble_blood3.png');
		// this.loadTile('floor', 'res/cobble_blood4.png');
		// this.loadTile('floor', 'res/cobble_blood5.png');
		// this.loadTile('floor', 'res/cobble_blood8.png');
		// this.loadTile('floor', 'res/cobble_blood9.png');
		// this.loadTile('floor', 'res/cobble_blood10.png');
		// this.loadTile('player', 'res/deep_elf_knight.png');
		// this.loadTile('frontier', 'res/cobble_blood12.png');
		// this.resources.numTiles = 11;
	};

	A1Loader.prototype.loadAssets = function(assets) {
		//Track the time it takes to load all assets
		this.startLoadingTime = A1Time.now;

		//Load all assets into the loader's resources object
		this.resources.numTiles = A1util.getTilesCount(assets);
		this.resources.tileTypes = assets.tileTypes;

		var tilePaths = assets.tilePaths;
		for(var tileType in tilePaths){
			var tiles = tilePaths[tileType];
			for(var tile in tiles){
				this.loadTile(tileType, tiles[tile]);
			}
		}

		//Finally set the resources reference so the game can use it
		assets.setResources(this.resources);
	};

	A1Loader.prototype.loadTile = function(identifier, uri) {
		//If the tile type doesn't exist yet, add it 
		if (!this.resources.tiles.hasOwnProperty(identifier)) {
			this.resources.tiles[identifier] = [];
		}

		var img = new Image();
		img.onload = (function() {
			this.resources.numTilesLoaded++;
			this.resources.tiles[identifier].push(img);
			//Check if everything was loaded fine, if so start the engine
			if (this.resources.numTilesLoaded === this.resources.numTiles) {
				this.run();
			}
		}).bind(this);
		img.src = uri;
	};

	A1Loader.prototype.run = function() {
		//Loading done.
		this.endLoadingTime = A1Time.now;
		//console.log("Loading time: "+((this.endLoadingTime-this.startLoadingTime)/1000)+"s");
		//Create core and game
		// var a1game = new A1Game(this.resources);
		// var a1core = new A1Core(a1game);
		// //Hook the core to the game so the game can draw
		// a1game.hook(a1core);
		//Init the engine
		this.a1core.init();
		//Start the engine
		this.a1core.run();
	};

	return A1Loader;
});