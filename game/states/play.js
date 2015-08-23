
  'use strict';

  var Hud = require('../prefabs/hud.js');

  function Play() {}


  var Monster = require('../prefabs/monster');

  var graphics;

  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = "#CCCCCC";
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      //this.game.physics.p2.gravity.y = 250;
      this.game.physics.p2.restitution = 0.9;

      graphics = this.game.add.graphics(0, 0);
      graphics.lineStyle(10, 0x33FF00);
      graphics.moveTo(0,300);
      graphics.lineTo(800, 300);

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
