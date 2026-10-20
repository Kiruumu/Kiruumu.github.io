const translations = {
  en: {
    navHome: "Home",
    navProjects: "Projects",
    heroName1: "Max",
    heroName2: "Slevin",
    bio1: "I’m a web developer based in Ukraine with 4 years of experience in web development. I value clean code, thoughtful design, and attention to detail, with a focus on creating websites that look good and work smoothly across different devices.",
    bio2: "I believe good development is about finding the right balance between simplicity, functionality, and design. I’m always looking to refine my skills, explore new technologies, and keep up with modern web development practices.",
    techLabel: "Technologies",
    btnView: "View Projects →",
    projEyebrow: "Selected Work",
    projTitle: "Projects",
    projSub: "Click any project to open",
    roles: ["Front-End Dev", "Back-End Dev", "Web Developer"],
    projects: [
      {
        title: 'APEX',
        year: '2026',
        tags: ['HTML', 'CSS', 'JS'],
        summary: 'High-impact web design for a fictional luxury car brand.',
        description: 'A personal portfolio project showcasing modern, high-impact web design for the automotive industry. Not tied to a real client - created to explore bold typography, dark UI aesthetics, and dynamic product presentation for a fictional luxury car brand called APEX. The concept includes a striking hero section, a vehicle collection showcase, and a performance-focused stats section highlighting specs and brand credibility. The focus is on strong visual hierarchy, contrast-driven design, and a premium feel suited to the automotive and performance niche.',
        image: './car.webp'
      },
      {
        title: 'Tacoza',
        year: '2025',
        tags: ['Flask', 'HTML', 'CSS', 'JS'],
        summary: 'Responsive small-business website and brand copywriting.',
        description: "A responsive, small-business website project focused on brand copywriting and content strategy for a vibrant Mexican restaurant concept. The aim was to capture the essence of the restaurant's delicious food and inviting atmosphere in a way that stirs up cravings and establishes the brand as genuine, unforgettable, and reliable. This involved crafting the homepage narrative, writing enticing menu descriptions, and organizing the page flow to smoothly lead visitors. The tech stack includes a Flask backend with HTML, CSS, and JS.",
        image: './tacoza.webp'
      }
    ]
  },
  ua: {
    navHome: "Головна",
    navProjects: "Проєкти",
    heroName1: "Макс",
    heroName2: "Слевін",
    bio1: "Я веб-розробник з України з 4-річним досвідом у веб-розробці. Я ціную чистий код, продуманий дизайн та увагу до деталей, зосереджуючись на створенні веб-сайтів, які гарно виглядають і працюють безперебійно на різних пристроях.",
    bio2: "Я вважаю, що гарна розробка — це пошук правильного балансу між простотою, функціональністю та дизайном. Я завжди прагну вдосконалювати свої навички, досліджувати нові технології та йти в ногу з сучасними практиками веб-розробки.",
    techLabel: "Технології",
    btnView: "Переглянути проєкти →",
    projEyebrow: "Вибрані роботи",
    projTitle: "Проєкти",
    projSub: "Натисніть на будь-який проєкт, щоб відкрити",
    roles: ["Front-End розробник", "Back-End розробник", "Веб-розробник"],
    projects: [
      {
        title: 'APEX',
        year: '2026',
        tags: ['HTML', 'CSS', 'JS'],
        summary: 'Високоефективний веб-дизайн для вигаданого бренду розкішних автомобілів.',
        description: 'Особистий портфоліо-проєкт, що демонструє сучасний, високоефективний веб-дизайн для автомобільної індустрії. Не прив’язаний до реального клієнта — створений для дослідження сміливої типографіки, темної естетики UI та динамічної презентації продукту для вигаданого бренду розкішних автомобілів під назвою APEX. Концепція включає яскраву головну секцію, вітрину колекції автомобілів та секцію статистики, орієнтовану на продуктивність, що підкреслює характеристики та авторитет бренду. Акцент зроблено на сильній візуальній ієрархії, контрастному дизайні та преміальному відчутті, що підходить для автомобільної та спортивної ніші.',
        image: './car.webp'
      },
      {
        title: 'Tacoza',
        year: '2025',
        tags: ['Flask', 'HTML', 'CSS', 'JS'],
        summary: 'Адаптивний веб-сайт для малого бізнесу та копірайтинг бренду.',
        description: "Адаптивний проєкт веб-сайту для малого бізнесу, зосереджений на копірайтингу бренду та контент-стратегії для яскравої концепції мексиканського ресторану. Мета полягала в тому, щоб передати суть смачної їжі ресторану та запрошуючої атмосфери так, щоб це викликало апетит і утверджувало бренд як справжній, незабутній та надійний. Це включало створення наративу головної сторінки, написання привабливих описів меню та організацію потоку сторінки, щоб плавно вести відвідувачів. Технологічний стек включає бекенд на Flask з HTML, CSS та JS.",
        image: './tacoza.webp'
      }
    ]
  }
};

let currentLang = 'en';
let typingTimer;
let ri = 0, ci = 0, del = false;

function setLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update Flag Active State
  document.querySelectorAll('.flag-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('aria-label').toLowerCase().includes(lang === 'ua' ? 'ukrainian' : 'english'));
  });

  buildProjects();
  restartTyping();
}

function buildProjects() {
  const list = document.getElementById('project-list');
  if (!list) return;

  const dict = translations[currentLang];
  list.innerHTML = '';

  dict.projects.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'project-item fade-in';
    item.innerHTML =
      '<button class="project-header" onclick="toggleProject(' + i + ')">' +
        '<div>' +
          '<div class="project-meta">' +
            '<span class="project-title">' + p.title + '</span>' +
            '<span class="project-year">' + p.year + '</span>' +
          '</div>' +
          '<p class="project-summary">' + p.summary + '</p>' +
          '<div class="project-tags">' +
            p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') +
          '</div>' +
        '</div>' +
        '<div class="project-toggle">+</div>' +
      '</button>' +
      '<div class="project-detail">' +
        '<div class="project-detail-inner">' +
          '<div class="project-detail-grid">' +
            '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
            '<p>' + p.description + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    list.appendChild(item);
  });
}

function restartTyping() {
  clearTimeout(typingTimer);
  const el = document.getElementById('typed-role');
  if (!el) return;

  ri = 0; ci = 0; del = false;
  el.textContent = '';
  const roles = translations[currentLang].roles;

  function tick() {
    const word = roles[ri];
    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; typingTimer = setTimeout(tick, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    }
    typingTimer = setTimeout(tick, del ? 50 : 80);
  }

  typingTimer = setTimeout(tick, 600);
}

function toggleProject(i) {
  document.querySelectorAll('.project-item')[i].classList.toggle('open');
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(function (p) {
    p.classList.toggle('active', p.id === 'page-' + name);
  });
  document.querySelectorAll('.nav-link').forEach(function (b) {
    b.classList.toggle('active', b.dataset.page === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

(function () {
  var container = document.getElementById('stars');
  if (!container) return;

  for (var i = 0; i < 120; i++) {
    var s = document.createElement('div');
    s.className = 'star';
    var size = Math.random() * 2.5 + 0.5;
    s.style.cssText = 'width:' + size + 'px;height:' + size + 'px;' +
      'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;' +
      '--dur:' + (Math.random() * 4 + 2).toFixed(1) + 's;' +
      '--delay:' + (Math.random() * 5).toFixed(1) + 's;';
    container.appendChild(s);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  setLanguage('en');
});