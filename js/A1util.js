//--
// A1Util 
// Module that has a couple of static helper functions
// Author: arya-s
define(function() {
	return {
		clamp: function(val, min, max){
			return Math.min(Math.max(val, min), max);
		},
		random: function(min, max){
			return Math.floor((Math.random()*max)+min);
		}
	};
});