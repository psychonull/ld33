'use strict';
 
var movement = 250;
var cursors;


var Monster = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'Shark', frame);
  
  this.inputEnabled = true;

  this.scale.x = 0.1;
  this.scale.y = 0.1;

  this.swimming = true;
  this.speed = 500;
  this.turn_rate = 0.1;
  this.fx = game.add.audio('splash');
  
  this.game.physics.p2.enable(this, true);
  this.body.setCircle(20);
  this.anchor.set(0.7,0.5);
  
  cursors = this.game.input.keyboard.createCursorKeys();
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {  
  if (this.position.y > 300){
    this.swim();
  }
  else{
    this.fly();
  }

  if (cursors.left.isDown)
    {
      this.body.rotation -= this.turn_rate;
      this.body.angularVelocity = 0;
    }
    else if (cursors.right.isDown)
    {
      this.body.rotation += this.turn_rate;
      this.body.angularVelocity = 0;
    }  
};

Monster.prototype.swim = function() {
  if (!this.swimming)
      this.dive();

  this.swimming = true;
  this.body.data.gravityScale = -0.2;
  this.body.velocity.x = Math.cos(this.rotation) * this.speed;
  this.body.velocity.y = Math.sin(this.rotation) * this.speed;
};

Monster.prototype.fly = function() {
  this.swimming = false; 
  this.body.data.gravityScale = 1;
};

Monster.prototype.dive = function() {
  this.fx.play();
};

module.exports = Monster;
