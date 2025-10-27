let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

window.onload = function(){
  document.getElementById("downloadCV")
  .addEventListener("click", ()=>{
  })
}

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

details.onclick = () => {
  details.classList.add('active');
  document.querySelector('.content .column .details').classList.add('active');
}


var swiper = new Swiper(".testimonials-slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
  grabCursor:true,
});

// document.getElementById('btnSubmit').addEventListener('click', function(){
//   swal("Thanks for getting in touch", "Email Sent", "success");
// })

document.addEventListener("click", function (e) {
const card = e.target.closest(".flip-card");

  // Clicked a card → toggle flip
  if (card) {
    card.classList.toggle("flipped");
  }
  // Clicked outside → hide all flips
  else {
    document
      .querySelectorAll(".flip-card.flipped")
      .forEach((c) => c.classList.remove("flipped"));
  }
});


// Initialize EmailJS (replace with your public key)
emailjs.init("oWBQ2RmYdImLyX_2X"); // Example: "XyZ123abc"

// Open/Close Modal
const modal = document.getElementById("contactModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.querySelector(".close");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Handle Form Submission
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const responseMessage = document.getElementById("response-message");

  emailjs.send("service_8u7gzns", "template_ohznp8p", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  })
  .then(() => {
    responseMessage.textContent = "✅ Your message has been sent successfully!";
    responseMessage.style.color = "green";
    document.getElementById("contact-form").reset();
  })
  .catch((error) => {
    console.error("Error:", error);
    responseMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
    responseMessage.style.color = "red";
  });
});


