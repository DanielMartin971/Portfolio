
/*
                                    --Enemies--

  --Every enemy has a defense, health, maxHealth, magic, speed, and strength trait. They also have a type but that's basically their name--
*/

var enemies = [];

function GenerateEnemy(type,defense,health,magic,speed,strength){
  var actor = {
    type: type,
    defense: defense,
    health: health,
    maxHealth: health,
    magic: magic,
    speed: speed,
    strength: strength,
  };
  
  enemies.push(actor);
  
}
//enemies should have less than 50 hp (besides "Siren" and "Vampire")

GenerateEnemy('Argonian',4,20,2,5,5);
GenerateEnemy('Assassin',1,20,4,6,9);
GenerateEnemy('Bat',1,5,1,10,1);
GenerateEnemy('Barbarian',7,30,1,3,8);
GenerateEnemy('Elf',2,25,8,4,1.5);
GenerateEnemy('Goblin',4,15,3.5,5,3);
GenerateEnemy('Khajiit',3,20,3.5,7,5);
GenerateEnemy('Knight',15,40,2,4,9);
GenerateEnemy('Mimic',15,35,8,5,9);
GenerateEnemy('Ninja',4,20,4,8,4);
GenerateEnemy('Panther',5,20,0,8,9);
GenerateEnemy('Rogue',5,20,2,7,5);
GenerateEnemy('Siren',4,90,9,4,9);
GenerateEnemy('Skeleton',2,10,6,4,6);
GenerateEnemy('Vampire',9,50,2,9,9);

// console.log('Enemies',enemies);



















