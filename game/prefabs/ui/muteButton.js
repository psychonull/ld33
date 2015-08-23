'use strict';

var MuteButton = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'volume', frame || 1);
  this.inputEnabled = true;
  this.events.onInputDown.add(this.toggleMute, this);
  this.loadFromLocalStorage();
};

MuteButton.prototype = Object.create(Phaser.Sprite.prototype);
MuteButton.prototype.constructor = MuteButton;

MuteButton.prototype.update = function() {
};

MuteButton.prototype.toggleMute = function(){
  this.game.sound.mute = !this.game.sound.mute;
  this.frame = this.game.sound.mute ? 2 : 1;
  window.localStorage.setItem('mute', this.game.sound.mute);
};

MuteButton.prototype.loadFromLocalStorage = function(){
  this.game.sound.mute = window.localStorage.getItem('mute') === 'true';
  this.frame = this.game.sound.mute ? 2 : 1;
};

module.exports = MuteButton;
