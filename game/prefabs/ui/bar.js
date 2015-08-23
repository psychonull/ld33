'use strict';
var _ = require('lodash');

var Bar = function(game, options) {
  Phaser.Group.call(this, game);

  this.config = _.defaults(options || {}, {
    value: 1,
    width: 300, //bar width
    height: 30, //bar height
    leftMargin: 100, //space reserved for caption (?)
    innerColor: "#F79000",
    outerColor: "#A6947B",
    caption: 'SPEED'
  });

  this.value = this.config.value;

  var outerBmd = this.game.add.bitmapData(this.config.width, this.config.height);
	outerBmd.ctx.beginPath();
	outerBmd.ctx.rect(0, 0, this.config.width, this.config.height);
	outerBmd.ctx.fillStyle = this.config.outerColor;
	outerBmd.ctx.fill();

  this.outer = this.game.add.sprite(this.config.leftMargin, 0, outerBmd);
  this.add(this.outer);

  var innerBmd = this.game.add.bitmapData(this.config.width, this.config.height);
  innerBmd.ctx.beginPath();
	innerBmd.ctx.rect(0, 0, this.config.width, this.config.height);
	innerBmd.ctx.fillStyle = this.config.innerColor;
	innerBmd.ctx.fill();

  this.innerWidth = new Phaser.Rectangle(0, 0, innerBmd.width, innerBmd.height);
  this.totalLife = innerBmd.width;

  this.inner = this.game.add.sprite(this.config.leftMargin, 0, innerBmd);
  this.inner.cropEnabled = true;
  this.inner.crop(this.innerWidth);
  this.add(this.inner);

  this.caption =  this.game.add.bitmapText(0, 0, 'arcade', this.config.caption, 30);
  this.caption.tint = 0xFFFFFF;
  this.add(this.caption);

};

Bar.prototype = Object.create(Phaser.Group.prototype);
Bar.prototype.constructor = Bar;

Bar.prototype.update = function() {
  // only executed if added to the game, not the hud group?
};

// value between 0 and 1
Bar.prototype.setValue = function(value){
  this.value = this.game.math.clamp(value, 0, 1);
  this.innerWidth.width = this.totalLife * value;
  this.inner.updateCrop();
};

module.exports = Bar;
