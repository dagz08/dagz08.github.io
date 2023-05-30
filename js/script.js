let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  navbar.classList.toggle('active');
  menu.classList.toggle('fa-times');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  menu.classList.remove('fa-times');

  if(window.scrollY > 100){
    document.querySelector('.header .container').classList.add('active');
  }else{
    document.querySelector('.header .container').classList.remove('active');
  }
}

var typed = new Typed('.typing', {
  strings: ['Frontend', 'Backend', 'Fullstack'],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

let details = document.querySelector('.content .flex .details-btn');
let skills = document.querySelector('.content .flex .skills-btn');
let more = document.querySelector('.content .flex .more-btn');

details.onclick = () => {
  details.classList.add('active');
  skills.classList.remove('active');
  more.classList.remove('active');
  document.querySelector('.content .column .details').classList.add('active');
  document.querySelector('.content .column .skills').classList.remove('active');
  document.querySelector('.content .column .more').classList.remove('active');
}
skills.onclick = () => {
  details.classList.remove('active');
  skills.classList.add('active');
  more.classList.remove('active');
  document.querySelector('.content .column .details').classList.remove('active');
  document.querySelector('.content .column .skills').classList.add('active');
  document.querySelector('.content .column .more').classList.remove('active');
}

more.onclick = () => {
  more.classList.add('active');
  details.classList.remove('active');
  skills.classList.remove('active');
  document.querySelector('.content .column .details').classList.remove('active');
  document.querySelector('.content .column .skills').classList.remove('active');
  document.querySelector('.content .column .more').classList.add('active');
}

var swiper = new Swiper(".testimonials-slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
  grabCursor:true,
});

document.getElementById('btnSubmit').addEventListener('click', function(){
  swal("Thanks for getting in touch", "Email Sent", "success");
})

