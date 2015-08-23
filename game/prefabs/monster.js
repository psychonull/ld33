'use strict';
 
var movement = 250;
var cursors;


var Monster = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'Shark', frame);
  
  this.inputEnabled = true;

  this.scale.x = 0.1;
  this.scale.y = 0.1;
  this.swimming = true;
  this.SPEED = 500;
  this.TURN_RATE = 100;
  this.fx = game.add.audio('splash');
  
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
  if (this.position.y > 300){
    this.body.data.gravityScale = -0.2;
    if (!this.swimming){
    	this.fx.play();
    	this.swimming = true;
    }
  }
  else{
	this.swimming = false;
    this.body.data.gravityScale = 1;
  }

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
  

   /*var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.game.input.activePointer.x, this.game.input.activePointer.y
    );

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation; 

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            this.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }*/

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
    }    


    //this.body.width = this.getBounds().width;
    //this.body.height = this.getBounds().height;
  
};

module.exports = Monster;
