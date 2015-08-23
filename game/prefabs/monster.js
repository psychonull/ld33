'use strict';
 
var movement = 250;
var cursors;
var settings = require('../settings');


var Monster = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'Shark', frame);
  this.maxSpeed = 1000;
  this.inputEnabled = true;

  this.scale.x = 0.1;
  this.scale.y = 0.1;

  this.swimming = false;
  this.back_landing = false;
  this.base_speed = 300;
  this.speed = this.base_speed;
  this.turn_rate = 0.1;
  this.diveFX = game.add.audio('splash', 10);
  this.jumpFX = game.add.audio('roar', 15);

  game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.updateVelocity.bind(this));  

  this.game.physics.p2.enable(this, true);
  this.body.setCircle(20);
  this.anchor.set(0.7,0.5);

  cursors = this.game.input.keyboard.createCursorKeys(); 
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {  

  if (this.position.y > settings.water_level){
    this.swim();
  }
  else{
    this.fly();
  }

  if (cursors.left.isDown)
  {
    this.body.rotation -= this.turn_rate;
    this.body.angularVelocity = 0;
    //this.back_landing = false;
  }
  else if (cursors.right.isDown)
  {
    this.body.rotation += this.turn_rate;
    this.body.angularVelocity = 0;
    //this.back_landing = false;
  }
};

Monster.prototype.swim = function() {
  if (!this.swimming)
      this.dive();

  this.swimming = true;
  this.body.data.gravityScale = -0.5;

  if (!this.back_landing){
    this.body.velocity.x = Math.cos(this.rotation) * this.speed;
    this.body.velocity.y = Math.sin(this.rotation) * this.speed;
  }
  console.log(this.body.velocity.y);
};

Monster.prototype.updateVelocity = function() {
  if (this.speed >= 0)
    this.back_landing = false;

  if (this.speed < this.base_speed)
    this.speed += 10;
  else
    this.speed -= 5;
};

Monster.prototype.fly = function() {
  if (this.swimming) 
	  this.jump();
  
  this.swimming = false; 
  this.body.data.gravityScale = 1;
};

Monster.prototype.dive = function() {
  this.diveFX.play();
  if (this.angle < 0){
    this.back_landing = true;
    this.speed = 0;    
  }
};

Monster.prototype.updateVelocity = function() {
  if (this.speed >= 100)
    this.back_landing = false;

  if (this.speed < this.base_speed)
    this.speed += 10;
  else
    this.speed -= 5;

  this.game.onSpeedChange.dispatch(this.speed/this.maxSpeed);
};

Monster.prototype.jump = function() {
  this.jumpFX.play();
};

module.exports = Monster;
