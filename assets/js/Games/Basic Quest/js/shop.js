
/*
            --NOTES--
  --Need to make a sell portion to the shop, to sell items--
  ---Probably sell items for 50% - 70% of original cost-
  
  --need to make it that the flasks decrease prices too--
*/
localStorage.setItem('location','shop');

let gold  = JSON.parse(localStorage.getItem('gold'));
let flask = JSON.parse(localStorage.getItem('flask'));

let self   = JSON.parse(localStorage.getItem('race'));
let specs  = document.querySelectorAll('.self li span');
let equip  = document.querySelectorAll('.equipment li span');
let equip1 = document.querySelectorAll('.equipment1 li span');
let wep;
let body;

let doc = {
  extras: document.getElementById('extras'),
  flask:  document.querySelector('#flask'),
  gold:   document.querySelector('.gold'),
  leave:  document.querySelector('.leave'),
  kit:    document.querySelector('.kit'),
};
doc.extras.style.height     = 'auto';
doc.extras.style.visibility = 'visible';


let ability = [
  self.ability1.toLowerCase(),
  self.ability2.toLowerCase(),
  self.ability3.toLowerCase(),
];

let buffPow = false;
let charm   = false;
let bdch    = false;
let cheapy  = false;
let xfaded  = false;
let exoGen  = false;
let royBlo  = false;
let shaeTre = false;

//BYOG-----------------//
let count       = 0;
const stealChan = 0.98;
let byog        = false;
//---------------------//

for(let i = 0; i < ability.length; i++){
  if(ability[i] == 'charisma'){
    charm = true;
  }
  if(ability[i] == 'bdch'){
    bdch = true;
  }
  if(ability[i] == 'buffalopower'){
    buffPow = true;
  }
  if(ability[i] == 'cheapshot'){
    cheapy = true;
  }
  if(ability[i] == 'crossfaded'){
    xfaded = true;
  }
  if(ability[i] == "noshoesisokaywithme"){
    nsowm = true;
  }
  if(ability[i] == 'exoticgent'){
    exoGen = true;
  }
  if(ability[i] == 'royalblood'){
    royBlo = true;
  }
  if(ability[i] == 'byog'){
    byog = true;
  }
  if(ability[i] == 'sharedtrade'){
    shaeTre = true;
  }
}
  
if(buffPow == true){
  doc.extras.innerHTML = 'You damned buffalos...';
}
else if(cheapy == true){
  doc.extras.innerHTML = "You're a cheapshot, I hate your kind";
}
else{
  doc.extras.innerHTML = 'Welcome to the shop!';
}
//working on stealing BYOG
remove();

var weapStat   = {
  defense:  document.querySelector("[name=w-defense]"),
  health:   document.querySelector("[name=w-health]"),
  magic:    document.querySelector("[name=w-magic]"),
  name:     document.querySelector("[name=w-name]"),
  price:    document.querySelector("[name=w-price]"),
  speed:    document.querySelector("[name=w-speed]"),
  strength: document.querySelector("[name=w-strength]"),
};
var weapStat1  = {
  defense:  document.querySelector("[name=w1-defense]"),
  health:   document.querySelector("[name=w1-health]"),
  magic:    document.querySelector("[name=w1-magic]"),
  name:     document.querySelector("[name=w1-name]"),
  price:    document.querySelector("[name=w1-price]"),
  speed:    document.querySelector("[name=w1-speed]"),
  strength: document.querySelector("[name=w1-strength]"),
};
var weapStat2  = {
  defense:  document.querySelector("[name=w2-defense]"),
  health:   document.querySelector("[name=w2-health]"),
  magic:    document.querySelector("[name=w2-magic]"),
  name:     document.querySelector("[name=w2-name]"),
  price:    document.querySelector("[name=w2-price]"),
  speed:    document.querySelector("[name=w2-speed]"),
  strength: document.querySelector("[name=w2-strength]"),
};
var armorStat  = {
  defense:  document.querySelector("[name=a-defense]"),
  health:   document.querySelector("[name=a-health]"),
  magic:    document.querySelector("[name=a-magic]"),
  name:     document.querySelector("[name=a-name]"),
  price:    document.querySelector("[name=a-price]"),
  speed:    document.querySelector("[name=a-speed]"),
  strength: document.querySelector("[name=a-strength]"),
};
var armorStat1 = {
  defense:  document.querySelector("[name=a1-defense]"),
  health:   document.querySelector("[name=a1-health]"),
  magic:    document.querySelector("[name=a1-magic]"),
  name:     document.querySelector("[name=a1-name]"),
  price:    document.querySelector("[name=a1-price]"),
  speed:    document.querySelector("[name=a1-speed]"),
  strength: document.querySelector("[name=a1-strength]"),
};
var armorStat2 = {
  defense:  document.querySelector("[name=a2-defense]"),
  health:   document.querySelector("[name=a2-health]"),
  magic:    document.querySelector("[name=a2-magic]"),
  name:     document.querySelector("[name=a2-name]"),
  price:    document.querySelector("[name=a2-price]"),
  speed:    document.querySelector("[name=a2-speed]"),
  strength: document.querySelector("[name=a2-strength]"),
};

var kit = JSON.parse(localStorage.getItem('kit'));

let itemsA = [];
let itemsW = [];

//This loop seperates the kit by armor and weapon
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
  
console.log('Kit Armors',itemsA,',','Kit Weapons',itemsW);

doc.gold.innerHTML  = gold.owned;
doc.flask.innerHTML = flask.amount;

const selection = document.querySelectorAll('button');

var timeout;
function remove(){
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    doc.extras.style.visibility = 'hidden';
  }, 3000);
}

//need to find a way to make this function smaller
//items() displays the items of the shop
function items(){
  var armorChoice = Math.floor(Math.random() * armors.length);
  var weapChoice  = Math.floor(Math.random() * weapons.length);
  var first;
  var second;
  
  
  //this part decreases shop prices by 10% if they have the ability
  if(charm === true){
    for(var i = 0; i < weapons.length; i++){
      weapons[i].price -= weapons[i].price * 0.1;
    }
    for(var i = 0; i < armors.length; i++){
      armors[i].price -= armors[i].price * 0.1;
    }
  }
  /////////////////////////////////////////////////////////////////
  //this part decreases shop prices by 5% if they have the ability
  if(bdch === true){
    for(var i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.05);
    }
    for(var i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.05);
    }
  }
  /////////////////////////////////////////////////////////////////
  //this part increases the prices by 10%
  if(buffPow === true
  || cheapy  === true
  || xfaded  === true){
    for(var i = 0; i < weapons.length; i++){
      weapons[i].price += Math.floor(weapons[i].price * 0.1);
    }
    for(var i = 0; i < armors.length; i++){
      armors[i].price += Math.floor(armors[i].price * 0.1);
    }
    if(buffPow === true){
      if(flask.max == flask.heal){
        flask.max = flask.max;
      }
      else{
        flask.max++;
      }
    }
  }
  ////////////////////////////////////////////////////////////////
  //this part increases the prices by 15%
  if(exoGen === true){
    for(var i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.15);
    }
    for(var i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.15);
    }
  }
  /////////////////////////////////////////////////////////////
  //this part increases the prices by 20%
  if(royBlo === true){
    for(var i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.2);
    }
    for(var i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.2);
    }
  }
  /////////////////////////////////////////////////////////////
  //this part increases the prices by 40%
  if(shaeTre === true){
    for(var i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.4);
    }
    for(var i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.4);
    }
  }
  /////////////////////////////////////////////////////////////
  
  weapStat.defense.innerHTML   = weapons[weapChoice].defense;
  weapStat.health.innerHTML    = weapons[weapChoice].health;
  weapStat.magic.innerHTML     = weapons[weapChoice].magic;
  weapStat.name.innerHTML      = weapons[weapChoice].name.trim();
  weapStat.price.innerHTML     = weapons[weapChoice].price;
  weapStat.speed.innerHTML     = weapons[weapChoice].speed;
  weapStat.strength.innerHTML  = weapons[weapChoice].strength;
  weapStat.type                = weapons[weapChoice].type;
  
  first        = weapChoice;
  second       = weapChoice;
  weapChoice  = Math.floor(Math.random() * weapons.length);
  if(weapChoice == first
  || weapChoice == second){
    weapChoice = Math.floor(Math.random() * weapons.length);
  }
  
  weapStat1.defense.innerHTML   = weapons[weapChoice].defense;
  weapStat1.health.innerHTML    = weapons[weapChoice].health;
  weapStat1.magic.innerHTML     = weapons[weapChoice].magic;
  weapStat1.name.innerHTML      = weapons[weapChoice].name.trim();
  weapStat1.price.innerHTML     = weapons[weapChoice].price;
  weapStat1.speed.innerHTML     = weapons[weapChoice].speed;
  weapStat1.strength.innerHTML  = weapons[weapChoice].strength;
  weapStat1.type                = weapons[weapChoice].type;
  
  first       = weapChoice;
  weapChoice  = Math.floor(Math.random() * weapons.length);
  if(weapChoice == first
  || weapChoice == second){
    weapChoice = Math.floor(Math.random() * weapons.length);
  }
  
  weapStat2.defense.innerHTML   = weapons[weapChoice].defense;
  weapStat2.health.innerHTML    = weapons[weapChoice].health;
  weapStat2.magic.innerHTML     = weapons[weapChoice].magic;
  weapStat2.name.innerHTML      = weapons[weapChoice].name.trim();
  weapStat2.price.innerHTML     = weapons[weapChoice].price;
  weapStat2.speed.innerHTML     = weapons[weapChoice].speed;
  weapStat2.strength.innerHTML  = weapons[weapChoice].strength;
  weapStat2.type                = weapons[weapChoice].type;
  
  armorStat.defense.innerHTML  = armors[armorChoice].defense;
  armorStat.health.innerHTML   = armors[armorChoice].health;
  armorStat.magic.innerHTML    = armors[armorChoice].magic;
  armorStat.name.innerHTML     = armors[armorChoice].name.trim();
  armorStat.price.innerHTML    = armors[armorChoice].price;
  armorStat.speed.innerHTML    = armors[armorChoice].speed;
  armorStat.strength.innerHTML = armors[armorChoice].strength;
  
  first       = armorChoice;
  second      = armorChoice;
  armorChoice  = Math.floor(Math.random() * armors.length);
  if(armorChoice == first
  || armorChoice == second){
    armorChoice = Math.floor(Math.random() * armors.length);
  }
  
  armorStat1.defense.innerHTML  = armors[armorChoice].defense;
  armorStat1.health.innerHTML   = armors[armorChoice].health;
  armorStat1.magic.innerHTML    = armors[armorChoice].magic;
  armorStat1.name.innerHTML     = armors[armorChoice].name.trim();
  armorStat1.price.innerHTML    = armors[armorChoice].price;
  armorStat1.speed.innerHTML    = armors[armorChoice].speed;
  armorStat1.strength.innerHTML = armors[armorChoice].strength;
  
  first          = armorChoice;
  armorChoice    = Math.floor(Math.random() * armors.length);
  if(armorChoice == first
  || armorChoice == second){
     armorChoice  = Math.floor(Math.random() * armors.length);
  }
  
  armorStat2.defense.innerHTML  = armors[armorChoice].defense;
  armorStat2.health.innerHTML   = armors[armorChoice].health;
  armorStat2.magic.innerHTML    = armors[armorChoice].magic;
  armorStat2.name.innerHTML     = armors[armorChoice].name.trim();
  armorStat2.price.innerHTML    = armors[armorChoice].price;
  armorStat2.speed.innerHTML    = armors[armorChoice].speed;
  armorStat2.strength.innerHTML = armors[armorChoice].strength;
}
items();


//this just shows up the kit you have equipped and displays it on the page
window.addEventListener('load', () => {
  specs.forEach((spec) => {
    if(spec.attributes.name.value == 'type'){
      spec.innerHTML = self.type.toUpperCase();
    }
    else if(spec.attributes.name.value == 'defense'){
      spec.innerHTML = self.defense;
    }
    else if(spec.attributes.name.value == 'health'){
      self.health = self.maxHealth;
      spec.innerHTML = self.health;
    }
    else if(spec.attributes.name.value == 'magic'){
      spec.innerHTML = self.magic;
    }
    else if(spec.attributes.name.value == 'speed'){
      spec.innerHTML = self.speed;
    }
    else if(spec.attributes.name.value == 'strength'){
      spec.innerHTML = self.strength;
    }
  });
  
  equip.forEach((ment) => {
    for(var i = 0; i < weapons.length; i++){
      if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()){
        wep = weapons[i];
      }
    }
    
    if(ment.attributes.name.value == 'name'){
      ment.innerHTML = wep.name;
    }
    else if(ment.attributes.name.value == 'defense'){
      ment.innerHTML = wep.defense;
    }
    else if(ment.attributes.name.value == 'health'){
      ment.innerHTML = wep.health;
    }
    else if(ment.attributes.name.value == 'magic'){
      ment.innerHTML = wep.magic;
    }
    else if(ment.attributes.name.value == 'speed'){
      ment.innerHTML = wep.speed;
    }
    else if(ment.attributes.name.value == 'strength'){
      ment.innerHTML = wep.strength;
    }
    else if(ment.attributes.name.value == 'type'){
      ment.innerHTML = wep.type;
    }
  })
  
  equip1.forEach((ment) => {
    for(var i = 0; i < armors.length; i++){
      if(self.armor == armors[i].name){
        body = armors[i];
      }
    }
    
    if(ment.attributes.name.value == 'type'){
      ment.innerHTML = body.name;
    }
    else if(ment.attributes.name.value == 'defense'){
      ment.innerHTML = body.defense;
    }
    else if(ment.attributes.name.value == 'health'){
      ment.innerHTML = body.health;
    }
    else if(ment.attributes.name.value == 'magic'){
      ment.innerHTML = body.magic;
    }
    else if(ment.attributes.name.value == 'speed'){
      ment.innerHTML = body.speed;
    }
    else if(ment.attributes.name.value == 'strength'){
      ment.innerHTML = body.strength;
    }
  })
});


//make a for loop for the selection, this'll shorten the code
//need to make forloops for this to be shorter
//this is a event listener for portions with the select option
selection.forEach((select) => {
  var orgHTML = {};
  
  //this part is for when they buy something in the shop
  //this adds when select is clicked on, it will run this function
  select.addEventListener('click',(e) => {
    doc.extras.style.visibility = 'visible';
    doc.extras.style.height = 'auto';
    
      
    if(e.target.attributes.name.value.toLowerCase() == 'armor'){
      var owned = '';
      console.log('This is some type of armor');

      for(var i = 0; i < kit.length; i++){
        if(armorStat.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(stealChan <= Math.random() && count <= 3 
      && byog == true){
        console.log('Armor:',armorStat.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.armor = armorStat.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(armorStat.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        
        var selected = [
          armorStat.name.innerHTML,
          armorStat.defense.innerHTML,
          armorStat.health.innerHTML,
          armorStat.magic.innerHTML,
          armorStat.speed.innerHTML,
          armorStat.strength.innerHTML,
        ]
        for(var i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = armorStat.defense.innerHTML;
        orgHTML.health   = armorStat.health.innerHTML;
        orgHTML.magic    = armorStat.magic.innerHTML;
        orgHTML.speed    = armorStat.speed.innerHTML;
        orgHTML.strength = armorStat.strength.innerHTML;
         
        console.log(self);
        console.log('Kit', kit);
      }
      else if(armorStat.name.innerHTML.toLowerCase() == owned.toLowerCase()){
        doc.extras.innerHTML = 'You already own this armor';
      }
      else if(gold.owned < JSON.parse(armorStat.price.innerHTML)){
        doc.extras.innerHTML = "You don't have enough gold!";
        count++;
      }
      else{
        gold.owned -= JSON.parse(armorStat.price.innerHTML);
        gold.spent += JSON.parse(armorStat.price.innerHTML);
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        doc.extras.innerHTML = "You bought a " + armorStat.name.innerHTML;
        console.log('Armor:',armorStat.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.armor = armorStat.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(armorStat.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        
        var selected = [
          armorStat.name.innerHTML,
          armorStat.defense.innerHTML,
          armorStat.health.innerHTML,
          armorStat.magic.innerHTML,
          armorStat.speed.innerHTML,
          armorStat.strength.innerHTML,
        ]
        for(var i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = armorStat.defense.innerHTML;
        orgHTML.health   = armorStat.health.innerHTML;
        orgHTML.magic    = armorStat.magic.innerHTML;
        orgHTML.speed    = armorStat.speed.innerHTML;
        orgHTML.strength = armorStat.strength.innerHTML;
         
        console.log(self);
        console.log('Kit', kit);
      }
      
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor1'){
      var owned = '';
      console.log('This is some type of armor');
      
      for(var i = 0; i < kit.length; i++){
        if(armorStat1.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(stealChan <= Math.random() && count <= 3 
      && byog == true){
        console.log('Armor:',armorStat1.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.armor = armorStat1.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(armorStat1.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        
        var selected = [
          armorStat1.name.innerHTML,
          armorStat1.defense.innerHTML,
          armorStat1.health.innerHTML,
          armorStat1.magic.innerHTML,
          armorStat1.speed.innerHTML,
          armorStat1.strength.innerHTML,
        ]
        for(var i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = armorStat1.defense.innerHTML;
        orgHTML.health   = armorStat1.health.innerHTML;
        orgHTML.magic    = armorStat1.magic.innerHTML;
        orgHTML.speed    = armorStat1.speed.innerHTML;
        orgHTML.strength = armorStat1.strength.innerHTML;
         
        console.log(self);
        console.log('Kit', kit);
      }
      else if(armorStat1.name.innerHTML.toLowerCase() == owned.toLowerCase()){
        doc.extras.innerHTML = 'You already own this armor';
      }
      else if(gold.owned < JSON.parse(armorStat1.price.innerHTML)){
        doc.extras.innerHTML = "You don't have enough gold!";
        count++;
      }
      else{
        gold.owned -= JSON.parse(armorStat1.price.innerHTML);
        gold.spent += JSON.parse(armorStat1.price.innerHTML);
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        doc.extras.innerHTML = "You bought a " + armorStat1.name.innerHTML;
        console.log('Armor:',armorStat1.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.armor = armorStat1.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(armorStat1.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        var selected = [
          armorStat1.name.innerHTML,
          armorStat1.defense.innerHTML,
          armorStat1.health.innerHTML,
          armorStat1.magic.innerHTML,
          armorStat1.speed.innerHTML,
          armorStat1.strength.innerHTML,
        ]
        for(var i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = armorStat1.defense.innerHTML;
        orgHTML.health   = armorStat1.health.innerHTML;
        orgHTML.magic    = armorStat1.magic.innerHTML;
        orgHTML.speed    = armorStat1.speed.innerHTML;
        orgHTML.strength = armorStat1.strength.innerHTML;
        
        console.log(self);
        console.log('Kit', kit);
      }
      
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor2'){
      var owned = '';
      console.log('This is some type of armor');
      
      for(var i = 0; i < kit.length; i++){
        if(armorStat2.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(stealChan <= Math.random() && count <= 3 
      && byog == true){
        console.log('Armor:',armorStat2.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.armor = armorStat1.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(armorStat1.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        
        var selected = [
          armorStat2.name.innerHTML,
          armorStat2.defense.innerHTML,
          armorStat2.health.innerHTML,
          armorStat2.magic.innerHTML,
          armorStat2.speed.innerHTML,
          armorStat2.strength.innerHTML,
        ]
        for(var i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = armorStat2.defense.innerHTML;
        orgHTML.health   = armorStat2.health.innerHTML;
        orgHTML.magic    = armorStat2.magic.innerHTML;
        orgHTML.speed    = armorStat2.speed.innerHTML;
        orgHTML.strength = armorStat2.strength.innerHTML;
         
        console.log(self);
        console.log('Kit', kit);
      }
      else if(armorStat2.name.innerHTML.toLowerCase() == owned.toLowerCase()){
        doc.extras.innerHTML = 'You already own this armor';
      }
      else if(gold.owned < JSON.parse(armorStat2.price.innerHTML)){
        doc.extras.innerHTML = "You don't have enough gold!";
        count++;
      }
      else{
        gold.owned -= JSON.parse(armorStat2.price.innerHTML);
        gold.spent += JSON.parse(armorStat2.price.innerHTML);
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        doc.extras.innerHTML = "You bought a " + armorStat2.name.innerHTML;
        console.log('Armor:',armorStat2.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.armor = armorStat2.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(armorStat2.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        var selected = [
          armorStat2.name.innerHTML,
          armorStat2.defense.innerHTML,
          armorStat2.health.innerHTML,
          armorStat2.magic.innerHTML,
          armorStat2.speed.innerHTML,
          armorStat2.strength.innerHTML,
        ]
        for(var i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = armorStat2.defense.innerHTML;
        orgHTML.health   = armorStat2.health.innerHTML;
        orgHTML.magic    = armorStat2.magic.innerHTML;
        orgHTML.speed    = armorStat2.speed.innerHTML;
        orgHTML.strength = armorStat2.strength.innerHTML;
        
        console.log(self);
        console.log('Kit', kit);
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'flask'){
      if(gold.owned < 2000){
        doc.extras.innerHTML = "You don't have enough gold!";
      }
      else if(flask.max <= flask.amount + flask.empty){
        doc.extras.innerHTML = "You can't buy anymore flasks";
      }
      else{
        gold.owned -= 2000;
        gold.spent += 2000;
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        flask.amount++;
        doc.flask.innerHTML = flask.amount;
        localStorage.setItem('flask',JSON.stringify(flask));
        
        doc.extras.innerHTML = "You bought a flask";
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'r-flask'){
      if(gold.owned < 500){
        doc.extras.innerHTML = "You don't have enough gold!";
      }
      else if(flask.empty <= 0){
        doc.extras.innerHTML = "You don't have anymore empty flasks";
        flask.empty = 0;
      }
      else if(flask.max <= flask.amount){
        doc.extras.innerHTML = "You have too many flasks";
        flask.amount = flask.max;
      }
      else{
        gold.owned -= 500;
        gold.spent += 500;
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        flask.empty--;
        flask.amount++;
        doc.flask.innerHTML = flask.amount;
        localStorage.setItem('flask',JSON.stringify(flask));
        
        doc.extras.innerHTML = "You bought a refill";
      }
      
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon'){
      var owned = '';
      console.log('This is some type of weapon');
      
      for(var i = 0; i < kit.length; i++){
        if(weapStat.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(self.type.toLowerCase() == 'werewolf'){
        doc.extras.innerHTML = "You can't get any weapons";
      }
      else if(stealChan <= Math.random() && count <= 3 
      && byog == true){
        console.log('Weapon:',weapStat.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.weapon = weapStat.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(weapStat.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        equip[0].innerHTML = weapStat.name.innerHTML;
        equip[1].innerHTML = weapStat.defense.innerHTML;
        equip[2].innerHTML = weapStat.health.innerHTML;
        equip[3].innerHTML = weapStat.magic.innerHTML;
        equip[4].innerHTML = weapStat.speed.innerHTML;
        equip[5].innerHTML = weapStat.strength.innerHTML;
        equip[6].innerHTML = weapStat.type;
        
        var selected = [
          weapStat.name.innerHTML,
          weapStat.defense.innerHTML,
          weapStat.health.innerHTML,
          weapStat.magic.innerHTML,
          weapStat.speed.innerHTML,
          weapStat.strength.innerHTML,
          weapStat.type
        ]
        for(var i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = weapStat.defense.innerHTML;
        orgHTML.health   = weapStat.health.innerHTML;
        orgHTML.magic    = weapStat.magic.innerHTML;
        orgHTML.speed    = weapStat.speed.innerHTML;
        orgHTML.strength = weapStat.strength.innerHTML;
        orgHTML.type     = weapStat.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
      else if(weapStat.name.innerHTML.toLowerCase() == owned.toLowerCase()){
        doc.extras.innerHTML = 'You already own this weapon';
      }
      else if(gold.owned < JSON.parse(weapStat.price.innerHTML)){
        doc.extras.innerHTML = "You don't have enough gold!";
        count++;
      }
      else{
        gold.owned -= JSON.parse(weapStat.price.innerHTML);
        gold.spent += JSON.parse(weapStat.price.innerHTML);
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        doc.extras.innerHTML = "You bought a " + weapStat.name.innerHTML;
        console.log('Weapon:',weapStat.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.weapon = weapStat.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(weapStat.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        equip[0].innerHTML = weapStat.name.innerHTML;
        equip[1].innerHTML = weapStat.defense.innerHTML;
        equip[2].innerHTML = weapStat.health.innerHTML;
        equip[3].innerHTML = weapStat.magic.innerHTML;
        equip[4].innerHTML = weapStat.speed.innerHTML;
        equip[5].innerHTML = weapStat.strength.innerHTML;
        equip[6].innerHTML = weapStat.type;
        
        var selected = [
          weapStat.name.innerHTML,
          weapStat.defense.innerHTML,
          weapStat.health.innerHTML,
          weapStat.magic.innerHTML,
          weapStat.speed.innerHTML,
          weapStat.strength.innerHTML,
          weapStat.type
        ]
        for(var i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = weapStat.defense.innerHTML;
        orgHTML.health   = weapStat.health.innerHTML;
        orgHTML.magic    = weapStat.magic.innerHTML;
        orgHTML.speed    = weapStat.speed.innerHTML;
        orgHTML.strength = weapStat.strength.innerHTML;
        orgHTML.type     = weapStat.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon1'){
      var owned = '';
      console.log('This is some type of weapon');
      
      for(var i = 0; i < kit.length; i++){
        if(weapStat1.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(self.type.toLowerCase() == 'werewolf'){
        doc.extras.innerHTML = "You can't get any weapons";
      }
      else if(stealChan <= Math.random() && count <= 3 
      && byog == true){
        console.log('Weapon:',weapStat.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.weapon = weapStat.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(weapStat.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        equip[0].innerHTML = weapStat1.name.innerHTML;
        equip[1].innerHTML = weapStat1.defense.innerHTML;
        equip[2].innerHTML = weapStat1.health.innerHTML;
        equip[3].innerHTML = weapStat1.magic.innerHTML;
        equip[4].innerHTML = weapStat1.speed.innerHTML;
        equip[5].innerHTML = weapStat1.strength.innerHTML;
        equip[6].innerHTML = weapStat1.type;
        
        var selected = [
          weapStat1.name.innerHTML,
          weapStat1.defense.innerHTML,
          weapStat1.health.innerHTML,
          weapStat1.magic.innerHTML,
          weapStat1.speed.innerHTML,
          weapStat1.strength.innerHTML,
          weapStat1.type
        ]
        for(var i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = weapStat1.defense.innerHTML;
        orgHTML.health   = weapStat1.health.innerHTML;
        orgHTML.magic    = weapStat1.magic.innerHTML;
        orgHTML.speed    = weapStat1.speed.innerHTML;
        orgHTML.strength = weapStat1.strength.innerHTML;
        orgHTML.type     = weapStat1.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
      else if(weapStat1.name.innerHTML.toLowerCase() == owned.toLowerCase()){
        doc.extras.innerHTML = 'You already own this weapon';
      }
      else if(gold.owned < JSON.parse(weapStat1.price.innerHTML)){
        doc.extras.innerHTML = "You don't have enough gold!";
        count++;
      }
      else{
        gold.owned -= JSON.parse(weapStat1.price.innerHTML);
        gold.spent += JSON.parse(weapStat1.price.innerHTML);
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        doc.extras.innerHTML = "You bought a " + weapStat1.name.innerHTML;
        console.log('Weapon:',weapStat1.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.weapon = weapStat1.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(weapStat1.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        var selected = [
          weapStat1.name.innerHTML,
          weapStat1.defense.innerHTML,
          weapStat1.health.innerHTML,
          weapStat1.magic.innerHTML,
          weapStat1.speed.innerHTML,
          weapStat1.strength.innerHTML,
          weapStat1.type
        ]
        for(var i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = weapStat1.defense.innerHTML;
        orgHTML.health   = weapStat1.health.innerHTML;
        orgHTML.magic    = weapStat1.magic.innerHTML;
        orgHTML.speed    = weapStat1.speed.innerHTML;
        orgHTML.strength = weapStat1.strength.innerHTML;
        orgHTML.type     = weapStat1.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon2'){
      var owned = '';
      console.log('This is some type of weapon');
      
      for(var i = 0; i < kit.length; i++){
        if(weapStat2.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(self.type.toLowerCase() == 'werewolf'){
        doc.extras.innerHTML = "You can't get any weapons";
      }
      else if(stealChan <= Math.random() && count <= 3 
      && byog == true){
        console.log('Weapon:',weapStat.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.weapon = weapStat.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(weapStat.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        equip[0].innerHTML = weapStat2.name.innerHTML;
        equip[1].innerHTML = weapStat2.defense.innerHTML;
        equip[2].innerHTML = weapStat2.health.innerHTML;
        equip[3].innerHTML = weapStat2.magic.innerHTML;
        equip[4].innerHTML = weapStat2.speed.innerHTML;
        equip[5].innerHTML = weapStat2.strength.innerHTML;
        equip[6].innerHTML = weapStat2.type;
        
        var selected = [
          weapStat2.name.innerHTML,
          weapStat2.defense.innerHTML,
          weapStat2.health.innerHTML,
          weapStat2.magic.innerHTML,
          weapStat2.speed.innerHTML,
          weapStat2.strength.innerHTML,
          weapStat2.type
        ]
        for(var i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = weapStat2.defense.innerHTML;
        orgHTML.health   = weapStat2.health.innerHTML;
        orgHTML.magic    = weapStat2.magic.innerHTML;
        orgHTML.speed    = weapStat2.speed.innerHTML;
        orgHTML.strength = weapStat2.strength.innerHTML;
        orgHTML.type     = weapStat2.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
      else if(weapStat2.name.innerHTML.toLowerCase() == owned.toLowerCase()){
        doc.extras.innerHTML = 'You already own this weapon';
      }
      else if(gold.owned < JSON.parse(weapStat2.price.innerHTML)){
        doc.extras.innerHTML = "You don't have enough gold!";
        count++;
      }
      else{
        gold.owned -= JSON.parse(weapStat2.price.innerHTML);
        gold.spent += JSON.parse(weapStat2.price.innerHTML);
        doc.gold.innerHTML = gold.owned; 
        localStorage.setItem('gold',JSON.stringify(gold));
        
        doc.extras.innerHTML = "You bought a " + weapStat2.name.innerHTML;
        console.log('Weapon:',weapStat2.name.innerHTML);
        e.target.style.visibility = 'hidden';
        self.weapon = weapStat2.name.innerHTML;
        localStorage.setItem('race',JSON.stringify(self));
        
        kit.push(weapStat2.name.innerHTML);
        localStorage.setItem('kit',JSON.stringify(kit));
        
        var selected = [
          weapStat2.name.innerHTML,
          weapStat2.defense.innerHTML,
          weapStat2.health.innerHTML,
          weapStat2.magic.innerHTML,
          weapStat2.speed.innerHTML,
          weapStat2.strength.innerHTML,
          weapStat2.type
        ]
        for(var i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.defense  = weapStat2.defense.innerHTML;
        orgHTML.health   = weapStat2.health.innerHTML;
        orgHTML.magic    = weapStat2.magic.innerHTML;
        orgHTML.speed    = weapStat2.speed.innerHTML;
        orgHTML.strength = weapStat2.strength.innerHTML;
        orgHTML.type     = weapStat2.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
    }
    
    if(doc.extras.innerHTML !== ''){
      remove();
    }
    
    if(count >= 3){
      doc.extras.innerHTML = 'You fucking theif! Get out of my shop';
      
      localStorage.setItem('race', JSON.stringify(self));
      localStorage.setItem('gold', JSON.stringify(gold));
      localStorage.setItem('flask',JSON.stringify(flask));
      localStorage.setItem('kit',  JSON.stringify(kit));
      
      setTimeout(() => {
        window.location.href = 'game.html';
      },1500);
    }
    
  });
  
  //this part is a comparision between weapons and armors
  select.addEventListener('mouseenter',(e) => {
    var diff = 0;
    
    //this chunk does a comparison for both areas
    if(e.target.attributes.name.value.toLowerCase() == 'weapon'){
      orgHTML.defense  = equip[1].innerHTML;
      orgHTML.health   = equip[2].innerHTML;
      orgHTML.magic    = equip[3].innerHTML;
      orgHTML.speed    = equip[4].innerHTML;
      orgHTML.strength = equip[5].innerHTML;
      orgHTML.type     = equip[6].innerHTML;
      
      //this is for comparison between the weapon owned and the one hovering over
      diff = JSON.parse(weapStat.defense.innerHTML) - JSON.parse(equip[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(weapStat.health.innerHTML) - JSON.parse(equip[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat.magic.innerHTML) - JSON.parse(equip[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat.speed.innerHTML) - JSON.parse(equip[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat.strength.innerHTML) - JSON.parse(equip[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[5].innerHTML += ' (' + diff + ')';
      equip[6].innerHTML += ' (' + weapStat.type + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon1'){
      orgHTML.defense  = equip[1].innerHTML;
      orgHTML.health   = equip[2].innerHTML;
      orgHTML.magic    = equip[3].innerHTML;
      orgHTML.speed    = equip[4].innerHTML;
      orgHTML.strength = equip[5].innerHTML;
      orgHTML.type     = equip[6].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(weapStat1.defense.innerHTML) - JSON.parse(equip[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(weapStat1.health.innerHTML) - JSON.parse(equip[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat1.magic.innerHTML) - JSON.parse(equip[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat1.speed.innerHTML) - JSON.parse(equip[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat1.strength.innerHTML) - JSON.parse(equip[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[5].innerHTML += ' (' + diff + ')';
      equip[6].innerHTML += ' (' + weapStat1.type + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon2'){
      orgHTML.defense  = equip[1].innerHTML;
      orgHTML.health   = equip[2].innerHTML;
      orgHTML.magic    = equip[3].innerHTML;
      orgHTML.speed    = equip[4].innerHTML;
      orgHTML.strength = equip[5].innerHTML;
      orgHTML.type     = equip[6].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(weapStat2.defense.innerHTML) - JSON.parse(equip[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(weapStat2.health.innerHTML) - JSON.parse(equip[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat2.magic.innerHTML) - JSON.parse(equip[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat2.speed.innerHTML) - JSON.parse(equip[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat2.strength.innerHTML) - JSON.parse(equip[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[5].innerHTML += ' (' + diff + ')';
      equip[6].innerHTML += ' (' + weapStat2.type + ')';
    }
    
    if(e.target.attributes.name.value.toLowerCase() == 'armor'){
      orgHTML.defense  = equip1[1].innerHTML;
      orgHTML.health   = equip1[2].innerHTML;
      orgHTML.magic    = equip1[3].innerHTML;
      orgHTML.speed    = equip1[4].innerHTML;
      orgHTML.strength = equip1[5].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(armorStat.defense.innerHTML) - JSON.parse(equip1[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(armorStat.health.innerHTML) - JSON.parse(equip1[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat.magic.innerHTML) - JSON.parse(equip1[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat.speed.innerHTML) - JSON.parse(equip1[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat.strength.innerHTML) - JSON.parse(equip1[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[5].innerHTML += ' (' + diff + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor1'){
      orgHTML.defense  = equip1[1].innerHTML;
      orgHTML.health   = equip1[2].innerHTML;
      orgHTML.magic    = equip1[3].innerHTML;
      orgHTML.speed    = equip1[4].innerHTML;
      orgHTML.strength = equip1[5].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(armorStat1.defense.innerHTML) - JSON.parse(equip1[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(armorStat1.health.innerHTML) - JSON.parse(equip1[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat1.magic.innerHTML) - JSON.parse(equip1[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat1.speed.innerHTML) - JSON.parse(equip1[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat1.strength.innerHTML) - JSON.parse(equip1[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[5].innerHTML += ' (' + diff + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor2'){
      orgHTML.defense  = equip1[1].innerHTML;
      orgHTML.health   = equip1[2].innerHTML;
      orgHTML.magic    = equip1[3].innerHTML;
      orgHTML.speed    = equip1[4].innerHTML;
      orgHTML.strength = equip1[5].innerHTML;
      
      
      diff = JSON.parse(armorStat2.defense.innerHTML) - JSON.parse(equip1[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(armorStat2.health.innerHTML) - JSON.parse(equip1[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat2.magic.innerHTML) - JSON.parse(equip1[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat2.speed.innerHTML) - JSON.parse(equip1[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat2.strength.innerHTML) - JSON.parse(equip1[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[5].innerHTML += ' (' + diff + ')';
    }
  });
  
  //this part removes the newly added html
  select.addEventListener('mouseleave',(e) => {
    if(e.target.attributes.name.value.toLowerCase() == 'weapon'){
      var selected = [
        0,
        orgHTML.defense,
        orgHTML.health,
        orgHTML.magic,
        orgHTML.speed,
        orgHTML.strength,
        orgHTML.type,
      ];
      for(var i = 1; i < equip.length; i++){
        equip[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon1'){
      var selected = [
        0,
        orgHTML.defense,
        orgHTML.health,
        orgHTML.magic,
        orgHTML.speed,
        orgHTML.strength,
        orgHTML.type,
      ];
      for(var i = 1; i < equip.length; i++){
        equip[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon2'){
      var selected = [
        0,
        orgHTML.defense,
        orgHTML.health,
        orgHTML.magic,
        orgHTML.speed,
        orgHTML.strength,
        orgHTML.type,
      ];
      for(var i = 1; i < equip.length; i++){
        equip[i].innerHTML = selected[i];
      }
    }
    
    if(e.target.attributes.name.value.toLowerCase() == 'armor'){
      var selected = [
        0,
        orgHTML.defense,
        orgHTML.health,
        orgHTML.magic,
        orgHTML.speed,
        orgHTML.strength,
        orgHTML.type,
      ];
      for(var i = 1; i < equip1.length; i++){
        equip1[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor1'){
      var selected = [
        0,
        orgHTML.defense,
        orgHTML.health,
        orgHTML.magic,
        orgHTML.speed,
        orgHTML.strength,
        orgHTML.type,
      ];
      for(var i = 1; i < equip1.length; i++){
        equip1[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor2'){
      var selected = [
        0,
        orgHTML.defense,
        orgHTML.health,
        orgHTML.magic,
        orgHTML.speed,
        orgHTML.strength,
        orgHTML.type,
      ];
      for(var i = 1; i < equip1.length; i++){
        equip1[i].innerHTML = selected[i];
      }
    }
  });
});

doc.leave.addEventListener('click', () => {
  doc.extras.innerHTML = 'Leaving the shop';
  setInterval(() => {
    doc.extras.innerHTML += '.';
  },600);
  
  localStorage.setItem('race', JSON.stringify(self));
  localStorage.setItem('gold', JSON.stringify(gold));
  localStorage.setItem('flask',JSON.stringify(flask));
  localStorage.setItem('kit',  JSON.stringify(kit));
  
  setTimeout(() => {
    window.location.href = 'game.html';
  }, 3000);
  remove();
});
doc.kit.addEventListener('click', () => {
  doc.extras.innerHTML = 'Checking the kit';
  setInterval(() => {
    doc.extras.innerHTML += '.';
  },600);
  
  localStorage.setItem('race', JSON.stringify(self));
  localStorage.setItem('gold', JSON.stringify(gold));
  localStorage.setItem('flask',JSON.stringify(flask));
  localStorage.setItem('kit',  JSON.stringify(kit));
  localStorage.setItem('location','shopKit');
  
  setTimeout(() => {
    window.location.href = 'kit.html';
  }, 3000);
  remove();
});



  































