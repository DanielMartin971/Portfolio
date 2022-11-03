

var flask = {
  amount: 3,
  color: document.querySelector('.flask'),
  empty: 0,
  heal: 0,
  max : 9,
};
var gold  = {
  owned: 0,
  spent: 0,
};

var stat = {
  defense: 0,
  health:  0,
  magic:   0,
  speed:   0,
  strength:0,
};

var kit = [];

//this grabs the btn prompt from start and makes this to an array length with all names
var races = document.querySelectorAll('[name]');
//console.log(races.length);
console.log(races.toLowerCase);

var archangel    = {
  type: 'Archangel',
  defense: 2,
  health: 40,
  maxHealth: 40,
  magic: 5,
  speed: 2,
  strength: 9,
  armor: 'Halo',
  weapon: 'Angelic Sword',
  gold: 1000,
  ability1: "Devil'sMan",
  ability2: 'Suffering',
  ability3: 'Hellfire',
};
var argonian     = {
  type: 'Argonian',
  defense: 4,
  health: 15,
  maxHealth: 15,
  magic: 2.5,
  speed: 5,
  strength: 5,
  armor: 'Reptilian Scales',
  weapon: 'Shiv',
  gold: 1000,
  ability1: 'Charisma',
  ability2: 'WaterBreather',
  ability3: 'SwordsMaster',
};
var assassin     = {
  type: 'Assassin',
  defense: 1.5,
  health: 15,
  maxHealth: 15,
  magic: 4,
  speed: 7,
  strength: 10,
  armor: "Assassin's Cloak",
  weapon: 'Hidden Blade',
  gold: 1000,
  ability1: 'EagleEye',
  ability2: 'SpecialsMaster',
  ability3: 'SlipperyFeet',
};
var azetic       = {
  type: 'Azetic',
  defense: 5,
  health: 15,
  maxHealth: 15,
  magic: 2,
  speed: 5,
  strength: 8,
  armor: "Azetic's Cloak",
  weapon: 'MIDA MultiTool',
  gold: 1500,
  ability1: 'LMFS',
  ability2: 'BloodThirsty',
  ability3: 'SunSinger',
};
var barbarian    = {
  type: 'Barbarian',
  defense: 6,
  health: 20,
  maxHealth: 20,
  magic: 1.5,
  speed: 3,
  strength: 8,
  armor: 'Nomad Armor',
  weapon: 'Club',
  gold: 1000,
  ability1: 'Rampage',
  ability2: 'BluntsMaster',
  ability3: 'BDCH',
};
var elf          = {
  type: 'Elf',
  defense: 2,
  health: 18,
  maxHealth: 18,
  magic: 10,
  speed: 4,
  strength: 1.5,
  armor: 'Robe',
  weapon: 'Magic Missle',
  gold: 1000,
  ability1: 'StaffsMaster',
  ability2: 'MagicBlood',
  ability3: 'SunSinger',
};
var fenny        = {
  type: 'Fenny',
  defense: 6,
  health: 20,
  maxHealth: 20,
  magic: 3,
  speed: 7,
  strength: 4,
  armor: "Fenny's Armor",
  weapon: "Valyrian Sword",
  gold: 1000,
  ability1: 'EagleEye',
  ability2: 'SunSinger',
  ability3: 'SlipperyFeet',
};
var gentleman    = {
  type: 'Gentleman',
  defense: 6,
  health: 28,
  maxHealth: 28,
  magic: 3,
  speed: 4,
  strength: 6,
  armor: 'Fine Tailored Suit',
  weapon: 'CaneSword',
  gold: 2000,
  ability1: 'ExoticGent',
  ability2: 'NSOWM',
  ability3: 'SodaFlask',
};
var goblin       = {
  type: 'Goblin',
  defense: 4,
  health: 12,
  maxHealth: 12,
  magic: 6.5,
  speed: 5,
  strength: 3,
  armor: 'Cloak',
  weapon: 'Dagger',
  gold: 3000,
  ability1: 'CorpseShaker',
  ability2: 'BYOG',
  ability3: 'SlipperyFeet',
};
var gorphin      = {
  type: 'Gorphin',
  defense: 8,
  health: 25,
  maxHealth: 25,
  magic: 1,
  speed: 3,
  strength: 8,
  armor: 'Mytheral Armor',
  weapon: 'Stick',
  gold: 1000,
  ability1: 'DemonSlayer',
  ability2: 'CorpseShaker',
  ability3: 'DragonSlayer',
};
var khajiit      = {
  type: 'Khajiit',
  defense: 2.5,
  health: 15,
  maxHealth: 15,
  magic: 3.5,
  speed: 7,
  strength: 5,
  armor: 'Cloak of Darkness',
  weapon: 'Taloc',
  gold: 1250,
  ability1: 'CorpseShaker',
  ability2: 'EagleEye',
  ability3: 'KnifesMaster',
};
var knight       = {
  type: 'Knight ',
  defense: 7,
  health: 25,
  maxHealth: 25,
  magic: 2,
  speed: 4,
  strength: 6,
  armor: 'Knight Armor',
  weapon: 'Sword',
  gold: 2000,
  ability1: 'SwordsMaster',
  ability2: 'LMFS',
  ability3: 'DragonSlayer',
};
var merchant     = {
  type: 'Merchant ',
  defense: 4,
  health: 20,
  maxHealth: 20,
  magic: 2,
  speed: 5,
  strength: 2,
  armor: 'Suit',
  weapon: 'Glade',
  gold: 10000,
  ability1: 'SharedTrade',
  ability2: 'MyVodka',
  ability3: 'ShoppingSpree',
};
var ninja        = {
  type: 'Ninja',
  defense: 2,
  health: 20,
  maxHealth: 20,
  magic: 4,
  speed: 8,
  strength: 4,
  armor: 'Ninja Robe',
  weapon: 'Katana',
  gold: 1000,
  ability1: 'Charisma',
  ability2: 'DeathStare',
  ability3: 'DemonSlayer',
};
var skinwalker   = {
  type: 'Skinwalker',
  defense: 3,
  health: 50,
  maxHealth: 50,
  magic: 5,
  speed: 2,
  strength: 9,
  armor: 'Shadow',
  weapon: 'Soulbane',
  gold: 0,
  ability1: 'PhaseWalker',
  ability2: 'DeadAgain',
  ability3: 'TBTFM',
};
var werewolf     = {
  type: 'Werewolf',
  defense: 8,
  health: 40,
  maxHealth: 40,
  magic: 4,
  speed: 7,
  strength: 15,
  armor: 'Wolf Hide',
  weapon: 'none',
  gold: 0,
  ability1: 'BloodThirsty',
  ability2: 'BromptonCocktail',
  ability3: 'Suffering',
};

//the characters being set into an array for easy selction
var types = [
  archangel,argonian,assassin,azetic,barbarian,elf,fenny,gentleman,goblin,gorphin,khajiit,knight,merchant,ninja,skinwalker,werewolf
];

//setting base stats for no overlapping of other characters and having accidental stacking
var stat = {
  defense: 0,
  health: 0,
  magic: 0,
  speed: 0,
  strength: 0,
};


//fuction constructor to call the character choosen by player
function species(race){
  var type = race;
  console.log(type);
  console.log(type.name + " This should be the type name");

  
  for(var i = 0; i < types.length; i++){
    if(type === types[i].type.toLowerCase().trim()){
      gold.owned = types[i].gold;
      kit.push(types[i].weapon);
      kit.push(types[i].armor);
      console.log(types[i].weapon, "this is the weapon you got");
      
      //This sets all the local storage to setup player's stuff
      localStorage.setItem('flask',JSON.stringify(flask));
      localStorage.setItem('race',JSON.stringify(types[i]));
      localStorage.setItem('kit',JSON.stringify(kit));
      localStorage.setItem('gold',JSON.stringify(gold));
      localStorage.setItem('kills',0);
      localStorage.setItem('stat',JSON.stringify(stat));
      localStorage.setItem('location',"main");
      
      
      //This just changes the page to the actual game
      window.location.href = 'game.html';
    }
  }
}

races.forEach((race) => {
  race.addEventListener('click',(e) => {
    species(e.target.name.toLowerCase());
    // console.log("You have selected this race: " + race.name);
  });
});


