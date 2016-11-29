/*global require, describe, beforeEach, it*/
var expect = require('chai').expect;

describe('inheritance', function() {
    var inheritance = require('../inheritance');

    var Base;
    var Child;
    var GrandChild;
    var Sibling;
    var Cousin;
    var base;
    var child;
    var sibling;
    var grandChild;
    var cousin;

    var GREETING = 'Hello, world!';
    var OVERWRITTEN = 'Bye, world!';

    beforeEach(function() {
        Base = function() {
        };
        Base.prototype = {
            greet: function() {
                return GREETING;
            },
            overwritten: function() {
                return GREETING;
            }
        };
        Child = function() {
        };
        Child.prototype = {
            overwritten: function() {
                return OVERWRITTEN;
            }
        };
        GrandChild = function() {
        };
        GrandChild.prototype = {};
        Sibling = function() {
        };
        Sibling.prototype = {};
        Cousin = function() {
        };
        Cousin.prototype = {
            overwritten: function() {
                return OVERWRITTEN;
            }
        };

        inheritance(Child, Base);
        inheritance(GrandChild, Child);
        inheritance(Sibling, Base);
        inheritance(Cousin, Sibling);

        base = new Base();
        child = new Child();
        grandChild = new GrandChild();
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

    it('should allow overwriting', function() {
        expect(base.overwritten()).to.be.equal(GREETING);
        expect(child.overwritten()).to.be.equal(OVERWRITTEN);
        expect(grandChild.overwritten()).to.be.equal(OVERWRITTEN);
        expect(sibling.overwritten()).to.be.equal(GREETING);
        expect(cousin.overwritten()).to.be.equal(OVERWRITTEN);
    });
});