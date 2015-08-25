'use strict';
var _ = require('lodash');
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

  this.screamFX1 = game.add.audio('scream1', 2);
  this.screamFX2 = game.add.audio('scream2', 2);
  this.screamFX3 = game.add.audio('scream3', 2);

  this.body.setZeroDamping();
  this.body.fixedRotation = true;
  if(!this.game.brokenBridge){
    this.body.velocity.y = 0;
    this.body.mass = 2;
  }
  else{
    this.body.gravity = 10;
    this.body.mass = 80;
  }



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
  this.animations.add('swim', [1]);
  this.animations.play('walk', 10, true);

  this.swimming = false;
  this.touchedWater = false;
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
	if(this.game.brokenBridge){
    return this.updateBrokenBridge();
  }
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

Person.prototype.updateBrokenBridge = function(){
  this.scale.set(0.5*this.dir, 0.5);
  // HACK: LOL IDK what im doing
  if (this.position.y > settings.water_level){
    if(this.swimming){
      this.animations.play('swim', 40, true);
      this.body.data.gravityScale = -0.5;
      this.body.velocity.x = this.dir* _.random(10, 50);
      return;
    }
    else { // dive
      //this.body.data.gravityScale = -1;
      this.touchedWater = true;
      this.swimming = true;
      return;
    }
  }
  else{
    if(this.swimming){ //emerge
      // this.body.data.gravityScale = -10;
      // this.body.force.y = -3000;
      this.body.velocity.y = _.random(-10, 0);
      this.swimming = false;
      return;
    }
    else {
      if(!this.touchedWater){
        this.body.velocity.x = this.dir*_.random(150, 350);
      }
      this.body.data.gravityScale = 0.5;
    }

  }
};

module.exports = Person;
