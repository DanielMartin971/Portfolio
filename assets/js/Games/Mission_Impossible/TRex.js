var counter = 1;

var lvl2 = 500;
var lvl3 = 1000;
var lvl4 = 1500;
var lvl5 = 2000;
var lvl6 = 2500;
var lvl7 = 3000;
var fml  = 4000;

function TRex(x, y, radius) {

	this.x = x;
	this.y = y;

	this.yVelocity = 0;
	this.speed     = 1;
	this.onGround  = true;

	this.radius = radius; // size of circle
}

/**
	*	handle y values
	*/
TRex.prototype.update = function(platform) {
	var bottom = this.y + this.radius; // bottom pixel of circle
	var nextBottom = bottom + this.yVelocity; // calculate next frame's bottom

  if (bottom <= platform && nextBottom >= platform) { // next frame will be on platform
		this.yVelocity = 0; // reset velocity
		this.y = platform - this.radius; // don't go past platform
		this.onGround = true;
  } 
  else if (platform - bottom > 1) { // nowhere near platform
		this.yVelocity += this.speed; // increase velocity
		this.onGround = false;
  }

	/* movement */
	this.y += this.yVelocity;
};

/**
	* make the dino jump
	*/
TRex.prototype.jump = function() {
	this.yVelocity = -(this.radius * 0.7); // jump
	
	if(score >= fml){
	  this.yVelocity = -(this.radius * 9999);
	 counter = "You're screwed";
	 obstacleSpeed = 9999;
	}
	else if(score >= lvl7){
	  this.yVelocity = -(this.radius * 2);
	  counter       = 5;
	  obstacleSpeed = 9;
	}
	else if(score >= lvl6){
	  this.yVelocity = -(this.radius * 1.5);
	  counter       = 5;
	  obstacleSpeed = 8.5;
	}
	else if(score >= lvl5){
	  this.yVelocity = -(this.radius * 1.2);
	  counter       = 5;
	  obstacleSpeed = 7;
	}
	else if(score >= lvl4){
	  this.yVelocity = -(this.radius * 1);
	  counter       = 4;
	  obstacleSpeed = 6.5;
	}
	else if(score >= lvl3){
	  this.yVelocity = -(this.radius * 0.9);
	  counter       = 3;
	  obstacleSpeed = 5;
	}
	else if(score >= lvl2){
	  this.yVelocity = -(this.radius * 0.8);
	  counter       = 2;
	  obstacleSpeed = 4.5;
	}
	
	if(this.y - radius >= window.innerHeight){
	  this.yVelocity = -this.yVelocity;
	}
};

TRex.prototype.draw = function() {
  fill('#ff3300');
	stroke(255);
	strokeWeight(2);
  ellipse(this.x, this.y, this.radius * 2);
};
