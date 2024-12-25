
var species = document.querySelector('#species');

self = JSON.parse(localStorage.getItem('race'));

if(self.name.toLowerCase() == 'argonian'){
  species.classList.add('fas');
  species.classList.add('fa-frog');
  // species.classList.add('fa-2x');
}
else if(self.name.toLowerCase() == 'assassin'){
  species.classList.add('fas');
  species.classList.add('fa-dove');
}
else if(self.name.toLowerCase() == 'azetic'){
  species.classList.add('fab');
  species.classList.add('fa-studiovinari');
}
else if(self.name.toLowerCase() == 'barbarian'){
  species.classList.add('fab');
  species.classList.add('fa-grunt');
  // species.classList.add('fa-2x');
}
else if(self.name.toLowerCase() == 'elf'){
  species.classList.add('fas');
  species.classList.add('fa-dice-d20');
  // species.classList.add('fa-2x');
}
else if(self.name.toLowerCase() == 'fenny'){
  species.classList.add('fas');
  species.classList.add('fa-crow');
  // species.classList.add('fa-2x');
}
else if(self.name.toLowerCase() == 'goblin'){
  species.classList.add('fas');
  species.classList.add('fa-fist-raised');
  // species.classList.add('fa-2x');
}
else if(self.name.toLowerCase() == 'khajiit'){
  species.classList.add('fas');
  species.classList.add('fa-cat');
  // species.classList.add('fa-2x');
}
else if(self.name.toLowerCase() == 'knight'){
  species.classList.add('fas');
  species.classList.add('fa-shield-alt');
  // species.classList.add('fa-2x');
}
else if(self.name.toLowerCase() == 'ninja'){
  species.classList.add('fas');
  species.classList.add('fa-kiwi-bird');
  // species.classList.add('fa-2x');
}





























