# inheritance-es5
[![travis build](https://img.shields.io/travis/guzmanfg/inheritance-es5.svg?style=flat-square)]()
[![codecov coverage](https://img.shields.io/codecov/c/github/guzmanfg/inheritance-es5.svg?style=flat-square)]()
[![npm version](https://img.shields.io/npm/v/inheritance-es5.svg?style=flat-square)]()
[![npm license](https://img.shields.io/npm/l/inheritance-es5.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Inheritance in JavaScript (ES5)


## What is this library objective?
Inheritance in ES5, is quite obvious, isn't it?

* Inheritance of methods.
* Inheritance of properties. 
* Use of instanceof (prototype chain).
* Call super methods (`__super__`).
* Allow method overwriting.
* Allow property overwriting.

## How to use inheritance-es5

1. Write your javascript modules as usual.

    ```javascript
    /**
    * Feel like a god creating animals
    * @param {Object} options
    * @constructor
    * @class
    */
    function Animal(options) {
        var opts = options || {};
        this._name = opts.name;
    }
    
    Animal.prototype = {
        eat: function() {
            return (this.name || this.type) + ' is eating';
        }
    };
    
    /**
    * Brings a new kitten to the world
    * @param options
    * @constructor
    * @class
    */
    function Cat(options) {
        var opts = options || {
                isSphynx: false
            };
        this.isSphynx = typeof opts.isSphynx === 'boolean' && opts.isSphynx;
    }
    
    Cat.prototype = {
        hasFur: function() {
            return !this.isSphynx;
        }
    };
    ```

2. Apply inheritance after definition.
    
    ```javascript
    inheritance(Cat, Animal); // or Cat = inheritance(Cat, Animal);
    ```

3. Call super constructor (if needed)

    ```javascript
    function Cat(options) {
        var opts = options || {
                isSphynx: false
            };
        this.isSphynx = typeof opts.isSphynx === 'boolean' && opts.isSphynx;
        Cat.__super__(this, [opts]); // super_constructor(opts)
    }
    ```

4. Done! Easy, huh?

    ```javascript
    var haku = new Cat({name: 'Haku'});
    haku.eat(); // Haku is eating!
    ```
## TODOs

* Readable test suite