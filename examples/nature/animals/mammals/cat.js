/*global define, module, require*/
(function (root, factory) {
	var INHERITANCE = '../../../../inheritance';
	var MAMMAL = '../mammal';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([INHERITANCE, MAMMAL], function (inheritance, Mammal) {
			return (root.Cat = factory(inheritance, Mammal));
		});
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		module.exports =factory( require(INHERITANCE), require(MAMMAL));
	} else {
		// Browser globals
		root.Cat =factory(root.inheritance, root.Mammal);
	}
}(this, function (inheritance, Mammal) {
	'use strict';

	function Cat(options) {
		var opts = options || {
				isSphynx: false
			};
		this.isSphynx = typeof opts.isSphynx === 'boolean' && opts.isSphynx;
		Cat.__super__(this, [{ name: opts.name }]);
	}

	Cat.prototype = {
		constructor: Cat,
		hasFur: function() {
			return this.__super__.hasFur() && !this.isSphynx;
		}
	};

	/*Object.defineProperty(Cat.prototype, 'hasFur', {
		get: function() {
			return this.base.hasFur && !this.isSphynx;
		}
	});*/

	Object.defineProperty(Cat.prototype, 'type', {
		get: function() {
			return 'Cat';
		}
	});

	return inheritance(Cat, Mammal);
}));