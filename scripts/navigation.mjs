import { allColors, scrollOffsets } from "./config.mjs";

// Ottengo i link di navigazione per la versione desktop e mobile
const desktopLinks = gsap.utils.toArray("aside nav a h2");
const mobileLinks = gsap.utils.toArray(".mobile-menu ul a h2");

// Indice che tiene traccia dell'articolo attivo
let activeSection = 0;

// Imposta sezione attiva per la navigazione
// Evidenzia il link
export function setActiveSection(sectionIndex) {
  activeSection = sectionIndex;

  // Evidenzia link attivo per desktop
  desktopLinks.forEach((link, index) => {
    const isActive = index === sectionIndex;
    link.classList.toggle("active", isActive);

    // Evidenzia testo behavior
    const parentLi = link.closest('li');
    if (parentLi) {
      parentLi.classList.toggle("active", isActive);
    }
  });

  // Evidenzia link attivo per mobile
  mobileLinks.forEach((link, index) => {
    const isActive = index === sectionIndex;
    link.classList.toggle("active", isActive);
  });
}

// Gestione del click per per la navigazione eseguendo scroll all' articolo corrispondente tenendo conto degli offset
function handleLinkClick(linkIndex, articles) {

    // Viene scelto l'offset (desktop, mobile) tramite condizione
  const offset =
    window.innerWidth < 992 ? scrollOffsets.mobile : scrollOffsets.desktop;

  // Anima lo scroll verso la sezione selezionata
  gsap.to(window, {
    duration: 1.2,
    scrollTo: {
      y: articles[linkIndex],
      offsetY: offset,
    },
  });
}

// Gestione hover dei link
function handleLinkHover(link) {
  const currentColors = allColors[activeSection];
  const activeColor = currentColors[1]; // Colore evidenziato per la sezione corrente prendendo il secondo valore dell'array in config

  gsap.to(link, { color: activeColor, duration: 0.3 });
}

// Reverse hover
function handleLinkLeave(link) {
  const currentColors = allColors[activeSection];
  const activeColor = currentColors[1];
  const textColor = currentColors[2];

    // Se il link è attivo, mantiene il colore attivo
  const isActive = link.classList.contains("active");

  gsap.to(link, {
    color: isActive ? activeColor : textColor,
    duration: 0.3,
  });
}

// Inizializza la navigazione chiamando le funzioni necessarie
export function setupNavigation(articles) {
  
  desktopLinks.forEach((link, index) => {
    // Al click link desktop scroll alla sezione
    link.closest("a").addEventListener("click", (e) => {
      e.preventDefault();
      handleLinkClick(index, articles);
    });

    // Ad hover cambia il colore per desktop
    link.addEventListener("mouseenter", () => handleLinkHover(link));
    link.addEventListener("mouseleave", () => handleLinkLeave(link));
  });

  mobileLinks.forEach((link, index) => {
    // Al click link mobile scroll alla sezione
    link.closest("a").addEventListener("click", async (e) => {
      e.preventDefault();
      handleLinkClick(index, articles);

      // Importa modulo del menu soltanto una volta effettuato il click di un link
      const { toggleMenu } = await import("./menu.mjs");
      toggleMenu();
    });

    // Ad hover cambia il colore per mobile
    link.addEventListener("mouseenter", () => handleLinkHover(link));
    link.addEventListener("mouseleave", () => handleLinkLeave(link));
  });

  // funzione per apertura chiusura menu 
  setupMenuButton();
}

// Al click di menu button importa il modulo e viene aperto/chiuso il menu
function setupMenuButton() {
  const menuButton = document.querySelector(".menu-toggle");

  menuButton.addEventListener("click", async () => {
      // Importa modulo del menu soltanto una volta effettuato il click, non viene caricato per versione desktop
      const menuModule = await import("./menu.mjs");
    menuModule.toggleMenu();
  });
}

// Funzioni di utilità per ottenere i link di navigazione da altri moduli (es. per cambiare colori)
export function getDesktopLinks() {
  return desktopLinks;
}
export function getMobileLinks() {
  return mobileLinks;
}
