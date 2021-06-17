const Engine= Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var myEngine, myWorld;
var bg;
var ground;
var boggie1,boggie2,boggie3,boggie4;
var chain1,chain2,chain3;
var trainSound;
var crashSound;
var flag;
var PLAY=1;
var END=0;
var gameState=PLAY;
var rock;

function preload(){
  bg= loadImage("images/bg.jpg");
  trainSound = loadSound("sound/train.mp3");
  crashSound = loadSound("sound/train_crossing.mp3");
}
function setup() {
  createCanvas(1200,400);
  myEngine = Engine.create();
  myWorld= myEngine.world;
  ground = new Ground(600,380,1200,20);
  boggie1=new Boggie(650,200,130,80);
  boggie2=new Boggie(450,200,130,80);
  boggie3=new Boggie(250,200,130,80);
  boggie4=new Boggie(50,200,130,80);
  chain1=new SlingShot(boggie4.body,boggie3.body);
  chain2=new SlingShot(boggie3.body,boggie2.body);
  chain3=new SlingShot(boggie2.body,boggie1.body);
  rock=new Rock(750,200,300,150);
  flag=0;
}

function draw() {
  background(bg);  
  Engine.update(myEngine);
  chain1.display();
  chain2.display();
  chain3.display();
  boggie1.display();
  boggie2.display();
  boggie3.display();
  boggie4.display();
  rock.display();
  var collision=Matter.SAT.collides(boggie1.body,rock.body);
  if(collision.collided){
  flag=1;
  }
  if(flag===1){
  textSize(30);
  stroke(4);
  text("Crash!",500,200);
  crashSound.play();
  }
  }

function keyPressed(){
  if(keyCode===RIGHT_ARROW){
  Matter.Body.applyForce(boggie4.body,boggie4.body.position,{x:5,y:0});
  trainSound.play();
  }
}

