function Maze(width, height){
	this.w = width;
	this.h = height;
	this.field = [];
	this.frontierList = [];
	this.startingPosition = new A1Node(0, 0);
}

Maze.prototype.init = function(){
	//Init field full of walls
	for(var row=0; row<this.h; row++){
		this.field[row] = [];
		for(var col=0; col<this.w; col++){
			this.field[row][col] = 0;
		}
	}

	//Choose a random starting position and make sure its odd
	this.startingPosition.x = A1random(0, this.w)|1;
	this.startingPosition.y = A1random(0, this.h)|1;
};

Maze.prototype.generate = function(){
	//Mark the start
	this.markAdjacent(this.startingPosition);
	while(this.frontierList.length !== 0){
		//Pick a node out and delete it from the frontier list
		var curNode = this.frontierList.splice(A1random(0, this.frontierList.length), 1);
		//Find the neighbours of the current node
		var nList = this.neighbours(curNode[0]);
		//Pick a random neighbour next
		var rndNeighbour = nList[A1random(0, nList.length)];
		//Carve out the way from the current Node to the neighbour
		this.carve(rndNeighbour, curNode[0]);
		//Mark adjacent
		this.markAdjacent(curNode[0]);

		////Draw here to visualize the carving nicely
	}

	//Place the maze exit
	this.placeExit();
	//Place player starting position and return it
	return this.placeStart();
};

Maze.prototype.placeStart = function(){
	var x = 0;
	var y = 0;
	//Find a random valid starting position for the player
	while(true){
		x = A1random(0, this.w)|1;
		y = A1random(0, this.h)|1;

		if(this.field[y][x] !== 0){
			this.field[y][x] = 2;
			break;
		}
	}

	return new A1Node(x, y);
};

Maze.prototype.placeExit = function(){
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

		//Choose a random side and which coordinate should be the active one
		var side = A1random(0, 2);
		var xSet = A1random(0, 2);
		var ySet = 1-xSet;
		this.eX = 0;
		this.eY = 0;
		var inValid = true;

		//Run as long as we have found a proper value where the opposite neighbour is
		//not a wall so we can actually exit
		while(inValid){
			//These will keep track of which neighbour to lookup
			var valX = 0;
			var valY = 0;

			//Check for side 1 as shown in the diagram
			if(side == 1){
				if(xSet == 1){	//1(1,0)
					//x can be random between 1 and width-2 so that we cant even select
					//the corners of the field as an exit
					this.eX = A1random(1, this.w-2);
					this.eY = 0;
				} else {		//1(0,1)
					//this time y is random and x is fixed
					this.eX = 0;
					this.eY = A1random(1, this.h-2);
				}

				if(this.eX === 0){
					//In case x was fixed, look at the neighbour to the right of it
					valX = 1;
				} else {
					//In case y was fixed, look at the neighbour below it
					valY = 1;
				}
			} else {
				if(xSet == 1){	//0(1,0)
					//Again, x can be random whereas y is fixed at the maximum value (we are
					// on side 0 now, so fixed values are forced to maximum)
					this.eX = A1random(1, this.w-2);
					this.eY = this.h-1;
				} else{		//0(0,1)
					//y random, x fixed to maximum
					this.eX = this.w-1;
					this.eY = A1random(1, this.h-2);
				}

				if(this.eX == this.w-1){
					//If x was fixed, look up the neighbour to its left
					valX = -1;
				} else {
					//If y was fixed, look up the neighbour above it
					valY = -1;
				}
			}

			//Actual neighbour lookup, if there's a wall as neighbour we wouldn't be able to
			//exit, so try with some new random values
			if(this.field[this.eY+valY][this.eX+valX] !== 0){
				inValid = false;
			}
		}

		//Sets the exit based on found values, set walkable
		this.field[this.eY][this.eX] = 1;
};

//Makrs the field at x,y and its frontiers
Maze.prototype.markAdjacent = function(node){
	//Make it walkable
	this.field[node.y][node.x] = 1;
	this.addFrontier(new A1Node(node.x-2, node.y));
	this.addFrontier(new A1Node(node.x+2, node.y));
	this.addFrontier(new A1Node(node.x, node.y-2));
	this.addFrontier(new A1Node(node.x, node.y+2));
};

//Adds the frontier if its within valid values and the frontier was not previously traversed
Maze.prototype.addFrontier = function(node){
	if ((node.x > 0 && node.x < this.w - 1) && (node.y > 0 && node.y < this.h - 1) && (this.field[node.y][node.x] === 0)) {
		//Frontier is represented by the value 6
		this.field[node.y][node.y] = 6;
		this.frontierList.push(node);
	}
};

//Gets all neighbours of the node that have been marked as walkable
Maze.prototype.neighbours = function(node){
	var list = [];
	if(this.checkNode(node.x-2, node.y)){
		list.push(new A1Node(node.x-2, node.y));
	}
	if(this.checkNode(node.x+2, node.y)){
		list.push(new A1Node(node.x+2, node.y));
	}
	if(this.checkNode(node.x, node.y-2)){
		list.push(new A1Node(node.x, node.y-2));
	}
	if(this.checkNode(node.x, node.y+2)){
		list.push(new A1Node(node.x, node.y+2));
	}

	return list;
};

//Checks if the given position is walkable
Maze.prototype.checkNode = function(x, y){
	if((x > 0 && x < this.w-1) && (y > 0 && y < this.h-1) && (this.field[y][x] == 1)){
		return true;
	}

	return false;
};

//Carves the way
Maze.prototype.carve = function(from, to){
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

//Carve the actual carveBlock
Maze.prototype.carveBlock = function(x, y){
	if((x > 0 && x < this.w-1) && (y > 0 && y < this.h-1) && (this.field[y][x] === 0)){
		this.field[y][x] = 1;
	}
}