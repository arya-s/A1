function A1Player(startNode, uniqueName){
	this.startNode = new A1Node(startNode.x*window.oFieldSize.unitSize, startNode.y*window.oFieldSize.unitSize);
	this.uniqueName = uniqueName;
	this.visualNode = new A1Node(0, 0);
	this.speed = 250;
	this.color = "#00A";
}

A1Player.prototype.draw = function(){
	window.eContext.fillStyle = this.color;
    window.eContext.fillRect(this.startNode.x, this.startNode.y, window.oFieldSize.unitSize, window.oFieldSize.unitSize);
};

A1Player.prototype.update = function(dt){
	if (keydown.left || keydown.a) {
		this.startNode.x -= this.speed * dt;
	}
	if (keydown.right || keydown.d) {
		this.startNode.x += this.speed * dt;
	}
	if (keydown.up || keydown.w) {
		this.startNode.y -= this.speed * dt;
	}
	if (keydown.down || keydown.s) {
		this.startNode.y += this.speed * dt;
	}

	//Clamp so we don't move the character out of the screen
	this.startNode.x = A1clamp(this.startNode.x, 0, window.eCanvas.w - window.oFieldSize.unitSize);
	this.startNode.y = A1clamp(this.startNode.y, 0, window.eCanvas.h - window.oFieldSize.unitSize);
};