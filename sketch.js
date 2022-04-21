var dinossauro;
var animation1;
var chao;
var animation2;
var chao_invisivel;
var numeros;
var nuvem;
var animation3;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var numeros2;
var cacto;
var JOGANDO = 1;
var PERDEU = 0;
var estado = JOGANDO;
var cacto_2;
var grupo_nuvens;
var metros = 0;
var gameOver;
var fim;
var replay;
var recomeco;
var batida;
var die;
var checkpoint;
var jump;
var aux;



function preload(){
  animation1 = loadAnimation("imgs/trex1.png","imgs/trex3.png","imgs/trex4.png");
  animation2 = loadImage("imgs/ground2.png");
  animation3 = loadImage("imgs/cloud.png");
  cacto1 = loadImage("imgs/obstacle1.png");
  cacto2 = loadImage("imgs/obstacle2.png");
  cacto3 = loadImage("imgs/obstacle3.png");
  cacto4 = loadImage("imgs/obstacle4.png");
  cacto5 = loadImage("imgs/obstacle5.png");
  cacto6 = loadImage("imgs/obstacle6.png");
  fim = loadImage("imgs/gameOver.png");
  recomeco = loadImage("imgs/restart.png");
  batida = loadAnimation("imgs/trex_collided.png");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  dinossauro = createSprite(70,height-40,50,70);
  dinossauro.addAnimation("correndo",animation1);
  dinossauro.addAnimation("bateu",batida);
  dinossauro.scale = 0.5;
  dinossauro.depth = 20;
  chao = createSprite(200,height-45,400,20);
  chao.addImage("chão",animation2);
  chao.x = chao.width/2;
  chao_invisivel = createSprite(width/2,height-10,width,50);
  chao_invisivel.visible = false;
  cacto_2 = new Group();
  grupo_nuvens = new Group();
  dinossauro.debug = false;
  //dinossauro.setCollider("rectangle",0,0,270,dinossauro.height -10);
  dinossauro.setCollider("circle",0,0,47);
  gameOver = createSprite(639,800,40,40);
  gameOver.addImage(fim);
  gameOver.visible = false;
  replay = createSprite(620,860,20,20);
  replay.addImage(recomeco);
  replay.visible = false;
  var mensagem = "sim";
  console.log(mensagem);
}

function draw(){
  numeros2 = Math.round(random(1,6));
  numeros = Math.round(random(10,60));
  background("white");
  if(estado === JOGANDO){
    jogando();
    if(dinossauro.isTouching(cacto_2)){
      estado = PERDEU;
      die.play();
      //dinossauro.velocityY = -7;
      //jump.play();
    }
  }else if(estado === PERDEU){
    GAME_OVER();
  }
  drawSprites();
  text("pontuação em metros: " + metros,970,height-200);

  dinossauro.collide(chao_invisivel);
  //console.log(mensagem);
}

function jogando(){
  movimento_2();
  movimento();
  ver_pos_mouse();
  nuvens();
  cactos();
  pontos();
}

function GAME_OVER(){
  dinossauro.changeAnimation("bateu",batida);
  dinossauro.velocityY = 0;
  grupo_nuvens.setLifetimeEach(-1);
  cacto_2.setLifetimeEach(-1);
  replay.visible = true;
  gameOver.visible = true;
  ver_pos_mouse();
  chao.velocityX = 0;
  grupo_nuvens.setVelocityXEach(0);
  cacto_2.setVelocityXEach(0);
  if(mousePressedOver(replay)){
    console.log("reniciar");
    reset();
  }
}

function reset(){
  estado = JOGANDO;
  metros = 0;
  cacto_2.destroyEach();
  grupo_nuvens.destroyEach();
  replay.visible = false;
  gameOver.visible = false;
  dinossauro.changeAnimation("correndo",animation1);
}



function pontos(){
  if(frameCount%2 === 0){
    metros += 1;
  }
  if(metros%100 === 0 && metros > 0){
    checkpoint.play();
    
  }
}





function movimento(){
  if(keyDown("space")&& dinossauro.collide(chao_invisivel)){
    dinossauro.velocityY = -10;
    jump.play();
  }
  dinossauro.velocityY += 0.6;
  


}

function movimento_2(){
  chao.velocityX = -(10 + metros/100);
  if(chao.x < 0){
    chao.x = chao.width/2;
  }
}

function ver_pos_mouse(){
  text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY);
}

function nuvens(){
  if(frameCount%70 === 0){
    nuvem = createSprite(860,height-(200- numeros),30,15);
    nuvem.velocityX = -6;
    nuvem.addImage(animation3);
    nuvem.depth = 1;
    nuvem.lifetime = 120;
    grupo_nuvens.add(nuvem);
  }
}
function cactos(){
  if(frameCount%60 ===  0){
    cacto = createSprite(860,height-40,18,20);  
    cacto.velocityX  = -(10 + metros/100);
    cacto.scale = 0.6;
    cacto.lifetime = 120;
    switch (numeros2) {
      case 1:
        cacto.addImage(cacto1);
        break;
      case 2:
        cacto.addImage(cacto2);
        break;
      case 3:
        cacto.addImage(cacto3);
        break;
      case 4:
        cacto.addImage(cacto4);
        break;
      case 5:
        cacto.addImage(cacto5);
        break;
      case 6:
        cacto.addImage(cacto6);
        break;
      default:
        break;
    }
    cacto_2.add(cacto);
  }
}
