
const SCL = 20; // size of each tile
var wOs, hOs; // width over SCL, height over SCL

var snake;

var score; // "length"
var food;

function setup() {

  createCanvas(860, 920);

	// initialize relative to SCL
  wOs = width / SCL;
  hOs = height / SCL;

	// push snake the middle
	snake = new TileSnake(Math.floor(wOs / 2), Math.floor(hOs / 2));
  
  score = 0;
  food = newFood();

  textAlign(CENTER);
  textSize(SCL);

  frameRate(10);
}

function draw() {

  background(0);

	/* handle snake */
	if (snake.alive) {

		if (snake.update(food)) { // snake at food

			food = newFood();
			score+=5;
		}
		snake.draw();
	}
 	else if(snake == wOs.length || snake == hOs.length){
	    gaveOver();
 	}
	else {
		gameOver();
	}

	/* draw food */
  fill(255);
  rect(food.x * SCL, food.y * SCL, SCL, SCL);

  /* draw score */
  fill(255,0,0);
  text(score, SCL, height - SCL);
  
  if(score >= 150){
    frameRate(60);
  }
  else if(score >= 100){
    frameRate(40);
  }
  else if(score >= 80){
    frameRate(35);
  }
  else if(score >= 70){
    frameRate(30);
  }
  else if(score >= 50){
    frameRate(25);
  }
  else if(score >= 40){
    frameRate(20);
  }
  else if(score >= 25){
    frameRate(15);
  }
}

/**
 * stops game, displays end game
 */
function gameOver() {
  noLoop();
  textSize(60);
  text("You lose!", width / 2, height / 2);
  textSize(25);
  text("Press Refresh to restart!", width / 2, height / 2 + 50);
}

/**
 * returns food at a random position
 */
function newFood() {

	var x = Math.floor(random(wOs));
	var y = Math.floor(random(hOs));

  return createVector(x, y);
}

/**
 * handle user input
 */
function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.direct(createVector(0, -1));
      break;
    case DOWN_ARROW:
      snake.direct(createVector(0, 1));
      break;
    case RIGHT_ARROW:
      snake.direct(createVector(1, 0));
      break;
    case LEFT_ARROW:
      snake.direct(createVector(-1, 0));
      break;
  }
}
