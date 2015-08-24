'use strict';
var Person = require('../prefabs/person');
var monsterCollisionGroup;
var personCollisionGroup;

var PersonGenerator = function(game, x, y, timer, max, monsterCollisionGroup, bridgeLineCollisionGroup, personCollisionGroup) {
	this.personCollisionGroup = game.add.group();
	this.posX = x;
	this.posY = y;
	this.timer = 0;
	this.game = game;
	this.monsterCollisionGroup = monsterCollisionGroup;
	this.personCollisionGroup = personCollisionGroup;
	this.bridgeLineCollisionGroup = bridgeLineCollisionGroup

  this.persons = 0;
  this.max = max;
  this.kills = 0;

  game.time.events.loop(Phaser.Timer.SECOND * 5, this.createPerson.bind(this));
};

PersonGenerator.prototype = Object.create(Phaser.Sprite.prototype);
PersonGenerator.prototype.constructor = PersonGenerator;

PersonGenerator.prototype.update = function() {

  if (this.kills > 2 || this.kills > 5){
    this.max--;
    this.max = this.max < 1 ? 1 : this.max;
  }

};


PersonGenerator.prototype.createPerson = function(){

  if (this.persons > this.max){
    return;
  }

  var person = new Person(this.game, this.posX, this.posY);
  person.body.setRectangle(40, 40);
  person.body.setCollisionGroup(this.personCollisionGroup);
  person.body.collides([this.monsterCollisionGroup, this.bridgeLineCollisionGroup]);
  person.body.collideWorldBounds = false;
  this.game.add.existing(person);
  this.persons++;
};

PersonGenerator.prototype.killedPerson = function(){
  this.persons--;
  this.kills++;
};

PersonGenerator.prototype.setMax = function(max){
  this.max = max;
};

module.exports = PersonGenerator;
