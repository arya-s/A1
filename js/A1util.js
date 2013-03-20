var g_sCanvasName = "A1MainCanvas"
, g_eContext
, g_eViewport = {
        w: window.innerWidth,
        h: window.innerHeight
}
, g_oPlayer = null;

function init(){
    var _widthRatio = 0.6
    , _canvas = {
        elem: document.getElementById(g_sCanvasName),
        w: g_eViewport.w * _widthRatio,
        h: (g_eViewport.w * _widthRatio) / 2
    };

    //Center the _canvas and scale it
    _canvas.elem.style.position = "fixed";
    _canvas.elem.style.top = (g_eViewport.h - _canvas.h) / 2 + "px";
    _canvas.elem.style.left = (g_eViewport.w - _canvas.w) / 2 + "px";
    _canvas.elem.setAttribute("width", _canvas.w);
    _canvas.elem.setAttribute("height", _canvas.h);
    _canvas.elem.style.top = (g_eViewport.h - _canvas.h) / 2;
    _canvas.elem.style.left = (g_eViewport.w - _canvas.w) / 2;

    g_eContext = _canvas.elem.getContext("2d");

    //Create the player
    g_oPlayer = {
        color: "#00A",
        x: 270,
        y: 270,
        w: 32,
        h: 32,
        draw: function(){
            g_eContext.fillStyle = this.color;
            g_eContext.fillRect(this.x, this.y, this.w, this.h);
        },
        shoot: function(){
            console.log("Shootin'");
        }
    };
}

init();
window.onresize = init;

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
