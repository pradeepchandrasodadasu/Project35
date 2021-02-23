var database;
var balloon,position;
var bgImg,balloon1,balloon2,balloon3;

function preload() {
  bgImg = loadImage("pro-C35 images/Hot Air Ballon-01.png");
  balloon1 = loadImage("pro-C35 images/Hot Air Ballon-02.png");
  balloon2 = loadImage("pro-C35 images/Hot Air Ballon-03.png");
  balloon3 = loadImage("pro-C35 images/Hot Air Ballon-04.png");

}
function setup() {
  database = firebase.database();
  database.ref("balloon/position").on("value",readPos,showError);

  createCanvas(900,600);

  balloon = createSprite(765, 385, 50, 50);
  balloon.addAnimation("rotation",balloon1,balloon2,balloon3);
  balloon.scale = 0.5;
  
}

function draw() {
  background(bgImg); 
  if(position !== undefined){ 
    if(keyDown(UP_ARROW)){
      updatePos(0,-5);
      balloon.scale = balloon.scale - 0.01;
    }

    if(keyDown(DOWN_ARROW)){
      updatePos(0,+5);
      balloon.scale = balloon.scale + 0.01;
    }

    if(keyDown(RIGHT_ARROW)){
      updatePos(+5,0);
    }

  if(keyDown(LEFT_ARROW)){
      updatePos(-5,0);
    }
  }

  textSize(15);
  fill("red");
  stroke("black");
  strokeWeight(5);
  text("Press arrow keys to move the Hot Air Balloon",50,20)

  drawSprites();
}

function updatePos(x,y){
  database.ref("balloon/position").set({
    x : position.x + x,
    y : position.y + y
  });
}

function readPos(data){
  console.log(data.val());
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error")
}