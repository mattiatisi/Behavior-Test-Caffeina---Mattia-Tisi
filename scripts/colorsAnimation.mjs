import { allColors } from './config.mjs';

// Ottengo tutti gli elementi di cui verranno cambiati i colori
const body = document.body;
const logo = document.querySelector("svg g");
const title = document.querySelector("h1");
const paragraphs = gsap.utils.toArray("article p");
const menuIcon = document.querySelector(".menu-toggle svg");
const mobileMenu = document.querySelector(".mobile-menu");
const footer = document.querySelector("footer p");

// Cambia il colore in base all'articolo corrente
export async function changePageColors(colorIndex) {
  // Ottengo i colori da allColors in base all'articolo corrente
  const colors = allColors[colorIndex];
  
  // Ottengo i colori che mi servono
  const backgroundColor = colors[0];
  const activeColor = colors[1];
  const textColor = colors[2];
  
  // Cambio il colore del background
  gsap.to([body], { 
    backgroundColor: backgroundColor, 
    duration: 1.2, 
    ease: "power2.inOut" 
  });
  
  // Cambio il colore del logo
  gsap.to(logo, { 
    fill: activeColor, 
    duration: 1.2, 
    ease: "power2.inOut" 
  });
  
  // Cambio il colore del titolo
  gsap.to(title, { 
    color: activeColor, 
    duration: 1.2, 
    ease: "power2.inOut" 
  });
  
  // Cambio il colore dei paragrafi
  gsap.to(paragraphs, { 
    color: textColor, 
    duration: 1.2, 
    ease: "power2.inOut" 
  });
  
  // Cambio il colore del footer
  gsap.to(footer, { 
    color: activeColor, 
    duration: 1.2, 
    ease: "power2.inOut" 
  });
  
  // Cambio il colore del menu icon
  gsap.to(menuIcon, { 
    stroke: activeColor, 
    duration: 1.2, 
    ease: "power2.inOut" 
  });
  
  // Cambio il colore del mobile menu
  gsap.to(mobileMenu, { 
    backgroundColor: backgroundColor, 
    duration: 1.2, 
    ease: "power2.inOut" 
  });
  
  // Import dinamico delle funzioni per i link
  const { getDesktopLinks, getMobileLinks } = await import('./navigation.mjs');
  const desktopLinks = getDesktopLinks();
  const mobileLinks = getMobileLinks();
  
  //Aggiorno il colore dei link attivi desktop
  desktopLinks.forEach((link) => {
    const isActive = link.classList.contains("active");
    gsap.to(link, {
      color: isActive ? activeColor : textColor,
      duration: 1.2,
      ease: "power2.inOut",
    });
  });
  
  //Aggiorno il colore dei link attivi mobile
  mobileLinks.forEach((link) => {
    const isActive = link.classList.contains("active");
    gsap.to(link, {
      color: isActive ? activeColor : textColor,
      duration: 1.2,
      ease: "power2.inOut",
    });
  });
}