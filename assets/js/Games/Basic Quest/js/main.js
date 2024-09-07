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
//console.log(races.length);
//console.log(races.toLowerCase);
//the characters being set into an array for easy selction
let types = [
  archangel,argonian,assassin,azetic,barbarian,elf,fenny,gentleman,goblin,gorphin,khajiit,knight,merchant,ninja,skinwalker,werewolf
];

//fuction to call the character choosen by player
function species(race){
  let type = race;
  
  // Loop through characters array to get the chosen character and their stats
  for(let i = 0; i < characters.length; i++){
    // We set the character name to lowercase just in case if there is a mixed upperCase letter and trim to get rid of whitespace
    if(type === characters[i].name.toLowerCase().trim()){
      // These 3 lines of code setup the gold amount from chosen character, their weapon and armor choice
      gold.owned = characters[i].gold;
      kit.push(characters[i].weapon);
      kit.push(characters[i].armor);
      
      //This sets all the local storage to setup player's traits
      localStorage.setItem('flask',JSON.stringify(flask));
      localStorage.setItem('race',JSON.stringify(characters[i]));
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



