var sprite;


function setup() {
  createCanvas(400,400);
  sprite = createSprite(200,200,14,14);
  sprite.shapeColor = "blue";
  createEdgesSprites();
}

function draw() 
{
  background("black");
  drawSprites();
  movimento();
}

function movimento(){
  if(keyDown(RIGHT_ARROW)){
    sprite.x += 3;
  }
  if(keyDown(LEFT_ARROW)){
    sprite.x -= 3;  
  }
  if(keyDown(UP_ARROW)){
    sprite.y -= 3;
  }
  if(keyDown(DOWN_ARROW)){
    sprite.y += 3;
  }
}


