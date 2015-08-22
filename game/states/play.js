
  'use strict';
  function Play() {}


  var Monster = require('../prefabs/monster');


  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = "#000000";
      this.game.physics.startSystem(Phaser.Physics.P2JS);

      this.monster = new Monster(this.game, 200, 200);
      this.game.add.existing(this.monster);
      this.game.physics.p2.defaultRestitution = 0.8;
    },
    update: function() {
      
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
