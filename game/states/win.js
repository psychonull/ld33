
'use strict';
function Win() {}

Win.prototype = {
  preload: function () {

  },
  create: function () {
    this.titleText = this.game.add.bitmapText(400,100, 'p2', 'Game Over!', 42);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.bitmapText(400, 200, 'p2', 'You Win!', 32);
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.bitmapText(400, 300, 'p2', 'Click To Play Again', 16);
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = Win;
