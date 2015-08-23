'use strict';
var Person = require('../prefabs/person');
var monsterCollisionGroup;
var personCollisionGroup;

var PersonGenerator = function(game, x, y, timer, monsterCollisionGroup, bridgeLineCollisionGroup, personCollisionGroup) {
	this.personCollisionGroup = game.add.group();
	this.posX = x;
	this.posY = y;
	this.timer = timer;
	this.game = game;
	this.monsterCollisionGroup = monsterCollisionGroup;
	this.personCollisionGroup = personCollisionGroup;
	this.bridgeLineCollisionGroup = bridgeLineCollisionGroup
	this.time = 0;
};

PersonGenerator.prototype = Object.create(Phaser.Sprite.prototype);
PersonGenerator.prototype.constructor = PersonGenerator;

PersonGenerator.prototype.update = function() {
	if (this.time == 0){
		this.time = this.timer;
		var person = new Person(this.game, this.posX, this.posY);
    	person.body.setRectangle(40, 40);
    	person.body.setCollisionGroup(this.personCollisionGroup);
    	person.body.collides([this.personCollisionGroup, this.monsterCollisionGroup]);
    	person.body.collides([this.personCollisionGroup, this.bridgeLineCollisionGroup], hitBridge);
    	person.body.collideWorldBounds = false;
    	this.game.add.existing(person);
	}
	else{
		this.time -= 1;
	}
},
hitBridge: function(person, bridge) {
	person.sprite.alpha -= 1;
  }
;




module.exports = PersonGenerator;
