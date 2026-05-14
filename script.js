/* ═══════════════════════════════════
   FOOTER YEAR
═══════════════════════════════════ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ═══════════════════════════════════
   DARK / LIGHT MODE
═══════════════════════════════════ */
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

// Load saved preference
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ═══════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════ */
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

if (cursorDot && cursorRing) {
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
}

/* ═══════════════════════════════════
   TYPEWRITER
═══════════════════════════════════ */
const phrases = [
  "Full Stack Engineer",
  "Python Backend Developer",
  "AI & ML Enthusiast",
  "Flask Specialist",
  "LLMs Integrator",
  "Software Engineering Student",
  "Problem Solver",
];

const twEl = document.getElementById("twText");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseTimer = null;
let typewriterActive = true;

function typeLoop() {
  if (!typewriterActive || !twEl) return;
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

/* ═══════════════════════════════════
   LANGUAGE TOGGLE & TRANSLATIONS
═══════════════════════════════════ */

const translations = {
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_contact: "Contact",
    hero_tag: "Available for hire",
    hero_greeting: "Hi, I'm",
    type_prefix: "And I'm a ",
    hero_sub: "Final-year Software Engineering student at UTeM (CGPA 3.84/4.00). Specializing in Full-Stack development and AI-powered systems — from automation platforms to intelligent LLM integration.",
    cta_work: "View My Work",
    cta_contact: "Contact Me",
    stat_gpa: "CGPA",
    stat_projects: "Projects",
    scroll: "Scroll",
    about_label: "About",
    about_head: "Final-year Software Engineering<br><em>with 3.84 CGPA.</em>",
    about_p1: "Final-year Software Engineering student at Universiti Teknikal Malaysia Melaka (UTeM) with CGPA 3.84/4.00 (First Class Honours). Specialized in Full-Stack development, AI integration, and building intelligent automation systems for real business problems.",
    about_p2: "Proven ability to deliver innovative tech solutions — process automation, data analytics, and management systems that improve efficiency and reduce costs. Fast learner with leadership experience from hackathons. Passionate about digital transformation aligned with Saudi Vision 2030.",
    badge_1: "UTeM 2024–2027",
    badge_2: "Melaka, Malaysia",
    badge_3: "Open to Remote",
    stat_gpa_label: "CGPA",
    stat_projects_label: "Real Projects",
    stat_lang_label: "Languages",
    work_label: "Projects",
    projects_head: "Featured Work",
    projects_sub: "Real-world systems built and shipped — from hackathons to production.",
    proj1_cat: "FYP · Full Stack + AI Algorithms",
    proj1_title: "ClickCV — AI Resume Analyzer",
    proj1_desc: "Intelligent platform for resume analysis and optimization. Uses LLM algorithms to evaluate ATS compatibility and generate smart improvement recommendations. Integrated pre-trained models with custom resume-scoring logic, plus an intelligent job search engine matching user skills with relevant opportunities. Built with PostgreSQL for high-performance data management and interactive frontend.",
    proj2_cat: "Hackathon · Team Leader (3 days)",
    proj2_title: "Manarah — Smart Personal Finance System",
    proj2_desc: "Led a technical team at Salamhack Hackathon to build an intelligent finance system in 3 days. Developed an AI Agent (Python/Flask) providing Sharia-compliant financial advice. Automated expenses and payments with smart savings allocation. Built fast Next.js UI, automated Zakat calculation, and halal investment suggestions with bank account integration. Implemented security standards (JWT, encryption) for sensitive financial data.",
    proj3_cat: "Industry Project · iPetro, Melaka",
    proj3_title: "iPetro Equipment Reporting Automation",
    proj3_desc: "End-to-end web system automating technical and administrative equipment report generation. Reduced report preparation time from hours to minutes — saving significant company resources. Built interactive, user-friendly interfaces enabling non-technical staff to generate reports effortlessly. Applied responsive design principles for cross-device compatibility.",
    proj4_cat: "Backend Integration · Personal Project",
    proj4_title: "ARROW — Smart University LMS Assistant",
    proj4_desc: "Intelligent integration system connecting university LMS with messaging apps using FastAPI. Built smart notification system sending automatic exam/event alerts via Telegram and WhatsApp. Applied web scraping techniques to extract academic data systematically. Integrated with Telegram Bot API and WhatsApp Business API for real-time information delivery. Developed smart chatbot answering student queries by fetching live data from university platform.",
    github_btn: "View on GitHub",
    stack_label: "Tech Stack",
    skills_head: "Skills & Expertise",
    skill_langs: "Languages",
    skill_frontend: "Frontend",
    skill_backend: "Backend & DB",
    skill_ai: "AI & Advanced",
    contact_label: "Contact",
    contact_head: "Let's build<br><em>something together.</em>",
    contact_sub: "Open to full-time roles, freelance projects, and interesting collaborations.",
    contact_email_label: "Email",
    contact_linkedin_label: "LinkedIn",
    contact_github_label: "GitHub",
    footer_built: "Built with HTML / CSS / JS"
  },
  ar: {
    nav_about: "من أنا",
    nav_projects: "المشاريع",
    nav_skills: "المهارات",
    nav_contact: "اتصل بي",
    hero_tag: "متاح للتوظيف",
    hero_greeting: "مرحباً، أنا",
    type_prefix: "وأنا ",
    hero_sub: "طالب هندسة برمجيات في السنة النهائية بجامعة UTeM (معدل 3.84/4.00). متخصص في تطوير Full Stack والأنظمة المدعومة بالذكاء الاصطناعي — من منصات الأتمتة إلى تكامل نماذج اللغة الكبيرة الذكية.",
    cta_work: "اطلع على أعمالي",
    cta_contact: "تواصل معي",
    stat_gpa: "المعدل",
    stat_projects: "مشاريع",
    scroll: "مرر",
    about_label: "نبذة",
    about_head: "هندسة برمجيات سنة أخيرة<br><em>بمعدل 3.84.</em>",
    about_p1: "طالب سنة أخيرة في هندسة البرمجيات بجامعة التكنولوجيا الماليزية ملقا (UTeM) بمعدل تراكمي 3.84/4.00 (امتياز مع مرتبة الشرف). متخصص في تطوير Full Stack ودمج الذكاء الاصطناعي وبناء أنظمة أتمتة ذكية لحل مشاكل الأعمال الحقيقية.",
    about_p2: "قدرة مثبتة على تقديم حلول تقنية مبتكرة — أتمتة العمليات، تحليل البيانات، وأنظمة إدارية تحسن الكفاءة وتقلل التكاليف. متعلم سريع بخبرة قيادية من الهاكاثونات. شغوف بالتحول الرقمي المتوافق مع رؤية السعودية 2030.",
    badge_1: "UTeM 2024–2027",
    badge_2: "ملقا، ماليزيا",
    badge_3: "مرحب بالعمل عن بُعد",
    stat_gpa_label: "المعدل",
    stat_projects_label: "مشاريع حقيقية",
    stat_lang_label: "اللغات",
    work_label: "المشاريع",
    projects_head: "أعمال مميزة",
    projects_sub: "أنظمة حقيقية تم بناؤها وتشغيلها — من الهاكاثونات إلى الإنتاج.",
    proj1_cat: "مشروع التخرج · Full Stack + خوارزميات ذكاء",
    proj1_title: "ClickCV — منصة تحليل السير الذاتية بالذكاء الاصطناعي",
    proj1_desc: "منصة ذكية لتحليل السير الذاتية وتحسينها. تستخدم خوارزميات LLM لتقييم التوافق مع أنظمة ATS وتوليد توصيات ذكية للتحسين. تم دمج نماذج مدربة مسبقاً مع منطق تسجيل مخصص، بالإضافة إلى محرك بحث وظائف ذكي يطابق مهارات المستخدم مع الفرص المناسبة. تم البناء باستخدام PostgreSQL لإدارة بيانات عالية الأداء وواجهة أمامية تفاعلية.",
    proj2_cat: "هاكاثون · قائد فريق (3 أيام)",
    proj2_title: "منارة — نظام مالي شخصي ذكي",
    proj2_desc: "قُدت فريقاً تقنياً في هاكاثون Salamhack لبناء نظام مالي ذكي خلال 3 أيام. تم تطوير وكيل ذكي (Python/Flask) يقدم استشارات مالية متوافقة مع الشريعة الإسلامية. أتمتة المصروفات والمدفوعات مع نظام ادخار ذكي. بناء واجهة Next.js سريعة، وحساب الزكاة آلياً، واقتراح استثمارات حلال مع ربط الحسابات البنكية. تطبيق معايير الأمان (JWT، تشفير) للبيانات المالية الحساسة.",
    proj3_cat: "مشروع صناعي · شركة iPetro، ملقا",
    proj3_title: "أتمتة تقارير المعدات iPetro",
    proj3_desc: "نظام ويب متكامل لأتمتة إنشاء التقارير الفنية والإدارية للمعدات. تم تقليل وقت إعداد التقارير من ساعات إلى دقائق — مما وفر موارد كبيرة للشركة. بناء واجهات تفاعلية سهلة الاستخدام تمكن الموظفين غير التقنيين من إنشاء التقارير بسهولة. تطبيق مبادئ التصميم المتجاوب لضمان العمل على جميع الأجهزة.",
    proj4_cat: "تكامل Backend · مشروع شخصي",
    proj4_title: "ARROW — مساعد جامعي ذكي لنظام إدارة التعلم",
    proj4_desc: "نظام تكامل ذكي يربط نظام إدارة التعلم الجامعي بتطبيقات المراسلة باستخدام FastAPI. بناء نظام إشعارات ذكي يرسل تنبيهات تلقائية للامتحانات والأحداث عبر Telegram وWhatsApp. تطبيق تقنيات web scraping لاستخراج البيانات الأكاديمية بشكل آلي. التكامل مع Telegram Bot API و WhatsApp Business API لتوصيل المعلومات في الوقت الفعلي. تطوير chatbot ذكي يجيب على استفسارات الطالب بجلب البيانات مباشرة من المنصة الجامعية.",
    github_btn: "عرض على GitHub",
    stack_label: "التقنيات",
    skills_head: "المهارات والخبرات",
    skill_langs: "لغات البرمجة",
    skill_frontend: "واجهات أمامية",
    skill_backend: "خلفيات وقواعد بيانات",
    skill_ai: "الذكاء الاصطناعي",
    contact_label: "اتصل بي",
    contact_head: "لنبنِ<br><em>شيئاً معاً.</em>",
    contact_sub: "متاح لوظائف دوام كامل، مشاريع حرة، وتعاونات مثيرة للاهتمام.",
    contact_email_label: "البريد الإلكتروني",
    contact_linkedin_label: "لينكدإن",
    contact_github_label: "جيت هاب",
    footer_built: "بُني بـ HTML / CSS / JS"
  }
};

let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;
  
  // Update all elements with data-key attribute
  document.querySelectorAll("[data-key]").forEach(element => {
    const key = element.getAttribute("data-key");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });
  
  // Update HTML lang attribute and direction
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  
  // Update toggle button text
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.textContent = lang === "en" ? "العربية" : "English";
  }
  
  // Update typewriter based on language
  if (lang === "ar") {
    typewriterActive = false;
    if (twEl) twEl.textContent = "مطور Full Stack ومهندس خوارزميات";
    // Update the prefix as well
    const prefixEl = document.querySelector('[data-key="type_prefix"]');
    if (prefixEl) prefixEl.innerHTML = "وأنا ";
  } else {
    typewriterActive = true;
    // Reset typewriter
    phraseIndex = 0;
    charIndex = 0;
    deleting = false;
    if (pauseTimer) clearTimeout(pauseTimer);
    if (twEl) twEl.textContent = "";
    typeLoop();
    // Update the prefix
    const prefixEl = document.querySelector('[data-key="type_prefix"]');
    if (prefixEl) prefixEl.innerHTML = "And I'm a ";
  }
  
  // Store preference
  localStorage.setItem("preferredLanguage", lang);
}

// Initialize language from localStorage
function initLanguage() {
  const savedLang = localStorage.getItem("preferredLanguage");
  if (savedLang && (savedLang === "en" || savedLang === "ar")) {
    setLanguage(savedLang);
  } else {
    setLanguage("en");
  }
}

/* ═══════════════════════════════════
   MOBILE MENU
═══════════════════════════════════ */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "flex";
    mobileMenu.style.display = isOpen ? "none" : "flex";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
  });
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.style.display = "none";
      if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ═══════════════════════════════════
   SCROLL REVEAL + SKILL BARS
═══════════════════════════════════ */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const siblings = [...e.target.parentElement.querySelectorAll(".reveal:not(.show)")];
        const delay = siblings.indexOf(e.target) * 80;
        setTimeout(() => {
          e.target.classList.add("show");
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
if (navEl) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navEl.style.boxShadow = "0 4px 40px rgba(0,0,0,.18)";
    } else {
      navEl.style.boxShadow = "none";
    }
  }, { passive: true });
}

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

/* ═══════════════════════════════════
   LANGUAGE TOGGLE EVENT LISTENER
═══════════════════════════════════ */
const langToggle = document.getElementById("langToggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    setLanguage(newLang);
  });
}

/* ═══════════════════════════════════
   INITIALIZE EVERYTHING
═══════════════════════════════════ */
// Start language and typewriter after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  // Start typewriter only if English is active
  if (currentLang === "en") {
    typewriterActive = true;
    typeLoop();
  } else {
    typewriterActive = false;
    if (twEl) twEl.textContent = "مطور Full Stack ومهندس خوارزميات";
  }
});