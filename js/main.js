//--
// main 
// Starts the A1Loader which in turn starts the Engine
// Author: arya-s
require(["jquery", "A1Loader", "jquery.hotkeys", "key_status"], function($, A1Loader) {
	$(document).ready(function() {
		//Sets up the engine
		var a1loader = new A1Loader();
		a1loader.init();
	});
});