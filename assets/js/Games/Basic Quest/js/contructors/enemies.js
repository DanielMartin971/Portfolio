
/*
                                    --Enemies--

  --Every enemy has a defense, health, maxHealth, magic, speed, and strength trait. 
  They also have a type but that's basically their name--
*/

let enemies = [];

function GenerateEnemy(type,def,hp,mag,spd,str){
  this.type = type;
  this.def = def;
  this.hp = hp;
  this.maxHp = hp;
  this.mag = mag;
  this.spd = spd;
  this.str = str;
  
  enemies.push(this);
  
}
//enemies should have less than 50 hp (besides "Siren" and "Vampire")

const argonian  = new GenerateEnemy('Argonian',4,20,2,5,5);
const assasin   = new GenerateEnemy('Assassin',1,20,4,6,9);
const bat       = new GenerateEnemy('Bat',1,5,1,10,1);
const barbarian = new GenerateEnemy('Barbarian',7,30,1,3,8);
const elf       = new GenerateEnemy('Elf',2,25,8,4,1.5);
const goblin    = new GenerateEnemy('Goblin',4,15,3.5,5,3);
const khajiit   = new GenerateEnemy('Khajiit',3,20,3.5,7,5);
const knight    = new GenerateEnemy('Knight',15,40,2,4,9);
const mimic     = new GenerateEnemy('Mimic',15,35,8,5,9);
const ninja     = new GenerateEnemy('Ninja',4,20,4,8,4);
const panther   = new GenerateEnemy('Panther',5,20,0,8,9);
const rogue     = new GenerateEnemy('Rogue',5,20,2,7,5);
const siren     = new GenerateEnemy('Siren',4,90,9,4,9);
const skeleton  = new GenerateEnemy('Skeleton',2,10,6,4,6);
const vampire   = new GenerateEnemy('Vampire',9,50,2,9,9);