
// This is for the hamburger bun when the screen is small enough
let navbar = document.querySelector('.hamburger .hide');
function dropBtn(x){
  x.classList.toggle('change');
  navbar.classList.toggle('hide');
}


/*
  --This is for the transition of the navbar and changing its colors--
*/
$(window).scroll(() => {
  if ($(window).scrollTop() >= 3130) {
    $('#nav').css({background: '#55ACEE', transition: 'background-color 0.5s linear', color:'black'});
  } 
  else {
    $('#nav').css('background','transparent');
  }
});

/*
  --This is for the fontAwesome animation with the arrows at the welcome--
*/
function swapping(){
  let arrow = document.getElementById('arrow');
  arrow.innerHTML = "&#xf107;";
  
  setTimeout(function() {
  arrow.innerHTML = "&#xf103;";
  }, 750);
}

//run animation
swapping();

//run animation over 1 1/2 seconds
setInterval(swapping, 1500);


/*
  --This is for the smooth scrolling--
*/
//  --This is for the scroll on particles for going down to the games using the arrow
$('#scroller').on('click', function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top-100
    },2000,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the nav-brand link scroll which takes us back to particles this being the main menu click
$('#n-link').on('click',   function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },3000,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the menu-nav link scroll which takes us back to particles
$('#m-link').on('click',   function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },3000,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the about-nav link scroll
$('#a-link').on('click',   function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },1500,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the contact-nav link scroll
$('#c-link').on('click',   function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },1500,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the footer-menu-nav link scroll
$('#fm-link').on('click',  function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },3000,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the footer-about-nav link scroll
$('#fa-link').on('click',  function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },1500,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the footer-contact-nav link scroll
$('#fc-link').on('click',  function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },1500,
    function() {
      window.location.hash = hash;
    });
  }
});
//  --This is for the footer-games-nav link scroll
$('#gm-link').on('click',  function(e){
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    },1500,
    function() {
      window.location.hash = hash;
    });
  }
});


/*
  --This is for the scroll revealing--
*/
window.sr = ScrollReveal();
sr.reveal('.showcase-left', {
  duration:3000,
  origin:'left',
  distance:'400px'
});
sr.reveal('.showcase-right', {
  duration:3000,
  origin:'right',
  distance:'400px'
});















