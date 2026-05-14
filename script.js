/* ═══════════════════════════════════
   FOOTER YEAR
═══════════════════════════════════ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ═══════════════════════════════════
   LANGUAGE TOGGLE
═══════════════════════════════════ */
const html = document.documentElement;
const langToggle = document.getElementById("langToggle");

// Translation data for typewriter
const translations = {
  en: [
    "Full Stack Engineer",
    "Python Backend Developer",
    "AI & ML Enthusiast",
    "Flask Specialist",
    "LLM Integrator",
    "Software Engineering Student",
    "Problem Solver",
  ],
  ar: [
    "مهندس Full Stack",
    "مطور Python خلفي",
    "متحمس للذكاء الاصطناعي",
    "متخصص Flask",
    "مدمج نماذج اللغة الكبيرة",
    "طالب هندسة برمجيات",
    "حلّال مشاكل",
  ]
};

// Load saved language preference
let currentLang = localStorage.getItem("lang") || "en";
html.setAttribute("lang", currentLang);
html.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");

// Function to update all translatable elements
function updateLanguage(lang) {
  // Update all elements with data-en and data-ar attributes
  document.querySelectorAll("[data-en][data-ar]").forEach(el => {
    const text = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-ar");
    el.textContent = text;
  });

  // Update HTML attributes
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Restart typewriter with new language
  currentLang = lang;
  phraseIndex = 0;
  charIndex = 0;
  deleting = false;
  clearTimeout(pauseTimer);
  typeLoop();
}

// Apply initial language
updateLanguage(currentLang);

// Language toggle event
langToggle.addEventListener("click", () => {
  const newLang = currentLang === "en" ? "ar" : "en";
  currentLang = newLang;
  localStorage.setItem("lang", newLang);
  updateLanguage(newLang);
});

/* ═══════════════════════════════════
   DARK / LIGHT MODE
═══════════════════════════════════ */
const themeToggle = document.getElementById("themeToggle");

// Load saved theme preference
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ═══════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════ */
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top  = mouseY + "px";
});

// Smooth ring follow
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top  = ringY + "px";
  requestAnimationFrame(animateRing);
})();

// Expand ring on hover
document.querySelectorAll("a, button, .project-card, .skill-col, .contact-item").forEach(el => {
  el.addEventListener("mouseenter", () => cursorRing.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursorRing.classList.remove("hover"));
});

/* ═══════════════════════════════════
   TYPEWRITER
═══════════════════════════════════ */
const twEl = document.getElementById("twText");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseTimer = null;

function typeLoop() {
  const phrases = translations[currentLang];
  const current = phrases[phraseIndex];
  
  if (!deleting) {
    charIndex++;
    twEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      pauseTimer = setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 68);
  } else {
    charIndex--;
    twEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 320);
      return;
    }
    setTimeout(typeLoop, 36);
  }
}
typeLoop();

/* ═══════════════════════════════════
   MOBILE MENU
═══════════════════════════════════ */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.style.display === "flex";
  mobileMenu.style.display = isOpen ? "none" : "flex";
  menuBtn.setAttribute("aria-expanded", String(!isOpen));
});

mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.style.display = "none";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* ═══════════════════════════════════
   SCROLL REVEAL + SKILL BARS
═══════════════════════════════════ */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger children in the same parent
        const siblings = [...e.target.parentElement.querySelectorAll(".reveal:not(.show)")];
        const delay = siblings.indexOf(e.target) * 80;
        setTimeout(() => {
          e.target.classList.add("show");
          // Animate skill bars if inside skill-col
          if (e.target.classList.contains("skill-col")) {
            e.target.querySelectorAll(".sk-bar").forEach(bar => {
              bar.style.width = bar.style.getPropertyValue("--w") || "0%";
            });
          }
        }, delay);
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════
   COUNT-UP ANIMATION
═══════════════════════════════════ */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.decimal === "true";
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = target * ease;
    el.textContent = isDecimal ? val.toFixed(2) : Math.floor(val);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isDecimal ? target.toFixed(2) : target;
  }
  requestAnimationFrame(step);
}

const countEls = document.querySelectorAll(".an-num[data-count]");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        countObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
countEls.forEach(el => countObserver.observe(el));

/* ═══════════════════════════════════
   NAV SCROLL SHADOW
═══════════════════════════════════ */
const navEl = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navEl.style.boxShadow = "0 4px 40px rgba(0,0,0,.18)";
  } else {
    navEl.style.boxShadow = "none";
  }
}, { passive: true });

/* ═══════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════ */
const sections = document.querySelectorAll("section[id], .hero[id]");
const navLinks = document.querySelectorAll(".links a");

const linkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove("active"));
        const active = document.querySelector(`.links a[href="#${e.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => linkObserver.observe(s));