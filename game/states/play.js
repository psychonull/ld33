
  'use strict';

  var Hud = require('../prefabs/hud.js');

  function Play() {}


  var Monster = require('../prefabs/monster');


  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = "#CCCCCC";
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.gravity.y = 200;

      this.monster = new Monster(this.game, 200, 200);
      this.game.add.existing(this.monster);
      this.game.physics.p2.defaultRestitution = 0.8;

      this.hud = new Hud(this.game);
      this.game.add.existing(this.hud);
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
