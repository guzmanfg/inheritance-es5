/*global define, module, require*/
(function(root, factory) {
	var INHERITANCE = '../../../inheritance';
	var ANIMAL = '../animal';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			INHERITANCE,
			ANIMAL
		], function(inheritance, Animal) {
			return (root.Reptile = factory(inheritance, Animal));
		});
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require(INHERITANCE), require(ANIMAL));
	} else {
		// Browser globals
		root.Reptile = factory(root.inheritance, root.Animal);
	}
}(this, function(inheritance, Animal) {
	'use strict';

	function Reptile() {
		Reptile.__super__(this, arguments);
	}

	Reptile.prototype = {
		constructor: Reptile,
		slither: function() {
			return 'I\'m slithering!';
		}
	};

	Object.defineProperty(Reptile.prototype, 'type', {
		configurable: true,
		get: function() {
			return 'Reptile';
		}
	});

	return inheritance(Reptile, Animal);
}));