  'use strict';

  var Monster = require('../prefabs/monster');

  function Play() {
    this.worldSize = {
      width: 1920,
      height: 1920
    };
  }

  Play.prototype = {
    create: function() {
      var game = this.game;

      game.add.tileSprite(0, 0, this.worldSize.width, this.worldSize.height, 'background');
      game.world.setBounds(0, 0, this.worldSize.width, this.worldSize.height);

      game.physics.startSystem(Phaser.Physics.P2JS);

      this.monster = new Monster(game, game.world.centerX, game.world.centerY);
      game.add.existing(this.monster);

      game.physics.p2.defaultRestitution = 0.8;

      this.monster.scale.x = this.monster.scale.y = 0.2;

      game.camera.follow(this.monster);
      //game.camera.deadzone = new Phaser.Rectangle(10, 10, 20, 20);
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
