'use strict';
var _ = require('lodash');

var Cowntdown = function(game, options) {

  this.config = _.defaults(options || {}, {
    x: 0,
    y: 0,
    font: 'p2',
    size: 22,
    value: 0, // time to cowntdown from (ms)
    callback: null,
    alertThreshold: 10 * 1000,
    tint: 0xFFFFFF,
    alertTint: 0xFA023C
  });
  //
  // Phaser.BitmapText.call(this, game, this.config.x, this.config.y, this.config.font, '', this.config.size);
  // Not working!?
  //workaround:
  Phaser.Group.call(this, game);

  this.text = this.game.add.bitmapText(this.config.x, this.config.y, this.config.font, '', this.config.size);
  this.add(this.text);

  this.value = this.config.value;

  this.expired = new Phaser.Signal();
  this.updated = new Phaser.Signal();

  this._timeStarted = null;

  if(this.config.callback){
    this.expired.add(this.config.callback);
  }
};

Cowntdown.prototype = Object.create(Phaser.Group.prototype);
Cowntdown.prototype.constructor = Cowntdown;

Cowntdown.prototype.update = function() {
  if(this._timeStarted){
    var remaining = this.value - (this.game.time.time - this._timeStarted);
    if (remaining <= 0){
      remaining = 0;
      this.stop();
      this.expired.dispatch();
    }
    else {
      this.updated.dispatch({
        value: remaining,
        valueText: this.formatTime(remaining)
      });
      if(remaining < this.config.alertThreshold){
        this.text.tint = this.config.alertTint;
        this.text.x = this.config.x + this.game.rnd.integerInRange(-3,3);
        this.text.y = this.config.y + this.game.rnd.integerInRange(-3,3);
      }
      else {
        this.text.tint = this.config.tint;
      }
    }

    this.text.setText(this.formatTime(remaining));
  }
};

Cowntdown.prototype.start = function(value) {
  if(value){
    this.value = value;
  }
  this._timeStarted = this.game.time.time;
};

Cowntdown.prototype.stop = function(){
  this._timeStarted = null;
};

Cowntdown.prototype.pause = function(){
  this.value = this.value - (this.game.time.time - this._timeStarted);
  this._timeStarted = null;
};

Cowntdown.prototype.formatTime = function(ms){
  var mins = Math.floor((ms % 36e5) / 6e4);

  var seconds = Math.floor(ms / 1000) % 60;
  var milliseconds = Math.floor(ms) % 1000;

  if (milliseconds < 10){
      milliseconds = '00' + milliseconds;
  }
  else if (milliseconds < 100){
    milliseconds = '0' + milliseconds;
  }
  if (seconds < 10)
      seconds = '0' + seconds;
  if(mins == 0){
    mins = '0';
  }
  return mins + ':' + seconds + '.' + milliseconds;
};

module.exports = Cowntdown;
