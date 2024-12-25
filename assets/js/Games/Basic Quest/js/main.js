
// Flasks are the healing system in the game
let flask = {
  amount: 3,
  color: document.querySelector('.flask'),
  empty: 0,
  heal: 0,
  max : 9,
};
// Gold is going to be the currency in game
let gold  = {
  owned: 0,
  spent: 0,
};
// These are the basic stats of a character in game; def is defense, hp is health, mag is magic, spd is speed, and str is strength
let stat = {
  def: 0,
  hp:  0,
  mag:   0,
  spd:   0,
  str:0,
};
// Kit is the items that you own for your character
let kit = [];

//this grabs the btn prompt from start and makes this to an array length with all names
let races = document.querySelectorAll('[name]');

//fuction constructor to call the character choosen by player
function species(race){
  const character = race;
  console.log(character);
  console.log(character.toUpperCase() + " This should be the character name");

  
  for(let i = 0; i < characters.length; i++){
    if(character === characters[i].name.toLowerCase().trim()){
      const choice = characters[i];

      gold.owned = choice.gold;
      kit.push(choice.weapon);
      kit.push(choice.armor);
      console.log(choice.weapon, "this is the weapon you got");
      
      //This sets all the local storage to setup player's stuff
      localStorage.setItem('flask', JSON.stringify(flask));
      localStorage.setItem('race', JSON.stringify(choice));
      localStorage.setItem('kit', JSON.stringify(kit));
      localStorage.setItem('gold', JSON.stringify(gold));
      localStorage.setItem('kills', 0);
      localStorage.setItem('stat', JSON.stringify(stat));
      localStorage.setItem('location', "main");
      
      
      //This just changes the page to the actual game
      window.location.href = 'game.html';
    }
  }
}

races.forEach((race) => {
  race.addEventListener('click',(e) => {
    species(e.target.name.toLowerCase());
  });
});


