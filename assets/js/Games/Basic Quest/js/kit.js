//this checks to see if the player came from the quest or the shop and makes the shop btn visible

let loc = localStorage.getItem('location').toLowerCase();
window.addEventListener('load',() => {
  if(loc == 'shop'
  || loc == 'shopkit'
  || loc == 'shops'
  || loc == 'shopable'){
    doc.shop.style.visibility = 'visible';
  }
});

let gold  = JSON.parse(localStorage.getItem('gold'));
let flask = JSON.parse(localStorage.getItem('flask'));

let self   = JSON.parse(localStorage.getItem('race'));
let specs  = document.querySelectorAll('.self li span');
let equip  = document.querySelectorAll('.equipment li span');
let equip1 = document.querySelectorAll('.equipment1 li span');
let wep;
let body;

let doc = {
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

let kit = JSON.parse(localStorage.getItem('kit'));

// We set the items to blank for the moment when building the array; A = armors, W = weapons
let itemsA = [];
let itemsW = [];

//This loop seperates the kit by armor and weapon and pushes them into the correct arrays
for(let i = 0; i < kit.length; i++){
  for(let o = 0; o < armors.length; o++){
    if(kit[i].toLowerCase().trim() == armors[o].name.toLowerCase().trim()){
      itemsA.push(kit[i]);
    }
  }
  for(let z = 0; z < weapons.length; z++){
    if(kit[i].toLowerCase().trim() == weapons[z].name.toLowerCase().trim()){
      itemsW.push(kit[i]);
    }
  }
}
console.log('Kit Armors',itemsA,',','Kit Weapons',itemsW);

doc.gold.innerHTML  = gold.owned;
doc.flask.innerHTML = flask.amount;

let timeout;

function remove(){
  timeout = setTimeout(() => {
    doc.extras.style.visibility = 'hidden';
  }, 3000);
}
// showKit displays all items owned onto the HTML seperating them into the respected lists
remove();

// This function just displays all the weapons and armor on the page for the player to see
function showKit(){
  for(let i = 0; i < itemsA.length; i++){
    doc.listA.innerHTML += '<li>' + itemsA[i] + '</li>';
  }  
  for(let i = 0; i < itemsW.length; i++){
    doc.listW.innerHTML += '<li>' + itemsW[i] + '</li>';
  } 
}
showKit();

// These 2 variables select all the armor and weapons that the player owns
let ownArms = document.querySelectorAll('.listA li');
let ownWeps = document.querySelectorAll('.listW li');

let orgHTML = {};
ownArms.forEach((item) => {
  // When the mouse touches a item, it displays the stat differences to what you have equipped at the moment
  item.addEventListener('mouseenter',(e) => {
    let diff      = 0;
    let armorStat = {};
    
    for(let i = 0; i < armors.length; i++){
      if(e.target.innerHTML.toLowerCase().trim() == armors[i].name.toLowerCase().trim()){
        armorStat.name = armors[i].name;
        armorStat.def  = armors[i].def;
        armorStat.hp   = armors[i].hp;
        armorStat.mag  = armors[i].mag;
        armorStat.spd  = armors[i].spd;
        armorStat.str  = armors[i].str;
        break;
      }
    }
    
    orgHTML.name = equip1[0].innerHTML;
    orgHTML.def  = equip1[1].innerHTML;
    orgHTML.hp   = equip1[2].innerHTML;
    orgHTML.mag  = equip1[3].innerHTML;
    orgHTML.spd  = equip1[4].innerHTML;
    orgHTML.str  = equip1[5].innerHTML;
    
    //this is for comparison between the weapon owned and the one hovering over
    equip1[0].innerHTML += ' (' + armorStat.name + ')';
    diff = JSON.parse(armorStat.def) - JSON.parse(equip1[1].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[1].innerHTML += ' (' + diff  + ')';
    diff = JSON.parse(armorStat.hp) - JSON.parse(equip1[2].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[2].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(armorStat.mag) - JSON.parse(equip1[3].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[3].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(armorStat.spd) - JSON.parse(equip1[4].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[4].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(armorStat.str) - JSON.parse(equip1[5].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip1[5].innerHTML += ' (' + diff + ')';
  });
  
  item.addEventListener('click',(e) => {
    let armorStat = {};
    
    for(let i = 0; i < armors.length; i++){
      if(e.target.innerHTML.toLowerCase().trim() == armors[i].name.toLowerCase().trim()){
        armorStat.name = armors[i].name;
        armorStat.def  = armors[i].def;
        armorStat.hp   = armors[i].hp;
        armorStat.mag  = armors[i].mag;
        armorStat.spd  = armors[i].spd;
        armorStat.str  = armors[i].str;
        break;
      }
    }
    
    equip1[0].innerHTML = armorStat.name;
    equip1[1].innerHTML = armorStat.def;
    equip1[2].innerHTML = armorStat.hp;
    equip1[3].innerHTML = armorStat.mag;
    equip1[4].innerHTML = armorStat.spd;
    equip1[5].innerHTML = armorStat.str;
    
    orgHTML.name = armorStat.name;
    orgHTML.def  = armorStat.def;
    orgHTML.hp   = armorStat.hp;
    orgHTML.mag  = armorStat.mag;
    orgHTML.spd  = armorStat.spd;
    orgHTML.str  = armorStat.str;
    
    self.armor = armorStat.name;
    localStorage.setItem('race',JSON.stringify(self));
    console.log(self);
  });
  
  item.addEventListener('mouseleave',(e) => {
    equip1[0].innerHTML = orgHTML.name;
    equip1[1].innerHTML = orgHTML.def;
    equip1[2].innerHTML = orgHTML.hp;
    equip1[3].innerHTML = orgHTML.mag;
    equip1[4].innerHTML = orgHTML.spd;
    equip1[5].innerHTML = orgHTML.str;
  });
  
});

ownWeps.forEach((item) => {
  
  item.addEventListener('mouseenter',(e) => {
    let diff      = 0;
    let wepStat = {};
    
    for(let i = 0; i < weapons.length; i++){
      if(e.target.innerHTML.toLowerCase().trim() == weapons[i].name.toLowerCase().trim()){
        wepStat.name = weapons[i].name.trim();
        wepStat.def  = weapons[i].def;
        wepStat.hp   = weapons[i].hp;
        wepStat.mag  = weapons[i].mag;
        wepStat.spd  = weapons[i].spd;
        wepStat.str  = weapons[i].str;
        wepStat.type = weapons[i].type;
        break;
      }
    }
    
    orgHTML.name = equip[0].innerHTML;
    orgHTML.def  = equip[1].innerHTML;
    orgHTML.hp   = equip[2].innerHTML;
    orgHTML.mag  = equip[3].innerHTML;
    orgHTML.spd  = equip[4].innerHTML;
    orgHTML.str  = equip[5].innerHTML;
    orgHTML.type = equip[6].innerHTML;
    
    //this is for comparison between the weapon owned and the one hovering over
    equip[0].innerHTML += ' (' + wepStat.name + ')';
    diff = JSON.parse(wepStat.def) - JSON.parse(equip[1].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[1].innerHTML += ' (' + diff  + ')';
    diff = JSON.parse(wepStat.hp) - JSON.parse(equip[2].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[2].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(wepStat.mag) - JSON.parse(equip[3].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[3].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(wepStat.spd) - JSON.parse(equip[4].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[4].innerHTML += ' (' + diff + ')';
    diff = JSON.parse(wepStat.str) - JSON.parse(equip[5].innerHTML);
    if(diff > 0) diff = '+' + diff;
    
    equip[5].innerHTML += ' (' + diff + ')';
    equip[6].innerHTML += ' (' + wepStat.type + ')';
  });
  
  item.addEventListener('click',(e) => {
    let wepStat = {};
    
    for(let i = 0; i < weapons.length; i++){
      if(e.target.innerHTML.toLowerCase().trim() == weapons[i].name.toLowerCase().trim()){
        wepStat.name = weapons[i].name;
        wepStat.def  = weapons[i].def;
        wepStat.hp   = weapons[i].hp;
        wepStat.mag  = weapons[i].mag;
        wepStat.spd  = weapons[i].spd;
        wepStat.str  = weapons[i].str;
        wepStat.type = weapons[i].type;
        break;
      }
    }

    let selected = [
      wepStat.name,
      JSON.parse(wepStat.def),
      JSON.parse(wepStat.hp),
      JSON.parse(wepStat.mag),
      JSON.parse(wepStat.spd),
      JSON.parse(wepStat.str),
      wepStat.type,
    ];
    
    for(let i = 0; i < equip.length; i++){
      equip[i].innerHTML = selected[i];
    }
    
    orgHTML.name = wepStat.name;
    orgHTML.def  = wepStat.def;
    orgHTML.hp   = wepStat.hp;
    orgHTML.mag  = wepStat.mag;
    orgHTML.spd  = wepStat.spd;
    orgHTML.str  = wepStat.str;
    orgHTML.type = wepStat.type;
    
    self.weapon = wepStat.name;
    localStorage.setItem('race',JSON.stringify(self));
    console.log(self);
  });
  
  item.addEventListener('mouseleave',(e) => {
    let org = [
    orgHTML.name,
    JSON.parse(orgHTML.def),
    JSON.parse(orgHTML.hp),
    JSON.parse(orgHTML.mag),
    JSON.parse(orgHTML.spd),
    JSON.parse(orgHTML.str),
    orgHTML.type
  ];
  
    for(let i = 0; i < equip.length; i++){
      equip[i].innerHTML = org[i];
    }
  });
  
});


//these are for the btns and return you to either the game or the shop
doc.quest.addEventListener('click', () => {
  doc.extras.style.visibility = 'visible';
  doc.extras.innerHTML = 'Leaving for the quest';
  let loc = localStorage.getItem('location').toLowerCase();
  
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
    for(let i = 0; i < weapons.length; i++){
      if(self.weapon.toLowerCase().trim() == weapons[i].name.toLowerCase().trim()){
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
  });
  
  equip1.forEach((ment) => {
    for(let i = 0; i < armors.length; i++){
      if(self.armor.toLowerCase().trim() == armors[i].name.toLowerCase().trim()){
        body = armors[i];
      }
    }
    
    if(ment.attributes.name.value == 'name'){
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
  });
})