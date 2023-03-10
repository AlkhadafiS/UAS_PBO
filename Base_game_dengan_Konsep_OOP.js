var x = 200;
var y = 350;
var d = 37;
var life = 3;
var img;
var backgroundImg;
var laser = new Audio("laser.mp3");
var imgmusuh;
var imglaserbullet;
var gameover = new Audio("gameover.mp3");
var imghati;
var ledakan = new Audio("ledakan.mp3");
var bgm = new Audio("bgm.mp3");

let peluruBanyak = [];
let musuhBanyak = [];
let skor = 0;
let kalah;

class Map {
  constructor(width, height) {
    this.width = width;
    this.heigth = height;
  }

  init() {
    createCanvas(this.width, this.heigth);
  }

  move() {}
}

class Level {
  constructor(currentLevel, latestLevel, maxLevel) {
    this.currentLevel = currentLevel;
    this.latestLevel = latestLevel;
    this.maxLevel = maxLevel;
  }

  showLevel() {
    fill("#FFFFFF");
    text("Level : " + this.currentLevel, 15, 40);
  }

  setLevel(currentLevel) {
    //buat mengubah levelnya
    this.currentLevel = currentLevel;
  }

  getCurrentLevel() {
    //buat dapetin level yang dimasukin
    return this.currentLevel;
  }
}

class Entity {
  constructor(height, width, x, y, image) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.image = image;
  }

  show() {
    image(this.image, this.x, this.y, this.width, this.height);
  }

  attack() {
    //untuk menggerakkan peluru
    this.y -= 10;
  }

  moveRight() {
    //gerakin ke kanan
    this.x += 7;
  }

  moveLeft() {
    //gerak ke kiri
    this.x -= 7;
  }

  moveDown() {
    //gerak ke bawah
    this.y += 7;
  }

  moveUp() {
    //gerak ke atas
    this.y -= 7;
  }
}

class Monster extends Entity {
  constructor(height, width, x, y, image, life, color = 0, effect = 0, type = 0) {
    super(height, width, x, y, image);
    this.life = life;
    this.color = color;
    this.effect = effect;
    this.type = type;
  }

  moveRandom() {
    this.y += 2;
  }

  saveScore() {}
}

class Hero extends Entity {
  constructor(height, width, x, y, image, life, score) {
    super(height, width, x, y, image);
    this.life = life;
    this.score = score;
  }

  increaseScore() {
    this.score += 10;
  }

  calculateLife() {
    //ngurangin nyawa kalo misalnya nabrak
    this.life--;
  }

  showLife() {
    fill("#FFFFFF");
    image(imghati, 175, 10, 19, 19);
    text(this.life, 200, 25);
  }

  saveScore() {
    fill("#FFFFFF");
    text(this.score, 15, 25);
  }
}

//------------Start--------------

function preload() {
  backgroundImg = loadImage("latar.jpg");
  img = loadImage("pesawat.png");
  imgmusuh = loadImage("asteroid.png");
  imglaserbullet = loadImage("laserbullet.png");
  imghati = loadImage("hati.png");

  soundFormats("mp3", "ogg");
  mySound = loadSound("laser");
  mySound = loadSound("gameover");
  mySound = loadSound("ledakan");
  mySound = loadSound("bgm");

  myFont = loadFont("retro.ttf");
}

function loopPeluru(n) {
  for (let i = 0; i < n; i++) {
    musuhBanyak.push(
      new Monster(15, 15, random(10, width - 10), random(-800, 0), imgmusuh, 1)
    );
  }
}

function setup() {
  mode = 0;
  bgm.play();
  peta = new Map(400, 400); //canvas
  pesawatTerbang = new Hero(d, d, x, y, img, life, skor); //pesawat
  level = new Level(1, 1, 3);

  //spawn musuh
  loopPeluru(10);
  peta.init();

  textFont(myFont);
}

function draw() {
  clear();
  background(backgroundImg);
  rectMode(CENTER);

  if (mode == 0) {
    info();
    laser.pause();
  }
  if (mode == 1) {
    pesawatTerbang.saveScore();
    pesawatTerbang.showLife();
    level.showLevel();

    if (keyIsPressed) {
      if (keyCode == 65) {
        pesawatTerbang.moveLeft();
      } else if (keyCode == 68) {
        pesawatTerbang.moveRight();
      }
      if (keyCode == 87) {
        pesawatTerbang.moveUp();
      } else if (keyCode == 83) {
        pesawatTerbang.moveDown();
      }
    }

    if (pesawatTerbang.x > 400) {
      pesawatTerbang.x = 0;
    } else if (pesawatTerbang.x < 0) {
      pesawatTerbang.x = 400;
    }

    if (pesawatTerbang.y > 400) {
      pesawatTerbang.y = 0;
    } else if (y < 0) {
      pesawatTerbang.y = 400;
    }

    pesawatTerbang.show();

    //gambar peluru
    for (let peluru of peluruBanyak) {
      peluru.y -= 10;
      peluru.show();
    }

    //mengupdate dan memunculkan musuh
    for (let musuh of musuhBanyak) {
      if (pesawatTerbang.score >= 0 && pesawatTerbang.score <= 2000) {
        level.setLevel(1);
        musuh.y += 2;
      } else if (pesawatTerbang.score >= 2001 && pesawatTerbang.score <= 4000) {
        level.setLevel(2);
        musuh.y += 3;
      } else if (pesawatTerbang.score >= 4001) {
        level.setLevel(3);
        musuh.y += 4;
      }
      musuh.show();

      if (dist(musuh.x, musuh.y, pesawatTerbang.x, pesawatTerbang.y) <= 20) {
        musuhBanyak.splice(musuhBanyak.indexOf(musuh), 1);
        ledakan.currentTime = 0;
        ledakan.play();
        loopPeluru(1);
        pesawatTerbang.calculateLife();
        if (pesawatTerbang.life <= 0) {
          clear();
          gameover.play();
          noLoop();
          kalah = true;
        }
      }

      if (musuh.y > height) {
        musuhBanyak.splice(musuhBanyak.indexOf(musuh), 1);
        loopPeluru(1);
      }
    }
    if (kalah === true) {
      background(backgroundImg);
      fill(255);
      textSize(35);
      text("-- Game Over --", 70, 190);
      textSize(15);
      text("Skor Anda : " + pesawatTerbang.score, 150, 220);
      bgm.pause();
      laser.pause();
    }

    //spawn banyak musuh dan peluru
    for (let musuh of musuhBanyak) {
      for (let peluru of peluruBanyak) {
        //peluru mengenai musuh
        if (dist(musuh.x, musuh.y, peluru.x, peluru.y) < 10) {
          musuhBanyak.splice(musuhBanyak.indexOf(musuh), 1);
          peluruBanyak.splice(peluruBanyak.indexOf(peluru), 1);
          pesawatTerbang.increaseScore();
          loopPeluru(1);
        }
      }
    }
    pesawatTerbang.saveScore();
  }
}

function mousePressed() {
  //spawn peluru saat user click mouse
  let peluru1 = new Hero(15, 15, pesawatTerbang.x + 7, pesawatTerbang.y, imglaserbullet, 1, 0);
  let peluru2 = new Hero(15, 15, pesawatTerbang.x + 13, pesawatTerbang.y, imglaserbullet, 1, 0);
  peluruBanyak.push(peluru1);
  peluruBanyak.push(peluru2);
  laser.currentTime = 0;
  if (pesawatTerbang.life <= 0) {
    laser.pause();
  } else {
    laser.play();
  }
}

function info() {
  fill(255);
  textSize(35);
  text("SPACE SHOOTER", 50, 100);
  textSize(18);
  text("Anggota Kelompok :", 120, 160);
  textSize(15);
  text("Alkhadafi Saddam S (NPM. 2117051049)", 60, 190);
  text("Adli Fiqrullah (NPM. 2117051075)", 90, 210);
  text("Dhiaurrahman Raziq Ramadhan (NPM. 2117051048)", 10, 230);
  text("Klik spasi untuk memulai game", 100, 390);
}

function keyPressed() {
  if (key === " ") {
    mode = 1;
  }
}
