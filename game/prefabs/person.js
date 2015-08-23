'use strict';

var Person = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'person', frame);

  this.x = x;
  this.y = y;
  
  this.originalY = y;
  this.worldWidth = game.world.width;

  this.width = 40;
  this.height = 30;
  
  this.inputEnabled = true;
  
  game.physics.p2.enable(this);

  this.screamFX1 = game.add.audio('scream1', 10);
  this.screamFX2 = game.add.audio('scream2', 10);
  this.screamFX3 = game.add.audio('scream3', 10);
  
  this.body.setZeroDamping();
  this.body.fixedRotation = true;
  this.body.velocity.x = 200;
  this.body.velocity.y = 0;  
  this.body.mass = 2;
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
	this.body.velocity.y = 0;
	if (this.x >= this.worldWidth - 25)
		this.body.velocity.x = -200;
	else if (this.x <= 25)
		this.body.velocity.x = 200;
};

module.exports = Person;
