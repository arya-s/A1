function A1Maze(width, height, uniqueName){
	//Only odd dimensions are valid
	this.width = width|1;
	this.height = height|1;
	this.uniqueName = uniqueName;
	//Fill the field full with walls - represented by 0
	this.field = [];
	for(var row=0; row<this.height; row++){
		this.field[row] = [];
		for(var col=0; col<this.width; col++){
			this.field[row][col] = 0;
		}
	}

	this.isReady = false;
}

A1Maze.prototype.init = function(){
	//Find a random start location from where to carve out the maze
	//Must be odd and within range
	var x = A1random(0, (this.width-1))|1;
	var y = A1random(0, (this.height-1))|1;
	this.startCarvePos = new A1Node(x, y);

	//Setting up an empty frontierlist
	this.frontierList = [];
};

A1Maze.prototype.generate = function(render){
	if(render){
		return this.generateAndRender();
	}

	return this.generateWithoutRender();
};

A1Maze.prototype.generateAndRender = function(){
	//Mark the starting position
	this.markAdjacent(this.startCarvePos);
	//Simulate the carving loop, each carving takes 50ms and will be rendered immediately
	//We need to bind "this" to the method else we can't access the Maze's data
	this.timer = setInterval(this.carveAndRender.bind(this), 20);
	//Place a start and return it
	return this.getPlayerStart();
};

A1Maze.prototype.carveAndRender = function(){
	//Break condition
	if(this.frontierList.length === 0){
		clearInterval(this.timer);
		//Place an exit
		this.placeExit();
		this.isReady = true;
		return;
	}

	//Take a random node out of the frontierList
	var curNodeList = this.frontierList.splice(A1random(0, this.frontierList.length), 1);
	var curNode = curNodeList[0];
	var nList = this.neighbours(curNode.x, curNode.y);
	var rndNeighbour = nList[A1random(0, nList.length)];
	//Carve from the neighbour the the current node
	this.carve(rndNeighbour, curNode);
	this.markAdjacent(curNode);

	this.renderInit();
};

A1Maze.prototype.generateWithoutRender = function(){
	//Mark the starting position
	this.markAdjacent(this.startCarvePos);
	while(this.frontierList.length > 0){
		//Take a random node out of the frontierList
		var curNodeList = this.frontierList.splice(A1random(0, this.frontierList.length), 1);
		var curNode = curNodeList[0];
		var nList = this.neighbours(curNode.x, curNode.y);
		var rndNeighbour = nList[A1random(0, nList.length)];
		//Carve from the neighbour the the current node
		this.carve(rndNeighbour, curNode);
		this.markAdjacent(curNode);
	}
	this.render();
	this.isReady = true;

	//Place an exit
	this.placeExit();
	//Place a start and return it
	return this.getPlayerStart();
};

A1Maze.prototype.renderInit = function(){
	window.eContext.clearRect(0, 0, window.eViewport.w, window.eViewport.h);
	for (var row = 0; row < this.height; row++) {
		for (var col = 0; col < this.width; col++) {
			//Dont render frontier nodes
			if(this.field[row][col] !== 6){
				window.eContext.drawImage(window.oTiles[this.field[row][col]], col * window.oFieldSize.unitSize, row * window.oFieldSize.unitSize);
			}
		}
	}
};

A1Maze.prototype.getPlayerStart = function(){
	var x = 1;
	var y = 1;

	while(true){
		//Find a player start position
		x = A1random(0, (this.width-1))|1;
		y = A1random(0, (this.height-1))|1;

		//Make sure it's not a wall
		if(this.field[y][x] !== 0){
			//Mark found position with 2 for player start
			//this.field[y][x] = 2;
			break;
		}
	}
	return new A1Node(x, y);
};

A1Maze.prototype.placeExit = function(){
		////
		// This is a Diagram depicting the possible sides
		// and values for x,y (active = 1, inactive = 0)
		// for the exit
		//
		//			1(1,0)
		//		#########
		// 1(0,1)#       # 0(0,1)
		//		#########
		//			0(1,0)
		//
		//Choose a random side and choose which coordinate is the active one
		var side = A1random(0,2);
		var xSet = A1random(0,2);
		var ySet = 1-xSet;
		this.exitPos = new A1Node(0, 0);
		var inValid = true;

		//Run as long as we have found a proper value where the opposite neighbour
		//is not a wall so we can actually exit
		while(inValid){
			//These will keep track of which neighbour to lookup
			var valX = 0;
			var valY = 0;

			//Check for side 1 as shown in diagram
			if(side === 1){
				if(xSet === 1){			//1(1,0)
					//x can be random between 1 and cols-2 so that we cant even select
					//the corners of the field as an exit
					this.exitPos.x = A1random(1, (this.width-2));
					this.exitPos.y = 0;
				} else {				//1(0,1)
					//this time y is random and x is fixed
					this.exitPos.x = 0;
					this.exitPos.y = A1random(1, (this.height-2));
				}

				if(this.exitPos.x === 0){
					//In case x was fixed, look at the neighbour to the right of it
					valX = 1;
				} else {
					//In case y was fixed, look at the neighbour below it
					valY = 1;
				}
			} else {
				if(xSet === 1){			//0(1,0)
					//Again, x can be random wheras y is fixed at maximum value (we are
					//on side 0 now, so fixed values are forced to maximum
					this.exitPos.x = A1random(1, (this.width-2));
					this.exitPos.y = this.height-1;
				} else {				//0(0,1)
					//y random, x fixed to maximum
					this.exitPos.x = this.width-1;
					this.exitPos.y = A1random(1, (this.height-2));
				}

				if(this.exitPos.x === (this.width-1)){
					//If x was fixed, look up the neighbour to its left
					valX = -1;
				} else {
					//If y was fixed, look up the neighbour above it
					valY = -1;
				}
			}

			//Actual neighbour lookup, if there's a wall as neighbour we wouldn't be able
			//to exit so try with some new random values
			if(this.field[(this.exitPos.y+valY)][(this.exitPos.x+valX)] !== 0){
				inValid = false;
			}
		}

		//Sets the exit based on values found
		this.field[this.exitPos.y][this.exitPos.x] = 1;
};

//Marks the field at x,y and its frontiers
A1Maze.prototype.markAdjacent = function(n){
	//Mark it walkable
	this.field[n.y][n.x] = 1;
	this.addFrontier(n.x-2, n.y);
	this.addFrontier(n.x+2, n.y);
	this.addFrontier(n.x, n.y-2);
	this.addFrontier(n.x, n.y+2);
};

//Adds the frontier if its within valid values and the frontier was not previously traversed
A1Maze.prototype.addFrontier = function(x, y){
	if((x > 0 && x < (this.width-1)) && (y > 0 && y < (this.height-1)) && (this.field[y][x] === 0)){
		//Frontier is represented by the value 6
		this.field[y][x] = 6;
		this.frontierList.push(new A1Node(x, y));
	}
};

//Gets all neighbours of the node that have been marked as walkable
A1Maze.prototype.neighbours = function(x, y){
	var list = [];
	if(this.checkNode(x-2, y)){
		list.push(new A1Node(x-2, y));
	}
	if(this.checkNode(x+2, y)){
		list.push(new A1Node(x+2, y));
	}
	if(this.checkNode(x, y-2)){
		list.push(new A1Node(x, y-2));
	}
	if(this.checkNode(x, y+2)){
		list.push(new A1Node(x, y+2));
	}
	return list;
};

//Checks the given position if its walkable
A1Maze.prototype.checkNode = function(x, y){
	if((x > 0 && x < (this.width-1)) && (y > 0 && y < (this.height-1)) && (this.field[y][x] === 1)){
		return true;
	}
	return false;
};

A1Maze.prototype.carve = function(from, to){
	if(from.y < to.y){
		this.carveBlock(from.x, from.y+1);
	}
	if(from.y > to.y){
		this.carveBlock(from.x, from.y-1);
	}
	if(from.x < to.x){
		this.carveBlock(from.x+1, from.y);
	}
	if(from.x > to.x){
		this.carveBlock(from.x-1, from.y);
	}
};

A1Maze.prototype.carveBlock = function(x, y){
	if((x > 0 && x < (this.width-1)) && (y > 0 && y < (this.height-1)) && (this.field[y][x] === 0)){
		this.field[y][x] = 1;
	}
};

A1Maze.prototype.draw = function(){
	for(var row=0; row<this.height; row++){
		for(var col=0; col<this.width; col++){
			//Dont render frontier nodes
			if(this.field[row][col] !== 6){
				//Select the representation stored in window.oTiles for the current value in the field
				//window.eContext.fillStyle = window.oTiles[this.field[row][col]];
				//window.eContext.fillRect(col*window.oFieldSize.unitSize, row*window.oFieldSize.unitSize, window.oFieldSize.unitSize, window.oFieldSize.unitSize);
				window.eContext.drawImage(window.oTiles[this.field[row][col]], col * window.oFieldSize.unitSize, row * window.oFieldSize.unitSize);
			}
		}
	}
};

A1Maze.prototype.update = function(dt){
	//Empty for now
};