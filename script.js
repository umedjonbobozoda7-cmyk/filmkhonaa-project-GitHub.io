/* FILMKHONA — Shared data, i18n, and page logic */

const MOVIES = [
  { id: 1, title: { ru: "Тёмный город", tj: "Шаҳри торик" }, genre: "action", year: 2024, rating: 8.7, duration: "2ч 14м", desc: { ru: "Детектив раскрывает заговор в мегаполисе будущего.", tj: "Детектив дар шаҳри оянда сӯиқасдро ошкор мекунад." }, gradient: "linear-gradient(135deg,#1a1a2e,#e50914)" },
  { id: 2, title: { ru: "Звёздный путь", tj: "Роҳи ситора" }, genre: "sci-fi", year: 2023, rating: 9.1, duration: "2ч 28м", desc: { ru: "Эпическое путешествие через неизведанные галактики.", tj: "Саёҳати эпикӣ тавассути галактикаҳои номаълум." }, gradient: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)" },
  { id: 3, title: { ru: "Смех и слёзы", tj: "Ханда ва ашк" }, genre: "comedy", year: 2022, rating: 7.9, duration: "1ч 48м", desc: { ru: "Трогательная комедия о дружбе и мечтах.", tj: "Комедияи дилнишин дар бораи дӯстӣ ва орзуҳо." }, gradient: "linear-gradient(135deg,#f7971e,#ffd200)" },
  { id: 4, title: { ru: "Тихая гавань", tj: "Бандаргоҳи ором" }, genre: "drama", year: 2024, rating: 8.4, duration: "2ч 05м", desc: { ru: "Семейная драма на берегу океана.", tj: "Драмаи оилавӣ дар соҳили уқёнус." }, gradient: "linear-gradient(135deg,#2c3e50,#3498db)" },
  { id: 5, title: { ru: "Крик ночи", tj: "Фарёди шаб" }, genre: "horror", year: 2023, rating: 7.5, duration: "1ч 36м", desc: { ru: "Ужасы в заброшенном особняке.", tj: "Даҳшат дар қасри таркшуда." }, gradient: "linear-gradient(135deg,#000000,#434343)" },
  { id: 6, title: { ru: "Любовь в Париже", tj: "Ишқ дар Париж" }, genre: "romance", year: 2022, rating: 8.0, duration: "1ч 52м", desc: { ru: "Романтическая история двух незнакомцев.", tj: "Таърихи романтикии ду ношинос." }, gradient: "linear-gradient(135deg,#ee9ca7,#ffdde1)" },
  { id: 7, title: { ru: "Последний рубеж", tj: "Марзи охирин" }, genre: "action", year: 2024, rating: 8.8, duration: "2ч 20м", desc: { ru: "Военная операция на границе миров.", tj: "Амалиёти ҳарбӣ дар марзи ҷаҳонҳо." }, gradient: "linear-gradient(135deg,#834d9b,#d04ed6)" },
  { id: 8, title: { ru: "Смешные друзья", tj: "Дӯстони хандаовар" }, genre: "comedy", year: 2023, rating: 7.7, duration: "1ч 40м", desc: { ru: "Комедия о четырёх друзьях в большом городе.", tj: "Комедия дар бораи чор дӯст дар шаҳри калон." }, gradient: "linear-gradient(135deg,#56ab2f,#a8e063)" },
  { id: 9, title: { ru: "Тени прошлого", tj: "Сояи гузашта" }, genre: "drama", year: 2021, rating: 8.2, duration: "2ч 10м", desc: { ru: "Человек встречается с призраками своего прошлого.", tj: "Одам бо арвоҳи гузаштаи худ рӯ ба рӯ мешавад." }, gradient: "linear-gradient(135deg,#373B44,#4286f4)" },
  { id: 10, title: { ru: "Космический охотник", tj: "Шикори кайҳон" }, genre: "sci-fi", year: 2024, rating: 8.9, duration: "2ч 32м", desc: { ru: "Охотник за головами в далёком космосе.", tj: "Шикорчи дар фазои дур." }, gradient: "linear-gradient(135deg,#141E30,#243B55)" },
  { id: 11, title: { ru: "Полночь", tj: "Нимшаб" }, genre: "horror", year: 2022, rating: 7.3, duration: "1ч 28м", desc: { ru: "Сверхъестественные события в полночь.", tj: "Воқеаҳои ғайриоддӣ дар нимшаб." }, gradient: "linear-gradient(135deg,#1f1c2c,#928DAB)" },
  { id: 12, title: { ru: "Золотая осень", tj: "Тирамоҳи тиллоӣ" }, genre: "romance", year: 2023, rating: 8.1, duration: "1ч 55м", desc: { ru: "Любовь расцветает осенью в маленьком городке.", tj: "Ишқ дар тирамоҳ дар шаҳраки хурд шукуфон мебарад." }, gradient: "linear-gradient(135deg,#f12711,#f5af19)" },
  { id: 13, title: { ru: "Империя стали", tj: "Империяи пӯлод" }, genre: "action", year: 2021, rating: 8.5, duration: "2ч 18м", desc: { ru: "Битва за трон в индустриальном мире.", tj: "Ҷанг барои тахт дар ҷаҳони саноатӣ." }, gradient: "linear-gradient(135deg,#3a3a3a,#1a1a1a)" },
  { id: 14, title: { ru: "Судьба", tj: "Тақдир" }, genre: "drama", year: 2024, rating: 9.0, duration: "2ч 25м", desc: { ru: "История о выборе, который меняет всё.", tj: "Таърих дар бораи интихобе, ки ҳама чизро тағйир медиҳад." }, gradient: "linear-gradient(135deg,#4b134f,#c94b4b)" },
  { id: 15, title: { ru: "Галактика мечты", tj: "Галактикаи орзу" }, genre: "sci-fi", year: 2022, rating: 8.6, duration: "2ч 15м", desc: { ru: "Мечтатели строят новый мир среди звёзд.", tj: "Орзупарҳо дар байни ситораҳо ҷаҳони нав месозанд." }, gradient: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)" }
];

const GENRE_KEYS = ["all", "action", "comedy", "drama", "horror", "romance", "sci-fi"];

const VIDEO_SOURCES = {
  "360p": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "480p": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "720p": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "1080p": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
};

const i18n = {
  ru: {
    navHome: "Главная",
    navLibrary: "Библиотека",
    heroBadge: "Премьера",
    heroTitle: "Смотрите лучшее кино",
    heroSubtitle: "Тысячи фильмов в HD. Без рекламы. В любое время.",
    heroPlay: "Смотреть",
    heroInfo: "Подробнее",
    sectionFeatured: "Рекомендуем",
    sectionTrending: "В тренде",
    searchPlaceholder: "Поиск фильмов...",
    filterAll: "Все",
    filterAction: "Боевик",
    filterComedy: "Комедия",
    filterDrama: "Драма",
    filterHorror: "Ужасы",
    filterRomance: "Романтика",
    filterSciFi: "Фантастика",
    watchNow: "Смотреть",
    related: "Похожие фильмы",
    quality: "Качество",
    loading: "Загрузка FILMKHONA...",
    rating: "Рейтинг",
    year: "Год",
    duration: "Длительность",
    genre: "Жанр",
    noResults: "Фильмы не найдены",
    prev: "Назад",
    next: "Вперёд",
    fullscreen: "Полный экран",
    play: "Воспроизвести",
    pause: "Пауза"
  },
  tj: {
    navHome: "Асосӣ",
    navLibrary: "Китобхона",
    heroBadge: "Премьера",
    heroTitle: "Беҳтарин филмҳоро тамошо кунед",
    heroSubtitle: "Ҳазорон филм дар HD. Бе реклама. Ҳар вақт.",
    heroPlay: "Тамошо",
    heroInfo: "Маълумот",
    sectionFeatured: "Тавсияшуда",
    sectionTrending: "Дар раванд",
    searchPlaceholder: "Ҷустуҷӯи филмҳо...",
    filterAll: "Ҳама",
    filterAction: "Ҷангӣ",
    filterComedy: "Комедия",
    filterDrama: "Драма",
    filterHorror: "Даҳшат",
    filterRomance: "Романтика",
    filterSciFi: "Фантастика",
    watchNow: "Тамошо",
    related: "Филмҳои монанд",
    quality: "Сифат",
    loading: "Боркунии FILMKHONA...",
    rating: "Рейтинг",
    year: "Сол",
    duration: "Давомнокӣ",
    genre: "Жанр",
    noResults: "Филм ёфт нашуд",
    prev: "Қаблӣ",
    next: "Баъдӣ",
    fullscreen: "Пурра экран",
    play: "Пахш",
    pause: "Таваққуф"
  }
};

const genreLabels = {
  ru: { action: "Боевик", comedy: "Комедия", drama: "Драма", horror: "Ужасы", romance: "Романтика", "sci-fi": "Фантастика" },
  tj: { action: "Ҷангӣ", comedy: "Комедия", drama: "Драма", horror: "Даҳшат", romance: "Романтика", "sci-fi": "Фантастика" }
};

let currentLang = localStorage.getItem("filmkhona-lang") || "ru";

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || i18n.ru[key] || key;
}

function getMovieTitle(movie) {
  return movie.title[currentLang] || movie.title.ru;
}

function getMovieDesc(movie) {
  return movie.desc[currentLang] || movie.desc.ru;
}

function getGenreLabel(genre) {
  return (genreLabels[currentLang] && genreLabels[currentLang][genre]) || genre;
}

function getMovieById(id) {
  return MOVIES.find((m) => m.id === Number(id));
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("filmkhona-lang", lang);
  document.documentElement.lang = lang === "tj" ? "tg" : "ru";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.placeholder = t(key);
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  if (typeof window.onLanguageChange === "function") window.onLanguageChange();
}

function initLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
  setLanguage(currentLang);
}

function createPosterHTML(movie, extraClass) {
  const cls = extraClass ? ` movie-card ${extraClass}` : " movie-card";
  return `
    <a href="watch.html?id=${movie.id}" class="${cls.trim()}" data-id="${movie.id}" style="--poster-gradient:${movie.gradient}">
      <div class="poster-image">
        <span class="poster-letter">${getMovieTitle(movie).charAt(0)}</span>
        <div class="poster-overlay">
          <span class="play-icon">▶</span>
        </div>
      </div>
      <div class="poster-info">
        <h3>${getMovieTitle(movie)}</h3>
        <p><span class="rating">★ ${movie.rating}</span> · ${movie.year}</p>
      </div>
    </a>`;
}

function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 600);
    }, 1200);
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      toggle.classList.toggle("active");
    });
  }
}

/* ——— HOME PAGE ——— */
function initHome() {
  const featured = MOVIES.slice(0, 8);
  const trending = [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const heroMovie = MOVIES[0];

  const heroTitle = document.getElementById("hero-title");
  const heroDesc = document.getElementById("hero-desc");
  const heroBg = document.getElementById("hero-bg");
  const heroPlay = document.getElementById("hero-play");
  const heroInfo = document.getElementById("hero-info");

  function updateHero(movie) {
    if (heroTitle) heroTitle.textContent = getMovieTitle(movie);
    if (heroDesc) heroDesc.textContent = getMovieDesc(movie);
    if (heroBg) heroBg.style.background = movie.gradient;
    if (heroPlay) heroPlay.href = `watch.html?id=${movie.id}`;
    if (heroInfo) heroInfo.href = `watch.html?id=${movie.id}`;
  }

  updateHero(heroMovie);

  const sliderTrack = document.getElementById("featured-slider");
  if (sliderTrack) {
    sliderTrack.innerHTML = featured.map((m) => createPosterHTML(m, "slider-item")).join("");
  }

  const trendingGrid = document.getElementById("trending-grid");
  if (trendingGrid) {
    trendingGrid.innerHTML = trending.map((m) => createPosterHTML(m)).join("");
  }

  let slideIndex = 0;
  const slideInterval = setInterval(() => {
    slideIndex = (slideIndex + 1) % featured.length;
    updateHero(featured[slideIndex]);
  }, 6000);

  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      slideIndex = (slideIndex - 1 + featured.length) % featured.length;
      updateHero(featured[slideIndex]);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      slideIndex = (slideIndex + 1) % featured.length;
      updateHero(featured[slideIndex]);
    });
  }

  window.onLanguageChange = () => {
    updateHero(featured[slideIndex]);
    if (sliderTrack) sliderTrack.innerHTML = featured.map((m) => createPosterHTML(m, "slider-item")).join("");
    if (trendingGrid) trendingGrid.innerHTML = trending.map((m) => createPosterHTML(m)).join("");
  };
}

/* ——— LIBRARY PAGE ——— */
function initLibrary() {
  const grid = document.getElementById("library-grid");
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");
  let activeGenre = "all";
  let searchQuery = "";

  function renderLibrary() {
    if (!grid) return;
    let filtered = MOVIES;
    if (activeGenre !== "all") filtered = filtered.filter((m) => m.genre === activeGenre);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((m) => {
        const ru = m.title.ru.toLowerCase();
        const tj = m.title.tj.toLowerCase();
        return ru.includes(q) || tj.includes(q);
      });
    }
    if (filtered.length === 0) {
      grid.innerHTML = `<p class="no-results" data-i18n="noResults">${t("noResults")}</p>`;
      return;
    }
    grid.innerHTML = filtered.map((m) => createPosterHTML(m)).join("");
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeGenre = btn.dataset.genre;
      renderLibrary();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderLibrary();
    });
  }

  window.onLanguageChange = renderLibrary;
  renderLibrary();
}

/* ——— STARFIELD (Library) ——— */
function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.3,
      speed: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.8 + 0.2
    }));
  }

  function animate() {
    ctx.fillStyle = "rgba(5, 5, 20, 0.35)";
    ctx.fillRect(0, 0, w, h);
    stars.forEach((s) => {
      s.y += s.speed;
      if (s.y > h) {
        s.y = 0;
        s.x = Math.random() * w;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener("resize", resize);
  animate();
}

/* ——— WATCH PAGE ——— */
function initWatch() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "1";
  const movie = getMovieById(id) || MOVIES[0];
  const video = document.getElementById("main-video");
  const titleEl = document.getElementById("watch-title");
  const descEl = document.getElementById("watch-desc");
  const metaEl = document.getElementById("watch-meta");
  const relatedGrid = document.getElementById("related-grid");
  const qualityBtns = document.querySelectorAll(".quality-btn");
  const playBtn = document.getElementById("play-pause");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const progressBar = document.querySelector(".progress-fill");
  const progressContainer = document.querySelector(".progress-bar");
  let currentQuality = "720p";

  function renderWatchInfo() {
    if (titleEl) titleEl.textContent = getMovieTitle(movie);
    if (descEl) descEl.textContent = getMovieDesc(movie);
    if (metaEl) {
      metaEl.innerHTML = `
        <span>★ ${movie.rating}</span>
        <span>${movie.year}</span>
        <span>${movie.duration}</span>
        <span>${getGenreLabel(movie.genre)}</span>`;
    }
    document.title = `${getMovieTitle(movie)} — FILMKHONA`;
  }

  if (video) {
    video.src = VIDEO_SOURCES[currentQuality];
    video.load();
  }

  qualityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      qualityBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentQuality = btn.dataset.quality;
      if (video) {
        const time = video.currentTime;
        const playing = !video.paused;
        video.src = VIDEO_SOURCES[currentQuality];
        video.currentTime = time;
        if (playing) video.play().catch(() => {});
      }
    });
    if (btn.dataset.quality === currentQuality) btn.classList.add("active");
  });

  if (playBtn && video) {
    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playBtn.textContent = "⏸";
        playBtn.setAttribute("aria-label", t("pause"));
      } else {
        video.pause();
        playBtn.textContent = "▶";
        playBtn.setAttribute("aria-label", t("play"));
      }
    });
    video.addEventListener("play", () => { playBtn.textContent = "⏸"; });
    video.addEventListener("pause", () => { playBtn.textContent = "▶"; });
  }

  if (fullscreenBtn && video) {
    fullscreenBtn.addEventListener("click", () => {
      const wrapper = document.querySelector(".player-wrapper");
      if (document.fullscreenElement) document.exitFullscreen();
      else if (wrapper?.requestFullscreen) wrapper.requestFullscreen();
      else if (video.requestFullscreen) video.requestFullscreen();
    });
  }

  if (video && progressBar && progressContainer) {
    video.addEventListener("timeupdate", () => {
      if (video.duration) progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    });
    progressContainer.addEventListener("click", (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      video.currentTime = pct * video.duration;
    });
  }

  function getRelated() {
    const sameGenre = MOVIES.filter((m) => m.id !== movie.id && m.genre === movie.genre);
    const others = MOVIES.filter((m) => m.id !== movie.id && m.genre !== movie.genre);
    return [...sameGenre, ...others].slice(0, 6);
  }

  if (relatedGrid) {
    relatedGrid.innerHTML = getRelated().map((m) => createPosterHTML(m)).join("");
  }

  window.onLanguageChange = () => {
    renderWatchInfo();
    if (relatedGrid) relatedGrid.innerHTML = getRelated().map((m) => createPosterHTML(m)).join("");
  };

  renderWatchInfo();
}

/* ——— INIT ——— */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNav();
  initLanguageSwitcher();
  initStarfield();

  const page = document.body.dataset.page;
  if (page === "home") initHome();
  else if (page === "library") initLibrary();
  else if (page === "watch") initWatch();
});
