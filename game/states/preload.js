
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
    this.load.image('food', 'assets/food.png');
    this.load.spritesheet('monster', 'assets/monster.png', 200, 200, 4);
    this.load.image('water_blob', 'assets/water_blob.png');
    this.load.image('blurred-circle', 'assets/blurred-circle.png');
    this.load.image('clock-icon', 'assets/clock-icon.png');

    this.load.image('bg_sky', 'assets/sky.png');
    this.load.image('bg_water', 'assets/underwater.png');

    this.load.spritesheet('person', 'assets/guy.png', 100, 100, 6);
    this.load.image('bridge', 'assets/bridge.png');
    this.load.image('bubble', 'assets/bubble.jpg');

    this.load.image('outline-guy', 'assets/outline-guy.png');
    this.load.spritesheet('outline-monster', 'assets/outline-monster.png', 208, 200, 2);

    this.load.spritesheet('volume', 'assets/volume.png', 40, 35, 3);

    this.load.bitmapFont('ka', 'assets/fonts/ka.png', 'assets/fonts/ka.fnt');
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.fnt');
    this.load.bitmapFont('p2', 'assets/fonts/p2.png', 'assets/fonts/p2.fnt');

    this.load.audio('timer-beep', 'assets/audio/soundEffects/timer.wav');
    this.load.audio('select', 'assets/audio/soundEffects/select.wav');
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
