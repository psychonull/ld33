
'use strict';
var select = require('../prefabs/ui/selectEffect.js');
var _ = require('lodash');

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.game.stage.backgroundColor = "#153030";

    this.controlsTitle =  this.game.add.bitmapText(35, 80 + 40, 'p2', 'CONTROLS:', 22);

    this.controlsLeftText =  this.game.add.bitmapText(50, 120 + 40, 'p2', '<LEFT ARROW> , <A>: Turn left', 18);
    this.controlsRightText =  this.game.add.bitmapText(50, 150 + 40, 'p2', '<RIGHT ARROW>, <D>: Turn right', 18);

    this.objectiveTitle =  this.game.add.bitmapText(35, 190 + 40, 'p2', 'OBJECTIVE:', 22);
    var obj = [
      'Become the greatest mutant ever by eating',
      'everybody that tries to cross that bridge.'
    ];
    this.objectiveBody =  this.game.add.bitmapText(50, 230 + 40, 'p2', obj.join('\n'), 15);

    this.hintsTitle =  this.game.add.bitmapText(35, 350 + 40 - 20, 'p2', 'HINTS:', 22);
    this.hint1 = this.game.add.bitmapText(35, 390 + 40 - 20, 'p2', "* You need to be raged to get to kill people", 15);
    this.hint2 = this.game.add.bitmapText(35, 420 + 40 - 20, 'p2', "* Every piece of waste counts towards your rage", 15);
    this.hint3 = this.game.add.bitmapText(35, 450 + 40 - 20, 'p2', "* People move in predictable ways", 18);

    this.instructionsText =  this.game.add.bitmapText(80, 550, 'p2', '<<Press any key to continue>>', 22);
    this.instructionsText.tint = 0xccccc;

    this.game.input.keyboard.onDownCallback = _.bind(this.continue, this);

    var instructionsSeen = parseInt(window.localStorage.getItem('instructionsSeen') || 0,10);
    window.localStorage.setItem('instructionsSeen', instructionsSeen + 1);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.continue();
    }
  },
  continue: function() {
    select(this.instructionsText, function(){
      this.game.input.keyboard.onDownCallback = function(){};
      this.game.state.start('play');
    }, this);
  }
};

module.exports = Menu;
