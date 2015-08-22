
  'use strict';
  function Play() {}


  var Monster = require('../prefabs/monster');


  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      //this.game.physics.p2.defaultRestitution = 0.8;
      this.monster = new Monster(this.game, 200, 200);
      this.game.add.existing(this.monster);

      //this.monster.body.setZeroDamping();
      //this.monster.body.fixedRotation = true;

    },
    update: function() {
      
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;