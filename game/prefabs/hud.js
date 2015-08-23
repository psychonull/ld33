'use strict';
var Bar = require('./ui/bar.js');
var _ = require('lodash');

var Hud = function(game) {
  Phaser.Group.call(this, game);

  this.bar = new Bar(this.game);
  this.bar.x = 300;
  this.bar.y = 10;
  this.game.add.existing(this.bar);

  this.add(this.bar);
  this.fixedToCamera = true;

  this.game.onSpeedChange.add(_.bind(function(val){
  	this.bar.setValue(val);
  }, this));
};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function() {
 
};

module.exports = Hud;
