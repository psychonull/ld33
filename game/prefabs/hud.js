'use strict';

var Bar = require('./ui/bar.js'),
  Cowntdown = require('./ui/cowntdown.js'),
  MuteButton = require('./ui/muteButton.js');

var _ = require('lodash');

var Hud = function(game) {
  Phaser.Group.call(this, game);

  this.bar = new Bar(this.game);
  this.bar.x = 380;
  this.bar.y = 558;
  this.game.add.existing(this.bar);

  this.add(this.bar);
  this.fixedToCamera = true;


  this.game.onSpeedChange.add(_.bind(function(val){
  	this.bar.setValue(val);
  }, this));

  this.timer = new Cowntdown(game, {
    value: 20000 * 1000
  });

  this.timer.x = 10;
  this.timer.y = 560;

  this.game.add.existing(this.timer);
  this.add(this.timer);

  this.timer.start();
  this.timer.expired.add(_.bind(function(){
    this.game.state.start('gameover');
  }, this));

  this.muteButton = new MuteButton(this.game, 200, 554);
  this.game.add.existing(this.muteButton);
  this.add(this.muteButton);
};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function() {
  this.timer.update();
};

Hud.prototype.setTimer = function(value) {
  this.timer.value += value * 1000;//this.timer.update();
};

module.exports = Hud;
