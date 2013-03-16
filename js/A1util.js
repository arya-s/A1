window.onload = window.onresize = function() {
    var wRatio = 0.6
    , viewPort = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    , canvas = {
        element: document.getElementById("A1MainCanvas"),
        w: viewPort.w * wRatio,
        h: (viewPort.w * wRatio) / 2
    };

    //Center the canvas and scale it
    canvas.element.style.position = "fixed";
    canvas.element.style.top = (viewPort.h - canvas.h) / 2 + "px";
    canvas.element.style.left = (viewPort.w - canvas.w) / 2 + "px";
    canvas.element.setAttribute("width", canvas.w);
    canvas.element.setAttribute("height", canvas.h);
    canvas.element.style.top = (viewPort.h - canvas.h) / 2;
    canvas.element.style.left = (viewPort.w - canvas.w) / 2;

    window.ctx = canvas.element.getContext("2d");
};