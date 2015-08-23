'use strict';
var Bar = require('./ui/bar.js');

var Hud = function(game) {
  Phaser.Group.call(this, game);

  this.bar = new Bar(this.game);
  this.bar.x = 300;
  this.bar.y = 0;
  this.game.add.existing(this.bar);
  this.add(this.bar);
};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function() {
  this.bar.setValue(this.bar.value - 0.001);
};

module.exports = Hud;
