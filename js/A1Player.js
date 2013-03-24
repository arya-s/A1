function A1Player(posNode, uniqueName){
	this.posNode = posNode;
	//this.posNode = new A1Node(posNode.x*window.oFieldSize.unitSize, posNode.y*window.oFieldSize.unitSize);
	this.uniqueName = uniqueName;
	this.speed = 250;
	this.color = "#00A";
	window.wasMovingLeft = false;
	window.isMovingLeft = false;
	window.wasMovingRight = false;
	window.isMovingRight = false;
	window.wasMovingUp = false;
	window.isMovingUp = false;
	window.wasMovingDown = false;
	window.isMovingDown = false;
}

A1Player.prototype.draw = function(){
	//window.eContext.fillStyle = this.color;
    //window.eContext.fillRect(this.posNode.x, this.posNode.y, window.oFieldSize.unitSize, window.oFieldSize.unitSize);
	//window.eContext.fillRect(this.posNode.x*window.oFieldSize.unitSize, this.posNode.y*window.oFieldSize.unitSize, window.oFieldSize.unitSize, window.oFieldSize.unitSize);
	window.eContext.drawImage(window.oTiles[2], this.posNode.x*window.oFieldSize.unitSize, this.posNode.y*window.oFieldSize.unitSize);
};

A1Player.prototype.update = function(dt){
	window.isMovingLeft = (keydown.left || keydown.a);
	if (window.isMovingLeft && !window.wasMovingLeft) {
		if(this.isValidMove(this.posNode.x-1, this.posNode.y)){
			this.posNode.x -= 1;
		}
		//this.posNode.x -= this.speed * dt;
	}
	window.wasMovingLeft = window.isMovingLeft;

	window.isMovingRight = (keydown.right || keydown.d);
	if (window.isMovingRight && !window.wasMovingRight) {
		if(this.isValidMove(this.posNode.x+1, this.posNode.y)){
			this.posNode.x += 1;
		}
		//this.posNode.x += this.speed * dt;
	}
	window.wasMovingRight = window.isMovingRight;

	window.isMovingUp = (keydown.up || keydown.w);
	if (window.isMovingUp && !window.wasMovingUp) {
		if(this.isValidMove(this.posNode.x, this.posNode.y-1)){
			this.posNode.y -= 1;
		}
		//this.posNode.y -= this.speed * dt;
	}
	window.wasMovingUp = window.isMovingUp;

	window.isMovingDown = (keydown.down || keydown.s);
	if (window.isMovingDown && !window.wasMovingDown) {
		if(this.isValidMove(this.posNode.x, this.posNode.y+1)){
			this.posNode.y += 1;
		}
		//this.posNode.y += this.speed * dt;
	}
	window.wasMovingDown = window.isMovingDown;

	//Clamp so we don't move the character out of the screen
	//this.posNode.x = A1clamp(this.posNode.x, 0, window.eCanvas.w - window.oFieldSize.unitSize);
	//this.posNode.y = A1clamp(this.posNode.y, 0, window.eCanvas.h - window.oFieldSize.unitSize);
};

A1Player.prototype.isValidMove = function(x, y){
	//Make sure the move is within range and there's no wall blocking it.
	if((x >= 0 && x <= (window.oMaze.width-1)) && (y >= 0 && y <= (window.oMaze.height-1)) && (window.oMaze.field[y][x] !== 0)){
		return true;
	}

	return false;
};