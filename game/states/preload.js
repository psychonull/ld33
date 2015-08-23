
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('Food', 'assets/Food.png');
    this.load.image('Shark', 'assets/Shark.png');
    this.load.image('chain', 'assets/chain.png');
    this.load.image('water', 'assets/water.png');
    this.load.image('person', 'assets/person.jpg');
    this.load.image('tank1', 'assets/tank1.jpg');
    this.load.image('tank2', 'assets/tank2.jpg');
    this.load.image('tank3', 'assets/tank3.jpg');

    this.load.bitmapFont('ka', 'assets/fonts/ka.png', 'assets/fonts/ka.fnt');
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.fnt');
    this.load.audio('splash', 'assets/audio/soundEffects/splash.mp3');
    this.load.audio('theme', 'assets/audio/music/musicTheme.wav');
    this.load.audio('scream1', 'assets/audio/soundEffects/scream1.mp3');
    this.load.audio('scream2', 'assets/audio/soundEffects/scream2.mp3');
    this.load.audio('scream3', 'assets/audio/soundEffects/scream3.mp3');
    this.load.audio('roar', 'assets/audio/soundEffects/roar.mp3');
    this.load.audio('tankEated1', 'assets/audio/soundEffects/tankEated1.mp3');
    this.load.audio('tankEated2', 'assets/audio/soundEffects/tankEated2.mp3');
    this.load.audio('tankEated3', 'assets/audio/soundEffects/tankEated3.mp3');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
