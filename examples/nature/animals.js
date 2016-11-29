/*global define, module, require*/
(function(root, factory) {
	var ANIMAL = './animal';
	var MAMMAL = './animals/mammal';
	var CAT = './animals/mammals/cat';
	var REPTILE = './animals/reptile';
	var SNAKE = './animals/reptiles/snake';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			ANIMAL,
			MAMMAL,
			CAT,
			REPTILE,
			SNAKE
		], function(Animal, Mammal, Cat, Reptile, Snake) {
			return (root.Animals = factory(Animal, Mammal, Cat, Reptile, Snake));
		});
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		module.exports = factory(require(ANIMAL), require(MAMMAL), require(CAT), require(REPTILE), require(SNAKE));
	} else {
		// Browser globals
		root.Animals = factory(root.Animal, root.Mammal, root.Cat, root.Reptile, root.Snake);
	}
}(this, function(Animal, Mammal, Cat, Reptile, Snake) {
	return {
		Animal: Animal,
		Mammal: Mammal,
		Cat: Cat,
		Reptile: Reptile,
		Snake: Snake
	};
}));