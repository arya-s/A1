define(["A1Time"], function(A1Time){
	function A1Player(posNode, uniqueName, core, resources, playfield){
		this.posNode = posNode;
		//this.posNode = new A1Node(posNode.x*window.oFieldSize.unitSize, posNode.y*window.oFieldSize.unitSize);
		this.uniqueName = uniqueName;
		this.speed = 200;
		this.color = "#00A";
		this.lastMove = 0;
		this.core = core;
		this.resources = resources;
		this.playfield = playfield;
	}

	A1Player.prototype.draw = function(){
		this.core.drawImage(this.resources.getTile('player', 0), this.posNode.x, this.posNode.y);
	};

	A1Player.prototype.shoot = function() {
		console.log(Date.now() + "Shooting.");
	};

	A1Player.prototype.move = function(x, y) {
		var now = A1Time.now;
		if(now - this.speed > this.lastMove){
			if(this.isValidMove(x, y)){
				this.posNode.x = x;
				this.posNode.y = y;
			}
			this.lastMove = now;
		}
	};

	A1Player.prototype.update = function(dt){
		if(keydown.left || keydown.a){
			this.move(this.posNode.x-1, this.posNode.y);
		}
		if(keydown.right || keydown.d){
			this.move(this.posNode.x+1, this.posNode.y);
		}
		if(keydown.up || keydown.w){
			this.move(this.posNode.x, this.posNode.y-1);
		}
		if(keydown.down || keydown.s){
			this.move(this.posNode.x, this.posNode.y+1);
		}
	};

	A1Player.prototype.isValidMove = function(x, y){
		//Make sure the move is within range and there's no wall blocking it.
		if((x >= 0 && x <= (this.playfield.width-1)) && (y >= 0 && y <= (this.playfield.height-1)) && (this.playfield.field[y][x] !== 0)){
			return true;
		}

		return false;
	};

	return A1Player;
});