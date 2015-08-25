'use strict';

var movement = 250;
var cursors, aKey, dKey;
var settings = require('../settings');


var Monster = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'monster', frame);
  this.maxSpeed = settings.monster_max_speed;
  this.inputEnabled = true;

  this.scale.x = 0.4;
  this.scale.y = 0.4;

  this.swimming = false;
  this.back_landing = false;
  this.base_speed = settings.monster_base_speed;
  this.speed = this.base_speed;
  this.turn_rate = 0.1;
  this.diveFX = game.add.audio('splash', 5);
  this.jumpFX = game.add.audio('roar', 2);

  game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.updateVelocity.bind(this));


  this.game.physics.p2.enable(this, false);
  this.physicShape = this.body.setCircle(28);

  this.anchor.set(0.7,0.5);

  this.emitter = this.game.add.emitter(x, y, 300);
  this.emitter.makeParticles('bubble');
  this.emitter.setRotation(0, 0);
  this.emitter.setAlpha(1, 0, 3000);
  this.emitter.setScale(0.8, 0, 0.8, 0, 3000);
  this.emitter.gravity = -10;
  this.emitter.start(false, 5000, 100);


  cursors = this.game.input.keyboard.createCursorKeys();
  aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

  this.animations.add('move', [0, 1, 2, 3]);
  this.animations.play('move', 10, true);
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {

    this.emitter.emitX = this.x;
    this.emitter.emitY = this.y;

  if (this.position.y > settings.water_level){
	this.emitter.on = true;
    this.swim();
  }
  else{
	this.emitter.on = false;
    this.fly();
  }

  if (cursors.left.isDown || aKey.isDown)
  {
    this.body.rotation -= this.turn_rate;
    this.body.angularVelocity = 0;
  }
  else if (cursors.right.isDown || dKey.isDown)
  {
    this.body.rotation += this.turn_rate;
    this.body.angularVelocity = 0;
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
  if (this.speed >= 600)
    this.jumpFX.play();
};

Monster.prototype.increaseSize = function() {
  this.scale.x += settings.growth_scale;
  this.scale.y += settings.growth_scale;

  this.physicShape.radius += settings.growth_scale * 3;
  this.game.stats.weight = this.scale.y;

  if(this.game.stats.weight > 2.5){
    this.game.onWin.dispatch();
  }

};

Monster.prototype.setSpeed = function(value) {
  if(!(this.speed > this.maxSpeed))
    this.speed += value;
};

module.exports = Monster;
