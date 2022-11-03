
var player;
var devilAlive = false;
var devils = 0;
var bossCounter = 0;
var counter = 0;

Entity = function(type,id,x,y,width,height,img){
	var self = {
		type:type,
		id:id,
		x:x,
		y:y,
		width:width,
		height:height,
		img:img,
	};
	
	self.update = () => {
		self.updatePosition();
		self.draw();
	};
	self.draw = () => {
		c.save();
		var x = self.x - player.x;
		var y = self.y - player.y;
		
		x += WIDTH/2;
		y += HEIGHT/2;
		
		x -= self.width/2;
		y -= self.height/2;
		
		c.drawImage(self.img,0,0,self.img.width,self.img.height,x,y,self.width,self.height);
		c.restore();
	};
	self.getDistance = (entity2) => {	//return distance (number)
		var vx = self.x - entity2.x;
		var vy = self.y - entity2.y;
		return Math.sqrt(vx*vx+vy*vy);
	};

	self.testCollision = (entity2) => {	//return if colliding (true/false)
		var rect1 = {
			x:self.x-self.width/2,
			y:self.y-self.height/2,
			width:self.width,
			height:self.height,
		};
		var rect2 = {
			x:entity2.x-entity2.width/2,
			y:entity2.y-entity2.height/2,
			width:entity2.width,
			height:entity2.height,
		};
		return testCollisionRectRect(rect1,rect2);
		
	};
	self.updatePosition = () => {};
	
	return self;
};

Player = function(){
	var self = Actor('player','myId',50,40,50*1.5,70*1.5,Img.player,10,1);
	self.maxMoveSpd = 10;
	self.count = 0;
	self.pressingMouseLeft = false;
	self.pressingMouseRight = false;
	self.pressingSpace = false;  
	
	var super_update = self.update;
	self.update = () => {
		super_update();
		if(self.pressingRight || self.pressingLeft || self.pressingDown || self.pressingUp){
			self.spriteAnimCounter += 0.3;
		}
		if(self.pressingMouseLeft){
			self.performAttack();
		}
		if(self.pressingMouseRight){
			self.performSpecialAttack();
		}
		if(self.pressingSpace){
		  if(counter < 4){
		    self.performAOEAttack();
		  }
		  else{
		    self.performAttack();
		  }
		}
		if(self.hp === 1 && self.count < 2){
		  self.performAOEAttack();
		  self.count++;
		}
		if(self.hp > 1){
		  self.count = 0;
		}
	};
	
	var super_draw = self.draw;
	self.draw = () => {
	  super_draw();
	  
	  var x = self.x - player.x;
		var y = self.y - player.y;
		
		x += WIDTH/2;
		y += HEIGHT/2;
		
		x -= self.width/2;
		y -= self.height/2;
	  
	  var frameWidth = self.img.width/3;
		var frameHeight = self.img.height/4;
	  
	  var aimAngle = self.aimAngle;
		if(aimAngle < 0){
			aimAngle = 360 + aimAngle;
		}
	  
	  var directionMod = 2;	//draw right
		if(aimAngle >= 45 && aimAngle < 135){	//down
			directionMod = 0;
		}
		else if(aimAngle >= 135 && aimAngle < 225){	//left
			directionMod = 1;
		}
		else if(aimAngle >= 225 && aimAngle < 315){	//up
			directionMod = 3;
		}
		var walkingMod = Math.floor(self.spriteAnimCounter) % 3;//1,2
			
		c.drawImage(self.img,walkingMod * frameWidth,directionMod * frameHeight,frameWidth,frameHeight,x,y,self.width,self.height);
	};
	
	self.onDeath = () => {
		var timeSurvived = Date.now() - timeWhenGameStarted;
		console.log("You lost! You survived for " + Math.floor(timeSurvived/1000) + " seconds.");
		startNewGame();
	};
	
	
	return self;
	
};

Actor = function(type,id,x,y,width,height,img,hp,atkSpd){
	var self = Entity(type,id,x,y,width,height,img);
	
	self.hp = hp;
	self.hpMax = hp;
	self.atkSpd = atkSpd;
	self.attackCounter = 0;
	self.aimAngle = 0;
	
	self.spriteAnimCounter = 0;
	
	self.pressingDown = false;
	self.pressingUp = false;
	self.pressingLeft = false;
	self.pressingRight = false;
	self.maxMoveSpd = 3;
	
	self.draw = () => {
		c.save();
		var x = self.x - player.x;
		var y = self.y - player.y;
		
		x += WIDTH/2;
		y += HEIGHT/2;
		
		x -= self.width/2;
		y -= self.height/2;
		
		var frameWidth = self.img.width/3;
		var frameHeight = self.img.height/4;
		
		var aimAngle = self.aimAngle;
		if(aimAngle < 0){
			aimAngle = 360 + aimAngle;
		}
		
		var directionMod = 3;	//draw right
		if(aimAngle >= 45 && aimAngle < 135){	//down
			directionMod = 2;
		}
		else if(aimAngle >= 135 && aimAngle < 225){	//left
			directionMod = 1;
		}
		else if(aimAngle >= 225 && aimAngle < 315){	//up
			directionMod = 0;
		}
		
		var walkingMod = Math.floor(self.spriteAnimCounter) % 3;//1,2
		
		c.drawImage(self.img,walkingMod*frameWidth,directionMod*frameHeight,frameWidth,frameHeight,x,y,self.width,self.height);
		
		c.restore();
	};
	
	self.updatePosition = () => {
		var leftBumper = {
		  x:self.x - 40,
		  y:self.y
		};
		var rightBumper = {
		  x:self.x + 40,
		  y:self.y
		};
		var upBumper = {
		  x:self.x,
		  y:self.y - 16
		};
		var downBumper = {
		  x:self.x,
		  y:self.y + 64
		};
		
		if(Maps.current.isPositionWall(rightBumper)){
			self.x -= 5;
		} 
		else {
			if(self.pressingRight)
				self.x += self.maxMoveSpd;
		}
		
		if(Maps.current.isPositionWall(leftBumper)){
			self.x += 5;
		} 
		else {
			if(self.pressingLeft)
				self.x -= self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(downBumper)){
			self.y -= 5;
		} 
		else {
			if(self.pressingDown)
				self.y += self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(upBumper)){
			self.y += 5;
		} 
		else {
			if(self.pressingUp)
				self.y -= self.maxMoveSpd;
		}
		
		//ispositionvalid
		if(self.x < self.width/2){
			self.x = self.width/2;
		}
		if(self.x > Maps.current.width - self.width/2){
			self.x = Maps.current.width - self.width/2;
		}
		if(self.y < self.height/2){
			self.y = self.height/2;
		}
		if(self.y > Maps.current.height - self.height/2){
			self.y = Maps.current.height - self.height/2;
		}

	};
	
	var super_update = self.update;
	self.update = () => {
		super_update();
		self.attackCounter += self.atkSpd;
		if(self.hp <= 0){
			self.onDeath();
		}
	};
	self.onDeath = () => {};
	
	self.performAttack = () => {
		if(self.attackCounter > 25){	//every 1 sec
			self.attackCounter = -5;
			Bullet.generate(self);
		}
	};
	self.performSpecialAttack = () =>{
    if(self.attackCounter > 50){
        self.attackCounter = -15;
        
        
        //shotgun attack
        Bullet.generate(self,self.aimAngle - 5);
        Bullet.generate(self,self.aimAngle);
        Bullet.generate(self,self.aimAngle + 5);
    }
  };
  self.performAOEAttack = () => {
    if(self.attackCounter > 0){
      self.attackCounter = -300;
      //AOE attack
      for(var angle = 0; angle < 360; angle++){
        Bullet.generate(self,angle,type);
      }
    }
  }

	return self;
}


Enemy = function(id,x,y,width,height,img,hp,atkSpd){
	var self = Actor('enemy',id,x,y,width,height,img,hp,atkSpd);
	Enemy.list[id] = self;
	
	self.toRemove = false;
	
	var super_update = self.update;
	self.update = () => {
		super_update();
		self.spriteAnimCounter += 0.4;
		self.updateAim();
		self.updateKeyPress();
	}
	self.updateAim = () => {
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;
		
		self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180
	}
	self.updateKeyPress = () => {
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;

		self.pressingRight = diffX > 3;
		self.pressingLeft = diffX < -3;
		self.pressingDown = diffY > 3;
		self.pressingUp = diffY < -3;
	}
	
	
	var super_draw = self.draw;
	self.draw = () => {
		super_draw();
		var x = self.x - player.x + WIDTH/2;
		var y = self.y - player.y + HEIGHT/2 - self.height/2 - 20;
		
		c.save();
		c.fillStyle = 'red';
		var width = 100 * self.hp/self.hpMax;
		if(width < 0){
			width = 0;
		}
		c.fillRect(x-50,y,width,10);
		
		c.strokeStyle = 'black';
		c.strokeRect(x-50,y,100,10);
		
		c.restore();
	
	}
	
	self.updatePosition = () => {
		var leftBumper = {
		  x:self.x - 40,
		  y:self.y
		};
		var rightBumper = {
		  x:self.x + 40,
		  y:self.y
		};
		var upBumper = {
		  x:self.x,
		  y:self.y - 16
		};
		var downBumper = {
		  x:self.x,
		  y:self.y + 64
		};
		
		if(Maps.current.isPositionWall(rightBumper) && Maps.current.isPositionWall(leftBumper) && Maps.current.isPositionWall(downBumper) && Maps.current.isPositionWall(upBumper)){
		  self.x = 100;
		  self.y = 100;
		}
		if(Maps.current.isPositionWall(rightBumper)){
			self.x -= 5;
		} 
		else {
			if(self.pressingRight)
				self.x += self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(leftBumper)){
			self.x += 5;
		} 
		else {
			if(self.pressingLeft)
				self.x -= self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(downBumper)){
			self.y -= 5;
		} 
		else {
			if(self.pressingDown)
				self.y += self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(upBumper)){
			self.y += 5;
		} 
		else {
			if(self.pressingUp)
				self.y -= self.maxMoveSpd;
		}
		
		//ispositionvalid
		if(self.x < self.width/2){
			self.x = self.width/2;
		}
		if(self.x > Maps.current.width - self.width/2){
			self.x = Maps.current.width - self.width/2;
		}
		if(self.y < self.height/2){
			self.y = self.height/2;
		}
		if(self.y > Maps.current.height - self.height/2){
			self.y = Maps.current.height - self.height/2;
		}

	};
	
	self.onDeath = () => {
		self.toRemove = true;
	}
	
}

Enemy.list = {};

Enemy.update = () => {
  if(score > 7000 || killed >= 750){
    if(frameCount % 75 === 0){
      Devil.generateDevil();
      Devil.generateDevil();
      Devil.generateDevil();
    }
  }
	else if(score > 5000 || killed >= 500){
	  if(Devil.devilAlive === false){
      if(frameCount % 10 === 0){ //Non-stop spawning...basically
        Enemy.randomlyGenerate();
        Enemy.randomlyGenerate();
        Enemy.randomlyGenerate();
      }
	  }
    if(frameCount % 100 === 0){
      Devil.generateDevil();
    }
  }
  else if(score > 3000 || killed >= 300){
    if(devils < 1){
      Devil.generateDevil();
      devils++;
    }
    if(devilAlive === false){
      if(frameCount % 50 === 0){ //Every two seconds this'll be called
        Enemy.randomlyGenerate();
        Enemy.randomlyGenerate();
      }
    }
}
  else if(score > 1500 || killed >= 100){
    if(frameCount % 75 === 0){ //Every three secs a enemies will spawn
      Enemy.randomlyGenerate();
    }
}
  else{
      if(frameCount % 125 === 0){ //Normal spawning every five seconds
        Enemy.randomlyGenerate();
      }
  }
  
	for(var key in Enemy.list){
		Enemy.list[key].update();
		Enemy.list[key].performAttack();
	}
	for(var key in Enemy.list){
		if(Enemy.list[key].toRemove){
      score += 10;
      killed++;
      delete Enemy.list[key];
    }
	}
}

Enemy.randomlyGenerate = () => {
	var x = Math.random() * Maps.current.width;
	var y = Math.random() * Maps.current.height;
	var height = 64 * 1.5;
	var width = 64 * 1.5;
	var id = Math.random();
	if(Math.random() < 0.2){
	  if(score > 1500){
	    Enemy(id,x,y,width,height,Img.bat,5,1);
	  }
	  else if(score > 2000){
	    Enemy(id,x,y,width,height,Img.bat,10,1);
	  }
	  else if(score > 5000){
	    Enemy(id,x,y,width,height,Img.bat,20,1);
	  }
	  else{
	    Enemy(id,x,y,width,height,Img.bat,2,1);
	  }
	}
	else if(Math.random() < 0.4){
	  if(score > 1500){
	    Enemy(id,x,y,width,height,Img.bat2,8,3);
	  }
	  else if(score > 2000){
	    Enemy(id,x,y,width,height,Img.bat2,25,5);
	  }
	  else if(score > 5000){
	    Enemy(id,x,y,width,height,Img.bat2,40,7);
	  }
	  else{
	    Enemy(id,x,y,width,height,Img.bat2,4,1.5);
	  }
	}
	else if(Math.random() < 0.6){
	  if(score > 1500){
	    Enemy(id,x,y,width,height,Img.bat3,10,6);
	  }
	  else if(score > 2000){
	    Enemy(id,x,y,width,height,Img.bat3,20,7);
	  }
	  else if(score > 5000){
	    Enemy(id,x,y,width,height,Img.bat3,45,9);
	  }
	  else{
	    Enemy(id,x,y,width,height,Img.bat3,6,2.5);
	  }
	}
	else{
	  if(score > 1500){
	    Enemy(id,x,y,width,height,Img.bee,4,6);
	  }
	  else if(score > 2000){
	    Enemy(id,x,y,width,height,Img.bee,6,8);
	  }
	  else if(score > 5000){
	    Enemy(id,x,y,width,height,Img.bee,10,15);
	  }
	  else{
	    Enemy(id,x,y,width,height,Img.bee,1,3);
	  }
	}
}


Upgrade = function (id,x,y,width,height,category,img){
	var self = Entity('upgrade',id,x,y,width,height,img);
	
	self.updatePosition = () => {
		var leftBumper = {
		  x:self.x - 1,
		  y:self.y
		};
		var rightBumper = {
		  x:self.x + 1,
		  y:self.y
		};
		var upBumper = {
		  x:self.x,
		  y:self.y - 1
		};
		var downBumper = {
		  x:self.x,
		  y:self.y + 1
		};
		
		if(Maps.current.isPositionWall(rightBumper) && Maps.current.isPositionWall(leftBumper) && Maps.current.isPositionWall(downBumper) && Maps.current.isPositionWall(upBumper)){
		  self.x = Math.random() * Maps.current.width;
		  self.y = Math.random() * Maps.current.height;
		}
		if(Maps.current.isPositionWall(rightBumper)){
			self.x -= 5;
		} 
		else {
			if(self.pressingRight)
				self.x += self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(leftBumper)){
			self.x += 5;
		} 
		else {
			if(self.pressingLeft)
				self.x -= self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(downBumper)){
			self.y -= 5;
		} 
		else {
			if(self.pressingDown)
				self.y += self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(upBumper)){
			self.y += 5;
		} 
		else {
			if(self.pressingUp)
				self.y -= self.maxMoveSpd;
		}
		
		//ispositionvalid
		if(self.x < self.width/2){
			self.x = self.width/2;
		}
		if(self.x > Maps.current.width - self.width/2){
			self.x = Maps.current.width - self.width/2;
		}
		if(self.y < self.height/2){
			self.y = self.height/2;
		}
		if(self.y > Maps.current.height - self.height/2){
			self.y = Maps.current.height - self.height/2;
		}

	};
	
	self.category = category;
	Upgrade.list[id] = self;
}

Upgrade.list = {};

Upgrade.update = () => {
  var maxAtkSpd = 7;
	if(frameCount % 75 === 0)	//every 3 sec
		Upgrade.randomlyGenerate();
	for(var key in Upgrade.list){
    Upgrade.list[key].update();
    var isColliding = player.testCollision(Upgrade.list[key]);
      if(isColliding){
        if(Upgrade.list[key].category === 'score'){
          score += 45;
        }
        if(Upgrade.list[key].category === 'atkSpd'){
          if(player.atkSpd >= maxAtkSpd){
            player.atkSpd = maxAtkSpd;
          }
          else{
            player.atkSpd += .5;
          }
        }
        if(Upgrade.list[key].category === 'heal'){
            player.hp += 3;
        }
        delete Upgrade.list[key];
      }
  }
}

Upgrade.randomlyGenerate = () => {
	var x      = Math.random() * Maps.current.width;
	var y      = Math.random() * Maps.current.height;
	var height = 32;
	var width  = 32;
	var id     = Math.random();
	
	if(Math.random() < 0.4){
    var category = 'score';
    var img = Img.score;
  }
  else if(Math.random() < 0.8){
    var category = 'atkSpd';
    var img = Img.speed;
  }
  else{
    var category = 'heal';
    var img = Img.health
  }
	
	Upgrade(id,x,y,width,height,category,img);
}


Bullet = function(id,x,y,spdX,spdY,width,height,combatType,img){
	var self = Entity('bullet',id,x,y,width,height,img);
	
	self.timer      = 0;
	self.combatType = combatType;
	self.spdX       = spdX;
	self.spdY       = spdY
	self.toRemove   = false;
	
	var super_update = self.update;
	self.update = () => {
		super_update();
		self.timer++;
		if(self.timer > 50){
			self.toRemove = true;
		}
		
		
		if(self.combatType === 'player'){	//bullet was shot by player
			for(var key2 in Enemy.list){
				if(self.testCollision(Enemy.list[key2])){
					self.toRemove = true;
					Enemy.list[key2].hp--;
				}
			}
			for(var key3 in Devil.list){
				if(self.testCollision(Devil.list[key3])){
					self.toRemove = true;
					Devil.list[key3].hp--;
				}
			}
		} 
		else if(self.combatType === 'enemy' || self.combatType === 'devil'){
			if(self.testCollision(player)){
				self.toRemove = true;
				player.hp--;
			}
		}
		if(Maps.current.isPositionWall(self)){
			self.toRemove = true;
		}
		
	}
	
	self.updatePosition = () => {
		self.x += self.spdX;
		self.y += self.spdY;
				
		if(self.x < 0 || self.x > Maps.current.width){
			self.spdX = -self.spdX;
		}
		if(self.y < 0 || self.y > Maps.current.height){
			self.spdY = -self.spdY;
		}
	}
	
	
	Bullet.list[id] = self;
}

Bullet.list = {};

Bullet.update = () => {
	for(var key in Bullet.list){
		var b = Bullet.list[key];
		b.update();
		
		if(b.toRemove){
			delete Bullet.list[key];
		}
	}
}

Bullet.generate = (actor,aimOverwrite) => {
	var x = actor.x;
	var y = actor.y;
	var height = 24;
	var width = 24;
	var id = Math.random();
	
	var angle;
	if(aimOverwrite !== undefined){
		angle = aimOverwrite;
	}
	else{
	  angle = actor.aimAngle;
	} 
	
	var spdX = Math.cos(angle/180*Math.PI)*15;
	var spdY = Math.sin(angle/180*Math.PI)*15;
	if(x === player.x){
	  Bullet(id,x,y,spdX,spdY,width,height,actor.type, Img.tears);
	}
	else{
	  Bullet(id,x,y,spdX,spdY,width,height,actor.type, Img.bullet);
	}
}


Devil = function(id,x,y,width,height,img,hp,atkSpd){
  var self = Actor('devil',id,x,y,width,height,img,hp,atkSpd);
	Devil.list[id] = self;
	
	self.toRemove = false;
	self.devilAlive = false;
	self.maxMoveSpd = 6;
	
	var super_update = self.update;
	self.update = () => {
		super_update();
		self.spriteAnimCounter += 0.4;
		self.updateAim();
		self.updateKeyPress();
	}
	
	self.updateAim = () => {
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;
		
		self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180
	}
	self.updateKeyPress = () => {
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;

		self.pressingRight = diffX > 3;
		self.pressingLeft = diffX < -3;
		self.pressingDown = diffY > 3;
		self.pressingUp = diffY < -3;
	}
	
	self.updatePosition = () => {
		var leftBumper = {
		  x:self.x - 40,
		  y:self.y
		};
		var rightBumper = {
		  x:self.x + 40,
		  y:self.y
		};
		var upBumper = {
		  x:self.x,
		  y:self.y - 16
		};
		var downBumper = {
		  x:self.x,
		  y:self.y + 64
		};
		
		if(Maps.current.isPositionWall(rightBumper) && Maps.current.isPositionWall(leftBumper) && Maps.current.isPositionWall(downBumper) && Maps.current.isPositionWall(upBumper)){
		  self.x = Math.random() * Maps.current.width;
		  self.y = Math.random() * Maps.current.height;
		}
		if(Maps.current.isPositionWall(rightBumper)){
			self.x -= 5;
		} 
		else {
			if(self.pressingRight)
				self.x += self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(leftBumper)){
			self.x += 5;
		} 
		else {
			if(self.pressingLeft)
				self.x -= self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(downBumper)){
			self.y -= 5;
		} 
		else {
			if(self.pressingDown)
				self.y += self.maxMoveSpd;
		}
		if(Maps.current.isPositionWall(upBumper)){
			self.y += 5;
		} 
		else {
			if(self.pressingUp)
				self.y -= self.maxMoveSpd;
		}
		
		//ispositionvalid
		if(self.x < self.width/2){
			self.x = self.width/2;
		}
		if(self.x > Maps.current.width - self.width/2){
			self.x = Maps.current.width - self.width/2;
		}
		if(self.y < self.height/2){
			self.y = self.height/2;
		}
		if(self.y > Maps.current.height - self.height/2){
			self.y = Maps.current.height - self.height/2;
		}

	};
	
	var super_draw = self.draw;
	self.draw = () => {
		super_draw();
		var x = self.x - player.x + WIDTH/2;
		var y = self.y - player.y + HEIGHT/2 - self.height/2 - 20;
		
		c.save();
		c.fillStyle = 'black';
		var width = 100 * self.hp/self.hpMax;
		if(width < 0){
			width = 0;
		}
		c.fillRect(x-50,y,width,10);
		
		c.strokeStyle = 'white';
		c.strokeRect(x-50,y,100,10);
		
		c.restore();
	
	}
	
	self.onDeath = () => {
		self.toRemove = true;
		devilAlive = false;
	}
}

Devil.list = {};

Devil.update = () => {
	for(var key3 in Devil.list){
		Devil.list[key3].update();
		Devil.list[key3].performAttack();
	}
	for(var key3 in Devil.list){
		if(Devil.list[key3].toRemove){
      score += 150;
      devilsKilled++;
      delete Devil.list[key3];
    }
	}
}

Devil.generateDevil = () => {
  var choice = Math.random();
  var x = Math.random() * Maps.current.width;
	var y = Math.random() * Maps.current.height;
	var height = 128 * 1.5;
	var width = 128 * 1.5;
	var id = Math.random();
	devilAlive = true;
	
	if(choice < 0.2){
	  Devil(id,x,y,width,height,Img.boss,75,5);
	}
	else if(choice < 0.4){
	  Devil(id,x,y,width,height,Img.boss1,200,1.5);
	}
	else if(choice < 0.6){
	  Devil(id,x,y,width,height,Img.boss2,40,10);
	}
	else if(choice < 0.8){
	  Devil(id,x,y,width,height,Img.boss3,10,100);
	}
	else{
	  Devil(id,x,y,width,height,Img.boss4,250,0.9);
	}
}
































