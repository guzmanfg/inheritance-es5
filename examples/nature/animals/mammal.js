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
			return (root.Mammal = factory(inheritance, Animal));
		});
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require(INHERITANCE), require(ANIMAL));
	} else {
		// Browser globals
		root.Mammal = factory(root.inheritance, root.Animal);
	}
}(this, function(inheritance, Animal) {
	'use strict';
	function Mammal() {
		Mammal.__super__(this, arguments);
	}

	Mammal.prototype = {
		constructor: Mammal,
		hasFur: function() {
			return true;
		}
	};

	/*Object.defineProperty(Mammal.prototype, 'hasFur', {
	 configurable: true,
	 get: function() {
	 return this._hasFur;
	 }
	 });*/

	Object.defineProperty(Mammal.prototype, 'type', {
		configurable: true,
		get: function() {
			return 'Mammal';
		}
	});

	return inheritance(Mammal, Animal);
}));