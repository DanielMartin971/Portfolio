
//Initial Setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

var TILE_SIZE = 32;
var WIDTH = 640;
var HEIGHT = 360;
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 360;
var timeWhenGameStarted = Date.now();	//return time in ms

let resizeCanvas = () => {
  CANVAS_WIDTH = window.innerWidth - 10;
  CANVAS_HEIGHT = window.innerHeight - 10;
  
  let ratio = 16/9;
  if(CANVAS_HEIGHT < CANVAS_WIDTH / ratio){
    CANVAS_WIDTH = CANVAS_HEIGHT * ratio;
  }
   else{
     CANVAS_HEIGHT = CANVAS_WIDTH / ratio;
   }
   
   WIDTH = CANVAS_WIDTH;
   HEIGHT = CANVAS_HEIGHT;
  
  canvas.width = CANVAS_WIDTH - 10;
  canvas.height = CANVAS_HEIGHT;
  
  canvas.font = '30px Arial';
  c.mozImageSmoothingEnabled = false;	//better graphics for pixel art
  c.msImageSmoothingEnabled = false;
  c.imageSmoothingEnabled = false;
  
};
resizeCanvas();

window.addEventListener('resize', () => {
  resizeCanvas();
});

var frameCount = 0;

/*
  --This little portion revolves around scoring--
*/
var score = 0;
var killed = 0;
var devilsKilled = 0;
/////////////////////////////////////////////

var paused = false;

var Img = {};
  Img.player = new Image();
  Img.player.src = 'img/issac.png';
  Img.player2 = new Image();
  Img.player2.src = 'img/person.png';
  
  Img.bat = new Image();
  Img.bat.src = 'img/bat.png';
  Img.bat2 = new Image();
  Img.bat2.src = 'img/bat2.png';
  Img.bat3 = new Image();
  Img.bat3.src = 'img/bat3.png';
  Img.bee = new Image();
  Img.bee.src = 'img/bee.png';
  
  Img.boss = new Image();
  Img.boss.src = 'img/boss.png';
  Img.boss1 = new Image();
  Img.boss1.src = 'img/boss1.png';
  Img.boss2 = new Image();
  Img.boss2.src = 'img/boss2.png';
  Img.boss3 = new Image();
  Img.boss3.src = 'img/boss3.png';
  Img.boss4 = new Image();
  Img.boss4.src = 'img/boss4.png';
  
  Img.bullet = new Image();
  Img.bullet.src = 'img/bullet.png';
  Img.tears = new Image();
  Img.tears.src = 'img/tears1.png';
  
  Img.health = new Image();
  Img.health.src = 'img/health.png';
  Img.score = new Image();
  Img.score.src = 'img/score.png';
  Img.speed = new Image();
  Img.speed.src = 'img/speed.png';
  

/*
  --This is for the html to update the scores and make them visible--
*/
var healthPoints = document.getElementById('health');
var scorePoints = document.getElementById('score');
var killPoints = document.getElementById('kills');
var devilPoints = document.getElementById('dKills');
////////////////////////////////////////////////////////////

testCollisionRectRect = (rect1,rect2) => {
	return rect1.x <= rect2.x + rect2.width
		  && rect2.x <= rect1.x + rect1.width
		  && rect1.y <= rect2.y + rect2.height
		  && rect2.y <= rect1.y + rect1.height;
};

document.onmousedown = (e) => {
	if(e.which === 1)
		player.pressingMouseLeft = true;
	else
		player.pressingMouseRight = true;
};
document.onmouseup = (e) => {
	if(e.which === 1)
		player.pressingMouseLeft = false;
	else
		player.pressingMouseRight = false;
};
document.oncontextmenu = (e) => {
	e.preventDefault();
};

document.onmousemove = (e) => {
	var mouseX = e.clientX - canvas.getBoundingClientRect().left;
	var mouseY = e.clientY - canvas.getBoundingClientRect().top;
	
	mouseX -= WIDTH/2;
	mouseY -= HEIGHT/2;
	
	player.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * 180;
};

document.onkeydown = (e) => {
	if(e.keyCode === 68){	//d
		player.pressingRight = true;
	}
	else if(e.keyCode === 83){	//s
		player.pressingDown = true;
	}
	else if(e.keyCode === 65){ //a
		player.pressingLeft = true;
	}
	else if(e.keyCode === 87){ // w
		player.pressingUp = true;
	}
	else if(e.keyCode === 32){
	  e.preventDefault();
	  player.pressingSpace = true;
	}
		
	else if(e.keyCode === 80){ //p
		paused = !paused;
	}
};

document.onkeyup = (e) => {
	if(e.keyCode === 68){	//d
		player.pressingRight = false;
	}
	else if(e.keyCode === 83){	//s
		player.pressingDown = false;
	}
	else if(e.keyCode === 65){ //a
		player.pressingLeft = false;
	}
	else if(e.keyCode === 87){ // w
		player.pressingUp = false;
	}
	else if(e.keyCode === 32){
	  e.preventDefault();
	  counter++;
	  player.pressingSpace = false;
	}
};

update = () => {
	if(paused){
		c.fillText('Paused',WIDTH/2,HEIGHT/2);
		return;
	}
	
	c.clearRect(0,0,WIDTH,HEIGHT);
	Maps.current.draw();
	frameCount++;
	if(frameCount % 25 == 0){
	  score++;
	}
	
	
	Bullet.update();
	Upgrade.update();
	Enemy.update();
	Devil.update();
	
	player.update();
	
	healthPoints.innerHTML = player.hp;
  scorePoints.innerHTML = score;
  killPoints.innerHTML = killed;
  devilPoints.innerHTML = devilsKilled;
}

startNewGame = () => {
  /*
    --This little portion is for the player when the game restarts--
  */
  player.x = 300;
  player.y = 1000;
	player.hp = 10;
	player.atkSpd = 1;
	player.count = 0;
  player.attackCounter = 0;
  timeWhenGameStarted = Date.now();
  ///////////////////////////
  /*
    --Enemy stuff--
  */
  killed = 0;
  devilsKilled = 0;
	frameCount = 0;
	score = 0;
	counter = 0;
	bossCounter = 0;
	devilAlive = false;
	Enemy.list = {};
	Upgrade.list = {};
	Bullet.list = {};
	Devil.list = {};
	Enemy.randomlyGenerate();
	Enemy.randomlyGenerate();
	Enemy.randomlyGenerate();
	
}

Maps = (id,imgSrc,grid) => {
	var self = {
		id:id,
		image:new Image(),
		width:grid[0].length * TILE_SIZE,
		height:grid.length * TILE_SIZE,
		grid:grid,
	}
	self.image.src = imgSrc;
	
	self.isPositionWall = (pt) => {
		var gridX = Math.floor(pt.x / TILE_SIZE);
		var gridY = Math.floor(pt.y / TILE_SIZE);
		if(gridX < 0 || gridX >= self.grid[0].length)
			return true;
		if(gridY < 0 || gridY >= self.grid.length)
			return true;
		return self.grid[gridY][gridX];
	}
	
	self.draw = () => {
		var x = WIDTH/2 - player.x;
		var y = HEIGHT/2 - player.y;
		c.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,self.image.width*2,self.image.height*2);
	}
	return self;
}

var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 502, 502, 502, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 
var array2D = [];
for(var i = 0 ; i < 40; i++){
	array2D[i] = [];
	for(var j = 0 ; j < 40; j++){
		array2D[i][j] = array[i * 40 + j];
	}
}

Maps.current = Maps('field','img/map2.png',array2D);

player = Player();
startNewGame();

setInterval(update,40);

