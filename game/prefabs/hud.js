'use strict';
var Bar = require('./ui/bar.js');
var Cowntdown = require('./ui/cowntdown.js');
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

  this.timer = new Cowntdown(game, {
    value: 20 * 1000
  });

  this.game.add.existing(this.timer);
  this.add(this.timer);

  this.timer.start();
  this.timer.expired.add(_.bind(function(){
    this.game.state.start('gameover');
  }, this));

};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function() {
  this.timer.update();
};

module.exports = Hud;
