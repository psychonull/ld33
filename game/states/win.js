
'use strict';
function Win() {}

Win.prototype = {
  preload: function () {

  },
  create: function () {

    this.game.stage.backgroundColor = "#153030";

    this.congratsText = this.game.add.bitmapText(400, 200, 'p2', 'CONGRATS!', 32);
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.bitmapText(400, 300, 'p2', 'You are the coolest mutant caused by chemical waste ever!', 12);
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = Win;
