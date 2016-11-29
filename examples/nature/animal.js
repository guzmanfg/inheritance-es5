/*global define, exports*/
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], function() {
			return (root.Animal = factory());
		});
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		root.Animal = factory();
	}
}(this, function() {
	'use strict';
	function Animal(properties) {
		var props = properties || {};
		this._name = props.name;
	}

	Animal.prototype = {
		constructor: Animal,
		eat: function() {
			return (this.name || this.type) + ' is eating';
		}
	};

	Object.defineProperty(Animal.prototype, 'name', {
		get: function() {
			return this._name;
		},
		set: function(value) {
			this._name = value;
		}
	});

	Object.defineProperty(Animal.prototype, 'type', {
		configurable: true,
		get: function() {
			return 'Animal';
		}
	});

	Object.defineProperty(Animal.prototype, 'classification', {
		configurable: true,
		get: function() {
			var previous = '';
			var parent = this.__super__;
			while (parent) {
				previous = (parent.type ? (parent.type + ' > ') : '') + previous;
				parent = parent.__super__;
			}
			return previous + this.type;
		}
	});

	return Animal;
}));