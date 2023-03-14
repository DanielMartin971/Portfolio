// Flask is the healing system in the game, we have a set amount of 3 to start with
// The color for some reason couldnt be set in CSS so we set it in JS
// We set a empty amount just in case so player cannot constantly heal while having 0 amounts of flasks
// Also a set max so player cannot have infinite heals
let flask = {
  amount: 3,
  color: document.querySelector('.flask'),
  empty: 0,
  heal: 0,
  max : 9,
};

let gold  = {
  owned: 0,
  spent: 0,
};

// Stat is the stats of a player; def, hp, mag, spd, str
// We always set to 0 for overlapping issues when using localStorage
let stat = {
  defense: 0,
  health:  0,
  magic:   0,
  speed:   0,
  strength:0,
};

// We have an array that keeps all weapons and armor collected throughout the game
let kit = [];

//this grabs the btn prompt from start and makes this to an array length with all names
let races = document.querySelectorAll('[name]');

let archangel    = {
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
let argonian     = {
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
let assassin     = {
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
let azetic       = {
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
let barbarian    = {
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
let elf          = {
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
let fenny        = {
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
let gentleman    = {
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
let goblin       = {
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
let gorphin      = {
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
let khajiit      = {
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
let knight       = {
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
let merchant     = {
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
let ninja        = {
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
let skinwalker   = {
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
let werewolf     = {
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
let types = [
  archangel,argonian,assassin,azetic,barbarian,elf,fenny,gentleman,goblin,gorphin,khajiit,knight,merchant,ninja,skinwalker,werewolf
];

//fuction constructor to call the character choosen by player
function species(race){
  let type = race;
  
  for(let i = 0; i < types.length; i++){
    if(type === types[i].type.toLowerCase().trim()){
      // These 3 lines of code setup the gold amount from chosen character, their weapon and armor choice
      gold.owned = types[i].gold;
      kit.push(types[i].weapon);
      kit.push(types[i].armor);
      
      //This sets all the local storage to setup player's stuff
      localStorage.setItem('flask',JSON.stringify(flask));
      localStorage.setItem('race',JSON.stringify(types[i]));
      localStorage.setItem('kit',JSON.stringify(kit));
      localStorage.setItem('gold',JSON.stringify(gold));
      localStorage.setItem('kills',0);
      localStorage.setItem('stat',JSON.stringify(stat));
      localStorage.setItem('location',"main");
      
      
      // We change window location to the game html after selecting character
      window.location.href = 'game.html';
    }
  }
}

// Function that collects all characters and when one is selected we grab that name and run function species()
races.forEach((race) => {
  race.addEventListener('click',(e) => {
    species(e.target.name.toLowerCase());
  });
});


