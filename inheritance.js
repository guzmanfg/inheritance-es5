/*global define, module*/
(function(root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function() {
            return (root.inheritance = factory());
        });
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser globals
        root.inheritance = factory();
    }
}(this, function() {

    'use strict';

    function isFunction(fn) {
        return typeof fn === 'function';
    }

    function setSuperProperty(prototype, key, descriptor) {
        prototype.__descriptors__ = prototype.__descriptors__ || {};
        var hasGetter = descriptor && isFunction(descriptor.get);
        var hasSetter = descriptor && isFunction(descriptor.set);
        if (hasGetter || hasSetter) {
            prototype.__descriptors__[key] = Object.assign({}, descriptor);
        }
    }

    // TODO: if !configurable --> can't be overwritten
    function setInheritorProperties(inheritor, original, base) {
        var properties = Object.getOwnPropertyNames(original);
        var descriptor;
        var key;
        for (var k = 0; k < properties.length; k++) {
            key = properties[k];
            if (key === 'constructor'/* || key === '__super__'*/) {
                continue;
            }

            descriptor = Object.getOwnPropertyDescriptor(original, key);
            var inheritorDescriptor = Object.getOwnPropertyDescriptor(base.prototype, key);
            if (isFunction(descriptor.get) || isFunction(descriptor.set)) {
                // Getters and setters
                Object.defineProperty(inheritor.prototype, key, descriptor);
                setSuperProperty(inheritor.prototype, key, inheritorDescriptor);
            } else {
                // Methods and attributes
                inheritor.prototype[key] = original[key];
            }
        }
    }

    function setPrototype(inheritor, base) {
        var ParentProxy = function() {
        };
        ParentProxy.prototype = base.prototype;
        inheritor.prototype = new ParentProxy();
        inheritor.prototype.constructor = inheritor;
    }

    function setSuper(inheritor, base) {
        var superConstructor = base.prototype.constructor;

        inheritor.__super__ = function(context, params) {
            return superConstructor.apply(context, params);
        };

        inheritor.prototype.__super__ = base.prototype;
    }

    function inheritance(inheritor, base) {
        var originalPrototype = inheritor.prototype;
        setPrototype(inheritor, base);
        setSuper(inheritor, base);
        setInheritorProperties(inheritor, originalPrototype, base);
        return inheritor;
    }

    return inheritance;
}));