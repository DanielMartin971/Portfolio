

var armors = [];

function Armor(defense,health,magic,name,price,speed,strength){
  var clothing = {
    defense: defense,
    health: health,
    magic: magic,
    name: name.trim(),
    price: price,
    speed: speed,
    strength: strength,
    // type: type,
  };
  
  armors.push(clothing);
}

Armor(0.5,1,0,' Cloak',50,0,0);
Armor(3,7,0,'Nomad Armor ',5000,1,1.5);
Armor(0,1,0,' Cloth',100,1,0);
Armor(1,2,0,'Leather Plate ',200,0,0);
Armor(5,8,0,' Reptilian Scales',5000,2,1);
Armor(0.5,1,0,'Robe ',100,0,0);
Armor(2.5,5,0,' Steel Plate',1500,-1.5,0);
Armor(1.5,2,1,' Cloak of Darkness',750,0,0);
Armor(3,2,0,' Iron Plate',1000,-1,0);
Armor(1.5,2,1.5,' Cloak of Light',800,0,0);
Armor(0.5,3,4,' Robe of Anril',2000,0,0);
Armor(5,7,0,' Knight Armor',4000,-2.5,0);
Armor(2,7,2,'Mytheral Armor ',6000,1,2);
Armor(7,10,4,"Death's Armor ",30000,-5,9);
Armor(5,7,1.5," Despair",20000,-2,2);
Armor(5,7,1.5," Copper Armor",20000,-2,2);
Armor(3,5,0," Chainmail",10000,0,2);
Armor(6,5,2," Gold Plate",12000,-3,1);
Armor(0.5,1,9," TP Armor",100000,9,7);
Armor(6,15,3," Turtle Plate",150000,-3,15);
Armor(15,20,5," Dragon Hide",250000,-6,10);
Armor(2.5,5,0," Assassin's Cloak",5000,1.5,1);
Armor(2.5,5,0," Ninja Robe",5000,2,1.5);
Armor(1,10,0," Rugged Hide",6000,1,2);
Armor(4,4.5,1," Extricated Armor",4000,0,1.5);
Armor(4,6,3,"Fenny's Armor",5000,0,0);
Armor(5,5,1,"Osiris Armor",5000,0,1);
Armor(1,3,1,"Azetic's Cloak",2500,0,1.5);
Armor(2,3,0,"Wolf Hide",2500,0,0);
Armor(1,5,0,"Halo",5000,0,0);
Armor(1.5,2,0,"Fine Tailored Suit",5000,2,0);
Armor(0.5,0,0,"Suit",1000,2,0);
Armor(0,3,3,"Shadow",5000,4,3);






























