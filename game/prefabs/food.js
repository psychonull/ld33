'use strict';
var settings = require('../settings');

var Food = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, tank(), frame);
  
  this.x = x;
  this.y = y;
  
  this.originalX = x;
  this.worldWidth = game.world.width;

  this.width = 40;
  this.height = 30;
  
  this.inputEnabled = true;
  
  game.physics.p2.enable(this);

  this.screamFX1 = game.add.audio('tankEated1', 10);
  this.screamFX2 = game.add.audio('tankEated2', 10);
  this.screamFX3 = game.add.audio('tankEated3', 10);
  
  this.body.setZeroDamping();
  this.body.fixedRotation = true;
  this.body.velocity.x = 100;
  this.body.velocity.y = 1;
  this.body.data.gravityScale = -0.3;
};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;

Food.prototype.afterDestroyed = function(){
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

function tank() {
	var random = Math.floor(Math.random() * 3) + 1;
	  switch (random){
	  	case 1: return 'tank1';
			break;
	  	case 2: return 'tank2';
			break;
	  	case 3: return 'tank3';
			break;
	  
	  }
}

Food.prototype.update = function() {
	this.body.velocity.y = 10;
	if (this.x <= this.originalX - 50) 
		this.body.force.x = 100;
	else if (this.x >= this.originalX + 50)
		this.body.force.x = -100;
	if (this.y >= settings.worldSize.height - 50)
		this.destroy();
};

module.exports = Food;
