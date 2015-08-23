'use strict';

var FoodGenerator = require('../prefabs/foodGenerator');
var PersonGenerator = require('../prefabs/personGenerator');
var Food = require('../prefabs/food');
var Person = require('../prefabs/person');
var Hud = require('../prefabs/hud.js');
var Monster = require('../prefabs/monster');
var Water = require('../prefabs/water');
var settings = require('../settings');
var graphics;
var monsterCollisionGroup;
var personCollisionGroup;
var foodCollisionGroup;
var waterLineCollisionGroup;
var foodGenerator;
var personGenerator;

function Play() {  
}

Play.prototype = {
  create: function() {
    var game = this.game;
    var ws = settings.worldSize;


    game.add.tileSprite(0, 0, ws.width, ws.height, 'background');
    game.world.setBounds(0, 0, ws.width, ws.height);
    this.musicTheme = game.add.audio('theme', 0.5, true);
    this.musicTheme.play();

    game.stage.backgroundColor = "#A6947B";
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 400;
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.2;

    monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
    foodCollisionGroup = this.game.physics.p2.createCollisionGroup();
    waterLineCollisionGroup = this.game.physics.p2.createCollisionGroup();
    personCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();

    graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(10, 0x33FF00);
    graphics.moveTo(0,300);
    graphics.lineTo(800, 300);

    this.monster = new Monster(this.game, 200, 200);
    this.monster.body.setCircle(28);
    this.monster.body.setCollisionGroup(monsterCollisionGroup);
    this.monster.body.collides(foodCollisionGroup, this.hitFood, this);
    this.monster.body.collides(waterLineCollisionGroup, this.hitWater, this);
    this.monster.body.collides(personCollisionGroup, this.hitPerson, this);
    this.game.add.existing(this.monster);

    foodGenerator = new FoodGenerator(this.game, 200, 700, 100, monsterCollisionGroup, foodCollisionGroup)
    personGenerator = new PersonGenerator(this.game, 300, 200, 10000, monsterCollisionGroup, personCollisionGroup);

    this.water = new Water(this.game, monsterCollisionGroup, waterLineCollisionGroup);
    this.game.add.existing(this.water);

    this.hud = new Hud(this.game);
    this.game.add.existing(this.hud);

    game.camera.follow(this.monster);

  },
  update: function() {
	  foodGenerator.update();
	  personGenerator.update();
  },
  hitFood: function(monster, food) {
    foodGenerator.dicreaseCurrentFood();
    monster.sprite.speed += 100;
	  food.sprite.afterDestroyed();
    food.sprite.destroy();
    food.destroy();
  },
  hitWater: function(monster, water) {
    //food.sprite.destroy();
    //food.destroy();
    console.log('COLLIDE');
  },
  hitPerson: function(monster, person) {
	  person.sprite.afterDestroyed();
	  person.sprite.destroy();
	  person.destroy();
  }
};

module.exports = Play;
