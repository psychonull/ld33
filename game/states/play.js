
  'use strict';
  function Play() {}

  var cursors;
  var movement = 75;

  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = "#000000";
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.defaultRestitution = 0.8;
      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
      this.sprite.inputEnabled = true;

      this.game.physics.p2.enable(this.sprite);

      this.sprite.body.setZeroDamping();
      this.sprite.body.fixedRotation = true;
      this.sprite.body.velocity.x = 35;
      this.sprite.body.velocity.y = 35;

      cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function() {
      //this.sprite.body.setZeroVelocity();
      if (cursors.left.isDown)
      {
        this.sprite.body.moveLeft(movement);
      }
      else if (cursors.right.isDown)
      {
        this.sprite.body.moveRight(movement);
      }

      if (cursors.up.isDown)
      {
        this.sprite.body.moveUp(movement);
      }
      else if (cursors.down.isDown)
      {
        this.sprite.body.moveDown(movement);
      }
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
