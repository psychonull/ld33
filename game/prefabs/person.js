'use strict';
var settings = require('../settings');
var Person = function(game, x, y, frame) {
  this.dir = game.rnd.integerInRange(0, 1);
  
  if (this.dir === 0){
	  this.dir = -1;
	  x = settings.worldSize.width - 40;
	  y = settings.bridge_level-35;
  }
  else {
	  x = 40;
	  y = settings.bridge_level-35;
  };
  
  Phaser.Sprite.call(this, game, x, y, 'person', frame);
  
  this.x = x;
  this.y = y;
  this.originalX = x;
  this.worldWidth = settings.worldSize.width;

  this.width = 40;
  this.height = 30;

  this.inputEnabled = true;

  game.physics.p2.enable(this);

  this.screamFX1 = game.add.audio('scream1', 10);
  this.screamFX2 = game.add.audio('scream2', 10);
  this.screamFX3 = game.add.audio('scream3', 10);

  this.body.setZeroDamping();
  this.body.fixedRotation = true;
  this.body.velocity.y = 0;
  this.body.mass = 2;
  
  
  if (this.dir === -1){
	  this.body.velocity.x = -200;
  }
  else {
	  this.body.velocity.x = 200;
  };
  
  this.scale.set(0.5);
  this.smoothed = false;
  this.frame = 0;

  this.animations.add('walk', [0, 1, 2, 3, 4, 5]);
  this.animations.play('walk', 10, true);
};

Person.prototype = Object.create(Phaser.Sprite.prototype);
Person.prototype.constructor = Person;

Person.prototype.afterDestroyed = function(){
	var random = Math.floor(Math.random() * 3) + 1;
	switch (random){
		case 1: this.screamFX1.play();
				break;
		case 2: this.screamFX2.play();
				break;
		case 3: this.screamFX3.play();
				break;
	};
};

Person.prototype.update = function() {
	this.body.velocity.y = 40;
	
	if (this.x >= settings.worldSize.width - 40){
		this.body.x = 40;
		this.body.y = settings.bridge_level-35;
	}
	else if (this.x <= 40){
		this.body.x = settings.worldSize.width - 40;
		this.body.y = settings.bridge_level-35;
	}

  this.scale.set(0.5*this.dir, 0.5);
	this.body.velocity.x = this.dir*200;
};

module.exports = Person;
