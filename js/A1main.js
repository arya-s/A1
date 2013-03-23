//Holds all entities identified by their unique name
window.pEntities = {};

//Make sure jQuery is loaded else we can't use the hotkey plugin
$(document).ready(function(){
    (function init(){
        //Create a maze playfield
        window.oMaze = new A1Maze(window.oFieldSize.w, window.oFieldSize.h, "Maze");
        window.oMaze.init();
        var startNode = window.oMaze.generate(true);
        window.pEntities[window.oMaze.uniqueName] = window.oMaze;
        //Create the player
        var oPlayer = new A1Player(startNode, "Player");
        //Player should be the highest z-index so add it last... need to implement z-indexing!
        window.pEntities[oPlayer.uniqueName] = oPlayer;
    })();

    (function gameloop(){
        //Only manipulate the game if the Maze was fully generated.
        if(window.oMaze.isReady){
            update(A1getTimeDiff());
            draw();
        }
        window.requestAnimFrame(gameloop);
    })();

    function draw(){
        window.eContext.clearRect(0, 0, window.eViewport.w, window.eViewport.h);
        for(var e in window.pEntities){
            window.pEntities[e].draw();
        }
    }

    function update(dt){
        for(var e in window.pEntities){
            window.pEntities[e].update(dt);
        }
    }
});