
let species = document.querySelector('#species');

let player = JSON.parse(localStorage.getItem('race'));

if(player.name.toLowerCase() == 'argonian'){
  species.classList.add('fas');
  species.classList.add('fa-frog');
  // species.classList.add('fa-2x');
}
else if(player.name.toLowerCase() == 'assassin'){
  species.classList.add('fas');
  species.classList.add('fa-dove');
}
else if(player.name.toLowerCase() == 'azetic'){
  species.classList.add('fab');
  species.classList.add('fa-studiovinari');
}
else if(player.name.toLowerCase() == 'barbarian'){
  species.classList.add('fab');
  species.classList.add('fa-grunt');
  // species.classList.add('fa-2x');
}
else if(player.name.toLowerCase() == 'elf'){
  species.classList.add('fas');
  species.classList.add('fa-dice-d20');
  // species.classList.add('fa-2x');
}
else if(player.name.toLowerCase() == 'fenny'){
  species.classList.add('fas');
  species.classList.add('fa-crow');
  // species.classList.add('fa-2x');
}
else if(player.name.toLowerCase() == 'goblin'){
  species.classList.add('fas');
  species.classList.add('fa-fist-raised');
  // species.classList.add('fa-2x');
}
else if(player.name.toLowerCase() == 'khajiit'){
  species.classList.add('fas');
  species.classList.add('fa-cat');
  // species.classList.add('fa-2x');
}
else if(player.name.toLowerCase() == 'knight'){
  species.classList.add('fas');
  species.classList.add('fa-shield-alt');
  // species.classList.add('fa-2x');
}
else if(player.name.toLowerCase() == 'ninja'){
  species.classList.add('fas');
  species.classList.add('fa-kiwi-bird');
  // species.classList.add('fa-2x');
}





























