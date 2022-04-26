var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pez;
var piraña;
//var coral;
//var alga;
var fondoMarino; 
var score=0;

function preload(){

pezRuninng = loadAnimation("imagen/pez1.png","imagen/pez2.png","imagen/pez3.png");
pezGameOver = loadImage("imagen/pezGameOver.png");
backgroundImg = loadImage("imagen/fondoMarino.png");
pirañaRuning = loadAnimation("imagen/piraña2.png","imagen/piraña3.png");
coralImage = loadImage("imagen/coral.png");
algaImage = loadImage("imagen/alga.png")
gameOverImg = loadImage("imagen/gameOver.png");
restartImg = loadImage("imagen/restart.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    pez=createSprite(50,350,40,20,30);
    pez.addAnimation("Runing",pezRuninng);
    pez.addAnimation("pezGameOver",pezGameOver);
    pez.setCollider('circle',0,0,350)
    pez.scale = 0.50;

    piraña=createSprite(160,250,50,30)
    piraña.addAnimation("RuningPiraña",pirañaRuning)
    piraña.setCollider('circle',0,0,350)
    piraña.scale=0.40

    //invisibleGround = createSprite(width/2,height-10,width,125);  
    //invisibleGround.shapeColor = "#f4cbaa";

    gameOver = createSprite(width/2,height/2- 50);
    gameOver.addImage(gameOverImg);

    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);

    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
  
    gameOver.scale = 0.5;
    restart.scale = 0.1;

    gameOver.visible = false;
    restart.visible = false;

    coralGroup = new Group();
    algaGroup = new Group();
    
    score = 0;
}

function draw(){
background(backgroundImg);
textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
  }

if(touches.length > 0 || keyDown("UP ARROW")||keyDown("DOWN ARROW") && pez.y  >= height-120) {
  //sonido 
      //jumpSound.play( )
      pez.velocityY = -10;
       touches = []; 
}
  pez.velocityY = pez.velocityY + 0.8

  spawnAlga();
    spawnCoral();
            // collidedSound.play()      
    if(coralGroup.isTouching(pez)){
        gameState = END;
    }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //ground.velocityX = 0;
    pez.velocityY = 0;
    coralGroup.setVelocityXEach(0);
    algaGroup.setVelocityXEach(0);

    pez.changeAnimation("pezGameOver",pezGameOver);

    coralGroup.setLifetimeEach(-1);
    algaGroup.setLifetimeEach(-1);

    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  
drawSprites();
}
function spawnAlga() {
  //write code here to spawn the alga
  if (frameCount % 60 === 0) {
    var alga = createSprite(width+20,height-300,40,10);
    alga.y = Math.round(random(100,220));
    alga.addImage(algaImage);
    alga.scale = 0.5;
    alga.velocityX = -3;
    
     //assign lifetime to the variable
    alga.lifetime = 300;
    
    //adjust the depth
    alga.depth = pez.depth;
    pez.depth = pez.depth+1;
    
    //add each alga to the group
    algaGroup.add(alga);
  }
}
function spawnCoral() {
    if(frameCount % 60 === 0) {
      var coral = createSprite(600,height-95,20,30);
      coral.setCollider('circle',0,0,45)
      // coral.debug = true
    
      coral.velocityX = -(6 + 3*score/100);
      
      //generate random coral
      var rand = Math.round(random(1));
      switch(rand) {
        case 1: coral.addImage(coralImage);
                break;
        
      }
      
      coral.scale = 0.3;
      coral.lifetime = 300;
      coral.depth = pez.depth;
      pez.depth +=1;
      
      coralGroup.add(coral);
    }
  }
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    coralGroup.destroyEach();
    algaGroup.destroyEach();
    
    pez.changeAnimation("running",pezRuninng);
    
    score = 0;
    
  }
}
