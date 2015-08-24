'use strict';

var FoodGenerator = require('../prefabs/foodGenerator');
var PersonGenerator = require('../prefabs/personGenerator');
var Food = require('../prefabs/food');
var Person = require('../prefabs/person');
var Hud = require('../prefabs/hud.js');
var Monster = require('../prefabs/monster');
var Water = require('../prefabs/water');
var Bridge = require('../prefabs/bridge');
var settings = require('../settings');
var graphics;
var monsterCollisionGroup;
var personCollisionGroup;
var foodCollisionGroup;
var waterLineCollisionGroup;
var bridgeLineCollisionGroup;
var foodGenerator;
var personGenerator;

function Play() {
}

Play.prototype = {
  create: function() {
    var game = this.game;
    var ws = settings.worldSize;
    var wLevel = settings.water_level;
    var imgSizeH = settings.bg_image_size;

    game.onSpeedChange = new Phaser.Signal();
    game.add.tileSprite(0, wLevel-imgSizeH, ws.width, imgSizeH, 'bg_sky');
    game.add.tileSprite(0, wLevel, ws.width, imgSizeH, 'bg_water');

    game.world.setBounds(0, 0, ws.width, ws.height);

    this.musicTheme = game.add.audio('theme', 0.5, true);
    this.musicTheme.play();

    game.stage.backgroundColor = "#A6947B";
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = settings.gravity;
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.2;

    monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
    foodCollisionGroup = this.game.physics.p2.createCollisionGroup();
    waterLineCollisionGroup = this.game.physics.p2.createCollisionGroup();
    bridgeLineCollisionGroup = this.game.physics.p2.createCollisionGroup();
    personCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();

    this.monster = new Monster(this.game, 800, 700);

    this.monster.body.setCircle(28);
    this.monster.body.setCollisionGroup(monsterCollisionGroup);
    this.monster.body.collides(foodCollisionGroup, this.hitFood, this);
    this.monster.body.collides(waterLineCollisionGroup, this.hitWater, this);
    this.monster.body.collides(bridgeLineCollisionGroup, this.hitBridge, this);
    this.monster.body.collides(personCollisionGroup, this.hitPerson, this);
    this.game.add.existing(this.monster);

    var point1 = new Phaser.Point(0, wLevel);
    var point2 = new Phaser.Point(ws.width, ws.height);

    foodGenerator = new FoodGenerator(this.game, point1, point2, 50, monsterCollisionGroup, foodCollisionGroup)
    personGenerator = new PersonGenerator(this.game, 300, 340, 10000, monsterCollisionGroup, bridgeLineCollisionGroup, personCollisionGroup);
    personGenerator.createPersons(1, 1);

    this.water = new Water(this.game, monsterCollisionGroup, waterLineCollisionGroup);
    this.game.add.existing(this.water);

    this.bridge = new Bridge(this.game, monsterCollisionGroup, personCollisionGroup, bridgeLineCollisionGroup);
    this.game.add.existing(this.bridge);
    
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
  },
  hitBridge: function(monster, bridge) {
  },
  hitPerson: function(monster, person) {
	person.sprite.afterDestroyed();
	person.sprite.destroy();
    person.destroy();
    this.hud.setTimer(20);
    personGenerator.createPersons(1, 100);
    monster.sprite.increaseSize();
    //this.game.state.start('win');
  }
};

module.exports = Play;
