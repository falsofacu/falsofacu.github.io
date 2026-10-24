// Textos por idioma. El HTML trae el español escrito; esto lo pisa al cambiar.
// Nombre y descripción de cada juego: los mismos que su página de Steam en ese idioma.
const I18N = {
  es: {
    "meta.description": "B-LANES: nuestros juegos y juegos amigos. Turrákata, disponible en Steam.",
    "nav.label": "Secciones",
    "nav.ours": "Nuestros juegos",
    "nav.friends": "Juegos amigos",
    "lang.label": "Idioma",
    "ours.title": "Nuestros juegos",
    "game.name": "Turrákata",
    "game.tag1": "Supervivencia",
    "game.tag2": "Fabricación",
    "game.tag3": "Exploración",
    "game.desc": "Turrákata es un juego de supervivencia y crafteo de mundo abierto y shooter 2D ambientado en un pequeño planeta. Estás buscando al que te robó la gorra y dejó al descubierto tu fea, repugnante y putrefacta cabeza pelada. Dispará, crafteá, construí, expandí y peleá para conseguir tu venganza.",
    "game.reviews": "Reseñas",
    "game.positive": "positivas",
    "game.release": "Lanzamiento",
    "game.date": "19 oct 2026",
    "game.platform": "Plataforma",
    "game.buy": "Jugar",
    "game.shot1": "Turrákata: combate de noche",
    "game.shot2": "Turrákata: base con estaciones de crafteo",
    "game.shot3": "Turrákata: pelea contra un mini jefe",
    "game.shot4": "Turrákata: granja y cultivos",
    "friends.title": "Juegos amigos",
    "friends.sub": "Demos jugables y gratis.",
    "friends.play": "Jugar demo",
    "friends.free": "Gratis",
    "pixelaria.desc": "Un sandbox 2D con generación de mundos infinitas.",
    "footer.label": "Pie",
    "footer.steam": "Turrákata en Steam",
    "lightbox.label": "Captura ampliada",
    "lightbox.close": "Cerrar",
    "lightbox.prev": "Anterior",
    "lightbox.next": "Siguiente",
  },
  en: {
    "meta.description": "B-LANES: our games and friends' games. Hustle, available on Steam.",
    "nav.label": "Sections",
    "nav.ours": "Our games",
    "nav.friends": "Friends' games",
    "lang.label": "Language",
    "ours.title": "Our games",
    "game.name": "Hustle",
    "game.tag1": "Survival",
    "game.tag2": "Crafting",
    "game.tag3": "Exploration",
    "game.desc": "Hustle is an open-world survival-crafting game and top-down shooter set on a tiny planet. You're a dude hunting down the guy who stole your red cap, exposing your ugly, putrid, bald head. Shoot, gather, craft, build, expand your map, dodge bullets and fight bosses to seek revenge.",
    "game.reviews": "Reviews",
    "game.positive": "positive",
    "game.release": "Release",
    "game.date": "Oct 19, 2026",
    "game.platform": "Platform",
    "game.buy": "Play",
    "game.shot1": "Hustle: night combat",
    "game.shot2": "Hustle: base with crafting stations",
    "game.shot3": "Hustle: mini boss fight",
    "game.shot4": "Hustle: farm and crops",
    "friends.title": "Friends' games",
    "friends.sub": "Free playable demos.",
    "friends.play": "Play demo",
    "friends.free": "Free",
    "pixelaria.desc": "A 2D sandbox with infinite world generation.",
    "footer.label": "Footer",
    "footer.steam": "Hustle on Steam",
    "lightbox.label": "Enlarged screenshot",
    "lightbox.close": "Close",
    "lightbox.prev": "Previous",
    "lightbox.next": "Next",
  },
};

function applyLang(lang) {
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t[el.dataset.i18nAlt]; });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t[el.dataset.i18nAria]); });
  document.querySelectorAll("[data-i18n-content]").forEach((el) => { el.content = t[el.dataset.i18nContent]; });
  document.querySelectorAll("[data-src-" + lang + "]").forEach((el) => { el.src = el.dataset["src" + lang[0].toUpperCase() + lang.slice(1)]; });
  document.querySelectorAll("[data-href-" + lang + "]").forEach((el) => { el.href = el.dataset["href" + lang[0].toUpperCase() + lang.slice(1)]; });
  document.querySelectorAll(".lang [data-lang]").forEach((el) => { el.setAttribute("aria-pressed", String(el.dataset.lang === lang)); });
}

function savedLang() {
  try { return localStorage.getItem("blanes-lang"); } catch { return null; }
}

// Prioridad: ?lang= en la URL (para compartir links en un idioma) > elección guardada > idioma del navegador
const url = new URL(window.location.href);
const urlLang = (url.searchParams.get("lang") || "").toLowerCase();
const browserLang = (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
let currentLang = I18N[urlLang] ? urlLang : I18N[savedLang()] ? savedLang() : browserLang;
applyLang(currentLang);

document.querySelectorAll(".lang [data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang === currentLang) return;
    currentLang = btn.dataset.lang;
    try { localStorage.setItem("blanes-lang", currentLang); } catch {}
    // si se entró con ?lang=, se actualiza para que recargar no vuelva al idioma anterior
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", currentLang);
      history.replaceState(null, "", url);
    }
    applyLang(currentLang);
  });
});

// Gato: cada click es un parpadeo completo (cierra y abre)
const cat = document.querySelector(".cat");
const catImg = cat.querySelector(".cat__img");
const CAT_OPEN = "assets/cat_open.png";
const CAT_CLOSED = "assets/cat_closed.png";
let blinkTimer = 0;

cat.addEventListener("click", () => {
  clearTimeout(blinkTimer);
  catImg.src = CAT_CLOSED;
  blinkTimer = setTimeout(() => { catImg.src = CAT_OPEN; }, 160);
});

// Nav: línea inferior una vez que se pasa el banner
const nav = document.querySelector(".nav");
const banner = document.querySelector(".banner");
const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > banner.offsetTop + banner.offsetHeight - nav.offsetHeight);
};
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

// Nav: marca la sección que se está viendo
const navLinks = document.querySelectorAll(".nav__links a[href^='#']");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    }
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("#juegos, #amigos").forEach((sec) => spy.observe(sec));
  // arriba de todo, en el banner, no hay ninguna activa
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) navLinks.forEach((a) => a.classList.remove("is-active"));
  }, { rootMargin: "-64px 0px 0px 0px" }).observe(banner);
}

// Galería de capturas: flechas, teclado (← → Esc) y click afuera para cerrar
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCount = lightbox.querySelector(".lightbox__count");
const shotButtons = [...document.querySelectorAll(".shots button")];
let shotIndex = 0;

function showShot(i) {
  shotIndex = (i + shotButtons.length) % shotButtons.length;
  const btn = shotButtons[shotIndex];
  lightboxImg.src = btn.dataset.full;
  lightboxImg.alt = btn.querySelector("img").alt;
  lightboxCount.textContent = `${shotIndex + 1} / ${shotButtons.length}`;
}

shotButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    showShot(i);
    lightbox.showModal();
  });
});
lightbox.querySelector(".lightbox__prev").addEventListener("click", () => showShot(shotIndex - 1));
lightbox.querySelector(".lightbox__next").addEventListener("click", () => showShot(shotIndex + 1));
lightbox.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());
lightboxImg.addEventListener("click", () => showShot(shotIndex + 1));
// el dialog ocupa solo la imagen: un click que cae en él pero fuera de sus hijos es el fondo
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showShot(shotIndex - 1);
  if (e.key === "ArrowRight") showShot(shotIndex + 1);
});
// al cerrar, el foco vuelve a la miniatura que se estaba viendo
lightbox.addEventListener("close", () => shotButtons[shotIndex].focus());

// Aparición al scrollear
const reveals = document.querySelectorAll(".section-head, .game__grid, .shots, .card");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  reveals.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
}

document.getElementById("year").textContent = new Date().getFullYear();
