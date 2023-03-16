

var weapons = [];

class Weapon {
  constructor(def, hp, mag, name, price, spd, str, type){
    this.def = def;
    this.hp = hp;
    this.mag = mag;
    this.name = name;
    this.price = price;
    this.spd = spd;
    this.str = str;
    this.type = type;

    weapons.push(this);
  }
}

const club = new Weapon(0,0,0,'Club',100,0,1,'Blunt');
const stick = new Weapon(0,0,0,'Stick',25,0,0.2,'Blunt');
const rock = new Weapon(0,0,0,'Rock',10,0,0.5,'Blunt');
const magicRock = new Weapon(0,0,0.5,'Magic Rock',50,0,0,'Blunt');
const dagger = new Weapon(0,0,0,'Dagger',250,0,1.5,'Knife');
const hidden = new Weapon(1,5,0,'Hidden Blade',5000,1,4,'Special');
const katana = new Weapon(1,2,1,'Katana',2500,0,2.5,'Katana');
const fallen = new Weapon(0.5,4,0,"Fallen Bane",5000,1,3,'Katana');
const shiv = new Weapon(0,0,0,'Shiv',250,0.5,1,'Knife');
const staff = new Weapon(0,0,1,'Staff',200,0,0.5,'Staff');
const magicMissle = new Weapon(1,0,5,'Magic Missle',5000,0,1,'Staff');
const sword = new Weapon(0,0,0,'Sword',200,0,1.5,'Sword');
const onyx = new Weapon(1.5,7,1,'Sword of Onyx',5000,1,4,'Sword');
const iron = new Weapon(0,0,0,'Iron Sword',300,0,2,'Sword');
const hammer = new Weapon(1,0,0,'Hammer',750,-1,2.5,'Blunt');
const taloc = new Weapon(1,4,2,'Taloc',5000,0,3,'Special');
const knife = new Weapon(0,0,0,'Knife',500,0.5,1.5,'Knife');
const shank = new Weapon(0,0,0,'Shank',100,0.5,1,'Knife');
const prison = new Weapon(0,0,0,'Prison Shank',500,0,3,'Knife');
const whip = new Weapon(0,0,0,'Whip',200,1,1,'Special');
const spear = new Weapon(0,0,0,'Spear',500,0,2,'Special');
const mytheral = new Weapon(1,3,3,'Mytheral Sword',6000,1.5,4,'Sword');
const death = new Weapon(3,7,7,"Death's Scythe",30000,-2,7,'Scythe');
const dread = new Weapon(0.5,5,4,"Dread",15000,-1,4,'Scythe');
const matusuma = new Weapon(1.5,5,2,"Matusuma",15000,1.5,6,'Sword');
const talon = new Weapon(1,2,2,"Talon",5000,1,4,'Special');
const raiper = new Weapon(0.5,0.5,0,"Rapier",3000,2,4.5,'Sword');
const dragonBone = new Weapon(3,7,5," Dragonbone",150000,-3,25,'Sword');
const ultriues = new Weapon(0.5,6,15,"Ultriues",150000,-1,3,'Staff');
const mida = new Weapon(1,3,0,"MIDA MultiTool",5000,2,4,'Sword');
const valyrian = new Weapon(0.5,4,0,"Valyrian Sword",5000,1,3,'Sword');
const none = new Weapon(0,0,0,"None",0,0,0,'Special');
const caneSword = new Weapon(1,4,1,"CaneSword",5000,1,3,'Special');
const angelicSword = new Weapon(0,2,3,"Angelic Sword",5000,-2,3,'Special');
const soulBane = new Weapon(1,0,3,"Soulbane",5000,0,3,'Special');
const glade = new Weapon(0,5,2,"Glade",5000,2,1,'Dagger');
const dragonGlass = new Weapon(1,3,6,"DragonGlass",50000,1,9,'Sword');

