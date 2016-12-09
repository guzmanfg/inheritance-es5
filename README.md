# inheritance-es5
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