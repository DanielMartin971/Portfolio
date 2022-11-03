
localStorage.setItem('location','shop');

let gold  = JSON.parse(localStorage.getItem('gold'));
let flask = JSON.parse(localStorage.getItem('flask'));

let self   = JSON.parse(localStorage.getItem('race'));
let specs  = document.querySelectorAll('.self li span');

let doc = {
  extras: document.getElementById('extras'),
  flask:  document.querySelector('#flask'),
  gold:   document.querySelector('.gold'),
  input:  document.querySelector('input'),
  leave:  document.querySelector('.leave'),
  kit:    document.querySelector('.kit'),
  submit: document.querySelector('[type=submit]'),
};
doc.extras.style.height     = 'auto';
doc.extras.style.visibility = 'visible';
doc.extras.innerHTML = 'Welcome to the abilites shop!';

let ability = [
  self.ability1.toLowerCase(),
  self.ability2.toLowerCase(),
  self.ability3.toLowerCase(),
];

//BuffaloPower
let buffPow = false;
//Charmisma
let charm   = false;
//BeingDumbComesInHandy
let bdch    = false;
//CheapShot
let cheapy  = false;
//CrossFaded
let xfaded  = false;
//ExoticGent
let exoGen  = false;
//RoyalBlood
let royBlo  = false;
//SharedTrade
let shaeTre = false;

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

let ableStat1 = {
  price: document.querySelector("[name=price1]"),
  name:  document.querySelector("[name=name1]"),
  desc:  document.querySelector("[name=desc1]")
};
let ableStat2 = {
  price: document.querySelector("[name=price2]"),
  name:  document.querySelector("[name=name2]"),
  desc:  document.querySelector("[name=desc2]")
};
let ableStat3 = {
  price: document.querySelector("[name=price3]"),
  name:  document.querySelector("[name=name3]"),
  desc:  document.querySelector("[name=desc3]")
};

const selection = document.querySelectorAll('.selection button');
let kit         = JSON.parse(localStorage.getItem('kit'));

var timeout;
function remove(){
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    doc.extras.innerHTML = '';
  }, 3000);
}
remove();

function init(){
  doc.input.style.width = '210px';
  
  doc.gold.innerHTML  = gold.owned;
  doc.flask.innerHTML = flask.amount;
  
  //this part decreases shop prices by 10% if they have the ability
  if(charm === true){
    for(var i = 0; i < abilities.length; i++){
      abilities[i].price -= abilities[i].price * 0.1;
    }
  }
  /////////////////////////////////////////////////////////////////
  //this part decreases shop prices by 5% if they have the ability
  if(bdch === true){
    for(var i = 0; i < abilities.length; i++){
      abilities[i].price -= Math.floor(abilities[i].price * 0.05);
    }
  }
  /////////////////////////////////////////////////////////////////
  //this part increases the prices by 10%
  if(buffPow === true
  || cheapy  === true
  || xfaded  === true){
    for(var i = 0; i < abilities.length; i++){
      abilities[i].price += Math.floor(abilities[i].price * 0.1);
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
    for(var i = 0; i < abilities.length; i++){
      abilities[i].price -= Math.floor(abilities[i].price * 0.15);
    }
  }
  /////////////////////////////////////////////////////////////
  //this part increases the prices by 20%
  if(royBlo === true){
    for(var i = 0; i < abilities.length; i++){
      abilities[i].price -= Math.floor(abilities[i].price * 0.2);
    }
  }
  /////////////////////////////////////////////////////////////
  //this part increases the prices by 40%
  if(shaeTre === true){
    for(var i = 0; i < abilities.length; i++){
      abilities[i].price -= Math.floor(abilities[i].price * 0.4);
    }
  }
  /////////////////////////////////////////////////////////////
  
  
  let random = Math.floor(Math.random() * abilities.length);
  let third  = random;
  let fourth = random;
  
  ableStat1.name.innerHTML  = abilities[random].name;
  ableStat1.desc.innerHTML  = abilities[random].desc;
  ableStat1.price.innerHTML = abilities[random].price;
  random = Math.floor(Math.random() * abilities.length);
  if(random == third){
    random = Math.floor(Math.random() * abilities.length);
  }
  
  ableStat2.name.innerHTML  = abilities[random].name;
  ableStat2.desc.innerHTML  = abilities[random].desc;
  ableStat2.price.innerHTML = abilities[random].price;
  
  random = Math.floor(Math.random() * abilities.length);
  if(random == third
  || random == fourth){
    random = Math.floor(Math.random() * abilities.length);
  }
  
  ableStat3.name.innerHTML  = abilities[random].name;
  ableStat3.desc.innerHTML  = abilities[random].desc;
  ableStat3.price.innerHTML = abilities[random].price;
  
}
init();

var selected = '';
function choice(item){
  console.log('you called choice()');
  console.log(item);
  
  selected = item;
  
  doc.input.style.visibility  = 'hidden';
  doc.submit.style.visibility = 'hidden';
  
}


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
    else if(spec.attributes.name.value == 'ability1'){
      spec.innerHTML = self.ability1;
    }
    else if(spec.attributes.name.value == 'ability2'){
      spec.innerHTML = self.ability2;
    }
    else if(spec.attributes.name.value == 'ability3'){
      spec.innerHTML = self.ability3;
    }
  });
  
});

selection.forEach((select) => {
  select.addEventListener('click',(e) => {
    if(doc.submit.style.visibility != 'hidden'){
      doc.extras.innerHTML = 'Type in a ability';
    }
    else{
      if(e.target.attributes.name.value.toLowerCase() == 'ability1'){
        //this is to see if player has enough gold to buy the item in question
        //you wanna see if he has the gold, doesnt own the ability and then you wanna choose which ability to remove of some sort
        if(gold.owned < JSON.parse(ableStat1.price.innerHTML)){
          doc.extras.innerHTML = "You don't have enough gold";
        }
        else if(ableStat1.name.innerHTML == ability[0]
        || ableStat1.name.innerHTML == ability[1]
        || ableStat1.name.innerHTML == ability[2]){
          doc.extras.innerHTML = 'You already own this item';
        }
        else{
          console.log('Selected:',selected);
          gold.owned -= JSON.parse(ableStat1.price.innerHTML);
          gold.spent += JSON.parse(ableStat1.price.innerHTML);
          //this is if he selected ability1 to trade out
          if(selected == 'ability1'){
            self.ability1 = ableStat1.name.innerHTML;
          }
          //this is if he selected ability2 to trade out
          //what
          else if(selected == 'ability2'){
            self.ability2 = ableStat1.name.innerHTML;
          }
          //this is if he selected ability3 to trade out
          else if(selected == 'ability3'){
            self.ability3 = ableStat1.name.innerHTML;
          }
          select.style.visibility = 'hidden';
          doc.input.style.visibility  = 'visible';
          doc.submit.style.visibility = 'visible';
        }
        
        
      }
      else if(e.target.attributes.name.value.toLowerCase() == 'ability2'){
        //this is to see if player has enough gold to buy the item in question
        //you wanna see if he has the gold, doesnt own the ability and then you wanna choose which ability to remove of some sort
        if(gold.owned < JSON.parse(ableStat2.price.innerHTML)){
          doc.extras.innerHTML = "You don't have enough gold";
        }
        else if(ableStat2.name.innerHTML == ability[0]
        || ableStat2.name.innerHTML == ability[1]
        || ableStat2.name.innerHTML == ability[2]){
          doc.extras.innerHTML = 'You already own this item';
        }
        else{
          console.log('Selected:',selected);
          gold.owned -= JSON.parse(ableStat2.price.innerHTML);
          gold.spent += JSON.parse(ableStat2.price.innerHTML);
          //this is if he selected ability1 to trade out
          if(selected == 'ability1'){
            self.ability1 = ableStat2.name.innerHTML;
          }
          //this is if he selected ability2 to trade out
          //what
          else if(selected == 'ability2'){
            self.ability2 = ableStat2.name.innerHTML;
          }
          //this is if he selected ability3 to trade out
          else if(selected == 'ability3'){
            self.ability3 = ableStat2.name.innerHTML;
          }
          select.style.visibility = 'hidden';
          doc.input.style.visibility  = 'visible';
          doc.submit.style.visibility = 'visible';
        }
        
       
      }
      else if(e.target.attributes.name.value.toLowerCase() == 'ability3'){
        //this is to see if player has enough gold to buy the item in question
        //you wanna see if he has the gold, doesnt own the ability and then you wanna choose which ability to remove of some sort
        if(gold.owned < JSON.parse(ableStat3.price.innerHTML)){
          doc.extras.innerHTML = "You don't have enough gold";
        }
        else if(ableStat3.name.innerHTML == ability[0]
        || ableStat3.name.innerHTML == ability[1]
        || ableStat3.name.innerHTML == ability[2]){
          doc.extras.innerHTML = 'You already own this item';
        }
        else{
          console.log('Selected:',selected);
          gold.owned -= JSON.parse(ableStat3.price.innerHTML);
          gold.spent += JSON.parse(ableStat3.price.innerHTML);
          //this is if he selected ability1 to trade out
          if(selected == 'ability1'){
            self.ability1 = ableStat3.name.innerHTML;
          }
          //this is if he selected ability2 to trade out
          //what
          else if(selected == 'ability2'){
            self.ability2 = ableStat3.name.innerHTML;
          }
          //this is if he selected ability3 to trade out
          else if(selected == 'ability3'){
            self.ability3 = ableStat3.name.innerHTML;
          }
          select.style.visibility = 'hidden';
          doc.input.style.visibility  = 'visible';
          doc.submit.style.visibility = 'visible';
        }
        
        
      }
      
      //need to fix for phasewalker ability
      specs.forEach((spec) => {
        if(spec.attributes.name.value == 'ability1'){
          if(ability[0] == 'phasewalker'
          || ability[0] == 'nsowm'){
            flask.max = 9;
            flask.heal = 0;
          }
          spec.innerHTML = self.ability1;
        }
        else if(spec.attributes.name.value == 'ability2'){
          if(ability[1] == 'phasewalker'
          || ability[1] == 'nsowm'){
            flask.max = 9;
            flask.heal = 0;
          }
          spec.innerHTML = self.ability2;
        }
        else if(spec.attributes.name.value == 'ability3'){
          if(ability[2] == 'phasewalker'
          || ability[2] == 'nsowm'){
            flask.max = 9;
            flask.heal = 0;
          }
          spec.innerHTML = self.ability3;
        }
      });
    
      for(var i = 0; i < ability.length; i++){
        if(ability[i] == 'nsowm'
        || ability[i] == 'phasewalker'){
          flask.heal = 0;
        }
      }
      
      doc.gold.innerHTML = gold.owned;
      
      localStorage.setItem('race',JSON.stringify(self));
      localStorage.setItem('gold',JSON.stringify(gold));
      localStorage.setItem('flask',JSON.stringify(flask));
    }
  });
});

doc.submit.addEventListener('click',() => {
  var item = '';
  var arr  = ['ability1','ability2','ability3'];
  
  for(var i = 0; i < 3; i++){
    if(doc.input.value.toLowerCase() == arr[i]){
      doc.extras.innerHTML = '';
      item = doc.input.value.toLowerCase();
      choice(item);
      doc.input.value = '';
      break;
    }
    else{
      doc.extras.innerHTML = 'Type in a ability';
      remove();
    }
  }
  
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
doc.kit.addEventListener('click',   () => {
  doc.extras.innerHTML = 'Checking the kit';
  setInterval(() => {
    doc.extras.innerHTML += '.';
  },600);
  
  localStorage.setItem('race', JSON.stringify(self));
  localStorage.setItem('gold', JSON.stringify(gold));
  localStorage.setItem('flask',JSON.stringify(flask));
  localStorage.setItem('kit',  JSON.stringify(kit));
  localStorage.setItem('location','shopAble');
  
  setTimeout(() => {
    window.location.href = 'kit.html';
  }, 3000);
  remove();
});
































