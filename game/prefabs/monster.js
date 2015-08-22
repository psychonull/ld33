'use strict';
 
var movement = 205;
var cursors;

var Monster = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'yeoman', frame);
  
  this.inputEnabled = true;
  
  this.scale.x = 0.2;
  this.scale.y = 0.2;
  
  this.game.physics.p2.enable(this);
  //this.body.velocity.x = 35;
  //this.body.velocity.y = 35;
  cursors = this.game.input.keyboard.createCursorKeys();
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {
  //this.sprite.body.setZeroVelocity();
  if (this.position.y > 300)
    this.body.data.gravityScale = 0.25;
  else
    this.body.data.gravityScale = 1;
  
  if (this.position.y > 300){
    if (cursors.left.isDown)
    {
      this.body.moveLeft(movement);
    }
    else if (cursors.right.isDown)
    {
      this.body.moveRight(movement);
    }

    if (cursors.up.isDown)
    {
      this.body.moveUp(movement);
    }
    else if (cursors.down.isDown)
    {
      this.body.moveDown(movement);
    }
  }
  
};

module.exports = Monster;
