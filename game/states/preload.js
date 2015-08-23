
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

    this.load.bitmapFont('ka', 'assets/fonts/ka.png', 'assets/fonts/ka.fnt');
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.fnt');
    this.load.audio('splash', 'assets/audio/SoundEffects/splash.mp3');
    this.load.audio('theme', 'assets/audio/Music/MusicTheme.wav');

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
