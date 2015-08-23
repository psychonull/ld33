'use strict';
var Food = require('../prefabs/Food');
var monsterCollisionGroup;
var foodCollisionGroup;

var FoodGenerator = function(game, x, y, timer, monsterCollisionGroup, foodCollisionGroup) {
	this.point = new Phaser.Point(x, y);
	this.timer = timer;
	this.game = game;
	this.monsterCollisionGroup = monsterCollisionGroup;
	this.foodCollisionGroup = foodCollisionGroup;
	this.time = 0;
};

FoodGenerator.prototype.update = function() {
	if (this.time == 0){
		var position = this.rdn(this.point,300);
		this.time = this.timer;
    /*
		var food = new Food(this.game, position.x, position.y);
    	food.body.setRectangle(40, 40);
    	food.body.setCollisionGroup(this.foodCollisionGroup);
    	food.body.collides([this.foodCollisionGroup, this.monsterCollisionGroup]);
    	this.game.add.existing(food);
    */
	}
	else{
		this.time -= 1;
	}
  // write your prefab's specific update code here
  
};

FoodGenerator.prototype.rdn = function(p, radius){ // random point whithin a circle ( p= { x: Number, y: Number } ) 
      var r = Math.random() * radius;
      var a = Math.random()* 2 * Math.PI;
      return { x: p.x + (r * Math.cos(a)), y: p.y + (r * Math.sin(a))};
}

module.exports = FoodGenerator;
