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
  "RAG & LLM Integrator",
  "AI Agent Developer",
  "Flask / FastAPI Specialist",
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
    hero_tag: "Open to Internships — March 2027",
    hero_greeting: "Hi, I'm",
    type_prefix: "And I'm a ",
    hero_sub: "Final-year Software Engineering student at UTeM (CGPA 3.86/4.00). Specializing in Full-Stack development and AI-powered systems — from multi-tenant RAG platforms to production LLM integrations.",
    cta_work: "View My Work",
    cta_contact: "Contact Me",
    stat_gpa: "CGPA",
    stat_projects: "Projects",
    scroll: "Scroll",
    about_label: "About",
    about_head: "Final-year Software Engineering<br><em>with 3.86 CGPA.</em>",
    about_p1: "Final-year Software Engineering student at Universiti Teknikal Malaysia Melaka (UTeM) with CGPA 3.86/4.00 (Dean's List / Honours). Specialized in Full-Stack development, AI integration — including RAG pipelines and AI agents — and building production-ready, multi-tenant systems for real business problems.",
    about_p2: "Proven ability to ship end-to-end tech solutions — from database architecture to CI/CD deployment — including process automation, secure multi-tenant SaaS platforms, and AI-powered products. Fast learner with leadership experience from hackathons, including a 1st place / finalist win built in 72 hours.",
    badge_1: "UTeM 2024–2027",
    badge_2: "Melaka, Malaysia",
    badge_3: "Open to Internships",
    stat_gpa_label: "CGPA",
    stat_projects_label: "Real Projects",
    stat_lang_label: "Languages",
    work_label: "Projects",
    projects_head: "Featured Work",
    projects_sub: "Real-world systems built and shipped — from hackathons to production.",
    proj1_cat: "FYP · AI-Powered Resume Platform",
    proj1_title: "MyCV — AI-Powered Resume Analysis & Optimization Platform",
    proj1_desc: "Full-stack AI platform combining resume analysis, AI-assisted CV building, CV comparison, job matching, and an AI career chatbot into one integrated tool. Built a custom, deterministic ATS scoring algorithm across 10 weighted criteria, matching commercial tools like Jobscan in benchmark testing. Implemented a hallucination-free CV rebuilding feature that restructures only verified resume content. Tested on 30 real resumes across 5 industries — achieved a 10–15% average ATS score increase and a 4.8/5.0 usability rating.",
    proj2_cat: "Personal Project · Multi-Tenant SaaS",
    proj2_title: "KnowStack — Multi-Tenant RAG Knowledge Platform",
    proj2_desc: "A multi-tenant SaaS platform enabling organizations to create private knowledge bases and chat with their own documents using Retrieval-Augmented Generation (RAG), with citations back to source material. Enforced strict tenant data isolation with a two-layer security model — application-level scoping plus PostgreSQL Row Level Security (RLS) — preventing cross-tenant data leaks even from a compromised query. Built an asynchronous ingestion pipeline (Celery + Redis) for parsing, chunking, and embedding documents at scale, deployed across separate API, worker, and frontend services.",
    proj3_cat: "Salamhack Hackathon 2026 · Team Lead (72 hrs) · 1st Place / Finalist",
    proj3_title: "Manarah — Smart Personal Finance System",
    proj3_desc: "Led a 3-person technical team at Salamhack Hackathon to build a complete AI-driven personal finance platform in a 72-hour sprint. Developed an AI Agent (Python/Flask) providing Sharia-compliant financial advice. Automated expenses and payments with smart savings allocation, fast Next.js UI, automated Zakat calculation, and halal investment suggestions with bank account integration. Implemented JWT authentication and encryption for sensitive financial data.",
    proj4_cat: "Freelance Project · iPetro, Melaka (Oct 2025)",
    proj4_title: "iPetro Equipment Reporting Automation",
    proj4_desc: "End-to-end web system automating technical and administrative equipment report generation. Reduced report preparation time from hours to minutes — saving significant company resources. Built interactive, user-friendly interfaces enabling non-technical staff to generate reports effortlessly. Applied responsive design principles for cross-device compatibility.",
    proj5_cat: "Backend Integration · Personal Project",
    proj5_title: "ARROW — Smart University LMS Assistant",
    proj5_desc: "Intelligent integration system connecting university LMS with messaging apps using FastAPI. Built a smart notification system sending automatic exam/event alerts via Telegram and WhatsApp. Applied web scraping techniques to extract academic data systematically, integrated with Telegram Bot API and WhatsApp Business API for real-time delivery, and built a chatbot answering student queries by fetching live data from the university platform.",
    live_btn: "Live Demo",
    github_btn: "View on GitHub",
    stack_label: "Tech Stack",
    skills_head: "Skills & Expertise",
    skill_langs: "Languages",
    skill_frontend: "Frontend",
    skill_backend: "Backend & DB",
    skill_ai: "AI & Advanced",
    contact_label: "Contact",
    contact_head: "Let's build<br><em>something together.</em>",
    contact_sub: "Open to Software Engineering / AI internships (starting March 2027), freelance projects, and interesting collaborations.",
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
    hero_tag: "متاح للتدريب — مارس 2027",
    hero_greeting: "مرحباً، أنا",
    type_prefix: "وأنا ",
    hero_sub: "طالب هندسة برمجيات في السنة النهائية بجامعة UTeM (معدل 3.86/4.00). متخصص في تطوير Full Stack والأنظمة المدعومة بالذكاء الاصطناعي — من منصات RAG متعددة المستأجرين إلى تكامل نماذج اللغة الكبيرة في الإنتاج.",
    cta_work: "اطلع على أعمالي",
    cta_contact: "تواصل معي",
    stat_gpa: "المعدل",
    stat_projects: "مشاريع",
    scroll: "مرر",
    about_label: "نبذة",
    about_head: "هندسة برمجيات سنة أخيرة<br><em>بمعدل 3.86.</em>",
    about_p1: "طالب سنة أخيرة في هندسة البرمجيات بجامعة التكنولوجيا الماليزية ملقا (UTeM) بمعدل تراكمي 3.86/4.00 (قائمة العميد / مرتبة الشرف). متخصص في تطوير Full Stack ودمج الذكاء الاصطناعي — بما في ذلك أنظمة RAG والوكلاء الذكيين — وبناء أنظمة إنتاجية متعددة المستأجرين لحل مشاكل الأعمال الحقيقية.",
    about_p2: "قدرة مثبتة على تسليم حلول تقنية متكاملة من الألف إلى الياء — من تصميم قاعدة البيانات إلى النشر عبر CI/CD — بما في ذلك أتمتة العمليات ومنصات SaaS متعددة المستأجرين الآمنة والمنتجات المدعومة بالذكاء الاصطناعي. متعلم سريع بخبرة قيادية من الهاكاثونات، بما في ذلك فوز بالمركز الأول / التأهل للنهائي تم بناؤه خلال 72 ساعة.",
    badge_1: "UTeM 2024–2027",
    badge_2: "ملقا، ماليزيا",
    badge_3: "متاح للتدريب",
    stat_gpa_label: "المعدل",
    stat_projects_label: "مشاريع حقيقية",
    stat_lang_label: "اللغات",
    work_label: "المشاريع",
    projects_head: "أعمال مميزة",
    projects_sub: "أنظمة حقيقية تم بناؤها وتشغيلها — من الهاكاثونات إلى الإنتاج.",
    proj1_cat: "مشروع التخرج · منصة تحليل السير الذاتية بالذكاء الاصطناعي",
    proj1_title: "MyCV — منصة تحليل وتحسين السير الذاتية بالذكاء الاصطناعي",
    proj1_desc: "منصة ذكاء اصطناعي متكاملة تجمع بين تحليل السير الذاتية، وبناء السيرة الذاتية بمساعدة الذكاء الاصطناعي، ومقارنة السير الذاتية، ومطابقة الوظائف، ومساعد ذكي للمسار المهني في أداة واحدة. تم بناء خوارزمية تسجيل ATS مخصصة وحتمية عبر 10 معايير مرجحة، بأداء يضاهي أدوات تجارية مثل Jobscan في الاختبارات المرجعية. تم تطبيق ميزة إعادة بناء السيرة الذاتية دون تلفيق، تعتمد فقط على المحتوى الموثق. تم اختبارها على 30 سيرة ذاتية حقيقية عبر 5 قطاعات — بتحسن 10-15% في متوسط درجة ATS وتقييم استخدام 4.8 من 5.",
    proj2_cat: "مشروع شخصي · منصة SaaS متعددة المستأجرين",
    proj2_title: "KnowStack — منصة معرفة ذكية متعددة المستأجرين بتقنية RAG",
    proj2_desc: "منصة SaaS متعددة المستأجرين تتيح للمؤسسات إنشاء قواعد معرفة خاصة والدردشة مع مستنداتها باستخدام تقنية الاسترجاع المعزز بالتوليد (RAG)، مع الاستشهاد بالمصادر الأصلية. تم فرض عزل صارم لبيانات المستأجرين عبر نموذج أمان من طبقتين — تحديد النطاق على مستوى التطبيق بالإضافة إلى سياسات أمان الصفوف (RLS) في PostgreSQL — لمنع تسرب البيانات بين المستأجرين حتى من استعلام مخترق. تم بناء خط أنابيب استيعاب غير متزامن (Celery + Redis) لتحليل وتقطيع وتضمين المستندات على نطاق واسع، ونشرها عبر خدمات API وWorker وواجهة أمامية منفصلة.",
    proj3_cat: "هاكاثون Salamhack 2026 · قائد فريق (72 ساعة) · المركز الأول / التأهل للنهائي",
    proj3_title: "منارة — نظام مالي شخصي ذكي",
    proj3_desc: "قُدت فريقاً تقنياً من 3 أشخاص في هاكاثون Salamhack لبناء منصة مالية شخصية متكاملة مدفوعة بالذكاء الاصطناعي خلال 72 ساعة. تم تطوير وكيل ذكي (Python/Flask) يقدم استشارات مالية متوافقة مع الشريعة الإسلامية. أتمتة المصروفات والمدفوعات مع نظام ادخار ذكي، وواجهة Next.js سريعة، وحساب الزكاة آلياً، واقتراح استثمارات حلال مع ربط الحسابات البنكية. تطبيق مصادقة JWT والتشفير للبيانات المالية الحساسة.",
    proj4_cat: "مشروع مستقل · شركة iPetro، ملقا (أكتوبر 2025)",
    proj4_title: "أتمتة تقارير المعدات iPetro",
    proj4_desc: "نظام ويب متكامل لأتمتة إنشاء التقارير الفنية والإدارية للمعدات. تم تقليل وقت إعداد التقارير من ساعات إلى دقائق — مما وفر موارد كبيرة للشركة. بناء واجهات تفاعلية سهلة الاستخدام تمكن الموظفين غير التقنيين من إنشاء التقارير بسهولة. تطبيق مبادئ التصميم المتجاوب لضمان العمل على جميع الأجهزة.",
    proj5_cat: "تكامل Backend · مشروع شخصي",
    proj5_title: "ARROW — مساعد جامعي ذكي لنظام إدارة التعلم",
    proj5_desc: "نظام تكامل ذكي يربط نظام إدارة التعلم الجامعي بتطبيقات المراسلة باستخدام FastAPI. بناء نظام إشعارات ذكي يرسل تنبيهات تلقائية للامتحانات والأحداث عبر Telegram وWhatsApp. تطبيق تقنيات web scraping لاستخراج البيانات الأكاديمية بشكل آلي، والتكامل مع Telegram Bot API و WhatsApp Business API لتوصيل المعلومات في الوقت الفعلي، وبناء chatbot ذكي يجيب على استفسارات الطالب بجلب البيانات مباشرة من المنصة الجامعية.",
    live_btn: "عرض مباشر",
    github_btn: "عرض على GitHub",
    stack_label: "التقنيات",
    skills_head: "المهارات والخبرات",
    skill_langs: "لغات البرمجة",
    skill_frontend: "واجهات أمامية",
    skill_backend: "خلفيات وقواعد بيانات",
    skill_ai: "الذكاء الاصطناعي",
    contact_label: "اتصل بي",
    contact_head: "لنبنِ<br><em>شيئاً معاً.</em>",
    contact_sub: "متاح لفرص التدريب في هندسة البرمجيات / الذكاء الاصطناعي (بدءاً من مارس 2027)، والمشاريع الحرة، والتعاونات المثيرة للاهتمام.",
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
    if (twEl) twEl.textContent = "مطور Full Stack ومهندس أنظمة RAG وذكاء اصطناعي";
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
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  if (currentLang === "en") {
    typewriterActive = true;
    typeLoop();
  } else {
    typewriterActive = false;
    if (twEl) twEl.textContent = "مطور Full Stack ومهندس أنظمة RAG وذكاء اصطناعي";
  }
});