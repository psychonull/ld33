'use strict';
var settings = require('../settings'),
  _ = require('lodash');

var Food = function(game, x, y, options) {
  Phaser.Sprite.call(this, game, x, y, 'food');

  this.color = _.sample([0xFF0092, 0xFFCA1B, 0xB6FF00, 0x228DFF, 0xBA01FF, 0xFFFFFF]);
  this.tint = this.color;

  this.x = x;
  this.y = y;

  this.anchor.setTo(0.5, 0.5);

  this.originalX = x;
  this.worldWidth = game.world.width;

  this.width = 32;
  this.height = 32;

  this.scale.setTo(0.7, 0.7);

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

  this.setupLighting();
  this.setupBehavior();
};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;

Food.prototype.destroy = function(){
  // if(this.glow){
  //   //this.glow.destroy();
  //   var lightsOff = this.game.add.tween(this.glow).to({alpha: 0}, _.random(100,200), Phaser.Easing.Cubic.Out);
  //   lightsOff.onComplete.add(function(){
  //     this.glow.destroy();
  //   }, this);
  // }
  if(this.glow){
    this.glow.destroy();
  }
  Phaser.Sprite.prototype.destroy.call(this);
};

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

Food.prototype.update = function() {  
	this.body.velocity.y = 10;
	if (this.x <= this.originalX - 50)
		this.body.force.x = 100;
	else if (this.x >= this.originalX + 50)
		this.body.force.x = -100;
	//if (this.y >= settings.worldSize.height - 50)
	//	return this.destroy(); 

  if(this.glow){
    this.updateLighting();
  }
};

Food.prototype.setupLighting = function(){
  this.glow = this.game.add.image(this.x, this.y, 'blurred-circle');
  this.glow.anchor.setTo(0.5, 0.5);

  this.glow.blendMode = Phaser.blendModes.ADD;

  this.glow.alpha = 0.5;
  this.glow.tint = this.color;

  this.glow.min = this.game.rnd.realInRange(0.87, 0.92);
  this.glow.max = this.game.rnd.realInRange(0.98,1.02);
  this.glow.baseScale = this.game.rnd.realInRange(0.65, 0.9);
};

Food.prototype.setupBehavior = function(){
  var easing = _.sample(["Linear", Phaser.Easing.Quadratic.In, Phaser.Easing.Quadratic.Out]);
  var transition = _.sample([{angle: 360}, {angle: -360}]);
  var duration = _.random(4000, 10000);
  this.tween = this.game.add.tween(this).to( transition, duration , easing, true, 0, -1);
};

Food.prototype.updateLighting = function(){
  this.glow.x = this.x;
  this.glow.y = this.y;

  var size = this.game.rnd.realInRange(this.glow.min * this.glow.baseScale, this.glow.max * this.glow.baseScale);
  this.glow.scale.setTo(size, size);
};

module.exports = Food;
