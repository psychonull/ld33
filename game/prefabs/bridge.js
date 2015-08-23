'use strict';
var settings = require('../settings');

var Bridge = function(game, monsterGroup, personGroup, bridgeGroup) {
	  Phaser.Group.call(this, game);

	  var maxWidth = settings.worldSize.width;

	  var lastRect;
	  var lines = 1;
	  var height = 20;        //  Height for the physics body - your image height is 8px
	  var width = 90;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
	  var maxForce = 20000;   //  The force that holds the rectangles together.
	  var newRect;

	  var length = Math.floor(maxWidth/width),
	    xAnchor = 0, yAnchor = 370;

	  for (var j = 0; j < lines; j++) {
	    for (var i = 0; i <= length; i++) {
	      var x = xAnchor + (i * width);
	      var y = yAnchor + (j*10);

	      newRect = game.add.sprite(x, y, 'bridge', 0);

	      game.physics.p2.enable(newRect, false);
	      newRect.body.setRectangle(width, height);

	      if (i === 0 || i === length) {
	        newRect.body.static = true;
	      }
	      else {
	        //newRect.body.velocity.y = game.physics.p2.gravity.y*-1;
	        newRect.body.mass = 1; //length;// / i;
	        //newRect.body.collides([this, monsterGroup]);
	        newRect.body.collides([this, personGroup]);
	        newRect.body.setCollisionGroup(bridgeGroup);
	      }

	      if (lastRect) {
	        var constraint = game.physics.p2.createRevoluteConstraint(
	          newRect, [-width/2, height/2],
	          lastRect, [width/2, height/2],
	          maxForce);

	        constraint.collideConnected = false;
	      }

	      lastRect = newRect;
	    }
	  }
};

Bridge.prototype = Object.create(Phaser.Group.prototype);
Bridge.prototype.constructor = Bridge;

Bridge.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Bridge;
