var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}
score=0;
localStorage[" HighestScore "] = 0;

function setup() {
  createCanvas(600, 200);
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,180,800,10);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
    
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(0);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")) {
      monkey.velocityY = -12;
    }
   monkey.velocityY = monkey.velocityY + 0.8
   monkey.collide(ground);
   spawnBanana();
   spawnObstacles();
   drawSprites();
   stroke("white");
   textSize(20)
   fill("white")
   text("Score: "+ score, 500,50);
   if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);    
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
      gameState = END
    }
  stroke("black")
  textSize(20)
  SurvivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time :"+SurvivalTime,100,50)
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100)
  }
  else if (gameState === END) {        
    //set velcity of each game object to 0
    
  reset();
  }
  
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.addImage(obstaceImage)
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  //gameState = PLAY;  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  if(localStorage[" HighestScore"]<score){
    localStorage[" HighestScore"] = score;
  }
  console.log(localStorage[" HighestScore"]);
  text("Game Over",200,100)
  score = 0;
  
}