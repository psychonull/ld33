'use strict';
 
var movement = 250;
var cursors;
var settings = require('../settings');

var Monster = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'Shark', frame);
  
  this.inputEnabled = true;

  this.scale.x = 0.1;
  this.scale.y = 0.1;

  this.swimming = true;
  this.back_landing = false;
  this.base_speed = 500;
  this.speed = this.base_speed;
  this.turn_rate = 0.1;
  this.fx = game.add.audio('splash', 10);

  game.time.events.loop(Phaser.Timer.SECOND * 0.5, this.updateVelocity.bind(this));

  //var stime = 1000;

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

  console.log(this.body.velocity);

  /*var dt = this.game.time.getElapsedTime();
  this.stime -= dt *1000;
  if(this.stime<=0){
    this.bla*();
    this.stime=1000;
  }*/
};

Monster.prototype.swim = function() {
  if (!this.swimming)
      this.dive();

  this.swimming = true;
  this.body.data.gravityScale = -0.1;

  if (!this.back_landing){
    this.body.velocity.x = Math.cos(this.rotation) * this.speed;
    this.body.velocity.y = Math.sin(this.rotation) * this.speed;
  }
};

Monster.prototype.fly = function() {
  this.swimming = false; 
  this.body.data.gravityScale = 1;
};

Monster.prototype.dive = function() {
  this.fx.play();
  if (this.angle < 0){
    this.back_landing = true
    this.speed = 0; 
  }
};

Monster.prototype.updateVelocity = function() {
  if (this.speed >= 100)
    this.back_landing = false;

  if (this.speed < this.base_speed)
    this.speed += 50;
  else
    this.speed -= 50;

  
};

module.exports = Monster;
