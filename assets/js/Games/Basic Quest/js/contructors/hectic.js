
// A class for bosses called Heretics

let hectics = [];

class Hectic {
  constructor(type, def, hp, mag, spd, str) {
    this.type = type;
    this.def = def;
    this.hp = hp;
    this.mag = mag;
    this.spd = spd;
    this.str = str;

    hectics.push(this);
  }
}

const abyssWalker = new Hectic('Abyss Walker',8,50,50,5,50);
const dragon = new Hectic('Dragon',20,150,15,2,20);
const demon = new Hectic('Demon',10,120,7,7,25);
const knightTom = new Hectic('Knight Tom',100,30,1,2,20);
const mereCat = new Hectic('MereCat',9,125,10,11,30);
const watcher = new Hectic('Watcher',5,200,10,3,15);

// console.log(hectics);