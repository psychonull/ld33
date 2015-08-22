
  'use strict';
  var Food = require('../prefabs/Food');
  function Play() {}

  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = "#000000";
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.defaultRestitution = 0.8;

      var food = new Food(this.game, 100, 300);
      this.game.add.existing(food);
      
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
