'use strict';

var FoodGenerator = require('../prefabs/foodGenerator');
var Food = require('../prefabs/Food');
var Hud = require('../prefabs/hud.js');
var Monster = require('../prefabs/monster');
var settings = require('../settings');
var graphics;
var monsterCollisionGroup;
var foodCollisionGroup;
var foodGenerator;

function Play() {  
}

Play.prototype = {
  create: function() {
    var game = this.game;
    var ws = settings.worldSize;

    game.add.tileSprite(0, 0, ws.width, ws.height, 'background');
    game.world.setBounds(0, 0, ws.width, ws.height);
    this.musicTheme = game.add.audio('theme', 0.5, true);
    //this.musicTheme.play();
    game.stage.backgroundColor = "#A6947B";
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 400;
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.9;

    monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
    foodCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();

    graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(10, 0x33FF00);
    graphics.moveTo(0,300);
    graphics.lineTo(800, 300);

    this.monster = new Monster(this.game, 200, 200);
    this.monster.body.setCircle(28);
    this.monster.body.setCollisionGroup(monsterCollisionGroup);
    this.monster.body.collides(foodCollisionGroup, this.hitFood, this);
    this.game.add.existing(this.monster);

    foodGenerator = new FoodGenerator(this.game, 200, 700, 100, monsterCollisionGroup, foodCollisionGroup)
    //ar food = new Food(this.game, 100, 300);
    //food.body.setRectangle(40, 40);
    //food.body.setCollisionGroup(foodCollisionGroup);
    //food.body.collides([foodCollisionGroup, monsterCollisionGroup]);
    //this.game.add.existing(food);

    this.hud = new Hud(this.game);
    this.game.add.existing(this.hud);

    game.camera.follow(this.monster);

  },
  update: function() {
	  foodGenerator.update();
  },
  hitFood: function(monster, food) {
    food.sprite.destroy();
    food.destroy();
  }
};

module.exports = Play;