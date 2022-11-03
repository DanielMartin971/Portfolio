var horizon;
var obstacleSpeed;

var score;
var obstacles = [];

var dino;

const colors = [
  '#00ace6',
  '#00cccc',
  '#4d94ff',
  '#404040',
  '#ff3300',
  '#e60000',
  '#1a8cff',
  '#00ffcc',
  '#00ccff',
  '#003399',
  '#66ff66'
];


function randomColors(colors){
  return colors[Math.floor(Math.random() * colors.length)];
}

function setup() {

  createCanvas(window.innerWidth, window.innerHeight/2);

  textAlign(CENTER);

  horizon = height - 40;

	score         = 0;
	obstacleSpeed = 4;

	var size = 20;
	dino = new TRex(size * 2, height - horizon, size);

  textSize(20);
}

function draw() {
  background(0);

	drawHUD();

	handleLevel(frameCount);

	dino.update(horizon);

  handleObstacles();
}

/**
	* draws horizon & score
	*/
function drawHUD() {

  /* draw horizon */
  stroke(255);
	strokeWeight(2);
  line(0, horizon, width, horizon);

	/* draw score */
	noStroke();
	fill(255);
  text("Score: " + score, width / 2, 30);
  
  //draw level
  text("Level: " + counter, width / 2, 50);

	/* draw T-Rex */
	stroke(255);
	strokeWeight(1);
	dino.draw();
}

/**
	*	updates, draws, and cleans out the obstacles
	*/
function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();

		if (obstacles[i].hits(dino)) // if there's a collision
			endGame();

    if (!obstacles[i].onScreen) // if it's no longer showing
      obstacles.splice(i, 1); // delete from array
  }
}


/**
	* speeds game up, pushes new obstacles, & handles score
	*/
function handleLevel(n) {
  if (n % 50 === 0) { // every 0.5 seconds
    var n = noise(n); // noisey
    if (n > 0.5)
      newObstacle(n); // push new obstacle
  }
	score++;
}

/**
	* pushes random obstacle
	*/
function newObstacle(n) {

	var col  = randomColors(colors);
	var size = random(20) + 20;
  var obs  = new Obstacle(width + size, size, horizon, col);

  obstacles.push(obs);
}

function keyPressed() {

	if ((keyCode === UP_ARROW || keyCode === 32) && dino.onGround) // jump if possible
		dino.jump();
}

function endGame() {

	noLoop();
  noStroke();
  fill(200);
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Hit Refresh to restart", width / 2, height / 2 + 20);
}
