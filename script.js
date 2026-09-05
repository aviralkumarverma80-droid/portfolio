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


/* ----------------------
   Additional dynamic effects added:
   - Mouse parallax for orbs, profile ring and floating cards
   - Scroll reveal for sections using IntersectionObserver
   - Injected dynamic CSS (floating/rotate keyframes, reveal styles, mobile nav open)
   - Profile ring glow on hover
   - Slight 3D tilt on project cards
   ---------------------- */

// Inject dynamic CSS rules so we don't need to modify the main style.css file
const dynamicStyles = `
/* keyframes for floating and rotation */
@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* reveal animation for sections */
.section { opacity: 0; transform: translateY(20px); transition: opacity .8s ease, transform .8s ease; }
.section.reveal { opacity: 1; transform: translateY(0); }

/* profile ring glow on hover */
.profile-ring.glow { box-shadow: 0 0 80px rgba(32,234,255,0.18), inset 0 0 30px rgba(168,85,255,0.06); transform: scale(1.03); transition: transform .3s ease, box-shadow .3s ease; }

/* mobile nav open fallback (script toggles .open) */
.nav-links.open { display:flex; position:fixed; top:76px; left:0; right:0; background: rgba(3,7,19,0.95); flex-direction:column; padding:20px; gap:15px; z-index:200; }

/* slight 3D tilt for project cards */
.glass-card { transform-style: preserve-3d; will-change: transform; }
.project-card:hover { transform: perspective(800px) rotateX(4deg) translateY(-7px); }

/* improve performance by forcing composite layer on moving elements */
.orb, .profile-ring, .floating-card { will-change: transform; }
`;

const styleTag = document.createElement('style');
styleTag.textContent = dynamicStyles;
document.head.appendChild(styleTag);

// Parallax / mouse-follow
const orbs = document.querySelectorAll('.orb');
const profileRing = document.querySelector('.profile-ring');
const floatingCards = document.querySelectorAll('.floating-card');

let mouseX = 0, mouseY = 0;
let px = 0, py = 0;

document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  mouseX = (e.clientX - cx) / cx; // -1 to 1
  mouseY = (e.clientY - cy) / cy; // -1 to 1
});

function updateParallax() {
  // smooth follow
  px += (mouseX - px) * 0.08;
  py += (mouseY - py) * 0.08;

  orbs.forEach((o, i) => {
    const depth = (i + 1) * 12; // different depth per orb
    const tx = px * depth;
    const ty = py * depth;
    o.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${1 + Math.abs(px) * 0.02})`;
  });

  if (profileRing) {
    const ringX = px * 18;
    const ringY = py * 18;
    const rotation = (px + py) * 6;
    profileRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${rotation}deg)`;
  }

  floatingCards.forEach((c, idx) => {
    const tx = px * (idx + 1) * 8;
    const ty = py * (idx + 1) * 6;
    c.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  });

  requestAnimationFrame(updateParallax);
}

requestAnimationFrame(updateParallax);

// Profile ring glow on hover (also toggles when mouse is close)
if (profileRing) {
  profileRing.addEventListener('mouseenter', () => profileRing.classList.add('glow'));
  profileRing.addEventListener('mouseleave', () => profileRing.classList.remove('glow'));
}

// Scroll reveal using IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(sec => revealObserver.observe(sec));

// Small accessibility improvement: close mobile nav with Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') navLinks.classList.remove('open');
});
