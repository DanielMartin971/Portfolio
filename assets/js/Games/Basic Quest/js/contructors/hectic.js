
//This generator is meant for bosses (basically)

let hectics = [];

function GenerateHectic(type, def, hp, mag, spd, str){
  this.type = type;
  this.def = def;
  this.hp = hp;
  this.mag = mag;
  this.spd = spd;
  this.str = str;
  
  hectics.push(this);
  
}

const abyssWalker = new GenerateHectic('Abyss Walker',8,50,50,5,50);
const dragon      = new GenerateHectic('Dragon',20,150,15,2,20);
const demon       = new GenerateHectic('Demon',10,120,7,7,25);
const knightTom   = new GenerateHectic('Knight Tom',100,30,1,2,20);
const werewolf    = new GenerateHectic('Werewolf',9,125,10,11,30);
const watcher     = new GenerateHectic('Watcher',5,200,10,3,15);