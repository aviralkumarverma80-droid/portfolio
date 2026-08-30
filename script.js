/* Typing Animation */

const words = [
  "Developer",
  "AI Enthusiast",
  "Problem Solver",
  "App Developer"
];

const typingElement =
  document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

  const currentWord =
    words[wordIndex];

  if (!deleting) {

    typingElement.textContent =
      currentWord.substring(
        0,
        charIndex + 1
      );

    charIndex++;

    if (
      charIndex ===
      currentWord.length
    ) {

      deleting = true;

      setTimeout(
        typeEffect,
        1200
      );

      return;
    }

  } else {

    typingElement.textContent =
      currentWord.substring(
        0,
        charIndex - 1
      );

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      wordIndex++;

      if (
        wordIndex === words.length
      ) {
        wordIndex = 0;
      }

    }

  }


  setTimeout(
    typeEffect,
    deleting ? 60 : 100
  );

}


typeEffect();


/* Mobile Menu */

const menuBtn =
  document.getElementById("menuBtn");

const navLinks =
  document.getElementById("navLinks");


menuBtn.addEventListener(
  "click",
  () => {

    navLinks.classList.toggle(
      "open"
    );

  }
);


/* Close menu after clicking link */

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        navLinks.classList.remove(
          "open"
        );

      }
    );

  });


/* Contact Form */

const form =
  document.getElementById(
    "contactForm"
  );


form.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    alert(
      "Thanks! Your message has been submitted."
    );

    form.reset();

  }
);
