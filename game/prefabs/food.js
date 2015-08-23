'use strict';

var Food = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'Food', frame);
  
  this.x = x;
  this.y = y;
  
  this.originalY = y;
  this.worldWidth = game.world.width;

  this.width = 40;
  this.height = 30;
  
  this.inputEnabled = true;
  
  game.physics.p2.enable(this);

  this.body.setZeroDamping();
  this.body.fixedRotation = true;
  this.body.velocity.x = 25;
  this.body.velocity.y = 50;  
};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;

Food.prototype.update = function() {
	
	if (this.y <= this.originalY - 25) 
		this.body.velocity.y = 50;
	else if (this.y >= this.originalY + 25)
		this.body.velocity.y = -50;
	if (this.x >= this.worldWidth - 25)
		this.body.velocity.x = -25;
	else if (this.x <= 25)
		this.body.velocity.x = 25;
};

module.exports = Food;
