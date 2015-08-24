'use strict';
var Food = require('../prefabs/food');
var settings = require('../settings');
var monsterCollisionGroup;
var foodCollisionGroup;

var FoodGenerator = function(game, point1, point2, timer, monsterCollisionGroup, foodCollisionGroup) {
	this.point1 = point1;
	this.point2 = point2;
	this.timer = timer;
	this.game = game;
	this.monsterCollisionGroup = monsterCollisionGroup;
	this.foodCollisionGroup = foodCollisionGroup;
	this.time = 0;
	this.maxFood = 10;
	this.currentFood = 0;
};

FoodGenerator.prototype.update = function() {
	if (this.time == 0 && this.currentFood <= this.maxFood){
		var x = this.randomIntFromInterval(this.point1.x + 100, this.point2.x - 100); //this.rdn(this.point,300);
		var y = this.randomIntFromInterval(this.point1.y + 100, this.point2.y - 100);
		
		//var pos = this.rdn({x: 500, y: 1000 }, 300);
		//var random = Math.floor(Math.random() * 950);
		this.time = this.timer;

		var food = new Food(this.game, x, y);
    	food.body.setRectangle(40, 40);
    	food.body.setCollisionGroup(this.foodCollisionGroup);
    	food.body.collides([this.foodCollisionGroup, this.monsterCollisionGroup]);
    	this.game.add.existing(food);
    	this.currentFood += 1;
	}
	else{
		if(this.time > 0)
			this.time -= 1;
	}
};

FoodGenerator.prototype.rdn = function(p, radius){ // random point whithin a circle ( p= { x: Number, y: Number } ) 
	var r = Math.random() * radius;
	var a = Math.random()* 2 * Math.PI;
	return { x: p.x + (r * Math.cos(a)), y: p.y + (r * Math.sin(a))};
}

FoodGenerator.prototype.dicreaseCurrentFood = function(p, radius){ // random point whithin a circle ( p= { x: Number, y: Number } ) 
	if(this.currentFood > 0)
		this.currentFood -= 1;
}

FoodGenerator.prototype.randomIntFromInterval = function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports = FoodGenerator;
