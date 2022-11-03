//Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 500;
var timeWhenGameStarted = Date.now(); //return time in miliseconds

c.font = '30px Arial';


var frameCount = 0;

var score = 0;

var player = {
  x: 50,
  spdX: 30,
  y: 50,
  spdY: 5,
  name: 'P',
  hp: 10,
  width: 20,
  height: 20,
  color: 'green'
};

var enemyList = {};
var upgradeList = {};
var bulletList = {};



getDistanceBetweenEntity = (entity1,entity2) => { //return distance (number)
  var vx = entity1.x - entity2.x;
  var vy = entity1.y - entity2.y;
  return Math.sqrt(vx*vx + vy*vy);
}

testCollisionEntity = (entity1,entity2) => { //return if colliding (true/false)
  var rect1 = {
    x:entity1.x - entity1.width/2,
    y:entity1.y - entity1.height/2,
    width:entity1.width,
    height:entity1.height
  };
  var rect2 = {
    x:entity2.x - entity2.width/2,
    y:entity2.y - entity2.height/2,
    width:entity2.width,
    height:entity2.height
  };
  return testCollisionRectRect(rect1,rect2);
}


Enemy = (id,x,y,spdX,spdY,width,height) => {
  var enemy3 = {
    x: x,
    spdX: spdX,
    y: y,
    spdY: spdY,
    name: 'E',
    id: id,
    width: width,
    height: height,
    color: 'red'
  };
  enemyList[id] = enemy3;
}

randomlyGenerateEnemy = () =>{
  var x = Math.floor(Math.random() * canvas.width);
  var y = Math.floor(Math.random() * canvas.height)
  var height = Math.floor(Math.random() * 30); //between 10 and 40
  var width = Math.floor(Math.random() * 30);
  var id = Math.random();
  var spdX = 5 + Math.random() * 5;
  var spdY = 5 + Math.random() * 5;
  Enemy(id,x,y,spdX,spdY,width,height);
}


Upgrade = (id,x,y,spdX,spdY,width,height) => {
  var upgrade = {
    x: x,
    spdX: spdX,
    y: y,
    spdY: spdY,
    name: 'E',
    id: id,
    width: width,
    height: height,
    color: 'orange'
  };
  upgradeList[id] = upgrade;
}

randomlyGenerateUpgrade = () =>{
  var x = Math.floor(Math.random() * canvas.width);
  var y = Math.floor(Math.random() * canvas.height)
  var height = 10; //between 10 and 40
  var width = 10;
  var id = Math.random();
  var spdX = 0;
  var spdY = 0;
  Upgrade(id,x,y,spdX,spdY,width,height);
}



document.onmousemove = (mouse) => {
  var mouseX = mouse.clientX - document.querySelector('canvas').getBoundingClientRect().left;
  var mouseY = mouse.clientY - document.querySelector('canvas').getBoundingClientRect().top;
  
  if(mouseX < player.width/2){
    mouseX = player.width/2;
  }
  if(mouseX > canvas.width - player.width/2){
    mouseX = canvas.width - player.width/2;
  }
  if(mouseY < player.height/2){
    mouseY = player.height/2;
  }
  if(mouseY > canvas.height - player.height/2){
    mouseY = canvas.height - player.height/2;
  }
  
  player.x = mouseX;
  player.y = mouseY;
}


updateEntity  = (something) => {
  updateEntityPosition(something);
  drawEntity(something);

}
updateEntityPosition = (something) => {
  something.x += something.spdX;
  something.y += something.spdY;
  
  if(something.x > canvas.width || something.x < 0){
    something.spdX = -something.spdX;
  }
  if(something.y > canvas.height || something.y < 0){
    something.spdY = -something.spdY;
  }
}

testCollisionRectRect = (rect1,rect2) => {
  return rect1.x <= rect2.x + rect2.width
      && rect2.x <= rect1.x + rect1.width
      && rect1.y <= rect2.y + rect2.height
      && rect2.y <= rect1.y + rect1.height
}

drawEntity = (something) => {
  c.save();
  c.fillStyle = something.color;
  c.fillRect(something.x - something.width/2, something.y - something.height/2,something.width,something.height);
  c.restore();
}

update = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
  frameCount++;
  
  if(frameCount % 25 === 0){ //Every sec you'll get a score added
      score++;
  }
  if(frameCount % 100 === 0){ //Every 4 secs this'll be called
    randomlyGenerateEnemy();
  }
  if(frameCount % 300 === 0){ //Every 12 secs this'll be called
    randomlyGenerateUpgrade();
  }
  
  for(var key in bulletList){
    updateEntity(bulletList[key]);
  }
  
  for(var key in upgradeList){
    updateEntity(upgradeList[key]);
    
    var isColliding = testCollisionEntity(player,upgradeList[key]);
    if(isColliding){
      player.hp += 3;
      delete upgradeList[key];
    }
  }
  
  for(var key in enemyList){ //E1, E2
    updateEntity(enemyList[key]);
    
    var isColliding = testCollisionEntity(player,enemyList[key]);
    if(isColliding){
      player.hp--;
    }
    
  }
  if(player.hp == 0){
    var timeSurvived = Date.now() - timeWhenGameStarted;
    
    document.write('You lose! You survived this long: ' + score + ' seconds.' + '<br><button type="button" onClick="refreshPage()">Retry?</button>');
      startNewGame();
  }
  
  drawEntity(player);
  c.fillText(player.hp + ' Hp',0,30);
  c.fillText('Seconds:' + score,200,30);
}
startNewGame = () => {
  player.hp = 10;
  timeWhenGameStarted = Date.now();
  frameCount = 0;
  score = 0;
  enemyList = {};
  upgradeList = {};
  
  randomlyGenerateEnemy();
  randomlyGenerateEnemy();
  randomlyGenerateEnemy();
}


startNewGame();

setInterval(update, 40);











































































