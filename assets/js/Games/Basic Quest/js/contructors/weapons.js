

var weapons = [];

function Weapon(defense,health,magic,name,price,speed,strength,type){
  var arm = {
    defense: defense,
    health: health,
    magic: magic,
    name: name.trim(),
    price: price,
    speed: speed,
    strength: strength,
    type: type.trim(),
  };
  
  weapons.push(arm);
  
}

Weapon(0,0,0,'Club',100,0,1,'Blunt');
Weapon(0,0,0,'Stick',25,0,0.2,'Blunt');
Weapon(0,0,0,'Rock',10,0,0.5,'Blunt');
Weapon(0,0,0.5,'Magic Rock',50,0,0,'Blunt');
Weapon(0,0,0,'Dagger',250,0,1.5,'Knife');
Weapon(1,5,0,'Hidden Blade',5000,1,4,'Special');
Weapon(1,2,1,'Katana',2500,0,2.5,'Katana');
Weapon(0.5,4,0,"Fallen Bane",5000,1,3,'Katana');
Weapon(0,0,0,'Shiv',250,0.5,1,'Knife');
Weapon(0,0,1,'Staff',200,0,0.5,'Staff');
Weapon(1,0,5,'Magic Missle',5000,0,1,'Staff');
Weapon(0,0,0,'Sword',200,0,1.5,'Sword');
Weapon(1.5,7,1,'Sword of Onyx',5000,1,4,'Sword');
Weapon(0,0,0,'Iron Sword',300,0,2,'Sword');
Weapon(1,0,0,'Hammer',750,-1,2.5,'Blunt');
Weapon(1,4,2,'Taloc',5000,0,3,'Special');
Weapon(0,0,0,'Knife',500,0.5,1.5,'Knife');
Weapon(0,0,0,'Shank',100,0.5,1,'Knife');
Weapon(0,0,0,'Prison Shank',500,0,3,'Knife');
Weapon(0,0,0,'Whip',200,1,1,'Special');
Weapon(0,0,0,'Spear',500,0,2,'Special');
Weapon(1,3,3,'Mytheral Sword',6000,1.5,4,'Sword');
Weapon(3,7,7,"Death's Scythe",30000,-2,7,'Scythe');
Weapon(0.5,5,4,"Dread",15000,-1,4,'Scythe');
Weapon(1.5,5,2,"Matusuma",15000,1.5,6,'Sword');
Weapon(1,2,2,"Talon",5000,1,4,'Special');
Weapon(0.5,0.5,0,"Rapier",3000,2,4.5,'Sword');
Weapon(3,7,5," Dragonbone",150000,-3,25,'Sword');
Weapon(0.5,6,15,"Ultriues",150000,-1,3,'Staff');
Weapon(1,3,0,"MIDA MultiTool",5000,2,4,'Sword');
Weapon(0.5,4,0,"Valyrian Sword",5000,1,3,'Sword');
Weapon(0,0,0,"None",0,0,0,'Special');
Weapon(1,4,1,"CaneSword",5000,1,3,'Special');
Weapon(0,2,3,"Angelic Sword",5000,-2,3,'Special');
Weapon(1,0,3,"Soulbane",5000,0,3,'Special');
Weapon(0,5,2,"Glade",5000,2,1,'Dagger');
Weapon(1,3,6,"DragonGlass",50000,1,9,'Sword');

