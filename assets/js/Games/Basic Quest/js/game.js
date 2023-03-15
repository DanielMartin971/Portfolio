

//This is used for removing text and getting rid of the timeout
let timeout;
//////////////////////////////////////////


/*
                                    --NOTES--
              
  --Come up with a stats increasing shop--
  --Working on attacks for both sides--
  --Create more enemies--
  --Create more bosses--
  --May make this just a survival then add a storyline--
  --.trim() gets rid of whitespace--
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
let abilitiesOwned = {
  //these are revive abilities
  aflife: false,
  deadA:  false,
  reborn: false,
  sunSin: false,
  tbtfm:  false,
  //////////////////////////
  abyssSurv: false,
  blodThirs: false,
  brompTail: false,
  buffPow:   false,
  cancBlo:   false,
  corpse:    false,
  cursSol:   false,
  devsMan:   false,
  exoGen:    false,
  FAN:       false,
  hellfire:  false,
  hopRom:    false,
  medic:     false,
  nsowm:     false,
  OMA:       false,
  phaseWalk: false,
  royBlo:    false,
  shopSpre:  false,
  sodaF:     false,
  suffering: false,
  vodka:     false,
  xfaded:    false,
};


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

let flask  = JSON.parse(localStorage.getItem('flask'));
let gold   = JSON.parse(localStorage.getItem('gold'));
// itemsA are the armors the player owns
// itemsW are the weapons the player owns
let itemsA = [];
let itemsW = [];
let kit    = JSON.parse(localStorage.getItem('kit'));

//This is for the iteration loop when increasing difficulty of enemies so they won't keep increasing difficulty
let iterat = 0;



/////////////////////////////////////////////////////////////////

//this sets the btns on screen and gives a 'HUD' to player
let doc = {
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
let greetings ={
  welcome: 'Welcome to Basic Quest',
  shop: 'Welcome back to Basic Quest',
  intro: 'You see a cave entrance...',
};


//sets enemy
let enemy;
let enemyDocSpecies = document.getElementById('eSpecies');
let enemyDocHp      = document.getElementById('eHealth');

let actions = document.querySelectorAll('[name]');

//this gives the btn prompts actions when clicked on
let btns = {
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
console.log(p1);
console.log(JSON.parse(localStorage.getItem('race')));

let slain = JSON.parse(localStorage.getItem('kills'));
let self;
let ability   = [];
let equipment = {
  def: 0,
  maxHp: 0,
  mag: 0,
  spd: 0,
  str: 0,
};


let story      = [
  'You see a stranger in the distance',
  'A enemy appeared!',
  "There's a merchant selling items!",
];
//whenever the dice roll gives a merchant or enemy or random 
let events     = {
  enemy: story[1],
  merchant: story[2],
  stranger: story[0],
};
//difficulty modifier for amount of enemies slain that increases enemy defense
let difficulty = {
  def: 0,
};

//This function brings all the stats into play and updates everything after you come back from the shop
function Init(name, def, hp, maxHp, mag, spd, str, armor, weapon, currency, ability1, ability2, ability3){
  //var loc just checks current location of player 
  let loc = localStorage.getItem('location').toLowerCase();
  console.log(loc);
  
  //this runs through to ses if player is in a shop and gets a greeting
  doc.actions.innerHTML = greetings.welcome;
  if(loc == 'shops' || loc == 'shop'){
    doc.actions.innerHTML = greetings.shop;
  }
  //shows amount of flasks owned
  doc.flasks.innerHTML  = flask.amount;
  
  //instead of using var "p1", now we use var "self" for the player
  self = {
    name: p1.name.trim(),
    armor: p1.armor,
    ability1:p1.ability1,
    ability2:p1.ability2,
    ability3:p1.ability3,
    def: p1.def,
    gold: p1.currency,
    hp: p1.hp,
    maxHp: p1.maxHp,
    mag: p1.mag,
    spd: p1.spd,
    str: p1.str,
    weapon: p1.weapon,
  };
  console.log(self);
  
  ability.push(self.ability1.name.toLowerCase());
  ability.push(self.ability2.name.toLowerCase());
  ability.push(self.ability3.name.toLowerCase());
  
  // This for loop is checking to see what abilites the player has, setting to true and applying them during the character creation
  for(let i = 0; i < ability.length; i++){
    if(ability[i] == 'hopelessromantic'){
      abilitiesOwned.hopRom = true;
    }
    if(ability[i] == 'suffering'){
      abilitiesOwned.suffering = true;
    }
    if(ability[i] == 'buffalopower'){
      abilitiesOwned.buffPow = true;
    }
    if(ability[i] == 'abysssurvivor'){
      abilitiesOwned.abyssSurv = true;
    }
    if(ability[i] == 'crossfaded'){
      abilitiesOwned.xfaded = true;
    }
    if(ability[i] == 'cursedsoul'){
      abilitiesOwned.cursSol = true;
    }
    if(ability[i] == 'canceredblood'){
      abilitiesOwned.cancBlo = true;
    }
    if(ability[i] == "devil'sman"){
      abilitiesOwned.devsMan = true;
    }
    if(ability[i] == 'nsowm'){
      abilitiesOwned.nsowm = true;
    }
    if(ability[i] == 'onemanarmy'){
      abilitiesOwned.OMA = true;
    }
    if(ability[i] == 'exoticgent'){
      abilitiesOwned.exoGen = true;
    }
    if(ability[i] == 'royalblood'){
      abilitiesOwned.royBlo = true;
    }
    if(ability[i] == 'fan'){
      abilitiesOwned.FAN = true;
    }
    if(ability[i] == 'shoppingspree'){
      abilitiesOwned.shopSpre = true; 
    }
    if(ability[i] == 'hellfire'){
      abilitiesOwned.hellfire = true;
    }
    if(ability[i] == 'phasewalker'){
      abilitiesOwned.phaseWalk = true;
    }
    if(ability[i] == 'medic!'){
      abilitiesOwned.medic = true;
    }
    if(ability[i] == 'sodaflask'){
      abilitiesOwned.sodaF = true;
    }
    if(ability[i] == 'bloodthirsty'){
      abilitiesOwned.blodThirs = true;
    }
    if(ability[i] == 'bromptoncocktail'){
      abilitiesOwned.brompTail = true;
    }
    if(ability[i] == 'corpseshaker'){
      abilitiesOwned.corspe = true;
    }
    if(ability[i] == 'myvodka!'){
      abilitiesOwned.vodka = true;
    }
  }
  
  if(abilitiesOwned.hopRom === true){
    self.maxHp = Math.floor(self.maxHp * 0.5);
    self.hp    = self.maxHp;
  }
  
  if(abilitiesOwned.nsowm     === true && flask.max != flask.heal){
    flask.max += 3;
  }
  if(abilitiesOwned.phaseWalk === true && flask.max != flask.heal){
    flask.max -= Math.floor(flask.max * 0.5);
  }
  
  // These for loops go through the equipments and adds the stats to equipment
  for(let i = 0; i < armors.length; i++){
    if(self.armor.toLowerCase() == armors[i].name.toLowerCase()){
      equipment.def     += armors[i].def;
      equipment.maxHp   += armors[i].hp;
      equipment.mag       += armors[i].mag;
      equipment.spd       += armors[i].spd;
      equipment.str    += armors[i].str;
    }
  }
  for(let j = 0; j < weapons.length; j++){
    if(self.weapon.toLowerCase() == weapons[j].name.toLowerCase()){
      equipment.def     += weapons[j].def;
      equipment.maxHp   += weapons[j].hp;
      equipment.mag       += weapons[j].mag;
      equipment.spd       += weapons[j].spd;
      equipment.str    += weapons[j].str;
    }
  }
  
  //all these functions check for their abilities and sets them 
  if(abilitiesOwned.cursSol == true){
    self.maxHp += 10;
    self.def--;
    self.mag--;
    self.spd--;
    self.str--;
  }
  if(abilitiesOwned.devsMan == true){
    self.maxHp -= 10;
    self.def++;
    self.mag++;
    self.spd++;
    self.str++;
  }
  
  if(abilitiesOwned.cancBlo == true){
    self.str += 4;
    self.mag    += 4;
    
    setInterval(() => {
      self.hp--;
      doc.hp.innerHTML = self.hp;
      if(self.hp <= 0){
        gameOver();
      }
    },5000);
  }
  
  //this checks to see if the ability is active and decreases max health
  //when returning from kit, health gets increased again because kit is another 'location' 
  if(abilitiesOwned.OMA == true){
    self.maxHp -= Math.floor(self.maxHp * 0.25);
  }
  
  //This part just adds the equipment stats////////////////////
  self.def   += equipment.def;
  self.maxHp += equipment.maxHp;
  self.mag   += equipment.mag;
  self.spd   += equipment.spd;
  self.str   += equipment.str;
  self.hp = Math.floor(self.maxHp);
  /////////////////////////////////////////////////////////////

  //////////Stuff to put on the HTML///////////////////////////
  doc.species.innerHTML = self.name.toUpperCase();
  doc.hp.innerHTML      = self.hp;
  doc.armor.innerHTML   = self.armor;
  doc.weapon.innerHTML  = self.weapon;
  doc.gold.innerHTML    = gold.owned;
  /////////////////////////////////////////////////////////////
  
  
  
  //This is to seperate the armors from weapons
  for(let i = 0; i < kit.length; i++){
    for(let o = 0; o < armors.length; o++){
      if(kit[i].toLowerCase() == armors[o].name.toLowerCase()){
        itemsA.push(kit[i]);
      }
    }
    for(let z = 0; z < weapons.length; z++){
      if(kit[i].toLowerCase() == weapons[z].name.toLowerCase()){
        itemsW.push(kit[i]);
      }
    }
  }
  
  // The more slain enemies, the higher the difficulty becomes with this for loop
  for(let z = 0; z < enemies.length; z++){
    if(slain > 100){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 30;
      }
      else{
        enemies[z].str  += 30;
      }
      enemies[z].maxHp += 50;
      enemies[z].def   += 20;
      
      enemies[z].hp = enemies[z].maxHp;
    }
    else if(slain > 50){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 20;
      }
      else{
        enemies[z].str  += 20;
      }
      enemies[z].maxHp += 20;
      enemies[z].def   += 10;
      
      enemies[z].hp = enemies[z].maxHp;
    }
    else if(slain > 30){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 10;
      }
      else{
        enemies[z].str  += 10;
      }
      enemies[z].maxHp += 10;
      enemies[z].def   += 5;
      
      enemies[z].hp = enemies[z].maxHp;
    }
    else if(slain > 15){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 5;
      }
      else{
        enemies[z].str  += 5;
      }
      enemies[z].maxHp += 5;
      enemies[z].def   += 2.5;
      
      enemies[z].hp = enemies[z].maxHp;
    }
    else if(slain < 15){
      if(enemies[z].type.toLowerCase() == 'elf'){
        enemies[z].mag  += 5;
      }
      else{
        enemies[z].str  -= 5;
      }
      enemies[z].maxHp -= 10;
      enemies[z].def   -= 5;
      
      if(enemies[z].str <= 0){
        enemies[z].str = 1;
      }
      if(enemies[z].def <= 1){
        enemies[z].def = 1;
      }
      if(enemies[z].maxHp <= 0){
        enemies[z].maxHp = 5;
      }
      
      enemies[z].hp = enemies[z].maxHp;
    }
  }
  difficulty.def += 2.5;
  
  // This just puts the health on the html doc when you come back from the kit page
  if(loc == 'kit'){
    self.hp          = p1.hp;
    doc.hp.innerHTML = self.hp;
  }
  
  console.log('Player',self);
  
}
Init(p1.name, p1.def,p1.hp, p1.maxHp, p1.mag, p1.spd, p1.str, p1.armor, p1.weapon, p1.gold, p1.ability1, p1.ability2, p1.ability3);


//this just sets the enemies up if loaded from the kit
window.addEventListener('load',() => {
  var loc = localStorage.getItem('location').toLowerCase();
  var en  = localStorage.getItem('recEnemy').toLowerCase();
  
  if(loc == 'kit'){
    console.log('Kit confirmed...');
    if(en == undefined || en == null){

    } else{
      enemy = JSON.parse(localStorage.getItem('recEnemy'));
      doc.actions.innerHTML = 'A ' + enemy.type.toUpperCase() + ' appeared!';
      enemyDocSpecies.innerHTML = enemy.type.toUpperCase();
      enemyDocHp.innerHTML      = enemy.hp;
    }
    
    
    doc.start.innerHTML       = '';
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
  if(abilitiesOwned.shopSpre == true){
    chance  -= 0.1;
    chance2 -= 0.1;
  }
  
  //this will do the greeting back to the game
  if(doc.actions.innerHTML == greetings.welcome
  || doc.actions.innerHTML == doc.click){
    doc.actions.innerHTML = doc.click;
  } else{
    //this checks to see if you healed
    if(action == btns.heal){
      if(abilitiesOwned.medic === true){
        //this makes it so the ability gives the extra 10% health
        flask.heal =  Math.floor(Math.random() * self.maxHp + self.maxHp / 2);
        flask.heal += Math.floor(flask.heal * 0.1);
      } else{
        flask.heal = Math.floor(Math.random() * self.maxHp + self.maxHp / 2);
      }
      
      if(abilitiesOwned.brompTail == true){
        flask.heal = Math.floor(flask.heal * 0.25);
      }
      
      if(flask.amount <= 0){
        flask.amount = 0; 
        
        doc.extras.style.height = 'auto';
        doc.extras.style.visibility = 'visible';
        doc.extras.innerHTML = 'You have no more flasks';
        
        remove();
      } else if(self.hp >= self.maxHp){
        self.hp      = Math.floor(self.maxHp);
        doc.hp.innerHTML = self.hp;
        
        doc.extras.style.height     = 'auto';
        doc.extras.style.visibility = 'visible';
        doc.extras.innerHTML        = 'You have full health';
        
        remove();
      } else{
        console.log('Healed ' + flask.heal);
        self.hp += flask.heal;
        
        //You get rid of one from the owned and add it to empty
        if(abilitiesOwned.xfaded === true && random <= 0.10){
          flask.amount = flask.amount;
        }
        else if(abilitiesOwned.sodaF === true && random <= 0.15){
          flask.amount = flask.amount;
        }
        else{
          flask.amount--;
          flask.empty++;
        }
        
        if(self.hp >= self.maxHp){
          self.hp = Math.floor(self.maxHp);
        }
        
        doc.hp.innerHTML     = self.hp;
        doc.flasks.innerHTML = flask.amount;
        
        if(flask.amount <= 0){
          doc.cFlask.style.color = '#757575';
        }
      }
    }
    
    if(doc.actions.innerHTML == greetings.intro){
      doc.actions.innerHTML = events.enemy;
      
      run();

    } else if(doc.actions.innerHTML == events.enemy){
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        generateEnemy();
      },2500);

    } else if(doc.actions.innerHTML == events.stranger){
      if(random2 <= chance){
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
          generateEnemy();
        },1000);

      } else{
        random2 = Math.random() * 1;
        
        actions.forEach((action) => {
          action.style.visibility = 'hidden';
        });
        
        console.log('Stranger danger!');
        doc.actions.innerHTML = events.merchant;
        
        self.def   -= equipment.def;
        self.maxHp -= equipment.maxHp;
        self.mag   -= equipment.mag;
        self.spd   -= equipment.spd;
        self.str   -= equipment.str;
        
        if(abilitiesOwned.hopRom === true){
          self.maxHp  = Math.floor(self.maxHp / 0.5);
        }
        if(abilitiesOwned.cursSol == true){
          self.maxHp -= 10;
          self.def++;
          self.mag++;
          self.spd++;
          self.str++;
        }
        if(abilitiesOwned.devsMan == true){
          self.maxHp += 10;
          self.def--;
          self.mag--;
          self.spd--;
          self.str--;
        }
        if(abilitiesOwned.cancBlo == true){
          self.str -= 4;
          self.mag -= 4;
        }
        if(abilitiesOwned.OMA == true){
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
        } else if(random2 <= 0.50){
          console.log('Going to the abilities');
          setTimeout(() => {
            window.location.href = 'abilitiesShop.html';
          },3000);
        } else{
          console.log('Going to the stats');
          setTimeout(() => {
            window.location.href = 'statsShop.html';
          },3000);
        }
      }
    } else if(doc.actions.innerHTML == events.merchant){
      if(random2 <= chance2){
        random2 = Math.random() * 1;
        
        actions.forEach((action) => {
          action.style.visibility = 'hidden';
        });
        
        console.log('Fenny: "Gottem coach!"');
        self.def   -= equipment.def;
        self.maxHp -= equipment.maxHp;
        self.mag   -= equipment.mag;
        self.spd   -= equipment.spd;
        self.str   -= equipment.str;
        
        if(abilitiesOwned.hopRom === true){
          self.maxHp  = Math.floor(self.maxHp / 0.5);
        }
        if(abilitiesOwned.cursSol == true){
          self.maxHp -= 10;
          self.def++;
          self.mag++;
          self.spd++;
          self.str++;
        }
        if(abilitiesOwned.devsMan == true){
          self.maxHp += 10;
          self.def--;
          self.mag--;
          self.spd--;
          self.str--;
        }
        if(abilitiesOwned.cancBlo == true){
          self.str -= 4;
          self.mag    -= 4;
        }
        if(abilitiesOwned.OMA == true){
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
        } else if(random2 <= 0.8 && random2 > 0.5){
          console.log('Going to the abilities');
          setTimeout(() => {
            window.location.href = 'abilitiesShop.html';
          }, 3000);
        } else{
          console.log('Going to the stats');
          setTimeout(() => {
            window.location.href = 'statsShop.html';
          }, 3000);
        }
      } else{
          generateEnemy();
      }
    } else if(doc.actions.innerHTML == 'A ' + enemy.type.toUpperCase() + ' appeared!'){
        if(enemy.hp > 0){
          if(action == btns.mag || action == btns.attack){
            //do something w/spd at some point
            if(self.spd > enemy.spd){
              doc.extras.innerHTML = '';
              attack(action);

              if(enemy.hp > 0){
                enemyAttack(action);
              }
            } else{
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
              
              if(abilitiesOwned.blodThirs == true){
                self.hp += 5;
                if(self.hp > self.maxHp){
                  self.hp = self.maxHp;
                }
                doc.hp.innerHTML = self.hp;
              }
              
              doc.actions.innerHTML = story[random];
              run();
            }
          } else if(action == btns.defend){
              doc.extras.innerHTML = '';
              enemyAttack(action);
          } else{
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
  const random = Math.random() * 1;
  var damage   = 0;
  console.log('You called enemyAttack()');
  
  var mgkBlood = false;
  var lmfs     = false;
  var cheapy   = false;
  
  for(var i = 0; i < ability.length; i++){
    if(ability[i] == 'magicblood'){
      console.log('mgkblood');
      mgkBlood = true;
    }
    if(ability[i] == 'lmfs' && self.hp <= Math.ceil(self.maxHp * 0.25)){
      console.log('Ability: LMFS');
      lmfs = true;
    }
    if(ability[i] == 'cheapshot'){
      cheapy = true;
    }
  }
  
  //this decreases self def by 50% if ability:suffering, is true
  if(abilitiesOwned.suffering === true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.def *= 0.5;
  }
  
  if(abilitiesOwned.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.def += Math.floor(self.def / 0.5);
  }
  
  if(lmfs == true){
    self.def /= 0.5;
  }
  
  
  if(action == btns.attack
  || action == btns.mag){
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
      if(abilitiesOwned.FAN == true){
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
  if(abilitiesOwned.suffering === true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.def /= 0.5;
  }
  
  if(abilitiesOwned.buffPow === true){
    damage -= Math.floor(damage * 0.05)
  }
  
  if(abilitiesOwned.abyssSurv === true){
    if(enemy.type.toLowerCase() == 'abyss walker'){
      damage = Math.floor(damage * 0.75);
    }
  }
  
  if(cheapy == true && random <= 0.20){
    damage = 0;
  }
  
  if(abilitiesOwned.xfaded == true){
    damage += Math.floor(damage * 0.1);
  }
  
  if(abilitiesOwned.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.def = Math.floor(self.def * 0.5);
  }
  
  if(abilitiesOwned.royBlo == true){
    damage += Math.floor(damage * 0.05);
  }
  
  if(lmfs == true){
    self.def *= 0.5;
  }
  
  
  self.hp          -= Math.floor(damage);
  doc.hp.innerHTML      = self.hp;
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
  var masteries    = [
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
      self.str /= 0.5;
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
  if(abilitiesOwned.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.str += Math.floor(self.str / 0.5);
  }
  
  if(action == btns.magic){
    //this is a crt mgk atk 
    //working on mgk crt atk
    if(self.mag > enemy.mag
    && random > chance){
      damage = Math.floor(self.mag * 2.5);
      doc.extras.innerHTML = 'Critical magic damage dealt: ';
    }
    else if(self.mag > enemy.mag){
      damage = Math.floor(self.mag * 1.25);
      doc.extras.innerHTML = 'Magic damage dealt: ';
    }
    else{
      damage = Math.floor(self.mag * 0.7);
      doc.extras.innerHTML = 'Weak magic damage dealt: ';
    }
    
    if(abilitiesOwned.FAN == true){
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
      doc.extras.innerHTML += 'Physical damage dealt: ';
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
      doc.extras.innerHTML += 'Critical damage dealt: ';
    }
    
  }
  
  console.log('Before Damage:',damage);
  
  //this is to remove the abilities after use(rampage)
  //increases DMG by 10% if ability was a weapons mastery
  if(rampage == true){
    self.str /= 0.5
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
  
  if(abilitiesOwned.suffering === true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    damage += damage * 0.75;
  }
  
  if(abilitiesOwned.buffPow === true){
    damage += damage * 0.1;
  }
  
  if(abilitiesOwned.abyssSurv == true){
    if(enemy.type.toLowerCase() == 'abyss walker'){
      damage += damage * 0.1;
    }
  }
  
  if(abilitiesOwned.xfaded == true){
    damage += damage * 0.1;
  }
  
  if(abilitiesOwned.OMA == true && self.hp <= Math.ceil(self.maxHp * 0.25)){
    self.str = Math.floor(self.str * 0.5);
  }
  
  if(abilitiesOwned.exoGen == true){
    for(var i = 0; i < hectics.length; i++){
      if(enemy.type.toLowerCase() == hectics[i].type.toLowerCase()){
        damage += damage * 0.05;
      }
    }
  }
  
  if(abilitiesOwned.hellfire == true){
    damage += damage * 0.1;
  }
  
  if(deathStare == true){
    damage = enemy.hp;
  }
  
  console.log('After Damage:',damage);
  doc.extras.innerHTML += Math.ceil(damage);
  
  enemy.hp        -= Math.ceil(damage);
  enemyDocHp.innerHTML = enemy.hp;
  
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
  } else if(0.96 < random
    || slain > 50 && random > 0.90
    || slain > 100 && random > 0.80){
      //This'll spawn one of the hectic
      enemy = hectics[random3];
      // console.log('You called the ' + enemy.type);
  }
  
  
  console.log('Enemy:', enemy);
  // HTML stuff right here, showing who the enemy is, saying who it is and their health
  doc.actions.innerHTML     = 'A ' + enemy.type.toUpperCase() + ' appeared!';
  enemyDocSpecies.innerHTML = enemy.type.toUpperCase();
  enemyDocHp.innerHTML      = enemy.hp;
  
}

//need a way to select a item of use and also sell items in the shop
function generateTreasure(){
  let item     = ''
  let random   = Math.random() * 1;
  let randomG  = Math.floor(Math.random() * 1500) + 1;
  let chance   = 0.08;
  let chance2  = 0.15;
  let flaskCha = 0.2;
  
  if(abilitiesOwned.vodka === true){
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
  if(abilitiesOwned.corspe == true){
    randomG += Math.floor(randomG * 0.1);
    chance  += 0.5;
    chance2 += 0.5;
  }
  
  //Gold will be updated
  gold.owned        += randomG;
  doc.gold.innerHTML = gold.owned;
  
  doc.extras.innerHTML = 'You found ' + randomG + ' gold!';
  
  //this chance is for weapons
  if(self.name.toLowerCase() == 'werewolf'
  && random <= chance){
    doc.extras.innerHTML = "You found a weapon but can't carry it...";
  }
  else if(random <= chance){
    item = weapons[randomW].name;
    kit.push(item);
    
    console.log(kit);
    
    doc.extras.innerHTML += '<br>' + 'This item: ' + item;
  }
  else if(random <= flaskCha){
    flask.amount += 1;
    doc.flasks.innerHTML = flask.amount;
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
  var random = Math.random() * 1;
  
  for(var i = 0; i < ability.length; i++){
    if(ability[i] === 'tbtfm' && random <= 0.1){
      abilitiesOwned.tbtfm = true;
    }
    if(ability[i] === 'sunsinger' && random <= 0.05){
      abilitiesOwned.sunSin = true;
    }
    if(ability[i] === 'afterlife' && random <= 0.3){
      abilitiesOwned.aflife = true;
    }
    if(ability[i] === 'deadagain' && random <= 0.1){
      abilitiesOwned.deadA = true;
    }
    if(ability[i] == 'rebornagain' && random <= 0.1){
      abilitiesOwned.reborn = true;
    }
  }
  
  //something wrong with gameover
  if(abilitiesOwned.sunSin == true && self.hp <= 0){
    flask.amount          = flask.max;
    flask.empty           = 0;
    self.hp           = self.maxHp;
    doc.hp.innerHTML      = self.hp;
    doc.flasks.innerHTML  = flask.amount;
    doc.actions.innerHTML = 'The sun sang to your blood';
    var time = setInterval(() => {
      doc.actions.innerHTML += '.';
    },600);
    
    setTimeout(() => {
      clearInterval(time);
      doc.actions.innerHTML = 'A ' + enemy.type.toUpperCase() + ' appeared!'; 
    },2400);
  }
  else if(abilitiesOwned.deadA  == true && self.hp <= 0){
    self.hp = 1;
    flask.amount++;
    
    doc.extras.innerHTML = "You're dead again...";
    doc.hp.innerHTML     = self.hp;
    doc.flasks.innerHTML = flask.amount;
  }
  else if(abilitiesOwned.reborn == true && self.hp <= 0){
    self.hp = self.maxHp;
    
    doc.extras.innerHTML = "You're reborn...";
    doc.hp.innerHTML     = self.hp;
  }
  else if(abilitiesOwned.tbtfm  == true && self.hp <= 0){
    enemy.hp = 0;
    self.hp  = self.maxHp;
    
    run();
  }
  else if(abilitiesOwned.aflife == true && self.hp <= 0){
    doc.extras.innerHTML = "You're reborn Archangel...";
    
    self.type      = 'Archangel';
    self.def   = 2;
    self.hp    = 40;
    self.maxHp = 40;
    self.mag     = 5;
    self.spd     = 2;
    self.str  = 9;
    self.ability1  = "Devil'sMan";
    self.ability2  = 'Suffering';
    self.ability3  = 'Hellfire';
    
    doc.hp.innerHTML      = self.hp;
    doc.species.innerHTML = self.type;
    
    console.log(self);
  }
  else{
    self.hp = 0;
    
    doc.hp.innerHTML      = self.hp;
    doc.actions.innerHTML = 'Game Over! You killed ' + slain + ' enemies';
    
    localStorage.setItem('kills', 0);
    localStorage.setItem('kit','[]');
    
    setTimeout(() => {
      window.location.href = 'main.html';
    },5000);
  }
  
}

doc.start.addEventListener('click',() => {
  doc.start.innerHTML       = '';
  doc.start.style.visibilty = 'hidden';
  doc.start.style.border    = 'none';
  doc.start.style.height    = 0;
  
  doc.actions.innerHTML = greetings.intro;
  run(btns.blank);
});

doc.kit.addEventListener('click'  ,() => {
  self.def   -= equipment.def;
  self.maxHp -= equipment.maxHp;
  self.mag   -= equipment.mag;
  self.spd   -= equipment.spd;
  self.str   -= equipment.str;
  
  if(abilitiesOwned.hopRom === true){
    self.maxHp  = Math.floor(self.maxHp / 0.5);
  }
  if(abilitiesOwned.cursSol == true){
    self.maxHp -= 10;
    self.def++;
    self.mag++;
    self.spd++;
    self.str++;
  }
  if(abilitiesOwned.devsMan == true){
    self.maxHp += 10;
    self.def--;
    self.mag--;
    self.spd--;
    self.str--;
  }
  if(abilitiesOwned.cancBlo == true){
    self.str -= 4;
    self.mag -= 4;
  }
  if(abilitiesOwned.OMA == true){
    self.maxHp = Math.ceil(self.maxHp / 0.75);
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
    // console.log(btns[e.target.attributes.name.value]);
    run(btns[e.target.attributes.name.value]);
  });
});









































