
'use strict';

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.stage.backgroundColor = "#153030";

    this.titleText =  this.game.add.bitmapText(this.game.world.centerX, 300, 'ka', 'WASTE MADNESS', 64);
    this.titleText.tint = 0x34f3ff;
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText =  this.game.add.bitmapText(this.game.world.centerX, 400, 'p2', '<<Press any key to continue>>', 22);
    this.instructionsText.tint = 0x34f3ff;
    this.instructionsText.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
