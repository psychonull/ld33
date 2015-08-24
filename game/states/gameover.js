
'use strict';
var _ = require('lodash');

var INITIAL_WEIGHT = 220;
var MONSTER_OUTLINE_INITIAL_SCALE = 0.4;
var FINAL_FORM_WEIGHT = INITIAL_WEIGHT * (1 + 1.8 - MONSTER_OUTLINE_INITIAL_SCALE)

function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {

    this.stats = {
      peopleEaten: 0,
      foodEaten: 0,
      weight: 0
    };

    this.animatedLoss = false;
    this.isLossAnimationRunning = false;

    this.game.stage.backgroundColor = "#153030";

    this.titleText = this.game.add.bitmapText(400,100, 'p2', 'Game Over!', 42);
    this.titleText.anchor.setTo(0.5, 0.5);

    // this.congratsText = this.game.add.bitmapText(400, 200, 'p2', 'You Lose', 32);
    // this.congratsText.anchor.setTo(0.5, 0.5);
    var BOTTOM_LINE_Y = 400;
    var graphics = this.game.add.graphics(0, 0);

    graphics.beginFill(0x304545);
    graphics.lineStyle(3, 0x304545, 1);

    graphics.moveTo(50,BOTTOM_LINE_Y);
    graphics.lineTo(750, BOTTOM_LINE_Y);
    graphics.endFill();

    this.guyOutline = this.game.add.sprite(100, BOTTOM_LINE_Y, 'outline-guy');
    this.guyOutline.scale.set(0.5);
    this.guyOutline.anchor.setTo(0, 1);

    this.monsterOutline = this.game.add.sprite(200, BOTTOM_LINE_Y, 'outline-monster', 0);
    this.monsterOutline.scale.set(MONSTER_OUTLINE_INITIAL_SCALE);
    this.monsterOutline.anchor.setTo(0, 1);

    var STATS_BASE_Y = 200, STATS_BASE_X = 500;

    this.massText = this.game.add.bitmapText(STATS_BASE_X, STATS_BASE_Y, 'p2', 'FINAL MASS:', 16);
    this.massText.tint = 0xffffff;
    this.massValueText = this.game.add.bitmapText(STATS_BASE_X + 20, STATS_BASE_Y + 30, 'p2', '', 16);
    this.massValueText.tint = 0xffffff;

    this.eatenText = this.game.add.bitmapText(STATS_BASE_X, STATS_BASE_Y + 60, 'p2', 'PEOPLE EATEN:', 16);
    this.eatenText.tint = 0xffffff;
    this.eatenValueText = this.game.add.bitmapText(STATS_BASE_X + 20, STATS_BASE_Y + 60 + 30, 'p2', '', 16);
    this.eatenValueText.tint = 0xffffff;

    this.eatenFoodText = this.game.add.bitmapText(STATS_BASE_X, STATS_BASE_Y + 120, 'p2', 'WASTE EATEN:', 16);
    this.eatenFoodText.tint = 0xffffff;
    this.eatenFoodValueText = this.game.add.bitmapText(STATS_BASE_X + 20, STATS_BASE_Y + 120 + 30, 'p2', '', 16);
    this.eatenFoodValueText.tint = 0xffffff;

    this.youNeedText = this.game.add.bitmapText(this.game.world.centerX, BOTTOM_LINE_Y + 30, 'p2', 'This is not even your final form', 16);
    this.youNeedText.anchor.setTo(0.5, 0.5);
    this.youNeedText.tint = 0xffffff;
    this.youNeedValueText = this.game.add.bitmapText(this.game.world.centerX, BOTTOM_LINE_Y + 50, 'p2', '(Final form: ' + FINAL_FORM_WEIGHT + ' lbs aprox.)', 14);
    this.youNeedValueText.anchor.setTo(0.5, 0.5);
    this.youNeedValueText.tint = 0x304545;

    this.instructionText = this.game.add.bitmapText(this.game.world.centerX, 560, 'p2', '<<Press any key to try again>>', 16);
    this.instructionText.tint = 0x34f3ff;
    this.instructionText.anchor.setTo(0.5, 0.5);
    this.instructionText.visible = false;

    this.game.input.keyboard.onDownCallback = _.bind(this.toNextSubState, this);

    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.startAnimations, this);
  },
  update: function () {
    if(this.isLossAnimationRunning){
      if(this.stats.weight){
        this.massValueText.text = (INITIAL_WEIGHT * (1 + this.stats.weight - MONSTER_OUTLINE_INITIAL_SCALE)).toFixed(2) + ' lbs';
      }
      else {
        this.massValueText.text = (INITIAL_WEIGHT).toFixed(2) + ' lbs';
      }
      this.eatenValueText.text = Math.floor(this.stats.peopleEaten);
      this.eatenFoodValueText.text = Math.floor(this.stats.foodEaten);
    }
    if(this.game.input.activePointer.justPressed()) {
      this.toNextSubState();
    }
  },
  startAnimations: function(){
    this.isLossAnimationRunning = true;
    if(this.game.stats){
      this.scaleTween = this.game.add.tween(this.monsterOutline.scale).to({x: this.game.stats.weight || MONSTER_OUTLINE_INITIAL_SCALE, y: this.game.stats.weight || MONSTER_OUTLINE_INITIAL_SCALE}, 2000 , Phaser.Easing.Cubic.Out, true);
    }
    //this.scaleTween.onComplete.add(this.onAnimationsEnd, this);

    this.statsTween = this.game.add.tween(this.stats)
      .from({
        peopleEaten: 0,
        foodEaten: 0,
        weight: 0
      })
      .to(this.game.stats || this.stats, 1500 ,  Phaser.Easing.Exponential.Out, true);
    this.statsTween.onComplete.add(function(){
      this.game.add.tween(this.massValueText.scale).to({x:1.5, y:1.5}, 300,  Phaser.Easing.Elastic.InOut, true);
      this.game.add.tween(this.eatenValueText.scale).to({x:1.5, y:1.5}, 300, Phaser.Easing.Elastic.InOut, true);
      this.game.add.tween(this.eatenFoodValueText.scale).to({x:1.5, y:1.5}, 300, Phaser.Easing.Elastic.InOut, true);
      this.onAnimationsEnd();
    }, this);

  },
  onAnimationsEnd: function(){
    this.animatedLoss = true;
    this.instructionText.visible = true;
  },
  toNextSubState: function(){
    if(this.animatedLoss){
      this.game.input.keyboard.onDownCallback = _.noop;
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;
