function A1Player(startNode, uniqueName){
	this.startNode = new A1Node(startNode.x*g_oFieldSize.unitSize, startNode.y*g_oFieldSize.unitSize);
	this.uniqueName = uniqueName;
	this.visualNode = new A1Node(0, 0);
	this.speed = 250;
	this.color = "#00A";
}

A1Player.prototype.draw = function(){
	g_eContext.fillStyle = this.color;
    g_eContext.fillRect(this.startNode.x, this.startNode.y, g_oFieldSize.unitSize, g_oFieldSize.unitSize);	
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
	this.startNode.x = A1clamp(this.startNode.x, 0, g_eCanvas.w - g_oFieldSize.unitSize);
	this.startNode.y = A1clamp(this.startNode.y, 0, g_eCanvas.h - g_oFieldSize.unitSize);
};