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
var _ = require('lodash');
var graphics;
var monsterCollisionGroup;
var personCollisionGroup;
var foodCollisionGroup;
var waterLineCollisionGroup;
var bridgeLineCollisionGroup;
var foodGenerator;
var personGenerator;
var check_point_time = settings.check_point_time;

function Play() {
}

Play.prototype = {
  create: function() {
    var game = this.game;
    var ws = settings.worldSize;
    var wLevel = settings.water_level;
    var imgSizeH = settings.bg_image_size;

    this.game.stats = {
      peopleEaten: 0,
      foodEaten: 0,
      weight: 0
    };

    this.game.onWin = new Phaser.Signal();

    this.game.onWin.add(this.winCallback, this);

    this.starting_setting = _.cloneDeep(settings);

    game.onSpeedChange = new Phaser.Signal();
    game.add.tileSprite(0, wLevel-imgSizeH, ws.width, imgSizeH, 'bg_sky');
    game.add.tileSprite(0, wLevel, ws.width, imgSizeH, 'bg_water');

    game.world.setBounds(0, 0, ws.width, ws.height);

    this.musicTheme = game.add.audio('theme', 0.5, true);
    this.musicTheme.play();
    game.state.onStateChange.add(function(newState){this.game.sound.stopAll();}, this);

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

    this.monster = new Monster(this.game, 100, 1050);
    this.monster.body.setCollisionGroup(monsterCollisionGroup);
    this.monster.body.collides(foodCollisionGroup, this.hitFood, this);
    this.monster.body.collides(waterLineCollisionGroup, this.hitWater, this);
    this.monster.body.collides(bridgeLineCollisionGroup, this.hitBridge, this);
    this.monster.body.collides(personCollisionGroup, this.hitPerson, this);
    this.game.add.existing(this.monster);

    var point1 = new Phaser.Point(0, wLevel);
    var point2 = new Phaser.Point(ws.width, ws.height);

    this.game.brokenBridge = false;
    this.game.onBrokenBridge = new Phaser.Signal();

    foodGenerator = new FoodGenerator(this.game, point1, point2, 75, monsterCollisionGroup, foodCollisionGroup)
    personGenerator = new PersonGenerator(this.game, 300, 340, 10000, 3, monsterCollisionGroup, bridgeLineCollisionGroup, personCollisionGroup);

    this.water = new Water(this.game, monsterCollisionGroup, waterLineCollisionGroup);
    this.game.add.existing(this.water);

    this.bridge = new Bridge(this.game, monsterCollisionGroup, personCollisionGroup, bridgeLineCollisionGroup);
    this.game.add.existing(this.bridge);
    this.bridge.moveTo(this.starting_setting.bridge_base_level);

    this.hud = new Hud(this.game);
    this.game.add.existing(this.hud);

    game.camera.follow(this.monster);

  },
  update: function() {
	  foodGenerator.update();
	  personGenerator.update();
    if(this.game.stats.weight > 2.1){
      this.preWin();
    }
  },
  hitFood: function(monster, food) {
    this.game.stats.foodEaten++;
    var x = food.x, y = food.y, c = food.sprite.color;
    foodGenerator.dicreaseCurrentFood();
    monster.sprite.setSpeed(settings.speed_growth);
    food.sprite.afterDestroyed();
    food.sprite.destroy();
    food.destroy();

    var block = this.game.add.emitter(x, y, 20);

    block.makeParticles('food');
    block.setRotation(0, 0);
    block.setAlpha(1, 0, 3000);
    block.setScale(0.8, 0, 0.8, 0, 3000);
    block.gravity = -100;
    block.explode(2000, 20);

    block.forEach(function(p){
        p.tint = c;
    });

  },
  hitWater: function(monster, water) {
  },
  hitBridge: function(monster, bridge) {
  },
  hitPerson: function(monster, person) {
    this.game.stats.peopleEaten++;
    var x = person.x, y = person.y;

	person.sprite.afterDestroyed();
	person.sprite.destroy();
    person.destroy();

    personGenerator.killedPerson();
    monster.sprite.increaseSize();
    if(personGenerator.kills > 3)
      check_point_time = 10;
    else if(personGenerator.kills > 8)
      check_point_time = 8;
    else if(personGenerator.kills > 12)
      check_point_time = 5;

    this.hud.setTimer(check_point_time);
    var blood = this.game.add.emitter(x, y, 20);

    blood.makeParticles('blurred-circle');
    blood.setRotation(0, 0);
    blood.setAlpha(0.5, 0, 3000);
    blood.setScale(0.8, 0, 0.8, 0, 3000);
    blood.gravity = 100;
    blood.explode(2000, 20);

    blood.forEach(function(p){
        p.tint = 0xFF0000;
    });

    this.changeLevel();
  },
  changeLevel: function(){
    this.bridge.move();
  },
  winCallback: function(){
    this.game.state.start('win');
  },
  preWin: function(){
    this.game.camera.follow(null);
    this.game.camera.x += this.game.rnd.integerInRange(-20,20);
    this.game.camera.y += this.game.rnd.integerInRange(-20,20);
  }
};

module.exports = Play;
