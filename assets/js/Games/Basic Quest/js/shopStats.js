localStorage.setItem('location','shopS');

let gold  = JSON.parse(localStorage.getItem('gold'));

let self   = JSON.parse(localStorage.getItem('race'));
let stat   = JSON.parse(localStorage.getItem('stat'));
let specs  = document.querySelectorAll('.self li span');


let doc = {
  extras: document.getElementById('extras'),
  flask:  document.querySelector('#flask'),
  gold:   document.querySelector('.gold'),
  leave:  document.querySelector('.leave'),
  kit:    document.querySelector('.kit'),
};
doc.extras.style.height     = 'auto';
doc.extras.style.visibility = 'visible';

doc.extras.innerHTML = 'Welcome to the shop!';

let kit = JSON.parse(localStorage.getItem('kit'));

doc.gold.innerHTML  = gold.owned;

const selection = document.querySelectorAll('tbody button');

let timeout;
function remove(){
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    doc.extras.style.visibility = 'hidden';
    doc.extras.innerHTML = '';
  }, 3000);
}
remove();


doc.leave.addEventListener('click', () => {
  doc.extras.style.height     = 'auto';
  doc.extras.style.visibility = 'visible';
  doc.extras.innerHTML = 'Leaving the shop';
  setInterval(() => {
    doc.extras.innerHTML += '.';
  },600);
  
  localStorage.setItem('stat',JSON.stringify(stat));
  localStorage.setItem('race', JSON.stringify(self));
  localStorage.setItem('gold', JSON.stringify(gold));
  localStorage.setItem('kit',  JSON.stringify(kit));
  
  setTimeout(() => {
    window.location.href = 'game.html';
  }, 3000);
  remove();
});
doc.kit.addEventListener('click', () => {
  doc.extras.style.height     = 'auto';
  doc.extras.style.visibility = 'visible';
  doc.extras.innerHTML        = 'Checking the kit';
  setInterval(() => {
    doc.extras.innerHTML += '.';
  },600);
  
  localStorage.setItem('stat',JSON.stringify(stat));
  localStorage.setItem('race', JSON.stringify(self));
  localStorage.setItem('gold', JSON.stringify(gold));
  localStorage.setItem('kit',  JSON.stringify(kit));
  localStorage.setItem('location','shopS');
  
  setTimeout(() => {
    window.location.href = 'kit.html';
  }, 3000);
  remove();
});

selection.forEach((select) => {
  
  select.addEventListener('click',(e) => {
    doc.extras.style.visibility = 'visible';
    doc.extras.style.height = 'auto';
    
    if(gold.owned < 5000){
      doc.extras.innerHTML = "You don't have enough gold";
    }
    else{
      if(e.target.attributes.name.value.toLowerCase() == 'defense'){
        if(stat.def >= 5){
          doc.extras.innerHTML = "You can't increase that stat anymore";
          self.def = self.def;
        }
        else{
          gold.owned -= 5000;
          gold.spent += 5000;
          self.def++;
          stat.def++;
          doc.extras.innerHTML = "You increased your defense";
        }
    }
      else if(e.target.attributes.name.value.toLowerCase() == 'health'){
        if(stat.hp >= 5){
          doc.extras.innerHTML = "You can't increase that stat anymore";
          self.hp = self.maxHp;
        }
        else{
          gold.owned -= 5000;
          gold.spent += 5000;
          self.maxHp++;
          stat.hp++;
          doc.extras.innerHTML = "You increased your health";
        }
      }
      else if(e.target.attributes.name.value.toLowerCase() == 'magic'){
        if(stat.mag >= 5){
          doc.extras.innerHTML = "You can't increase that stat anymore";
          self.mag = self.mag;
        }
        else{
          gold.owned -= 5000;
          gold.spent += 5000;
          self.mag++;
          stat.mag++;
          doc.extras.innerHTML = "You increased your magic";
        }
      }
      else if(e.target.attributes.name.value.toLowerCase() == 'speed'){
        if(stat.spd >= 5){
          doc.extras.innerHTML = "You can't increase that stat anymore";
          self.spd = self.spd;
        }
        else{
          gold.owned -= 5000;
          gold.spent += 5000;
          self.spd++;
          stat.spd++;
          doc.extras.innerHTML = "You increased your speed";
        }
      }
      else if(e.target.attributes.name.value.toLowerCase() == 'strength'){
        if(gold.owned < 5000){doc.extras.innerHTML = "You don't have enough gold";}
        else if(stat.str >= 5){
          doc.extras.innerHTML = "You can't increase that stat anymore";
          self.str = self.str;
        }
        else{
          gold.owned -= 5000;
          gold.spent += 5000;
          self.str++;
          stat.str++;
          
          doc.extras.innerHTML = "You increased your strength";
        }
      }
      
      doc.gold.innerHTML = gold.owned;
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
    }
    
    
    if(doc.extras.innerHTML !== ''){
      remove();
    }
    
  });
}); 


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
});




















