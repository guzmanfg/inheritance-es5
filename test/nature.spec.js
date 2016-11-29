/*global require, describe, it*/
var expect = require('chai').expect;
describe('Animals', function() {
	var animals = require('../examples/nature/animals');
	var Animal = animals.Animal;
	var Mammal = animals.Mammal;
	var Cat = animals.Cat;
	var Reptile = animals.Reptile;
	var Snake = animals.Snake;

	describe('base classes should not be polluted', function() {
		it('animal', function() {
			var animal = new Animal();
			expect(animal).to.be.an.instanceof(Animal);
			expect(animal).not.to.be.an.instanceof(Mammal);
			expect(animal).not.to.be.an.instanceof(Cat);
			expect(animal).not.to.be.an.instanceof(Reptile);
			expect(animal).not.to.be.an.instanceof(Snake);
		});
		it('mammal', function() {
			var mammal = new Mammal();
			expect(mammal).to.be.an.instanceof(Animal);
			expect(mammal).to.be.an.instanceof(Mammal);
			expect(mammal).not.to.be.an.instanceof(Cat);
			expect(mammal).not.to.be.an.instanceof(Reptile);
			expect(mammal).not.to.be.an.instanceof(Snake);
		});
		it('cat', function() {
			var cat = new Cat();
			expect(cat).to.be.an.instanceof(Animal);
			expect(cat).to.be.an.instanceof(Mammal);
			expect(cat).to.be.an.instanceof(Cat);
			expect(cat).not.to.be.an.instanceof(Reptile);
			expect(cat).not.to.be.an.instanceof(Snake);
		});
		it('reptile', function() {
			var reptile = new Reptile();
			expect(reptile).to.be.an.instanceof(Animal);
			expect(reptile).not.to.be.an.instanceof(Mammal);
			expect(reptile).not.to.be.an.instanceof(Cat);
			expect(reptile).to.be.an.instanceof(Reptile);
			expect(reptile).not.to.be.an.instanceof(Snake);
		});
		it('snake', function() {
			var snake = new Snake();
			expect(snake).to.be.an.instanceof(Animal);
			expect(snake).not.to.be.an.instanceof(Mammal);
			expect(snake).not.to.be.an.instanceof(Cat);
			expect(snake).to.be.an.instanceof(Reptile);
			expect(snake).to.be.an.instanceof(Snake);
		});
	});

	describe('Cats', function() {
		describe('constructor', function() {
			it('should create a new cat', function() {
				expect(new Cat()).to.be.an.instanceof(Cat);
			});

			it('should create a new cat named Haru', function() {
				var cat = new Cat({ name: 'Haru' });
				expect(cat.name).to.be.equal('Haru');
			});
		});

		describe('class', function() {
			var cat = new Cat();
			it('should be an animal', function() {
				expect(cat).to.be.an.instanceof(Animal);
			});
			it('should be a mammal', function() {
				expect(cat).to.be.an.instanceof(Mammal);
			});
		});

		describe('Haku', function() {
			var haku = new Cat({ name: 'Haku' });

			it('should be called Haku', function() {
				expect(haku.name).to.be.equal('Haku');
			});

			it('should have Animal > Mammal > Cat classification', function() {
				expect(haku.classification).to.be.equal('Animal > Mammal > Cat');
			});

			it('should have fur', function() {
				expect(haku.hasFur()).to.be.true;
			});
		});

		describe('Eros', function() {
			var eros = new Cat({
				name: 'Eros',
				isSphynx: true
			});

			it('should be called Eros', function() {
				expect(eros.name).to.be.equal('Eros');
			});

			it('should have Animal > Mammal > Cat classification', function() {
				expect(eros.classification).to.be.equal('Animal > Mammal > Cat');
			});

			it('should have no fur', function() {
				expect(eros.hasFur()).to.be.false;
			});
		});
	});

	describe('Snakes', function() {
		describe('constructor', function() {
			it('should create a new snake', function() {
				expect(new Snake()).to.be.an.instanceof(Snake);
			});

			it('should create a new snake named Ka', function() {
				var snake = new Snake({ name: 'Ka' });
				expect(snake.name).to.be.equal('Ka');
			});
		});

		describe('class', function() {
			var snake = new Snake();
			it('should be an animal', function() {
				expect(snake).to.be.an.instanceof(Animal);
			});
			it('should be a reptile', function() {
				expect(snake).to.be.an.instanceof(Reptile);
			});

			it('should have Animal > Reptile > Snake classification', function() {
				expect(snake.classification).to.be.equal('Animal > Reptile > Snake');
			});

			it('should slither', function() {
				expect(snake.slither()).to.be.equal('I\'m slithering!');
			});
		});

	});
});