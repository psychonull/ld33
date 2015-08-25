'use strict';
var _ = require('lodash');

module.exports = function(bitmapFont, callback, context){

  var sound = bitmapFont.game.add.audio('select', 0.7);
  sound.play();
  var tween = bitmapFont.game.add.tween(bitmapFont).to({tint: 0xFF0000 }, 300, Phaser.Easing.Elastic.InOut, true);
  tween.onComplete.add(callback, context);
  //callback.call(context || this);
};
