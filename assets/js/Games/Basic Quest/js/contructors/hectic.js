
//This generator is meant for bosses (basically)

var hectics = [];

function GenerateHectic(type,defense,health,magic,speed,strength){
  var actor = {
    type: type,
    defense: defense,
    health: health,
    maxHealth: health,
    magic: magic,
    speed: speed,
    strength: strength,
  };
  
  hectics.push(actor);
  
}

GenerateHectic('Abyss Walker',8,50,50,5,50);
GenerateHectic('Dragon',20,150,15,2,20);
GenerateHectic('Demon',10,120,7,7,25);
GenerateHectic('Knight Tom',100,30,1,2,20);
GenerateHectic('Werewolf',9,125,10,11,30);
GenerateHectic('Watcher',5,200,10,3,15);