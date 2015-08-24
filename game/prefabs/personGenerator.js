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

  this.personAddTimer = game.time.events.loop(Phaser.Timer.SECOND * 5, this.createPerson, this);

	this.game.onBrokenBridge.add(this.onBrokenBridge, this);
};

PersonGenerator.prototype = Object.create(Phaser.Sprite.prototype);
PersonGenerator.prototype.constructor = PersonGenerator;

PersonGenerator.prototype.update = function() {

  if (this.kills >= 5 || this.kills >= 10){
    this.max--;
    this.max = this.max < 1 ? 1 : this.max;
  }

};

PersonGenerator.prototype.onBrokenBridge = function(){
	// generate ppl more frequently
	this.game.time.events.remove(this.personAddTimer);
	this.game.time.events.loop(this.game.rnd.integerInRange(600, 1000), this.createPerson, this);
};

PersonGenerator.prototype.createPerson = function(){

  if (this.persons >= this.max && !this.game.brokenBridge){
    return;
  }

  var person = new Person(this.game, this.posX, this.posY);
  person.body.setRectangle(40, 40);
  person.body.setCollisionGroup(this.personCollisionGroup);
	if(this.game.brokenBridge){
  	person.body.collides([this.monsterCollisionGroup]);
	}
	else {
  	person.body.collides([this.monsterCollisionGroup, this.bridgeLineCollisionGroup]);
	}
  person.body.collideWorldBounds = false;
  this.game.add.existing(person);
  this.persons++;
  console.log('created Person | ' + this.persons + ' / ' + this.max);
};

PersonGenerator.prototype.killedPerson = function(){
  this.persons--;
  this.kills++;
  console.log('killed Person | ' + this.persons + ' / ' + this.kills);
};

PersonGenerator.prototype.setMax = function(max){
  this.max = max;
};

module.exports = PersonGenerator;
