var dinossauro;
var animation1;
var chao;
var animation2;

function preload(){
  animation1 = loadAnimation("imgs/trex1.png","imgs/trex3.png","imgs/trex4.png");
  animation2 = loadImage("imgs/ground2.png");
}

function setup(){
  createCanvas(600,200);
  dinossauro = createSprite(70,40,50,70);
  dinossauro.addAnimation("correndo",animation1);
  dinossauro.scale = 0.5;
  chao = createSprite(200,180,400,20);
  chao.addImage("chão",animation2);
  chao.x = chao.width/2;
}

function draw(){
  background("black");
  animation_2();
  drawSprites();
  movimento();
  dinossauro.collide(chao);
}

function movimento(){
  if(keyDown("space")){
    dinossauro.velocityY = -6;
  }
  dinossauro.velocityY += 0.6;

}

function animation_2(){
  chao.velocityX = -6;
  if(chao.x < 0){
    chao.x = chao.width/2;
  }
}