//--
// A1Time 
// Module that keeps track of time passed between frames.
// Author: arya-s
define(function() {
	return {
		now: Date.now(),
		difference: 0,
		last: 0,
		getDifference: function() {
			this.now = Date.now();
			this.difference = (this.now - this.last) / 1000;
			this.last = this.now;

			return this.difference;
		},
		getFPS: function(){
			return (1/this.difference).toFixed(0);
		}
	};
});