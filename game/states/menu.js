
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.stage.backgroundColor = "#A6947B";

    this.titleText =  this.game.add.bitmapText(this.game.world.centerX, 300, 'ka', 'MONSTER MADNESS', 64);
    this.titleText.tint = 0x4D0C15;
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText =  this.game.add.bitmapText(this.game.world.centerX, 400, 'arcade', 'Press enter to start!', 48);
    this.instructionsText.tint = 0x4D0C15;
    this.instructionsText.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
