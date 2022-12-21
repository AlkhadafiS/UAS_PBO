var x = 200;
var y = 350;
var d = 25;
var life = 100;
var img;
var backgroundImg;
var laser = new Audio('laser.mp3');
var imgmusuh;
var imglaserbullet;

let peluruBanyak = [];
let musuhBanyak = [];
let skor = 0;

class Map{
  constructor(width,height){
    this.width = width
    this.heigth = height
  }
  
  init(){
    createCanvas(this.width,this.heigth)
  }
  
  move(){
    
  }
}

class Level{
  constructor(currentLevel,latestLevel,maxLevel){
    this.currentLevel= currentLevel
    this.latestLevel = latestLevel
    this.maxLevel = maxLevel
  }
  
  setLevel(){
    //buat mengubah levelnya
  }
  
  getCurrentLevel(){
    //buat dapetin level yang dimasukin
  }
}

class Entity{
  constructor(height,width,x,y,image){
    this.height = height
    this.width = width
    this.x = x
    this.y = y
    this.image = image
  }

  show(){
    image(this.image,this.x,this.y,this.width,this.height)
  }
  
  attack(){
    //kemungkinan ini ntar dimasukin fungsi buat bullet nya
  }
  
  moveRight(){
    //gerakin ke kanan
    this.x = this.x + 7;
  }
  
  moveLeft(){
    //gerak ke kiri
    this.x = this.x - 7;
  }
  
  moveDown(){
    //gerak ke bawah
    this.y = this.y + 7;
  }
  
  moveUp(){
    //gerak ke atas
    this.y = this.y - 7;
  }
}

class Monster extends Entity{
  constructor(height,width,x,y,life,color,effect,type){
    super(height,width,x,y)
    this.life = life
    this.color = color
    this.effect = effect
    this.type = type
  }
  
  moveRandom(){
    
  }
  
  saveScore(){
    
  }
}

class Hero extends Entity{
  constructor(height,width,x,y,image,life,score){
    super(height,width,x,y,image)
    this.life = life
    this.score = score
  }
  
  increaseScore(){
    //score naik kalo berhasil nembak musuh
  }
  
  calculateLife(){
    //ngurangin nyawa kalo misalnya nabrak ?
  }
  
  saveScore(){
    
  }
}

//------------Start--------------

function preload(){
  backgroundImg = loadImage('latar.jpg')
  img = loadImage("pesawat.png");
  imgmusuh = loadImage('asteroid.png')
  imglaserbullet = loadImage('laserbullet.png');

  soundFormats('mp3', 'ogg');
  mySound = loadSound('laser');
}

function setup(){
  let peta = new Map(400,400); //canvas
  pesawatTerbang = new Hero(d,d,x,y,img,life,skor); //pesawat
  let myPeluru = new Hero()
  

  peta.init()
}

function draw(){
  background(backgroundImg);
  rectMode(CENTER);

  if (keyIsPressed) {
    if (keyCode == 65) {
      pesawatTerbang.moveLeft()
    } else if (keyCode == 68) {
      pesawatTerbang.moveRight()
    }
    if (keyCode == 87) {
      pesawatTerbang.moveUp()
    } else if (keyCode == 83) {
      pesawatTerbang.moveDown()
    }
  }

  if(pesawatTerbang.x > 400){
    pesawatTerbang.x = 0
  }else if(pesawatTerbang.x<0){
    pesawatTerbang.x = 400
  }
  
  if(pesawatTerbang.y > 400){
    pesawatTerbang.y = 0
  }else if(y < 0){
    pesawatTerbang.y = 400
  }

  pesawatTerbang.show()
}

function mouseIsPressed(){
  
}
