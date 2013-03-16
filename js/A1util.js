var g_sCanvasName = "A1Main_canvas";

window.onload = window.onresize = function() {
    var _widthRatio = 0.6
    , _viewPort = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    , _canvas = {
        elem: document.getelemById(g_sCanvasName),
        w: _viewPort.w * _widthRatio,
        h: (_viewPort.w * _widthRatio) / 2
    };

    //Center the _canvas and scale it
    _canvas.elem.style.position = "fixed";
    _canvas.elem.style.top = (_viewPort.h - _canvas.h) / 2 + "px";
    _canvas.elem.style.left = (_viewPort.w - _canvas.w) / 2 + "px";
    _canvas.elem.setAttribute("width", _canvas.w);
    _canvas.elem.setAttribute("height", _canvas.h);
    _canvas.elem.style.top = (_viewPort.h - _canvas.h) / 2;
    _canvas.elem.style.left = (_viewPort.w - _canvas.w) / 2;

    window.ctx = _canvas.elem.getContext("2d");
};