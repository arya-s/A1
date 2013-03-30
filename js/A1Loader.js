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
define(["A1Core", "A1Game"], function(A1Core, A1Game) {
	function A1Loader() {
		this.resources = {
			numTiles: 0,
			numTilesLoaded: 0,
			tiles: {},
			tileNames: [],
			getTile: function(tile, idx){
				if(typeof tile === "number"){
					return this.tiles[this.tileNames[tile]][idx];
				} else if(typeof tile === "string"){
					return this.tiles[tile][idx];
				}
				//TODO: return empty tile
			}
		};
	}

	A1Loader.prototype.getDim = function(w, h, unit) {
		return {
			width: w-unit,
			height: h-unit,
			unitSize: unit
		};
	};

	A1Loader.prototype.init = function() {
		this.loadTile('wall', 'res/brick_dark4.png');
		this.loadTile('floor', 'res/cobble_blood1.png');
		this.loadTile('floor', 'res/cobble_blood2.png');
		this.loadTile('floor', 'res/cobble_blood3.png');
		this.loadTile('floor', 'res/cobble_blood4.png');
		this.loadTile('floor', 'res/cobble_blood5.png');
		this.loadTile('floor', 'res/cobble_blood8.png');
		this.loadTile('floor', 'res/cobble_blood9.png');
		this.loadTile('floor', 'res/cobble_blood10.png');
		this.loadTile('player', 'res/deep_elf_knight.png');
		this.loadTile('frontier', 'res/cobble_blood12.png');
		this.resources.numTiles = 11;
	};

	A1Loader.prototype.loadTile = function(identifier, uri) {
		//If the tile type doesn't exist yet, add it 
		if (!this.resources.tiles.hasOwnProperty(identifier)) {
			this.resources.tiles[identifier] = [];
			this.resources.tileNames.push(identifier);
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
		//Create core and game
		var a1core = new A1Core(this.getDim(1024, 576, 32), "A1MainCanvas");
		var a1game = new A1Game(31, 17, this.resources);
		//Hook both to eachother
		a1core.hook(a1game);
		a1game.hook(a1core);
		//Init the engine
		a1core.init();
		//Start the engine
		a1core.run();
	};

	return A1Loader;
});