/*global require, describe, beforeEach, it*/
var expect = require('chai').expect;

describe('inheritance', function() {
    var inheritance = require('../inheritance');

    var Base;
    var Child;
    var GrandChild;
    var GreatGrandChild1;
    var GreatGrandChild2;
    var Sibling;
    var Cousin;
    var base;
    var child;
    var sibling;
    var grandChild;
    var greatGrandChild1;
    var greatGrandChild2;
    var cousin;

    var GREETING = 'Hello, world!';
    var OVERWRITTEN = 'Bye, world!';

    beforeEach(function() {
        Base = function() {
            this._attribute = null;
        };
        Base.prototype = {
            constructor: Base,
            greet: function() {
                return GREETING;
            },
            overwritten: function() {
                return GREETING;
            }
        };

        Object.defineProperties(Base.prototype, {
            'getter': {
                'get': function() {
                    return this._attribute;
                }
            },
            'setter': {
                'set': function(value) {
                    this._attribute = value;
                }
            }
        });
        Child = function() {
        };
        Child.prototype = {
            constructor: Child,
            overwritten: function() {
                return OVERWRITTEN;
            }
        };
        Object.defineProperties(Child.prototype, {
            'getter': {
                'get': function() {
                    return this._attribute ? this._attribute : 0;
                }
            },
            'setter': {
                'set': function(value) {
                    this._attribute = (value ? value : 0) + 1;
                }
            }
        });

        GrandChild = function() {
        };
        GrandChild.prototype = {};
        Object.defineProperties(GrandChild.prototype, {});

        GreatGrandChild1 = function() {
        };
        GreatGrandChild1.prototype = {};
        Object.defineProperties(GreatGrandChild1.prototype, {
            'getter': {
                'get': function() {
                    return 'Attribute: ' + (this._attribute ? this._attribute : 0);
                }
            }
        });

        GreatGrandChild2 = function() {
        };
        GreatGrandChild2.prototype = {};
        Object.defineProperties(GreatGrandChild2.prototype, {
            'setter': {
                'set': function(value) {
                    this._attribute = (value ? value : 0) * 2;
                }
            }
        });

        Sibling = function() {
            Sibling.__super__(this);
        };
        Sibling.prototype = {
            greeting: function() {
                return this.__super__.greet() + ' - sibling';
            }
        };
        Cousin = function() {
        };
        Cousin.prototype = {
            overwritten: function() {
                return OVERWRITTEN;
            }
        };

        inheritance(Child, Base);
        inheritance(GrandChild, Child);
        inheritance(GreatGrandChild1, GrandChild);
        inheritance(GreatGrandChild2, GrandChild);
        inheritance(Sibling, Base);
        inheritance(Cousin, Sibling);

        base = new Base();
        child = new Child();
        grandChild = new GrandChild();
        greatGrandChild1 = new GreatGrandChild1();
        greatGrandChild2 = new GreatGrandChild2();
        sibling = new Sibling();
        cousin = new Cousin();
    });

    it('should inherit methods', function() {
        expect(base.greet()).to.be.equal(GREETING);
        expect(child.greet()).to.be.equal(GREETING);
        expect(sibling.greet()).to.be.equal(GREETING);
        expect(cousin.greet()).to.be.equal(GREETING);
        expect(grandChild.greet()).to.be.equal(GREETING);
    });

    it('should inherit properties', function() {
        base.setter = 1;
        sibling.setter = 2;
        cousin.setter = 3;
        expect(base.getter).to.be.equal(1);
        expect(sibling.getter).to.be.equal(2);
        expect(cousin.getter).to.be.equal(3);
    });

    it('should inherit types', function() {
        expect(base).to.be.an.instanceof(Base);

        expect(child).to.be.an.instanceof(Base);
        expect(child).to.be.an.instanceof(Child);

        expect(sibling).to.be.an.instanceof(Base);
        expect(sibling).to.be.an.instanceof(Sibling);

        expect(grandChild).to.be.an.instanceof(Base);
        expect(grandChild).to.be.an.instanceof(Child);
        expect(grandChild).to.be.an.instanceof(GrandChild);

        expect(cousin).to.be.an.instanceof(Base);
        expect(cousin).to.be.an.instanceof(Sibling);
        expect(cousin).to.be.an.instanceof(Cousin);
    });

    it('should allow super method call', function() {
        expect(sibling.greeting()).to.be.equal(GREETING + ' - sibling');
    });

    it('should allow method overwriting', function() {
        expect(base.overwritten()).to.be.equal(GREETING);
        expect(child.overwritten()).to.be.equal(OVERWRITTEN);
        expect(grandChild.overwritten()).to.be.equal(OVERWRITTEN);
        expect(sibling.overwritten()).to.be.equal(GREETING);
        expect(cousin.overwritten()).to.be.equal(OVERWRITTEN);
    });

    it('should allow property overwriting', function() {
        expect(base.getter).to.be.equal(null);
        // Child overwrites getter
        expect(child.getter).to.be.equal(0);
        expect(sibling.getter).to.be.equal(null);
        // Cousin doesn't call __super__, so _attribute is not initialized
        expect(cousin.getter).to.be.equal(undefined);
        // GrandChild inherits overwritten getter (Child overwrites getter)
        expect(grandChild.getter).to.be.equal(0);
        // GreatGrandChild1 overwrites getter
        expect(greatGrandChild1.getter).to.be.equal('Attribute: 0');
        // GreatGrandChild2 inherites overwritten getter (Child overwrites getter)
        expect(greatGrandChild2.getter).to.be.equal(0);


        // Child overwrites setter
        child.setter = 1;
        // GreatGrandChild2 ovewrites setter
        greatGrandChild2.setter = 2;
        expect(child.getter).to.be.equal(2);
        expect(greatGrandChild2.getter).to.be.equal(4);
    });
});