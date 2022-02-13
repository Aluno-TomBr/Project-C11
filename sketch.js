var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg,boyCollide,boyCollideImg;
var energyDrink1,energyDrink1Img,energyDrink2,energyDrink2Img;
var bomb,bombImg,power,powerImg
var i;
var gameState = "serve";

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  boyCollideImg = loadImage ("Runer-1.png");
  energyDrink1Img = loadImage ("energyDrink.png");
  energyDrink2Img = loadImage ("energyDrink.png");
  bombImg = loadImage ("bomb.png");
  powerImg = loadImage ("power.png");
}

function setup(){
  
  createCanvas(400,400);
  
// Fundo em movimento
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

energyDrink1 = createSprite (320,100);
energyDrink1.addImage (energyDrink1Img);
energyDrink1.scale = 0.09;
energyDrink1.velocityY = 4;

energyDrink2 = createSprite (80,100);
energyDrink2.addImage (energyDrink2Img);
energyDrink2.scale = 0.09;
energyDrink2.velocityY = 4;

bomb = createSprite (200,100);
bomb.addImage (bombImg);
bomb.scale = 0.09
bomb.velocityY = 4;

//criando menino que corre
boy = createSprite(180,340,30,30);
boy.scale=0.05;
boy.addAnimation("JakeRunning",boyImg);

boyCollide = createSprite (180,340,30,30);
boyCollide.scale = 0.2;
boyCollide.addImage (boyCollideImg);
boyCollide.visible = false
  
// crie Boundary (Limite) esquerdo
leftBoundary=createSprite(0,0,50,800);
leftBoundary.visible = false;

//crie Boundary direito
rightBoundary=createSprite(410,0,50,800);
rightBoundary.visible = false;
}

function draw() {
  background(0);
  

  if (gameState == "serve"){

    gameState = "play";
  
}  else if (gameState == "end"){

    path.velocityY = 0;
    energyDrink1.velocityY = 0;
    energyDrink1.visible = false;
    energyDrink2.velocityY = 0;;
    energyDrink2.visible = false
    bomb.addImage (powerImg);
    bomb.velocityY = 0;
    bomb.scale = 0.3;
    boy.visible = false;
    boyCollide.visible = true;

    if (boy.y > 400 || boy.y < 320){

        boy.y = 350;
    }
} else {

    gameplay();
}
  drawSprites();
}

function gameplay (){

    path.velocityY = 4;
  
  // menino se movendo no eixe X com o mouse
  boy.x = World.mouseX;

  boyCollide.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //código para reiniciar o fundo
  if(path.y > 400 ){
    path.y = height/2;
  }
  if (boy.isTouching (energyDrink1) || boy.isTouching (energyDrink2)){

    if (boy.isTouching (energyDrink1)){

        energyDrink1.visible = false
    }
  
    if (boy.isTouching (energyDrink2)){

        energyDrink2.visible = false
    }

    path.velocityY = 8;
    energyDrink1.velocityY = 8;
    energyDrink2.velocityY = 8;
    bomb.velocityY = 8;
 } 
 if (boy.isTouching (bomb)){

    gameState = "end";
  }
}