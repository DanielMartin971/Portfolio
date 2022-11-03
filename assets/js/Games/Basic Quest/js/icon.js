
var species = document.querySelector('#species');

var player = JSON.parse(localStorage.getItem('race'));

if(player.type.toLowerCase() == 'argonian'){
  species.classList.add('fas');
  species.classList.add('fa-frog');
  // species.classList.add('fa-2x');
}
else if(player.type.toLowerCase() == 'assassin'){
  species.classList.add('fas');
  species.classList.add('fa-dove');
}
else if(player.type.toLowerCase() == 'azetic'){
  species.classList.add('fab');
  species.classList.add('fa-studiovinari');
}
else if(player.type.toLowerCase() == 'barbarian'){
  species.classList.add('fab');
  species.classList.add('fa-grunt');
  // species.classList.add('fa-2x');
}
else if(player.type.toLowerCase() == 'elf'){
  species.classList.add('fas');
  species.classList.add('fa-dice-d20');
  // species.classList.add('fa-2x');
}
else if(player.type.toLowerCase() == 'fenny'){
  species.classList.add('fas');
  species.classList.add('fa-crow');
  // species.classList.add('fa-2x');
}
else if(player.type.toLowerCase() == 'goblin'){
  species.classList.add('fas');
  species.classList.add('fa-fist-raised');
  // species.classList.add('fa-2x');
}
else if(player.type.toLowerCase() == 'khajiit'){
  species.classList.add('fas');
  species.classList.add('fa-cat');
  // species.classList.add('fa-2x');
}
else if(player.type.toLowerCase() == 'knight'){
  species.classList.add('fas');
  species.classList.add('fa-shield-alt');
  // species.classList.add('fa-2x');
}
else if(player.type.toLowerCase() == 'ninja'){
  species.classList.add('fas');
  species.classList.add('fa-kiwi-bird');
  // species.classList.add('fa-2x');
}





























