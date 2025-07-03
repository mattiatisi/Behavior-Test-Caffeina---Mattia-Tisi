import { setupNavigation, setActiveSection } from "./navigation.mjs";
import { changePageColors } from "./colorsAnimation.mjs";
import { setupScrollTriggers } from "./scroll.mjs";

// Inizializzazione delle varie funzioni
export default function init() {
  // Wait for the page to load
  document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);


    const articles = gsap.utils.toArray("article");
    const paragraphs = gsap.utils.toArray("article p");

    // Inizializzazione navigazione
    setupNavigation(articles);

    // Setta tutti i paragrafi (tranne il primo) con opacity 0 per poi animarli a 1 quando la sezione viene triggerata
    gsap.set(paragraphs.slice(1), { opacity: 0 });

    // Imposta inizialmente la prima sezione come attiva
    setActiveSection(0);

    // Imposta i colori iniziali della prima sezione
    changePageColors(0);

    // Inizializza gli scroll trigger per le animazioni
    setupScrollTriggers(articles, paragraphs);
  });
}
