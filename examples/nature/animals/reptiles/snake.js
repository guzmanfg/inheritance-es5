/*global define, module, require*/
(function(root, factory) {
	var INHERITANCE = '../../../../inheritance';
	var REPTILE = '../reptile';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			INHERITANCE,
			REPTILE
		], function(inheritance, Reptile) {
			return (root.Snake = factory(inheritance, Reptile));
		});
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require(INHERITANCE), require(REPTILE));
	} else {
		// Browser globals
		root.Snake = factory(root.inheritance, root.Reptile);
	}
}(this, function(inheritance, Reptile) {
	'use strict';

	function Snake(options) {
		var opts = options || {};
		Snake.__super__(this, [{ name: opts.name }]);
	}

	Snake.prototype = {
		constructor: Snake
	};

	Object.defineProperty(Snake.prototype, 'type', {
		get: function() {
			return 'Snake';
		}
	});

	return inheritance(Snake, Reptile);
}));