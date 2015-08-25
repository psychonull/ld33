
'use strict';
var _ = require('lodash');
var select = require('../prefabs/ui/selectEffect.js');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.game.stage.backgroundColor = "#153030";

    this.titleText =  this.game.add.bitmapText(this.game.world.centerX, 300, 'ka', 'WASTED WATERS', 64);
    this.titleText.tint = 0x34f3ff;
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText =  this.game.add.bitmapText(this.game.world.centerX, 400, 'p2', '<<Press any key to continue>>', 22);
    this.instructionsText.tint = 0x34f3ff;
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.instructionsSeen = parseInt(window.localStorage.getItem('instructionsSeen') || 0,10);
    if(this.instructionsSeen > 0){
      this.helpText =  this.game.add.bitmapText(this.game.world.centerX, 560, 'p2', 'Press <h> for help', 12);
      this.helpText.tint = 0x34f3ff;
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
        select(this.helpText, function(){
          this.game.state.start('instructions');
        }, this);
      }
      else {
        select(this.instructionsText, function(){
          this.game.state.start('play');
        }, this);
      }
    }
  }
};

module.exports = Menu;
