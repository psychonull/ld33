'use strict';
var Person = require('../prefabs/person');
var monsterCollisionGroup;
var personCollisionGroup;

var PersonGenerator = function(game, x, y, timer, monsterCollisionGroup, bridgeLineCollisionGroup, personCollisionGroup) {
	this.personCollisionGroup = game.add.group();
	this.posX = x;
	this.posY = y;
	this.timer = 0;
	this.game = game;
	this.monsterCollisionGroup = monsterCollisionGroup;
	this.personCollisionGroup = personCollisionGroup;
	this.bridgeLineCollisionGroup = bridgeLineCollisionGroup
	this.time = 0;
	this.quantity = 0;
	this.currentQuantity = 0;
};

PersonGenerator.prototype = Object.create(Phaser.Sprite.prototype);
PersonGenerator.prototype.constructor = PersonGenerator;

PersonGenerator.prototype.update = function() {
	if (this.time == 0 && this.currentQuantity < this.quantity){
		this.time = this.timer;
		var person = new Person(this.game, this.posX, this.posY);
    	person.body.setRectangle(40, 40);
    	person.body.setCollisionGroup(this.personCollisionGroup);
    	person.body.collides([this.personCollisionGroup, this.monsterCollisionGroup]);
    	person.body.collides([this.personCollisionGroup, this.bridgeLineCollisionGroup]);
    	person.body.collideWorldBounds = false;
    	this.currentQuantity += 1;
    	this.game.add.existing(person);

      //this.game.camera.follow(person);
	}
	else{
		if(this.time > 0)
			this.time -= 1;
	}
};




PersonGenerator.prototype.createPersons = function(quantity, timer){
	this.timer = timer;
	this.time = timer;
	this.quantity = quantity;
	this.currentQuantity = 0;
}

module.exports = PersonGenerator;
