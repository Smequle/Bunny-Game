const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit;
var rope;
var fruit_con;

var bg_img;
var fruit_img;
var bunny_img;

var blink;
var eat;
var sad;

var button;

function preload() {
  bg_img = loadImage("/img/bg_img.png");
  fruit_img = loadImage("/img/fruit.png");
  bunny_img = loadImage("/img/bunny_img.png");
  blink = loadAnimation("/img/blink_1.png", "/img/blink_2.png", "/img/blink_3.png");
  eat = loadAnimation("/img/eat_1.png", "/img/eat_2.png", "/img/eat_3.png", "/img/eat_4.png", "/img/eat_5.png");
  sad = loadAnimation("/img/sad_1.png", "/img/sad_2.png", "/img/sad_3.png");
  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny = createSprite(250, 650, 100, 100);
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.changeAnimation("blinking");
  bunny.addAnimation("crying", sad);
  bunny.scale = 0.2;
  ground = new Ground(200, 690, 600, 20);
  rope = new Rope(6, { x: 250, y: 30 });
  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope, fruit);
  button = createImg("/img/cut_img.png");
  button.position(200, 30);
  button.size(50, 50);
  button.mouseClicked(drop());
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);
  image(bg_img, 0, 0, displayWidth + 80, displayHeight);
  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(fruit_img, fruit.position.x, fruit.position.y, 60, 60);
  }
  pop();
  ground.show();
  rope.show();
  Engine.update(engine);
  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation("eating");
  }
  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation("crying");
  }
  drawSprites()
}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d < 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}