const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

// Boolean per tracciare lo stato del menu
let isMenuOpen = false;

// Function per aprire o chiudere il menu
export function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    // Se aperto:
    // aggiungo la classe e setto aria expanded true per accessibilitò
    mobileMenu.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
  } else {
    // Se chiuso:
    // rimuovo la classe e setto aria expanded false per accessibilità
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
} 