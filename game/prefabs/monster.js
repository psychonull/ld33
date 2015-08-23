'use strict';
 
var movement = 250;
var cursors;

var Monster = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'Shark', frame);
  
  this.inputEnabled = true;
  
  this.scale.x = 0.1;
  this.scale.y = 0.1;

  this.SPEED = 500;
  this.TURN_RATE = 100;

  
  this.game.physics.p2.enable(this, true);
  this.body.setCircle(20);
  this.anchor.set(0.7,0.5);

  
  //this.body.velocity.x = 35;
  //this.body.velocity.y = 35;
  //this.body.kinematic = true;
  cursors = this.game.input.keyboard.createCursorKeys();
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {
  //this.sprite.body.setZeroVelocity();
  if (this.position.y > 300)
    this.body.data.gravityScale = -0.2;
  else
    this.body.data.gravityScale = 1;

  if (cursors.left.isDown)
    {
      //this.body.angle -= 5;
      this.body.rotation -= 0.1;
      this.body.angularVelocity = 0;
      //this.body.rotateLeft(this.TURN_RATE);
      //this.body.moveLeft(movement);
    }
    else if (cursors.right.isDown)
    {
      this.body.rotation += 0.1;
      this.body.angularVelocity = 0;
      //this.body.angle += 5;
      //this.body.rotateRight(this.TURN_RATE);
      //this.body.moveRight(movement);
    }

  if (this.position.y > 300){
    

    if (cursors.up.isDown)
    {
      //this.body.thrust(400);
      //this.body.moveUp(movement);
    }
    else if (cursors.down.isDown)
    {
      //this.body.moveDown(movement);
    }
 
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
    }
  
};

module.exports = Monster;
