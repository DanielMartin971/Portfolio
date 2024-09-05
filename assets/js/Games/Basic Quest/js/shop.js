
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
  self.ability1.name.toLowerCase(),
  self.ability2.name.toLowerCase(),
  self.ability3.name.toLowerCase(),
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
} else if(cheapy == true){
    doc.extras.innerHTML = "You're a cheapshot, I hate your kind";
} else{
    doc.extras.innerHTML = 'Welcome to the shop!';
}
//working on stealing BYOG

let weapStat   = {
  def:   document.querySelector("[name=w-defense]"),
  hp:    document.querySelector("[name=w-health]"),
  mag:   document.querySelector("[name=w-magic]"),
  name:  document.querySelector("[name=w-name]"),
  price: document.querySelector("[name=w-price]"),
  spd:   document.querySelector("[name=w-speed]"),
  str:   document.querySelector("[name=w-strength]"),
};
let weapStat1  = {
  def:   document.querySelector("[name=w1-defense]"),
  hp:    document.querySelector("[name=w1-health]"),
  mag:   document.querySelector("[name=w1-magic]"),
  name:  document.querySelector("[name=w1-name]"),
  price: document.querySelector("[name=w1-price]"),
  spd:   document.querySelector("[name=w1-speed]"),
  str:   document.querySelector("[name=w1-strength]"),
};
let weapStat2  = {
  def:   document.querySelector("[name=w2-defense]"),
  hp:    document.querySelector("[name=w2-health]"),
  mag:   document.querySelector("[name=w2-magic]"),
  name:  document.querySelector("[name=w2-name]"),
  price: document.querySelector("[name=w2-price]"),
  spd:   document.querySelector("[name=w2-speed]"),
  str:   document.querySelector("[name=w2-strength]"),
};
let armorStat  = {
  def:   document.querySelector("[name=a-defense]"),
  hp:    document.querySelector("[name=a-health]"),
  mag:   document.querySelector("[name=a-magic]"),
  name:  document.querySelector("[name=a-name]"),
  price: document.querySelector("[name=a-price]"),
  spd:   document.querySelector("[name=a-speed]"),
  str:   document.querySelector("[name=a-strength]"),
};
let armorStat1 = {
  def:   document.querySelector("[name=a1-defense]"),
  hp:    document.querySelector("[name=a1-health]"),
  mag:   document.querySelector("[name=a1-magic]"),
  name:  document.querySelector("[name=a1-name]"),
  price: document.querySelector("[name=a1-price]"),
  spd:   document.querySelector("[name=a1-speed]"),
  str:   document.querySelector("[name=a1-strength]"),
};
let armorStat2 = {
  def:   document.querySelector("[name=a2-defense]"),
  hp:    document.querySelector("[name=a2-health]"),
  mag:   document.querySelector("[name=a2-magic]"),
  name:  document.querySelector("[name=a2-name]"),
  price: document.querySelector("[name=a2-price]"),
  spd:   document.querySelector("[name=a2-speed]"),
  str:   document.querySelector("[name=a2-strength]"),
};

let kit = JSON.parse(localStorage.getItem('kit'));

let itemsA = [];
let itemsW = [];

//This loop seperates the kit by armor and weapon
for(i = 0; i < kit.length; i++){
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
  
console.log('Kit Armors',itemsA,',','Kit Weapons',itemsW);

doc.gold.innerHTML  = gold.owned;
doc.flask.innerHTML = flask.amount;

const selection = document.querySelectorAll('button');

let timeout;
function remove(){
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    doc.extras.style.visibility = 'hidden';
  }, 3000);
}
remove();

//need to find a way to make this function smaller
//items() displays the items of the shop
function items(){
  let armorChoice = Math.floor(Math.random() * armors.length);
  let weapChoice  = Math.floor(Math.random() * weapons.length);
  let first;
  let second;
  
  
  //this part decreases shop prices by 10% if they have the ability
  if(charm === true){
    for(let i = 0; i < weapons.length; i++){
      weapons[i].price -= weapons[i].price * 0.1;
    }
    for(let i = 0; i < armors.length; i++){
      armors[i].price -= armors[i].price * 0.1;
    }
  }
  /////////////////////////////////////////////////////////////////
  //this part decreases shop prices by 5% if they have the ability
  if(bdch === true){
    for(let i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.05);
    }
    for(let i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.05);
    }
  }
  /////////////////////////////////////////////////////////////////
  //this part increases the prices by 10%
  if(buffPow === true
  || cheapy  === true
  || xfaded  === true){
    for(let i = 0; i < weapons.length; i++){
      weapons[i].price += Math.floor(weapons[i].price * 0.1);
    }
    for(let i = 0; i < armors.length; i++){
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
    for(let i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.15);
    }
    for(let i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.15);
    }
  }
  /////////////////////////////////////////////////////////////
  //this part increases the prices by 20%
  if(royBlo === true){
    for(let i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.2);
    }
    for(let i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.2);
    }
  }
  /////////////////////////////////////////////////////////////
  //this part increases the prices by 40%
  if(shaeTre === true){
    for(let i = 0; i < weapons.length; i++){
      weapons[i].price -= Math.floor(weapons[i].price * 0.4);
    }
    for(let i = 0; i < armors.length; i++){
      armors[i].price -= Math.floor(armors[i].price * 0.4);
    }
  }
  /////////////////////////////////////////////////////////////
  
  weapStat.def.innerHTML   = weapons[weapChoice].def;
  weapStat.hp.innerHTML    = weapons[weapChoice].hp;
  weapStat.mag.innerHTML   = weapons[weapChoice].mag;
  weapStat.name.innerHTML  = weapons[weapChoice].name.trim();
  weapStat.price.innerHTML = weapons[weapChoice].price;
  weapStat.spd.innerHTML   = weapons[weapChoice].spd;
  weapStat.str.innerHTML   = weapons[weapChoice].str;
  weapStat.type            = weapons[weapChoice].type;
  
  first        = weapChoice;
  second       = weapChoice;
  weapChoice  = Math.floor(Math.random() * weapons.length);
  if(weapChoice == first
  || weapChoice == second){
    weapChoice = Math.floor(Math.random() * weapons.length);
  }
  
  weapStat1.def.innerHTML   = weapons[weapChoice].def;
  weapStat1.hp.innerHTML    = weapons[weapChoice].hp;
  weapStat1.mag.innerHTML   = weapons[weapChoice].mag;
  weapStat1.name.innerHTML  = weapons[weapChoice].name.trim();
  weapStat1.price.innerHTML = weapons[weapChoice].price;
  weapStat1.spd.innerHTML   = weapons[weapChoice].spd;
  weapStat1.str.innerHTML   = weapons[weapChoice].str;
  weapStat1.type            = weapons[weapChoice].type;
  
  first       = weapChoice;
  weapChoice  = Math.floor(Math.random() * weapons.length);
  if(weapChoice == first
  || weapChoice == second){
    weapChoice = Math.floor(Math.random() * weapons.length);
  }
  
  weapStat2.def.innerHTML   = weapons[weapChoice].def;
  weapStat2.hp.innerHTML    = weapons[weapChoice].hp;
  weapStat2.mag.innerHTML   = weapons[weapChoice].mag;
  weapStat2.name.innerHTML  = weapons[weapChoice].name.trim();
  weapStat2.price.innerHTML = weapons[weapChoice].price;
  weapStat2.spd.innerHTML   = weapons[weapChoice].spd;
  weapStat2.str.innerHTML   = weapons[weapChoice].str;
  weapStat2.type            = weapons[weapChoice].type;
  
  armorStat.def.innerHTML   = armors[armorChoice].def;
  armorStat.hp.innerHTML    = armors[armorChoice].hp;
  armorStat.mag.innerHTML   = armors[armorChoice].mag;
  armorStat.name.innerHTML  = armors[armorChoice].name.trim();
  armorStat.price.innerHTML = armors[armorChoice].price;
  armorStat.spd.innerHTML   = armors[armorChoice].spd;
  armorStat.str.innerHTML   = armors[armorChoice].str;
  
  first       = armorChoice;
  second      = armorChoice;
  armorChoice  = Math.floor(Math.random() * armors.length);
  if(armorChoice == first
  || armorChoice == second){
    armorChoice = Math.floor(Math.random() * armors.length);
  }
  
  armorStat1.def.innerHTML   = armors[armorChoice].def;
  armorStat1.hp.innerHTML    = armors[armorChoice].hp;
  armorStat1.mag.innerHTML   = armors[armorChoice].mag;
  armorStat1.name.innerHTML  = armors[armorChoice].name.trim();
  armorStat1.price.innerHTML = armors[armorChoice].price;
  armorStat1.spd.innerHTML   = armors[armorChoice].spd;
  armorStat1.str.innerHTML   = armors[armorChoice].str;
  
  first          = armorChoice;
  armorChoice    = Math.floor(Math.random() * armors.length);
  if(armorChoice == first
  || armorChoice == second){
     armorChoice  = Math.floor(Math.random() * armors.length);
  }
  
  armorStat2.def.innerHTML   = armors[armorChoice].def;
  armorStat2.hp.innerHTML    = armors[armorChoice].hp;
  armorStat2.mag.innerHTML   = armors[armorChoice].mag;
  armorStat2.name.innerHTML  = armors[armorChoice].name.trim();
  armorStat2.price.innerHTML = armors[armorChoice].price;
  armorStat2.spd.innerHTML   = armors[armorChoice].spd;
  armorStat2.str.innerHTML   = armors[armorChoice].str;
}
items();


//this just shows up the kit you have equipped and displays it on the page
window.addEventListener('load', () => {
  specs.forEach((spec) => {
    if(spec.attributes.name.value == 'type'){
      spec.innerHTML = self.name.toUpperCase();
    }
    else if(spec.attributes.name.value == 'defense'){
      spec.innerHTML = self.def;
    }
    else if(spec.attributes.name.value == 'health'){
      self.hp = self.maxHp;
      spec.innerHTML = self.hp;
    }
    else if(spec.attributes.name.value == 'magic'){
      spec.innerHTML = self.mag;
    }
    else if(spec.attributes.name.value == 'speed'){
      spec.innerHTML = self.spd;
    }
    else if(spec.attributes.name.value == 'strength'){
      spec.innerHTML = self.str;
    }
  });
  
  equip.forEach((ment) => {
    for(let i = 0; i < weapons.length; i++){
      if(self.weapon.toLowerCase() == weapons[i].name.toLowerCase()){
        wep = weapons[i];
      }
    }
    
    if(ment.attributes.name.value == 'name'){
      ment.innerHTML = wep.name;
    }
    else if(ment.attributes.name.value == 'defense'){
      ment.innerHTML = wep.def;
    }
    else if(ment.attributes.name.value == 'health'){
      ment.innerHTML = wep.hp;
    }
    else if(ment.attributes.name.value == 'magic'){
      ment.innerHTML = wep.mag;
    }
    else if(ment.attributes.name.value == 'speed'){
      ment.innerHTML = wep.spd;
    }
    else if(ment.attributes.name.value == 'strength'){
      ment.innerHTML = wep.str;
    }
    else if(ment.attributes.name.value == 'type'){
      ment.innerHTML = wep.type;
    }
  })
  
  equip1.forEach((ment) => {
    for(let i = 0; i < armors.length; i++){
      if(self.armor == armors[i].name){
        body = armors[i];
      }
    }
    
    if(ment.attributes.name.value == 'type'){
      ment.innerHTML = body.name;
    }
    else if(ment.attributes.name.value == 'defense'){
      ment.innerHTML = body.def;
    }
    else if(ment.attributes.name.value == 'health'){
      ment.innerHTML = body.hp;
    }
    else if(ment.attributes.name.value == 'magic'){
      ment.innerHTML = body.mag;
    }
    else if(ment.attributes.name.value == 'speed'){
      ment.innerHTML = body.spd;
    }
    else if(ment.attributes.name.value == 'strength'){
      ment.innerHTML = body.str;
    }
  })
});


//make a for loop for the selection, this'll shorten the code
//need to make forloops for this to be shorter
//this is a event listener for portions with the select option
selection.forEach((select) => {
  let orgHTML = {};
  
  //this part is for when they buy something in the shop
  //this adds when select is clicked on, it will run this function
  select.addEventListener('click',(e) => {
    doc.extras.style.visibility = 'visible';
    doc.extras.style.height = 'auto';
    
      
    if(e.target.attributes.name.value.toLowerCase() == 'armor'){
      let owned = '';
      console.log('This is some type of armor');

      for(let i = 0; i < kit.length; i++){
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
        
        
        let selected = [
          armorStat.name.innerHTML,
          armorStat.def.innerHTML,
          armorStat.hp.innerHTML,
          armorStat.mag.innerHTML,
          armorStat.spd.innerHTML,
          armorStat.str.innerHTML,
        ]
        for(let i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = armorStat.def.innerHTML;
        orgHTML.hp   = armorStat.hp.innerHTML;
        orgHTML.mag    = armorStat.mag.innerHTML;
        orgHTML.spd    = armorStat.spd.innerHTML;
        orgHTML.str = armorStat.str.innerHTML;
         
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
        
        
        let selected = [
          armorStat.name.innerHTML,
          armorStat.def.innerHTML,
          armorStat.hp.innerHTML,
          armorStat.mag.innerHTML,
          armorStat.spd.innerHTML,
          armorStat.str.innerHTML,
        ]
        for(let i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = armorStat.def.innerHTML;
        orgHTML.hp   = armorStat.hp.innerHTML;
        orgHTML.mag    = armorStat.mag.innerHTML;
        orgHTML.spd    = armorStat.spd.innerHTML;
        orgHTML.str = armorStat.str.innerHTML;
         
        console.log(self);
        console.log('Kit', kit);
      }
      
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor1'){
      let owned = '';
      console.log('This is some type of armor');
      
      for(let i = 0; i < kit.length; i++){
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
        
        
        let selected = [
          armorStat1.name.innerHTML,
          armorStat1.def.innerHTML,
          armorStat1.hp.innerHTML,
          armorStat1.mag.innerHTML,
          armorStat1.spd.innerHTML,
          armorStat1.str.innerHTML,
        ]
        for(let i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = armorStat1.def.innerHTML;
        orgHTML.hp   = armorStat1.hp.innerHTML;
        orgHTML.mag    = armorStat1.mag.innerHTML;
        orgHTML.spd    = armorStat1.spd.innerHTML;
        orgHTML.str = armorStat1.str.innerHTML;
         
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
        
        let selected = [
          armorStat1.name.innerHTML,
          armorStat1.def.innerHTML,
          armorStat1.hp.innerHTML,
          armorStat1.mag.innerHTML,
          armorStat1.spd.innerHTML,
          armorStat1.str.innerHTML,
        ]
        for(let i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = armorStat1.def.innerHTML;
        orgHTML.hp   = armorStat1.hp.innerHTML;
        orgHTML.mag    = armorStat1.mag.innerHTML;
        orgHTML.spd    = armorStat1.spd.innerHTML;
        orgHTML.str = armorStat1.str.innerHTML;
        
        console.log(self);
        console.log('Kit', kit);
      }
      
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor2'){
      let owned = '';
      console.log('This is some type of armor');
      
      for(let i = 0; i < kit.length; i++){
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
        
        
        let selected = [
          armorStat2.name.innerHTML,
          armorStat2.def.innerHTML,
          armorStat2.hp.innerHTML,
          armorStat2.mag.innerHTML,
          armorStat2.spd.innerHTML,
          armorStat2.str.innerHTML,
        ]
        for(let i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = armorStat2.def.innerHTML;
        orgHTML.hp   = armorStat2.hp.innerHTML;
        orgHTML.mag    = armorStat2.mag.innerHTML;
        orgHTML.spd    = armorStat2.spd.innerHTML;
        orgHTML.str = armorStat2.str.innerHTML;
         
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
        
        let selected = [
          armorStat2.name.innerHTML,
          armorStat2.def.innerHTML,
          armorStat2.hp.innerHTML,
          armorStat2.mag.innerHTML,
          armorStat2.spd.innerHTML,
          armorStat2.str.innerHTML,
        ]
        for(let i = 0; i < equip1.length; i++){
          equip1[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = armorStat2.def.innerHTML;
        orgHTML.hp   = armorStat2.hp.innerHTML;
        orgHTML.mag    = armorStat2.mag.innerHTML;
        orgHTML.spd    = armorStat2.spd.innerHTML;
        orgHTML.str = armorStat2.str.innerHTML;
        
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
      let owned = '';
      console.log('This is some type of weapon');
      
      for(let i = 0; i < kit.length; i++){
        if(weapStat.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(self.name.toLowerCase() == 'werewolf'){
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
        equip[1].innerHTML = weapStat.def.innerHTML;
        equip[2].innerHTML = weapStat.hp.innerHTML;
        equip[3].innerHTML = weapStat.mag.innerHTML;
        equip[4].innerHTML = weapStat.spd.innerHTML;
        equip[5].innerHTML = weapStat.str.innerHTML;
        equip[6].innerHTML = weapStat.type;
        
        let selected = [
          weapStat.name.innerHTML,
          weapStat.def.innerHTML,
          weapStat.hp.innerHTML,
          weapStat.mag.innerHTML,
          weapStat.spd.innerHTML,
          weapStat.str.innerHTML,
          weapStat.type
        ]
        for(let i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = weapStat.def.innerHTML;
        orgHTML.hp   = weapStat.hp.innerHTML;
        orgHTML.mag    = weapStat.mag.innerHTML;
        orgHTML.spd    = weapStat.spd.innerHTML;
        orgHTML.str = weapStat.str.innerHTML;
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
        equip[1].innerHTML = weapStat.def.innerHTML;
        equip[2].innerHTML = weapStat.hp.innerHTML;
        equip[3].innerHTML = weapStat.mag.innerHTML;
        equip[4].innerHTML = weapStat.spd.innerHTML;
        equip[5].innerHTML = weapStat.str.innerHTML;
        equip[6].innerHTML = weapStat.type;
        
        let selected = [
          weapStat.name.innerHTML,
          weapStat.def.innerHTML,
          weapStat.hp.innerHTML,
          weapStat.mag.innerHTML,
          weapStat.spd.innerHTML,
          weapStat.str.innerHTML,
          weapStat.type
        ]
        for(let i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = weapStat.def.innerHTML;
        orgHTML.hp   = weapStat.hp.innerHTML;
        orgHTML.mag    = weapStat.mag.innerHTML;
        orgHTML.spd    = weapStat.spd.innerHTML;
        orgHTML.str = weapStat.str.innerHTML;
        orgHTML.type     = weapStat.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon1'){
      let owned = '';
      console.log('This is some type of weapon');
      
      for(let i = 0; i < kit.length; i++){
        if(weapStat1.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(self.name.toLowerCase() == 'werewolf'){
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
        equip[1].innerHTML = weapStat1.def.innerHTML;
        equip[2].innerHTML = weapStat1.hp.innerHTML;
        equip[3].innerHTML = weapStat1.mag.innerHTML;
        equip[4].innerHTML = weapStat1.spd.innerHTML;
        equip[5].innerHTML = weapStat1.str.innerHTML;
        equip[6].innerHTML = weapStat1.type;
        
        let selected = [
          weapStat1.name.innerHTML,
          weapStat1.def.innerHTML,
          weapStat1.hp.innerHTML,
          weapStat1.mag.innerHTML,
          weapStat1.spd.innerHTML,
          weapStat1.str.innerHTML,
          weapStat1.type
        ]
        for(let i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = weapStat1.def.innerHTML;
        orgHTML.hp   = weapStat1.hp.innerHTML;
        orgHTML.mag    = weapStat1.mag.innerHTML;
        orgHTML.spd    = weapStat1.spd.innerHTML;
        orgHTML.str = weapStat1.str.innerHTML;
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
        
        let selected = [
          weapStat1.name.innerHTML,
          weapStat1.def.innerHTML,
          weapStat1.hp.innerHTML,
          weapStat1.mag.innerHTML,
          weapStat1.spd.innerHTML,
          weapStat1.str.innerHTML,
          weapStat1.type
        ]
        for(let i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = weapStat1.def.innerHTML;
        orgHTML.hp   = weapStat1.hp.innerHTML;
        orgHTML.mag    = weapStat1.mag.innerHTML;
        orgHTML.spd    = weapStat1.spd.innerHTML;
        orgHTML.str = weapStat1.str.innerHTML;
        orgHTML.type     = weapStat1.type;
        
        console.log(self);
        console.log('Kit', kit);
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon2'){
      let owned = '';
      console.log('This is some type of weapon');
      
      for(let i = 0; i < kit.length; i++){
        if(weapStat2.name.innerHTML.toLowerCase() == kit[i].toLowerCase()){
          owned = kit[i].toLowerCase();
        }
      }
      
      if(self.name.toLowerCase() == 'werewolf'){
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
        equip[1].innerHTML = weapStat2.def.innerHTML;
        equip[2].innerHTML = weapStat2.hp.innerHTML;
        equip[3].innerHTML = weapStat2.mag.innerHTML;
        equip[4].innerHTML = weapStat2.spd.innerHTML;
        equip[5].innerHTML = weapStat2.str.innerHTML;
        equip[6].innerHTML = weapStat2.type;
        
        let selected = [
          weapStat2.name.innerHTML,
          weapStat2.def.innerHTML,
          weapStat2.hp.innerHTML,
          weapStat2.mag.innerHTML,
          weapStat2.spd.innerHTML,
          weapStat2.str.innerHTML,
          weapStat2.type
        ]
        for(let i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = weapStat2.def.innerHTML;
        orgHTML.hp   = weapStat2.hp.innerHTML;
        orgHTML.mag    = weapStat2.mag.innerHTML;
        orgHTML.spd    = weapStat2.spd.innerHTML;
        orgHTML.str = weapStat2.str.innerHTML;
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
        
        let selected = [
          weapStat2.name.innerHTML,
          weapStat2.def.innerHTML,
          weapStat2.hp.innerHTML,
          weapStat2.mag.innerHTML,
          weapStat2.spd.innerHTML,
          weapStat2.str.innerHTML,
          weapStat2.type
        ]
        for(let i = 0; i < equip.length; i++){
          equip[i].innerHTML = selected[i];
        }
        
        orgHTML.def  = weapStat2.def.innerHTML;
        orgHTML.hp   = weapStat2.hp.innerHTML;
        orgHTML.mag    = weapStat2.mag.innerHTML;
        orgHTML.spd    = weapStat2.spd.innerHTML;
        orgHTML.str = weapStat2.str.innerHTML;
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
    let diff = 0;
    
    //this chunk does a comparison for both areas
    if(e.target.attributes.name.value.toLowerCase() == 'weapon'){
      orgHTML.def  = equip[1].innerHTML;
      orgHTML.hp   = equip[2].innerHTML;
      orgHTML.mag    = equip[3].innerHTML;
      orgHTML.spd    = equip[4].innerHTML;
      orgHTML.str = equip[5].innerHTML;
      orgHTML.type     = equip[6].innerHTML;
      
      //this is for comparison between the weapon owned and the one hovering over
      diff = JSON.parse(weapStat.def.innerHTML) - JSON.parse(equip[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(weapStat.hp.innerHTML) - JSON.parse(equip[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat.mag.innerHTML) - JSON.parse(equip[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat.spd.innerHTML) - JSON.parse(equip[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat.str.innerHTML) - JSON.parse(equip[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[5].innerHTML += ' (' + diff + ')';
      equip[6].innerHTML += ' (' + weapStat.type + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon1'){
      orgHTML.def  = equip[1].innerHTML;
      orgHTML.hp   = equip[2].innerHTML;
      orgHTML.mag    = equip[3].innerHTML;
      orgHTML.spd    = equip[4].innerHTML;
      orgHTML.str = equip[5].innerHTML;
      orgHTML.type     = equip[6].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(weapStat1.def.innerHTML) - JSON.parse(equip[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(weapStat1.hp.innerHTML) - JSON.parse(equip[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat1.mag.innerHTML) - JSON.parse(equip[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat1.spd.innerHTML) - JSON.parse(equip[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat1.str.innerHTML) - JSON.parse(equip[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[5].innerHTML += ' (' + diff + ')';
      equip[6].innerHTML += ' (' + weapStat1.type + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon2'){
      orgHTML.def  = equip[1].innerHTML;
      orgHTML.hp   = equip[2].innerHTML;
      orgHTML.mag    = equip[3].innerHTML;
      orgHTML.spd    = equip[4].innerHTML;
      orgHTML.str = equip[5].innerHTML;
      orgHTML.type     = equip[6].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(weapStat2.def.innerHTML) - JSON.parse(equip[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(weapStat2.hp.innerHTML) - JSON.parse(equip[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat2.mag.innerHTML) - JSON.parse(equip[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat2.spd.innerHTML) - JSON.parse(equip[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(weapStat2.str.innerHTML) - JSON.parse(equip[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip[5].innerHTML += ' (' + diff + ')';
      equip[6].innerHTML += ' (' + weapStat2.type + ')';
    }
    
    if(e.target.attributes.name.value.toLowerCase() == 'armor'){
      orgHTML.def  = equip1[1].innerHTML;
      orgHTML.hp   = equip1[2].innerHTML;
      orgHTML.mag    = equip1[3].innerHTML;
      orgHTML.spd    = equip1[4].innerHTML;
      orgHTML.str = equip1[5].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(armorStat.def.innerHTML) - JSON.parse(equip1[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(armorStat.hp.innerHTML) - JSON.parse(equip1[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat.mag.innerHTML) - JSON.parse(equip1[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat.spd.innerHTML) - JSON.parse(equip1[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat.str.innerHTML) - JSON.parse(equip1[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[5].innerHTML += ' (' + diff + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor1'){
      orgHTML.def  = equip1[1].innerHTML;
      orgHTML.hp   = equip1[2].innerHTML;
      orgHTML.mag    = equip1[3].innerHTML;
      orgHTML.spd    = equip1[4].innerHTML;
      orgHTML.str = equip1[5].innerHTML;
      
      //working on making the comparison 
      diff = JSON.parse(armorStat1.def.innerHTML) - JSON.parse(equip1[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(armorStat1.hp.innerHTML) - JSON.parse(equip1[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat1.mag.innerHTML) - JSON.parse(equip1[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat1.spd.innerHTML) - JSON.parse(equip1[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat1.str.innerHTML) - JSON.parse(equip1[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[5].innerHTML += ' (' + diff + ')';
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor2'){
      orgHTML.def  = equip1[1].innerHTML;
      orgHTML.hp   = equip1[2].innerHTML;
      orgHTML.mag    = equip1[3].innerHTML;
      orgHTML.spd    = equip1[4].innerHTML;
      orgHTML.str = equip1[5].innerHTML;
      
      
      diff = JSON.parse(armorStat2.def.innerHTML) - JSON.parse(equip1[1].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[1].innerHTML += ' (' + diff  + ')';
      diff = JSON.parse(armorStat2.hp.innerHTML) - JSON.parse(equip1[2].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[2].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat2.mag.innerHTML) - JSON.parse(equip1[3].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[3].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat2.spd.innerHTML) - JSON.parse(equip1[4].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[4].innerHTML += ' (' + diff + ')';
      diff = JSON.parse(armorStat2.str.innerHTML) - JSON.parse(equip1[5].innerHTML);
      if(diff > 0) diff = '+' + diff;
      
      equip1[5].innerHTML += ' (' + diff + ')';
    }
  });
  
  //this part removes the newly added html
  select.addEventListener('mouseleave',(e) => {
    if(e.target.attributes.name.value.toLowerCase() == 'weapon'){
      let selected = [
        0,
        orgHTML.def,
        orgHTML.hp,
        orgHTML.mag,
        orgHTML.spd,
        orgHTML.str,
        orgHTML.type,
      ];
      for(let i = 1; i < equip.length; i++){
        equip[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon1'){
      let selected = [
        0,
        orgHTML.def,
        orgHTML.hp,
        orgHTML.mag,
        orgHTML.spd,
        orgHTML.str,
        orgHTML.type,
      ];
      for(let i = 1; i < equip.length; i++){
        equip[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'weapon2'){
      let selected = [
        0,
        orgHTML.def,
        orgHTML.hp,
        orgHTML.mag,
        orgHTML.spd,
        orgHTML.str,
        orgHTML.type,
      ];
      for(let i = 1; i < equip.length; i++){
        equip[i].innerHTML = selected[i];
      }
    }
    
    if(e.target.attributes.name.value.toLowerCase() == 'armor'){
      let selected = [
        0,
        orgHTML.def,
        orgHTML.hp,
        orgHTML.mag,
        orgHTML.spd,
        orgHTML.str,
        orgHTML.type,
      ];
      for(let i = 1; i < equip1.length; i++){
        equip1[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor1'){
      let selected = [
        0,
        orgHTML.def,
        orgHTML.hp,
        orgHTML.mag,
        orgHTML.spd,
        orgHTML.str,
        orgHTML.type,
      ];
      for(let i = 1; i < equip1.length; i++){
        equip1[i].innerHTML = selected[i];
      }
    }
    else if(e.target.attributes.name.value.toLowerCase() == 'armor2'){
      let selected = [
        0,
        orgHTML.def,
        orgHTML.hp,
        orgHTML.mag,
        orgHTML.spd,
        orgHTML.str,
        orgHTML.type,
      ];
      for(let i = 1; i < equip1.length; i++){
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



  































