var g_sCanvasName = "A1MainCanvas"
, g_nWidthRatio = 0.6
, g_eViewport = {
        w: window.innerWidth,
        h: window.innerHeight
}
, g_eCanvas = {
    elem: document.getElementById(g_sCanvasName),
    w: g_eViewport.w * g_nWidthRatio,
    h: (g_eViewport.w * g_nWidthRatio) / 2
}
, g_eContext
, g_oPlayer = null;

function init(){
    //Center the g_eCanvas and scale it
    g_eCanvas.elem.style.position = "fixed";
    g_eCanvas.elem.style.top = (g_eViewport.h - g_eCanvas.h) / 2 + "px";
    g_eCanvas.elem.style.left = (g_eViewport.w - g_eCanvas.w) / 2 + "px";
    g_eCanvas.elem.setAttribute("width", g_eCanvas.w);
    g_eCanvas.elem.setAttribute("height", g_eCanvas.h);
    g_eCanvas.elem.style.top = (g_eViewport.h - g_eCanvas.h) / 2;
    g_eCanvas.elem.style.left = (g_eViewport.w - g_eCanvas.w) / 2;

    g_eContext = g_eCanvas.elem.getContext("2d");

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

function A1clamp(val, min, max){
    return Math.min(Math.max(val, min), max);
}