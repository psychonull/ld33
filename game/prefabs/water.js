'use strict';

var settings = require('../settings');

var Water = function(game, monsterGroup, waterGroup) {
  Phaser.Group.call(this, game);

  var maxWidth = settings.worldSize.width;

  var lastRect;
  var height = 10;        //  Height for the physics body - your image height is 8px
  var width = 10;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
  var maxForce = 20000;   //  The force that holds the rectangles together.
  var newRect;

  var length = Math.floor(maxWidth/width),
    xAnchor = 0, yAnchor = 550;

  for (var j = 0; j <= 1; j++) {
    for (var i = 0; i <= length; i++) {
      var x = xAnchor + (i * width);
      var y = yAnchor + (j*10);

      newRect = game.add.sprite(x, y, 'chain', 0);

      game.physics.p2.enable(newRect, false);
      newRect.body.setRectangle(width, height);

      if (i === 0 || i === length || i % 5 === 0) {
        newRect.body.static = true;
      }
      else {
        //newRect.body.velocity.y = game.physics.p2.gravity.y*-1;
        newRect.body.mass = 0.00001; //length;// / i;
        newRect.body.collides([this, monsterGroup]);
        newRect.body.setCollisionGroup(waterGroup);
      }

      if (lastRect) {
        var constraint = game.physics.p2.createRevoluteConstraint(newRect, [0, height/2], lastRect, [width, height/2], maxForce);
        constraint.collideConnected = false;
      }

      lastRect = newRect;
    }
  }

  this.water = this.game.add.sprite(0, 550, 'water');

};

Water.prototype = Object.create(Phaser.Group.prototype);
Water.prototype.constructor = Water;

Water.prototype.update = function() {

};

module.exports = Water;
