var dinossauro;
var animation1;
var chao;
var animation2;
var chao_invisivel;
var numeros;
var nuvem;
var animation3;


function preload(){
  animation1 = loadAnimation("imgs/trex1.png","imgs/trex3.png","imgs/trex4.png");
  animation2 = loadImage("imgs/ground2.png");
  animation3 = loadImage("imgs/cloud.png");
}

function setup(){
  createCanvas(600,200);
  dinossauro = createSprite(70,40,50,70);
  dinossauro.addAnimation("correndo",animation1);
  dinossauro.scale = 0.5;
  dinossauro.depth = 20;
  chao = createSprite(200,180,400,20);
  chao.addImage("chão",animation2);
  chao.x = chao.width/2;
  chao_invisivel = createSprite(20,198,400,20);
  chao_invisivel.visible = false;
  
}

function draw(){
  numeros = Math.round(random(10,60));
  background("white");
  animation_2();
  drawSprites();
  movimento();
  dinossauro.collide(chao_invisivel);
  ver_pos_mouse();
  nuvens();
}

function movimento(){
  if(keyDown("space")&& dinossauro.collide(chao_invisivel)){
    dinossauro.velocityY = -10;
  }
  dinossauro.velocityY += 0.6;
  


}

function animation_2(){
  chao.velocityX = -8;
  if(chao.x < 0){
    chao.x = chao.width/2;
  }
}

function ver_pos_mouse(){
  text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY);
}

function nuvens(){
  if(frameCount%70 === 0){
    nuvem = createSprite(610,numeros,30,15);
    nuvem.velocityX = -6;
    nuvem.addImage(animation3);
    nuvem.depth = 1;
  }
}
