var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage
var obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6
var cloudgroup, obstaclegroup;
var gamestate = "play"
var score = 0

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")

  cloudImage = loadImage("cloud.png")
  obstacleImage1 = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage3 = loadImage("obstacle3.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  cloudgroup = new Group();
  obstaclegroup = new Group();
}

function draw() {
  background(180);
  text("Score:" + score, 518, 18);
  if (gamestate == "play") {

    //make trex jump 
    if (keyDown("space")) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8

    // Reset ground 
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    spawnClouds()
    spawnobstacles()
     if (trex.isTouching(obstaclegroup)){
  gamestate= "end"
     } 
  }
  // Make trex stand on invisible ground 
  trex.collide(invisibleGround);

 if (gamestate=="end"){
  trex.changeAnimation("collided")
    ground.velocityX=0;
   obstaclegroup.setVelocityXEach(0)
  cloudgroup.setVelocityXEach(0)
  }
  drawSprites();
}

function spawnClouds() {
  if (World.frameCount % 60 == 0) {
    //write code here to spawn the clouds
    var p = random(50, 100);
    var cloud = createSprite(600, p, 10, 10)
    cloud.addImage("cloud", cloudImage);
    cloud.velocityX = -3
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloud.lifetime = 600 / 3
    cloudgroup.add(cloud)
  }
}

function spawnobstacles() {
  if (World.frameCount % 120 == 0) {
    var a = Math.round(random(1, 6));

    var cactus = createSprite(580, 170, 12, 60)
    if (a == 1) {
      cactus.addImage("cactus", obstacleImage1)
    }
    if (a == 2) {
      cactus.addImage("cactus", obstacleImage2)
    }
    if (a == 3) {
      cactus.addImage("cactus", obstacleImage3)
    }
    if (a == 4) {
      cactus.addImage("cactus", obstacleImage4)
    }
    if (a == 5) {
      cactus.addImage("cactus", obstacleImage5)
    }
    if (a == 6) {
      cactus.addImage("cactus", obstacleImage6)
    }

    cactus.velocityX = -4
    cactus.scale = 0.6
    cactus.lifetime = 600 / 3
    obstaclegroup.add(cactus)

  }
}