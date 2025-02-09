

//This is used for removing text and getting rid of the timeout
let timeout;
//////////////////////////////////////////


/*
                                    --NOTES--
              
  --Come up with a stats increasing shop-- check
  --Working on attacks for both sides--
  --Create more enemies--
  --Create more bosses--
  --May make this just a survival then add a storyline--
  --.trim() gets rid of whitespace-- check
  --need to work on ALL ABILITIES--
  --need to make a dodge chance and miss chance for ability:SlipperyFeet--
  --fixing doc.extras on mainpage and a loading--
  --working on sunsing ability--
  --working on more characters--
  --work on taking dmg from enemy while about to be killed but not 100%--
  --Ability:Destiny--
  --increase merchant rate of spawn--
  --make the random chances change with a var instead of manual change everytime--
  --fix up self.things to have loop--
  --need to make a sell function for the shop--
  --need to make a abilities merchant and stats merchant--
  --try to make the abilites into a object instead of using a loop--
  --working on spawning of shop, the abilites pop up more than the merchant--
  --merchant spawns too much--
*/

//Abilities-----------------------------------------------//
//this sets all abilities to false so theyre not active from start of game
// let abilities = {
//   //these are revive abilities
//   aflife: false,
//   deadA:  false,
//   reborn: false,
//   sunSin: false,
//   tbtfm:  false,
//   //////////////////////////
//   abyssSurv: false,
//   blodThirs: false,
//   brompTail: false,
//   buffPow:   false,
//   cancBlo:   false,
//   corpse:    false,
//   cursSol:   false,
//   devsMan:   false,
//   exoGen:    false,
//   FAN:       false,
//   hellfire:  false,
//   hopRom:    false,
//   medic:     false,
//   nsowm:     false,
//   OMA:       false,
//   phaseWalk: false,
//   royBlo:    false,
//   shopSpre:  false,
//   sodaF:     false,
//   suffering: false,
//   vodka:     false,
//   xfaded:    false,
// };


/*
                                    --UPDATES--
          
  --April 11th 2018 --
  --April 15th 2018 -- ability works and characters
  --April 17th 2018 -- ability works
  --April 18th 2018 -- ability works, shop works
  --May   9th  2018 -- adding other shops
  --May   14th 2018 -- testing

*/

/*
                                    --Flasks, Gold, Kit--
                                      
  --Flasks are a healing mechanic that uses an amount trait, and a empty trait--
  --Gold just has how much the player has and how much he has spent, just so the player can know how much gold they've accumulated overtime--
  --Kit contains whatever the player has obtained throughout the game(unless he dies). From there, he has a bunch of items that he can change his equipment--
  --ItemsA has the equipment armor that the player owns--
  --ItemsW has the equipment weapons that the player owns--
*/

const flask  = JSON.parse(localStorage.getItem('flask'));
const gold   = JSON.parse(localStorage.getItem('gold'));
let itemsA = [];
let itemsW = [];
const kit    = JSON.parse(localStorage.getItem('kit'));

//This is for the iteration loop when increasing difficulty of enemies so they won't keep increasing difficulty
let iterat = 0;
/////////////////////////////////////////////////////////////////

//this sets the btns on screen and gives a 'HUD' to player
const doc = {
  actions: document.getElementById('action'),
  armor:   document.querySelector('span.armor'),
  click:   "Click 'start' to start the game",
  extras:  document.getElementById('extras'),
  flasks:  document.getElementById('flasks'),
  cFlask:  document.querySelector('.flask'),
  gold:    document.getElementById('gold'),
  hp:      document.getElementById('health'),
  items:   document.getElementById('items'),
  kit:     document.querySelector('#kit'),
  species: document.getElementById('species'),
  start:   document.getElementById('start'),
  weapon:  document.querySelector('span.weapon'),
};

//little intros 
//needs different greetings and ques for bosses
const greetings ={
  welcome: 'Welcome to Basic Quest',
  shop: 'Welcome back to Basic Quest',
  intro: 'You see a cave entrance...',
};


//sets enemy
let enemy;
const enemyDocSpecies = document.getElementById('eSpecies');
const enemyDocHp      = document.getElementById('eHealth');

const actions = document.querySelectorAll('[name]');

//this gives the btn prompts actions when clicked on
const btns = {
  attack: 'attack',
  blank:  'blank',
  defend: 'defend',
  heal:   'heal',
  magic:  'magic',
  run:    'run',
  search: 'search',
};

//sets player, kills, abilites and equipment is reset to 0 per reset and coming back from kit
let p1    = JSON.parse(localStorage.getItem('race'));
let slain = JSON.parse(localStorage.getItem('kills'));
let self  = new Self(p1.name, p1.def, p1.hp, p1.maxHp, p1.mag, p1.spd, p1.str, p1.armor, p1.weapon, p1.gold, p1.ability1, p1.ability2, p1.ability3); 

function Self(name, def, hp, maxHp, mag, spd, str, armor, weapon, gold, ability1, ability2, ability3){
  this.name = name;
  this.def = def;
  this.hp = hp;
  this.maxHp = maxHp;
  this.mag = mag;
  this.spd = spd;
  this.str = str;
  this.armor = armor;
  this.weapon = weapon;
  this.gold = gold;
  this.ability1 = ability1;
  this.ability2 = ability2;
  this.ability3 = ability3;

  console.log(this);
}

let ability   = [];
let equipment = {
  def: 0,
  maxHp: 0,
  mag: 0,
  spd: 0,
  str: 0,
};


const story = [
  'You see a stranger in the distance',
  'A enemy appeared!',
  "There's a merchant selling items!",
];
//whenever the dice roll gives a merchant or enemy or random 
const events = {
  enemy: story[1],
  merchant: story[2],
  stranger: story[0],
};
//difficulty modifier for amount of enemies slain that increases enemy defense
let difficulty = {
  defense: 0,
};

//This function brings all the stats into play and updates everything after you come back from the shop
function Init(){
  //var loc just checks current location of player 
  let loc = localStorage.getItem('location').toLowerCase();
  console.log(loc);
  
  //this runs through to ses if player is in a shop and gets a greeting
  doc.actions.innerHTML = greetings.welcome;
  if(loc == 'shops'
  || loc == 'shop'){
    doc.actions.innerHTML = greetings.shop;
  }
  //shows amount of flasks owned
  doc.flasks.innerHTML  = flask.amount;
  
  //instead of using var "p1", now we use var "self" for the player  
  ability.push(self.ability1);
  ability.push(self.ability2);
  ability.push(self.ability3);
  
  //this checks to see if self has some abilities or not
  for(let i = 0; i < ability.length; i++){
    if(ability[i].name.toLowerCase() == 'hopelessromantic'){
      self.maxHp = Math.floor(self.maxHp * 0.5);
      self.hp    = self.maxHp;
    }

    if(ability[i].name.toLowerCase() == 'nsowm' && flask.max != flask.heal){
      flask.max += 3;
    }

    if(ability[i].name.toLowerCase() == 'phasewalker' && flask.max != flask.heal){
      flask.max -= Math.floor(flask.max * 0.5);
    }

    if(ability[i].name.toLowerCase() == 'cursedsoul'){
      self.maxHp += 10;
      self.def--;
      self.mag--;
      self.spd--;
      self.str--;
    }

    if(ability[i].name.toLowerCase() == "devil'sman"){
      self.maxHp -= 10;
      self.def++;
      self.mag++;
      self.spd++;
      self.str++;
    }

    if(ability[i].name.toLowerCase() == 'canceredblood'){
      self.st  += 4;
      self.mag += 4;
    
    setInterval(() => {
      self.hp--;
      doc.hp.textContent = self.hp;
      if(self.hp <= 0){
        gameOver();
      }
    },5000);
    }
    //this checks to see if the ability is active and decreases max health
    //when returning from kit, health gets increased again because kit is another 'location' 
    if(ability[i].name.toLowerCase() == 'onemanarmy'){
      self.maxHp -= Math.floor(self.maxHp * 0.25);
    }
  }
  
  //these for loops go through the equipments and adds the stats to equipment
  for(let i = 0; i < armors.length; i++){
    if(self.armor.toLowerCase() == armors[i].name.toLowerCase()){
      equipment.def     += armors[i].def;
      equipment.maxHp   += armors[i].hp;
      equipment.mag     += armors[i].mag;
      equipment.spd     += armors[i].spd;
      equipment.str     += armors[i].str;
    }
  }
  for(let j = 0; j < weapons.length; j++){
    if(self.weapon.toLowerCase() == weapons[j].name.toLowerCase()){
      equipment.def     += weapons[j].def;
      equipment.maxHp   += weapons[j].hp;
      equipment.mag     += weapons[j].mag;
      equipment.spd     += weapons[j].spd;
      equipment.str     += weapons[j].str;
    }
  }
  
  //This part just adds the equipment stats////////////////////
  self.def   += equipment.def;
  self.maxHp += equipment.maxHp;
  self.mag   += equipment.mag;
  self.spd   += equipment.spd;
  self.str   += equipment.str;
  self.hp     = Math.floor(self.maxHp);
  /////////////////////////////////////////////////////////////

  //////////Stuff to put on the HTML///////////////////////////
  doc.species.textContent = self.name.toUpperCase();
  doc.hp.textContent      = self.hp;
  doc.armor.textContent   = self.armor;
  doc.weapon.textContent  = self.weapon;
  doc.gold.textContent    = gold.owned;
  /////////////////////////////////////////////////////////////
  
  
  
  //This is to seperate the armors from weapons
  for(i = 0; i < kit.length; i++){
    for(var o = 0; o < armors.length; o++){
      if(kit[i].toLowerCase() == armors[o].name.toLowerCase()){
        itemsA.push(kit[i]);
      }
    }
    for(var z = 0; z < weapons.length; z++){
      if(kit[i].toLowerCase() == weapons[z].name.toLowerCase()){
        itemsW.push(kit[i]);
      }
    }
  }
  
  //enemies difficulty increase stats
  for(var z = 0; z < enemies.length; z++){
    if(slain > 100){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 30;
      }
      else{
        enemies[z].strength  += 30;
      }
      enemies[z].maxHealth += 50;
      enemies[z].defense   += 20;
      
      enemies[z].health = enemies[z].maxHealth;
    }
    else if(slain > 50){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 20;
      }
      else{
        enemies[z].strength  += 20;
      }
      enemies[z].maxHealth += 20;
      enemies[z].defense   += 10;
      
      enemies[z].health = enemies[z].maxHealth;
    }
    else if(slain > 30){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 10;
      }
      else{
        enemies[z].strength  += 10;
      }
      enemies[z].maxHealth += 10;
      enemies[z].defense   += 5;
      
      enemies[z].health = enemies[z].maxHealth;
    }
    else if(slain > 15){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 5;
      }
      else{
        enemies[z].strength  += 5;
      }
      enemies[z].maxHealth += 5;
      enemies[z].defense   += 2.5;
      
      enemies[z].health = enemies[z].maxHealth;
    }
    else if(slain < 15){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 5;
      }
      else{
        enemies[z].strength  -= 5;
      }
      enemies[z].maxHealth -= 10;
      enemies[z].defense   -= 5;
      
      if(enemies[z].strength <= 0){
        enemies[z].strength = 1;
      }
      if(enemies[z].defense <= 1){
        enemies[z].defense = 1;
      }
      if(enemies[z].maxHealth <= 0){
        enemies[z].maxHealth = 5;
      }
      
      enemies[z].health = enemies[z].maxHealth;
    }
  }
  difficulty.defense += 2.5;
  
  //this just puts the health on the html doc if you come back from your kit
  if(loc == 'kit'){
    doc.hp.textContent = self.hp;
  }
  
  console.log('Player', self);
  
}
Init();


//this just sets the enemies up if loaded from the kit
// loc is the location of the player and en is the enemy last there if in combat
window.addEventListener('load',() => {
  let loc = localStorage.getItem('location').toLowerCase();
  let en  = localStorage.getItem('recEnemy').toLowerCase();
  
  if(loc == 'kit'){
    console.log('Kit confirmed...');
    if(en == undefined
    || en == null){
      
    }
    else{
      enemy = JSON.parse(localStorage.getItem('recEnemy'));
      doc.actions.textContent = 'A ' + enemy.type.toUpperCase() + ' appeared!';
      enemyDocSpecies.textContent = enemy.type.toUpperCase();
      enemyDocHp.textContent      = enemy.hp;
    }
    
    
    doc.start.textContent       = '';
    doc.start.style.visibilty = 'hidden';
    doc.start.style.border    = 'none';
    doc.start.style.height    = 0;
    
  }
  localStorage.setItem('location','quest');
});


//This removes the extra text after a few moments i.e Dmg,$$$,items,etc
function remove(){
  clearTimeout(timeout);
  
  timeout = setTimeout(() => {
    doc.extras.style.visibility = 'hidden';
    doc.extras.style.height     = 'auto';
  }, 3000);
}

//this basically does everything for the game...almost
function run(action){
  let random    = Math.floor(Math.random() * story.length);
  let random2   = Math.random();
  let chance    = 0.95;
  //chance 2 is only used because there aren't many choices for events
  let chance2 = 0.10;
  
  //if the dice give a shop for the next event it takes you to shop
  if(abilities.shopSpre == true){
    chance  -= 0.1;
    chance2 -= 0.1;
  }
  
  //this will do the greeting back to the game
  if(doc.actions.innerHTML == greetings.welcome
  || doc.actions.innerHTML == doc.click){
    doc.actions.innerHTML = doc.click;
  }
  else{
    //this checks to see if you healed
    if(action == btns.heal){
      if(abilities.medic === true){
        //this makes it so the ability gives the extra 10% health
        flask.heal =  Math.floor(Math.random() * self.maxHp + self.maxHp / 2);
        flask.heal += Math.floor(flask.heal * 0.1);
      }
      else{
        //The heal ability will use floor to get a whole number, we times it by max to get near that then add max and divide by 2 just in case
        flask.heal = Math.floor(Math.random() * self.maxHp + self.maxHp / 2);
      }
      
      if(abilities.brompTail == true){
        flask.heal = Math.floor(flask.heal * 0.25);
      }
      
      if(flask.amount <= 0){
        flask.amount = 0; 
        
        doc.extras.style.height = 'auto';
        doc.extras.style.visibility = 'visible';
        doc.extras.innerHTML = 'You have no more flasks';
        
        remove();
      }
      else if(self.hp >= self.maxHp){
        console.log('too much');
        self.hp      = Math.floor(self.maxHp);
        doc.hp.textContent = self.hp;
        
        doc.extras.style.height     = 'auto';
        doc.extras.style.visibility = 'visible';
        doc.extras.innerHTML        = 'You have full health';
        
        remove();
      }
      else{
        console.log('Healed ' + flask.heal);
        self.hp += flask.heal;
        
        //You get rid of one from the owned and add it to empty
        if(abilities.xfaded === true && random <= 0.10){
          flask.amount = flask.amount;
        }
        else if(abilities.sodaF === true && random <= 0.15){
          flask.amount = flask.amount;
        }
        else{
          //this keeps changes counts on the flasks used
          flask.amount--;
          flask.empty++;
        }
        
        if(self.hp >= self.maxHp){
          self.hp = self.maxHp;
        }
        
        doc.hp.textContent   = self.hp;
        doc.flasks.innerHTML = flask.amount;
        
        if(flask.amount <= 0){
          doc.cFlask.style.color = '#757575';
        }
      }
    }
    
    if(doc.actions.innerHTML == greetings.intro){
      doc.actions.innerHTML = events.enemy;
      
      run();
    }
    else if(doc.actions.innerHTML == events.enemy){
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        // console.log('calling reinforcements');
        generateEnemy();
      },2500);
    }
    else if(doc.actions.innerHTML == events.stranger){
      if(random2 <= chance){
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
          generateEnemy();
        },1000);
      }
      else{
        random2 = Math.random() * 1;
        
        actions.forEach((action) => {
          action.style.visibility = 'hidden';
        });
        
        console.log('Stranger danger!');
        doc.actions.innerHTML = events.merchant;
        
        self.defense   -= equipment.defense;
        self.maxHp -= equipment.maxHealth;
        self.mag     -= equipment.mag;
        self.speed     -= equipment.speed;
        self.strength  -= equipment.strength;
        
        if(abilities.hopRom === true){
          self.maxHp  = Math.floor(self.maxHp / 0.5);
        }
        if(abilities.cursSol == true){
          self.maxHp -= 10;
          self.defense++;
          self.mag++;
          self.speed++;
          self.strength++;
        }
        if(abilities.devsMan == true){
          self.maxHp += 10;
          self.defense--;
          self.mag--;
          self.speed--;
          self.strength--;
        }
        if(abilities.cancBlo == true){
          self.strength -= 4;
          self.mag    -= 4;
        }
        if(abilities.OMA == true){
          self.maxHp = Math.ceil(self.maxHp / 0.75);
        }
        
        flask.heal = flask.max;
        
        localStorage.setItem('gold',JSON.stringify(gold));
        localStorage.setItem('flask',JSON.stringify(flask));
        localStorage.setItem('kit',JSON.stringify(kit));
        localStorage.setItem('race',JSON.stringify(self));
        
        console.log(random2);
        
        if(random2 <= 0.25){
          console.log('Going to the shop');
          setTimeout(() => {
            window.location.href = 'shop.html';
          },3000);
        }
        else if(random2 <= 0.50){
          console.log('Going to the abilities');
          setTimeout(() => {
            window.location.href = 'abilitiesShop.html';
          },3000);
        }
        else{
          console.log('Going to the stats');
          setTimeout(() => {
            window.location.href = 'statsShop.html';
          },3000);
        }
      }
    }
    else if(doc.actions.innerHTML == events.merchant){
      if(random2 <= chance2){
        random2 = Math.random() * 1;
        
        actions.forEach((action) => {
          action.style.visibility = 'hidden';
        });
        
        console.log('Fenny: "Gottem coach!"');
        self.defense   -= equipment.defense;
        self.maxHp -= equipment.maxHealth;
        self.mag       -= equipment.mag;
        self.speed     -= equipment.speed;
        self.strength  -= equipment.strength;
        
        if(abilities.hopRom === true){
          self.maxHp  = Math.floor(self.maxHp / 0.5);
        }
        if(abilities.cursSol == true){
          self.maxHp -= 10;
          self.defense++;
          self.mag++;
          self.speed++;
          self.strength++;
        }
        if(abilities.devsMan == true){
          self.maxHp += 10;
          self.defense--;
          self.mag--;
          self.speed--;
          self.strength--;
        }
        if(abilities.cancBlo == true){
          self.strength -= 4;
          self.mag    -= 4;
        }
        if(abilities.OMA == true){
          self.maxHp = Math.ceil(self.maxHp / 0.75);
        }
        
        flask.heal = flask.max;
        
        
        localStorage.setItem('gold',JSON.stringify(gold));
        localStorage.setItem('flask',JSON.stringify(flask));
        localStorage.setItem('kit',JSON.stringify(kit));
        localStorage.setItem('race',JSON.stringify(self));
        
        console.log(random2);
        
        //This determines what merchant you are going to see
        if(random2 <= 0.5){
          console.log('Going to the shop');
          setTimeout(() => {
            window.location.href = 'shop.html';
          },3000);
        }
        else if(random2 <= 0.8 && random2 > 0.5){
          console.log('Going to the abilities');
          setTimeout(() => {
            window.location.href = 'abilitiesShop.html';
          },3000);
        }
        else{
          console.log('Going to the stats');
          setTimeout(() => {
            window.location.href = 'statsShop.html';
          },3000);
        }
      }
      else{
        generateEnemy();
      }
    }
    else if(doc.actions.innerHTML == 'A ' + enemy.type.toUpperCase() + ' appeared!'){
      // console.log('enemy has appeared ig');
        if(enemy.hp > 0){
          // console.log('enemy health displaying');
          if(action == btns.magic
          || action == btns.attack){
            // console.log('are we even calling attack?');
            //do something w/spd at some point
            if(self.speed > enemy.speed){
              doc.extras.innerHTML = '';
              attack(action);
              if(enemy.hp > 0){
                enemyAttack(action);
              }
            }
            //no difference
            else{
              doc.extras.innerHTML = '';
              attack(action);
              if(enemy.hp >= 0){
                enemyAttack(action);
              }
            }
            
            if(enemy.hp <= 0){
              enemy.hp = 0;
              slain++;
              localStorage.setItem('kills',slain);
              
              enemyDocSpecies.innerHTML = '';
              enemyDocHp.innerHTML      = enemy.hp;
              
              generateTreasure();
              enemy.hp = enemy.maxHp;
              
              damage = 0;
              
              if(abilities.blodThirs == true){
                self.hp += 5;
                if(self.hp > self.maxHp){
                  self.hp = self.maxHp;
                }
                doc.hp.textContent = self.hp;
              }
              
              doc.actions.innerHTML = story[random];
              run();
            }
          }
          else if(action == btns.defend){
            doc.extras.innerHTML = '';
            enemyAttack(action);
          }
          else{
            doc.extras.innerHTML = '';
            //need to run when hitting btn heal
            enemyAttack(action);
          }
        }
        if(self.hp <= 0){
          gameOver();
        }
      }
    else{
      
    }
    
  }
  
  
}

//fix attack
function enemyAttack(action){
  let random = Math.random() * 1;
  let damage   = 0;
  console.log('You called enemyAttack()');
  
  let mgkBlood = false;
  let lmfs     = false;
  let cheapy   = false;
  
  for(var i = 0; i < ability.length; i++){
    if(ability[i].name.toLowerCase() == 'magicblood'){
      console.log('mgkblood');
      mgkBlood = true;
    }
    if(ability[i].name.toLowerCase() == 'lmfs' && self.hp <= Math.ceil(self.maxHp * 0.25)){
      console.log('Ability: LMFS');
      lmfs = true;
    }
    if(ability[i].name.toLowerCase() == 'cheapshot'){
      cheapy = true;
    }
  }
  
  //this decreases self def by 50% if ability:suffering, is true
  if(abilities.suffering === true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.defense *= 0.5;
  }
  
  if(abilities.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.defense += Math.floor(self.defense / 0.5);
  }
  
  if(lmfs == true){
    self.defense /= 0.5;
  }
  
  
  if(action == btns.attack
  || action == btns.magic){
    if(random < 0.4){
      if(enemy.mag > self.mag){
        damage = Math.floor(enemy.mag * 0.5);
      }
      else if(enemy.mag == self.mag){
        damage = 1;
      }
      else{
        damage = Math.floor(enemy.mag * 0.2);
      }
      
      if(mgkBlood == true){
        damage -= Math.floor(damage * 0.1);
      }
      if(abilities.FAN == true){
        damage -= Math.floor(damage * 0.05);
      }
    }
    //fix up enemy damage using player's defense
    else{
      damage = Math.floor(enemy.str * 1.5 / self.def);
    }
  }
  else if(action == btns.defend){
    //This will make the enemy only do half dmg when player uses defend
    damage = Math.floor((enemy.str / self.def) * 0.5)
  }
  else if(action == btns.run){
    //make it so they can run away
  }
  else if(action == btns.heal){
    damage = Math.floor(enemy.str * 0.4);
  }
  
  //this'll split the enemy atk in half
  
  //just in case if damage isn't even 1, then this'll make sure that it is
  if(damage <= 0){
    damage = 1;
  }
  
  //this increases self def by 50% if ability:suffering, is true
  if(abilities.suffering === true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.defense /= 0.5;
  }
  
  if(abilities.buffPow === true){
    damage -= Math.floor(damage * 0.05)
  }
  
  if(abilities.abyssSurv === true){
    if(enemy.type.toLowerCase() == 'abyss walker'){
      damage = Math.floor(damage * 0.75);
    }
  }
  
  if(cheapy == true && random <= 0.20){
    damage = 0;
  }
  
  if(abilities.xfaded == true){
    damage += Math.floor(damage * 0.1);
  }
  
  if(abilities.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.defense = Math.floor(self.defense * 0.5);
  }
  
  if(abilities.royBlo == true){
    damage += Math.floor(damage * 0.05);
  }
  
  if(lmfs == true){
    self.defense *= 0.5;
  }
  
  
  self.hp          -= Math.floor(damage);
  doc.hp.textContent      = self.hp;
  if(action == btns.heal){
    doc.extras.innerHTML += 'Enemy did ' + damage + 'pts of damage'; 
  }
  else{
    if(doc.extras.innerHTML == ''){
      //working on fixing the text, it becomes blank 
      doc.extras.innerHTML += 'Enemy did ' + damage + 'pts of damage'; 
    }
    else{
      doc.extras.innerHTML += ' <br>' + 'Enemy did ' + damage + 'pts of damage'; 
    }
  }
  
  
}

//norm & crt atk are good, mgk needs fixing
function attack(action){
  console.log('calling attack');
  doc.extras.style.height     = 'auto';
  doc.extras.style.visibility = 'visible';
  
  const random    = Math.random() * 1;
  var chance      = 0.92;
  var damage      = 0;
  
  //these are abilities
  var mastery      = false;
  var mgkmstry     = false;
  var rampage      = false;
  var demonSlayer  = false;
  var deathStare   = false;
  var dragonSlayer = false;
  var eagle        = false;
  const masteries    = [
    'swordsmaster',
    'specialsmaster',
    'knifesmaster',
    'bluntsmaster',
    'staffsmaster',
    'scythesmaster'
  ];
  
  //make loop shorter
  for(var i = 0; i < masteries.length; i++){
    if(ability[i] == masteries[0]){
      for(var i = 0; i < weapons.length; i++){
        if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()
        && weapons[i].type.toLowerCase() == 'sword'){
          mastery = true;
        }
      }
    }
    else if(ability[i] == masteries[1]){
      for(var i = 0; i < weapons.length; i++){
        if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()
        && weapons[i].type.toLowerCase() == 'special'){
          console.log('special');
          mastery = true;
        }
      }
    }
    else if(ability[i] == masteries[2]){
      for(var i = 0; i < weapons.length; i++){
        if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()
        && weapons[i].type.toLowerCase() == 'knife'){
          console.log('knife');
          mastery = true;
        }
      }
    }
    else if(ability[i] == masteries[3]){
      for(var i = 0; i < weapons.length; i++){
        if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()
        && weapons[i].type.toLowerCase() == 'blunt'){
          console.log('blunt');
          mastery = true;
        }
      }
    }
    else if(ability[i] == masteries[4]){
      for(var i = 0; i < weapons.length; i++){
        if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()
        && weapons[i].type.toLowerCase() == 'staff'){
          console.log('staff');
          mgkmstry = true;
        }
      }
    }
    else if(ability[i] == masteries[5]){
      for(var i = 0; i < weapons.length; i++){
        if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()
        && weapons[i].type.toLowerCase() == 'scythe'){
          console.log('scythe');
          mastery = true;
        }
      }
    }
  }
  
  for(var i = 0; i < ability.length; i++){
    if(ability[i] == 'demonslayer'){
      demonSlayer = true;
    }
    if(ability[i] == 'dragonslayer'){
      dragonSlayer = true;
    }
    if(ability[i] == 'rampage' && self.hp <= 7){
      console.log('Ability: RAMPAGE');
      self.strength /= 0.5;
      rampage = true;
    }
    if(ability[i] == 'deathstare' && random >= 0.95){
      doc.extras.innerHTML = 'Insta kill!';
      console.log('insta kill');
      deathStare = true;
    }
    if(ability[i] == 'eagleeye'){
      eagle = true;
    }
  }
  
  if(eagle == true){
    chance -= 0.12;
  }
  if(abilities.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.str += Math.floor(self.str / 0.5);
  }
  
  if(action == btns.magic){
    //this is a crt mgk atk 
    //working on mgk crt atk
    if(self.mag > enemy.mag
    && random > chance){
      damage = Math.floor(self.mag * 2.5);
      doc.extras.textContent = 'Critical magic damage dealt: ';
    }
    else if(self.mag > enemy.mag){
      damage = Math.floor(self.mag * 1.25);
      doc.extras.textContent = 'Magic damage dealt: ';
    }
    else{
      damage = Math.floor(self.mag * 0.7);
      doc.extras.textContent = 'Weak magic damage dealt: ';
    }
    
    if(abilities.FAN == true){
      damage += Math.floor(damage * 0.2);
    }
  }
  else if(action == btns.attack){
    //Non-crt atk
    if(random < chance){
    //working on the attack dmg 
      if(enemy.def > 5){
        damage = Math.floor(self.str * 10 / enemy.def);
      }
      else if(enemy.def <= 5){
        damage = Math.floor(self.str * 5 / enemy.def);
      }
      
      if(damage <= 0){
        damage = 1;
      }
      doc.extras.textContent += 'Physical damage dealt: ';
    }
    //crt atk
    else if(random >= chance){
      if(enemy.def > 5){
        damage = Math.floor(self.str * 20 / enemy.def);
        console.log('crt ' + damage);
      }
      else if(enemy.def <= 5){
        damage = Math.floor(self.str * 10 / enemy.def);
        console.log('crt weak ' + damage);
      }
      
      if(damage <= 1){
          damage = 2;
        }
      doc.extras.textContent += 'Critical damage dealt: ';
    }
    
  }
  
  console.log('Before Damage:',damage);
  
  //this is to remove the abilities after use(rampage)
  //increases DMG by 10% if ability was a weapons mastery
  if(rampage == true){
    self.strength /= 0.5
  }
  if(mastery == true
  || mgkmstry == true){
    damage += damage * 0.1;
  }
  
  //these increase dmg
  if(demonSlayer  == true){
    console.log('DemonSlayer about...');
    damage += damage * 0.05;
  }
  if(dragonSlayer == true){
    for(var i = 0; i < hectics.length; i++){
      if(enemy.type.toLowerCase() == 'dragon'){
        damage += damage * 0.2;
        break;
      }
      else if(enemy.type.toLowerCase() == hectics[i].type.toLowerCase()){
        console.log('DragonSlayer about...');
        damage += damage * 0.1;
      }
    }
  }
  else if(dragonSlayer == true && demonSlayer == true){
    for(var i = 0; i < hectics.length; i++){
      if(enemy.type.toLowerCase() == 'dragon'){
        damage += damage * 0.20;
        break;
      }
      else if(enemy.type.toLowerCase() == hectics[i].type.toLowerCase()){
        console.log('DragonSlayer about...');
        damage += damage * 0.10;
      }
    }
    damage += damage * 0.05;
  }
  
  if(abilities.suffering === true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    damage += damage * 0.75;
  }
  
  if(abilities.buffPow === true){
    damage += damage * 0.1;
  }
  
  if(abilities.abyssSurv == true){
    if(enemy.type.toLowerCase() == 'abyss walker'){
      damage += damage * 0.1;
    }
  }
  
  if(abilities.xfaded == true){
    damage += damage * 0.1;
  }
  
  if(abilities.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.str = Math.floor(self.str * 0.5);
  }
  
  if(abilities.exoGen == true){
    for(var i = 0; i < hectics.length; i++){
      if(enemy.type.toLowerCase() == hectics[i].type.toLowerCase()){
        damage += damage * 0.05;
      }
    }
  }
  
  if(abilities.hellfire == true){
    damage += damage * 0.1;
  }
  
  if(deathStare == true){
    damage = enemy.hp;
  }
  
  console.log('After Damage:',damage);
  doc.extras.textContent += Math.ceil(damage);
  
  enemy.hp        -= Math.ceil(damage);
  enemyDocHp.textContent = enemy.hp;
  
  remove();
  
}

//This function will generate a enemy when called
function generateEnemy(action){
  //enemies are the enemies
  //heretics are basically bosses and often have more health and defense
  let random  = Math.random() * 1;
  let random2 = Math.floor(Math.random() * enemies.length);
  let random3 = Math.floor(Math.random() * hectics.length);
  
  if(random <= 0.96){
    enemy = enemies[random2];
    // console.log('You called the enemies');
  }
  else if(0.96 < random
  || slain > 50 && random > 0.90
  || slain > 100 && random > 0.80){
    //This'll spawn one of the hectic
    enemy = hectics[random3];
    // console.log('You called the ' + enemy.type);
  }
  
  
  console.log('Enemy:', enemy);
  //HTML stuff right here, showing who the enemy is, saying who it is and their health
  doc.actions.textContent     = 'A ' + enemy.type.toUpperCase() + ' appeared!';
  enemyDocSpecies.textContent = enemy.type.toUpperCase();
  enemyDocHp.textContent      = enemy.hp;
  
}

//need a way to select a item of use and also sell items in the shop
function generateTreasure(){
  let item     = ''
  let random   = Math.random() * 1;
  let randomG  = Math.floor(Math.random() * 1500) + 1;
  let chance   = 0.08;
  let chance2  = 0.15;
  let flaskCha = 0.2;
  
  if(abilities.vodka === true){
    chance  += 0.1;
    chance2 += 0.1;
  }
  
  let randomW  = Math.floor(Math.random() * weapons.length);
  let randomA  = Math.floor(Math.random() * armors.length);
  
  //every time they kill a hectic, they'll get 10,000 gold
  for(var i = 0; i < hectics.length; i++){
    if(enemy.type.toLowerCase() == hectics[i].type.toLowerCase()){
      randomG = 10000;
    }
  }
  
  //this'll increase the gold you get and the chance to find items
  if(abilities.corspe == true){
    randomG += Math.floor(randomG * 0.1);
    chance  += 0.5;
    chance2 += 0.5;
  }
  
  //Gold will be updated
  gold.owned        += randomG;
  doc.gold.textContent = gold.owned;
  
  doc.extras.textContent = 'You found ' + randomG + ' gold!';
  
  //this chance is for weapons
  if(self.name.toLowerCase() == 'werewolf'
  && random <= chance){
    doc.extras.textContent = "You found a weapon but can't carry it...";
  }
  else if(random <= chance){
    item = weapons[randomW].name;
    kit.push(item);
    
    console.log(kit);
    
    doc.extras.innerHTML += '<br>' + 'This item: ' + item;
  }
  else if(random <= flaskCha){
    flask.amount += 1;
    doc.flasks.textContent = flask.amount;
  }
  
  //this chance is for armors
  if(random <= chance2
  && random >= chance){
    item = armors[randomA].name;
    kit.push(item);
    
    console.log(kit);
    
    doc.extras.innerHTML += '<br>' + 'This item: ' + item;
  }
  
  doc.extras.style.height     = 'auto';
  doc.extras.style.visibility = 'visible';
  remove();
  
  localStorage.setItem('gold',JSON.stringify(gold));
  localStorage.setItem('kit',JSON.stringify(kit));
  
}

//This is a function to check if the player has 0 health and to declare that the game is over 
//Or if I feel like making some type of game over other than dying
function gameOver(){
  let random = Math.random() * 1;
  let tbtfm  = false;
  let sunSin = false;
  let aflife = false;
  let deadA  = false;
  let reborn = false;
  
  for(var i = 0; i < ability.length; i++){
    if(ability[i].name.toLowerCase() === 'tbtfm' && random <= 0.1){
      tbtfm = true;
    }
    if(ability[i].name.toLowerCase() === 'sunsinger' && random <= 0.05){
      sunSin = true;
    }
    if(ability[i].name.toLowerCase() === 'afterlife' && random <= 0.3){
      aflife = true;
    }
    if(ability[i].name.toLowerCase() === 'deadagain' && random <= 0.1){
      deadA = true;
    }
    if(ability[i].name.toLowerCase() == 'rebornagain' && random <= 0.1){
      reborn = true;
    }
  }
  
  //something wrong with gameover
  if(sunSin == true && self.hp <= 0){
    flask.amount          = flask.max;
    flask.empty           = 0;
    self.hp               = self.maxHp;
    doc.hp.textContent      = self.hp;
    doc.flasks.textContent  = flask.amount;
    doc.actions.textContent = 'The sun sang to your blood';
    let time = setInterval(() => {
      doc.actions.textContent += '.';
    },600);
    
    setTimeout(() => {
      clearInterval(time);
      doc.actions.innerHTML = 'A ' + enemy.type.toUpperCase() + ' appeared!'; 
    },2400);
  }
  else if(deadA  == true && self.hp <= 0){
    self.hp = 1;
    flask.amount++;
    
    doc.extras.innerHTML = "You're dead again...";
    doc.hp.textContent     = self.hp;
    doc.flasks.innerHTML = flask.amount;
  }
  else if(reborn == true && self.hp <= 0){
    self.hp = self.maxHp;
    
    doc.extras.innerHTML = "You're reborn...";
    doc.hp.textContent     = self.hp;
  }
  else if(tbtfm  == true && self.hp <= 0){
    enemy.hp = 0;
    self.hp  = self.maxHp;
    
    run();
  }
  else if(aflife == true && self.hp <= 0){
    doc.extras.textContent = "You're reborn Archangel...";
    
    self.name      = 'Archangel';
    self.def   = 2;
    self.hp    = 40;
    self.maxHp = 40;
    self.mag     = 5;
    self.spd     = 2;
    self.str  = 9;
    self.ability1  = "Devil'sMan";
    self.ability2  = 'Suffering';
    self.ability3  = 'Hellfire';
    
    doc.hp.textContent      = self.hp;
    doc.species.innerHTML = self.name;
    
    console.log(self);
  }
  else{
    self.hp = 0;
    
    doc.hp.textContent      = self.hp;
    doc.actions.textContent = 'Game Over! You killed ' + slain + ' enemies';
    
    localStorage.setItem('kills', 0);
    localStorage.setItem('kit','[]');
    
    setTimeout(() => {
      window.location.href = 'main.html';
    },5000);
  }
  
}

doc.start.addEventListener('click',() => {
  doc.start.textContent       = '';
  doc.start.style.visibilty = 'hidden';
  doc.start.style.border    = 'none';
  doc.start.style.height    = 0;
  
  doc.actions.textContent = greetings.intro;
  run(btns.blank);
});

doc.kit.addEventListener('click'  ,() => {
  self.def   -= equipment.def;
  self.maxHp -= equipment.maxHp;
  self.mag   -= equipment.mag;
  self.spd   -= equipment.spd;
  self.str   -= equipment.str;

  //this checks to see if self has some abilities or not
  for(let i = 0; i < ability.length; i++){
    if(ability[i].name.toLowerCase() == 'hopelessromantic'){
      self.maxHp = Math.floor(self.maxHp / 0.5);
    }

    if(ability[i].name.toLowerCase() == 'cursedsoul'){
      self.maxHp -= 10;
      self.def++;
      self.mag++;
      self.spd++;
      self.str++;
    }

    if(ability[i].name.toLowerCase() == "devil'sman"){
      self.maxHp += 10;
      self.def--;
      self.mag--;
      self.spd--;
      self.str--;
    }
    //this checks to see if the ability is active and decreases max health
    //when returning from kit, health gets increased again because kit is another 'location' 
    if(ability[i].name.toLowerCase() == 'onemanarmy'){
      self.maxHp = Math.ceil(self.maxHp / 0.75);
    }
  }
  
  flask.heal = flask.max;
  
  localStorage.setItem('location','quest');
  localStorage.setItem('recEnemy',JSON.stringify(enemy));
  localStorage.setItem('gold',JSON.stringify(gold));
  localStorage.setItem('flask',JSON.stringify(flask));
  localStorage.setItem('kit',JSON.stringify(kit));
  localStorage.setItem('race',JSON.stringify(self));
  console.log(enemy);
  window.location.href = 'kit.html';
});

actions.forEach((action) => {
  action.addEventListener('click',(e) => {
    console.log(e.target.attributes.name.value);
    run(btns[e.target.attributes.name.value]);
  });
});









































