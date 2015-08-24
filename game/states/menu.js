
'use strict';
var _ = require('lodash');

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

    this.instructionsSeen = parseInt(window.localStorage.getItem('instructionsSeen') || 0,10);
    if(this.instructionsSeen > 0){
      this.instructionsText =  this.game.add.bitmapText(this.game.world.centerX, 560, 'p2', 'Press <h> for help', 12);
      this.instructionsText.tint = 0x34f3ff;
    }

    this.game.input.keyboard.onDownCallback = _.bind(this.passToNextState, this);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.passToNextState();
    }
  },
  passToNextState: function(e){
    this.game.input.keyboard.onDownCallback = function(){};
    if(this.instructionsSeen === 0){
      this.game.state.start('instructions');
    }
    else {
      if(e && e.keyCode === 72){
        this.game.state.start('instructions');
      }
      else {
        this.game.state.start('play');
      }
    }
  }
};

module.exports = Menu;
