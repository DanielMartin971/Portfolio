
//this checks to see if the player came from the quest or the shop and makes the shop btn visible

var loc = localStorage.getItem('location').toLowerCase();
window.addEventListener('load',() => {
  if(loc == 'shop'
  || loc == 'shopkit'
  || loc == 'shops'
  || loc == 'shopable'){
    doc.shop.style.visibility = 'visible';
  }
});

var gold  = JSON.parse(localStorage.getItem('gold'));
var flask = JSON.parse(localStorage.getItem('flask'));

self   = JSON.parse(localStorage.getItem('race'));
var specs  = document.querySelectorAll('.self li span');
var equip  = document.querySelectorAll('.equipment li span');
var equip1 = document.querySelectorAll('.equipment1 li span');
var wep;
var body;

var doc = {
  body:   document.querySelector('body'),
  extras: document.getElementById('extras'),
  flask:  document.querySelector('#flask'),
  gold:   document.querySelector('.gold'),
  listA:  document.querySelector('.listA'),
  listW:  document.querySelector('.listW'),
  shop:   document.querySelector('.shop'),
  quest:  document.querySelector('.quest'),
};
doc.body.style.overflow     = 'auto';
doc.extras.style.height     = 'auto';
doc.extras.style.visibility = 'visible';
doc.extras.innerHTML        = 'Welcome to your kit!';
remove();

var kit = JSON.parse(localStorage.getItem('kit'));

var itemsA = [];
var itemsW = [];

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


var timeout;
function remove(){
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    doc.extras.style.visibility = 'hidden';
  }, 3000);
}

function showKit(){
  for(var i = 0; i < itemsA.length; i++){
    doc.listA.innerHTML += '<li>' + itemsA[i] + '</li>';
  }
  
  for(var i = 0; i < itemsW.length; i++){
    doc.listW.innerHTML += '<li>' + itemsW[i] + '</li>';
  }
  
}
showKit();

var ownArms = document.querySelectorAll('.listA li');
var ownWeps = document.querySelectorAll('.listW li');


var orgHTML = {};
ownArms.forEach((item) => {
  
  item.addEventListener('mouseenter',(e) => {
    var diff      = 0;
    var armorStat = {};
    
    for(var i = 0; i < armors.length; i++){
      if(e.target.innerHTML.toLowerCase() == armors[i].name.toLowerCase()){
        armorStat.name     = armors[i].name;
        armorStat.defense  = armors[i].defense;
        armorStat.health   = armors[i].health;
        armorStat.magic    = armors[i].magic;
        armorStat.speed    = armors[i].speed;
        armorStat.strength = armors[i].strength;
        break;
      }
    }
    
    orgHTML.name     = equip1[0].innerHTML;
    orgHTML.defense  = equip1[1].innerHTML;
    orgHTML.health   = equip1[2].innerHTML;
    orgHTML.magic    = equip1[3].innerHTML;
    orgHTML.speed    = equip1[4].innerHTML;
    orgHTML.strength = equip1[5].innerHTML;
    
    // This is for comparison between the weapon owned and the one hovering over
    equip1[0].innerHTML += ' (' + armorStat.name + ')';
    diff = JSON.parse(armorStat.defense) - JSON.parse(equip1[1].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[1].innerHTML += ' (' + diff  + ')';
    diff = JSON.parse(armorStat.health) - JSON.parse(equip1[2].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[2].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(armorStat.magic) - JSON.parse(equip1[3].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[3].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(armorStat.speed) - JSON.parse(equip1[4].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[4].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(armorStat.strength) - JSON.parse(equip1[5].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[5].innerHTML += ' (' + diff + ')';
  });
  
  item.addEventListener('click',(e) => {
    var armorStat = {};
    
    for(var i = 0; i < armors.length; i++){
      if(e.target.innerHTML.toLowerCase() == armors[i].name.toLowerCase()){
        armorStat.name     = armors[i].name;
        armorStat.defense  = armors[i].defense;
        armorStat.health   = armors[i].health;
        armorStat.magic    = armors[i].magic;
        armorStat.speed    = armors[i].speed;
        armorStat.strength = armors[i].strength;
        break;
      }
    }
    
    equip1[0].innerHTML = armorStat.name;
    equip1[1].innerHTML = armorStat.defense;
    equip1[2].innerHTML = armorStat.health;
    equip1[3].innerHTML = armorStat.magic;
    equip1[4].innerHTML = armorStat.speed;
    equip1[5].innerHTML = armorStat.strength;
    
    orgHTML.name     = armorStat.name;
    orgHTML.defense  = armorStat.defense;
    orgHTML.health   = armorStat.health;
    orgHTML.magic    = armorStat.magic;
    orgHTML.speed    = armorStat.speed;
    orgHTML.strength = armorStat.strength;
    
    self.armor = armorStat.name;
    localStorage.setItem('race',JSON.stringify(self));
    console.log(self);
  });
  
  item.addEventListener('mouseleave',(e) => {
    equip1[0].innerHTML = orgHTML.name;
    equip1[1].innerHTML = orgHTML.defense;
    equip1[2].innerHTML = orgHTML.health;
    equip1[3].innerHTML = orgHTML.magic;
    equip1[4].innerHTML = orgHTML.speed;
    equip1[5].innerHTML = orgHTML.strength;
  });
  
});

ownWeps.forEach((item) => {
  
  item.addEventListener('mouseenter',(e) => {
    var diff      = 0;
    var wepStat = {};
    
    for(var i = 0; i < weapons.length; i++){
      if(e.target.innerHTML.toLowerCase() == weapons[i].name.toLowerCase()){
        wepStat.name     = weapons[i].name;
        wepStat.defense  = weapons[i].defense;
        wepStat.health   = weapons[i].health;
        wepStat.magic    = weapons[i].magic;
        wepStat.speed    = weapons[i].speed;
        wepStat.strength = weapons[i].strength;
        wepStat.type     = weapons[i].type;
        break;
      }
    }
    
    orgHTML.name     = equip[0].innerHTML;
    orgHTML.defense  = equip[1].innerHTML;
    orgHTML.health   = equip[2].innerHTML;
    orgHTML.magic    = equip[3].innerHTML;
    orgHTML.speed    = equip[4].innerHTML;
    orgHTML.strength = equip[5].innerHTML;
    orgHTML.type     = equip[6].innerHTML;
    
    // This is for comparison between the weapon owned and the one hovering over
    equip[0].innerHTML += ' (' + wepStat.name + ')';
    diff = JSON.parse(wepStat.defense) - JSON.parse(equip[1].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[1].innerHTML += ' (' + diff  + ')';
    diff = JSON.parse(wepStat.health) - JSON.parse(equip[2].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[2].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(wepStat.magic) - JSON.parse(equip[3].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[3].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(wepStat.speed) - JSON.parse(equip[4].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[4].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(wepStat.strength) - JSON.parse(equip[5].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[5].innerHTML += ' (' + diff + ')';
    equip[6].innerHTML += ' (' + wepStat.type + ')';
  });
  
  item.addEventListener('click',(e) => {
    var wepStat = {};
    
    for(var i = 0; i < weapons.length; i++){
      if(e.target.innerHTML.toLowerCase() == weapons[i].name.toLowerCase()){
        wepStat.name     = weapons[i].name;
        wepStat.defense  = weapons[i].defense;
        wepStat.health   = weapons[i].health;
        wepStat.magic    = weapons[i].magic;
        wepStat.speed    = weapons[i].speed;
        wepStat.strength = weapons[i].strength;
        wepStat.type     = weapons[i].type;
        break;
      }
    }
    var selected = [
      wepStat.name,
      JSON.parse(wepStat.defense),
      JSON.parse(wepStat.health),
      JSON.parse(wepStat.magic),
      JSON.parse(wepStat.speed),
      JSON.parse(wepStat.strength),
      wepStat.type,
    ];
    
    for(var i = 0; i < equip.length; i++){
      equip[i].innerHTML = selected[i];
    }
    
    orgHTML.name     = wepStat.name;
    orgHTML.defense  = wepStat.defense;
    orgHTML.health   = wepStat.health;
    orgHTML.magic    = wepStat.magic;
    orgHTML.speed    = wepStat.speed;
    orgHTML.strength = wepStat.strength;
    orgHTML.type     = wepStat.type;
    
    self.weapon = wepStat.name;
    localStorage.setItem('race',JSON.stringify(self));
    console.log(self);
  });
  
  item.addEventListener('mouseleave',(e) => {
    var org = [
    orgHTML.name,
    JSON.parse(orgHTML.defense),
    JSON.parse(orgHTML.health),
    JSON.parse(orgHTML.magic),
    JSON.parse(orgHTML.speed),
    JSON.parse(orgHTML.strength),
    orgHTML.type
  ];
  
    for(var i = 0; i < equip.length; i++){
      equip[i].innerHTML = org[i];
    }
  });
  
});

// These are for the btns and return you to either the game or the shop
doc.quest.addEventListener('click', () => {
  doc.extras.style.visibility = 'visible';
  doc.extras.innerHTML = 'Leaving for the quest';
  var loc = localStorage.getItem('location').toLowerCase();
  
  setInterval(() => {
    doc.extras.innerHTML += '.';
  },600);
  
  localStorage.setItem('race', JSON.stringify(self));
  localStorage.setItem('gold', JSON.stringify(gold));
  localStorage.setItem('flask',JSON.stringify(flask));
  localStorage.setItem('kit',  JSON.stringify(kit));
  if(loc == 'quest'){
    localStorage.setItem('location','kit');
  }
  
  setTimeout(() => {
    window.location.href = 'game.html';
  }, 3000);
  remove();
});
doc.shop.addEventListener( 'click', () => {
  doc.extras.style.visibility = 'visible';
  doc.extras.innerHTML = 'Heading for the shop';
  
  setInterval(() => {
    doc.extras.innerHTML += '.';
  },600);
  
  localStorage.setItem('race', JSON.stringify(self));
  localStorage.setItem('gold', JSON.stringify(gold));
  localStorage.setItem('flask',JSON.stringify(flask));
  localStorage.setItem('kit',  JSON.stringify(kit));
  
  if(loc == 'shop'
  || loc == 'shopkit'){
    setTimeout(() => {
      window.location.href = 'shop.html';
    }, 3000);
  }
  else if(loc == 'shops'){
    setTimeout(() => {
      window.location.href = 'statsShop.html';
    }, 3000);
  }
  else if(loc == 'shopable'){
    setTimeout(() => {
      window.location.href = 'abilitiesShop.html';
    }, 3000);
  }
  remove();
});
window.addEventListener('load', () => {
  specs.forEach((spec) => {
    if(spec.attributes.name.value == 'type'){
      spec.innerHTML = self.name.toUpperCase();
    }
    else if(spec.attributes.name.value == 'defense'){
      spec.innerHTML = Math.floor(self.def);
    }
    else if(spec.attributes.name.value == 'health'){
      spec.innerHTML = Math.floor(self.maxHp);
    }
    else if(spec.attributes.name.value == 'magic'){
      spec.innerHTML = Math.floor(self.mag);
    }
    else if(spec.attributes.name.value == 'speed'){
      spec.innerHTML = Math.floor(self.spd);
    }
    else if(spec.attributes.name.value == 'strength'){
      spec.innerHTML = Math.floor(self.str);
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
  });
  
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
  });
});