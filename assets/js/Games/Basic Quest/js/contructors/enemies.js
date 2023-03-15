
/*
                                    --Enemies--

  --Every enemy has a defense, health, maxHealth, magic, speed, and strength trait. They also have a type but that's basically their name--
*/

let enemies = [];

class Enemy {
  constructor(type, def, hp, mag, spd, str) {
    this.type = type;
    this.def = def;
    this.hp = hp;
    this.mag = mag;
    this.spd = spd;
    this.str = str;

    enemies.push(this);
  }
}
//enemies should have less than 50 hp (besides "Siren" and "Vampire")

const arg = new Enemy('Argonian',4,20,2,5,5);
const assin = new Enemy('Assassin',1,20,4,6,9);
const bat = new Enemy('Bat',1,5,1,10,1);
const barb = new Enemy('Barbarian',7,30,1,3,8);
const elfy = new Enemy('Elf',2,25,8,4,1.5);
const gob = new Enemy('Goblin',4,15,3.5,5,3);
const khaj = new Enemy('Khajiit',3,20,3.5,7,5);
const kni = new Enemy('Knight',15,40,2,4,9);
const mimic = new Enemy('Mimic',15,35,8,5,9);
const nin = new Enemy('Ninja',4,20,4,8,4);
const panther = new Enemy('Panther',5,20,0,8,9);
const rogue = new Enemy('Rogue',5,20,2,7,5);
const siren = new Enemy('Siren',4,90,9,4,9);
const skeleton = new Enemy('Skeleton',2,10,6,4,6);
const vampire = new Enemy('Vampire',9,50,2,9,9);

// console.log('Enemies',enemies);



















