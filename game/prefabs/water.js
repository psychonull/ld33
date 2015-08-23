'use strict';

var settings = require('../settings');

var Water = function(game, monsterGroup, waterGroup) {
  Phaser.Group.call(this, game);

  var maxWidth = settings.worldSize.width;

  var lastRect;
  var lines = 1;
  var height = 20;
  var width = 30;
  var maxForce = 20000;
  var newRect;

  var length = Math.floor(maxWidth/width),
    xAnchor = 0, yAnchor = settings.water_level;

  for (var j = 0; j < lines; j++) {
    for (var i = 0; i <= length; i++) {
      var x = xAnchor + (i * width);
      var y = yAnchor + (j*10);

      newRect = game.add.sprite(x, y, 'water_blob', 0);

      game.physics.p2.enable(newRect, false);
      newRect.body.setRectangle(width, height);

      if (i === 0 || i === length || i % 5 === 0) {
        newRect.body.static = true;
      }
      else {
        newRect.body.mass = 0.00001;
        newRect.body.collides([this, monsterGroup]);
        newRect.body.setCollisionGroup(waterGroup);
      }

      if (lastRect) {
        var constraint = game.physics.p2.createRevoluteConstraint(
          newRect, [-width/2, height/2],
          lastRect, [width/3, height/2],
          maxForce);

        constraint.collideConnected = false;
      }

      lastRect = newRect;
    }
  }

  //this.water = this.game.add.sprite(xAnchor, yAnchor, 'water');

};

Water.prototype = Object.create(Phaser.Group.prototype);
Water.prototype.constructor = Water;

Water.prototype.update = function() {

};

Water.prototype.splash = function(waterHit){
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  var emitter = this.game.add.emitter(waterHit.x, waterHit.y);
  emitter.bounce.setTo(0.5, 0.5);
  emitter.setXSpeed(-100, 100);
  emitter.setYSpeed(50, -100);
  emitter.makeParticles('water', 0, 250, 1, true);
};

module.exports = Water;
