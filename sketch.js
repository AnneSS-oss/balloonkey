var bg;
var balloon,balloonImage;
var database,position,balloonposition;

function preload() {
bg = loadImage("cityImage.png");
balloonImage = loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png");


}
function setup() {
  createCanvas(800,400);
  database = firebase.database();
  balloon = createSprite(250,250,50,50);
  balloon.addAnimation("running",balloonImage);
  balloon.scale = 0.5;
  

  balloonposition = database.ref("Balloon/Position");
  balloonposition.on("value", readposition, showerror);
  
}


function draw() {
  background(bg);  
  
  if(keyDown(LEFT_ARROW)){
    writeposition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writeposition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writeposition(0,-1);
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    writeposition(0,+1);
    balloon.scale=balloon.scale+0.01;
  }

  drawSprites();
}


function writeposition(x,y){
  database.ref("Balloon/Position").set({
  x : balloon.x + x,
  y : balloon.y + y
  })
}

function readposition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y
}
function showerror() {
  console.log("error");
}