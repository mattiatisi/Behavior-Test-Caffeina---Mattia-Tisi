import { allColors, scrollOffsets } from './config.mjs';
import { setActiveSection } from './navigation.mjs';
import { changePageColors } from './colorsAnimation.mjs';

// Funzione per animare il testo dei paragrafi grazie a plugin splitText
function animateText(paragraph, colors, index, offset) {
  // Seleziona i colori per l'animazione in base alla sezione
  const lightColor = colors[2]; // Colore testo normale
  const darkColor = colors[1]; // Colore testo evidenziato

  /*
  const startColor = (index === 1 || index === 2 || index === 5) ? lightColor : darkColor;
  const endColor = (index === 1 || index === 2 || index === 5) ? darkColor : lightColor;
  */

  
  // Split text into individual characters with aria disabled
  // Disabilita aria-label per evitare problemi di accessibilità
  const split = new SplitText(paragraph, { 
    type: "words",
    aria: false  
  });
  
  // Imposta il word-break per gestire parole lunghe
  gsap.set(split.words, {
    wordBreak: "break-all"
  });
  
  // Anima ogni parola con cambio colore progressivo durante lo scroll
  gsap.fromTo(split.words, 
    { color: lightColor }, 
    {
      color: darkColor,
      duration: 1.2,
      stagger: 0.3, // Ritardo di 0.3s tra ogni parola
      scrollTrigger: {
        trigger: paragraph.parentElement, // Trigger dell'articolo che contiene il paragrafo
        start: `top +=${offset}px`, // Offset per desktop e mobile, inizia l'animazione quando l'articolo raggiunge la posizione
        end: "bottom 50%", // Finisce l'animazione quando la fine dell'articolo raggiunge il 50% dello schemro
        scrub: true, // L'animazione avviene durante lo scroll
      },
    }
  );
}

// Funzione per creare gli scroll trigger per ogni sezione
/*
Ogni sezione viene fissata durante lo scroll, gestice:
- Visibilità testo
- Cambia la sezione attiva durante la navigazione
- Cambia i colori della pagina
- Avvia animazione splitText
 */
function createSectionTriggers(articles, paragraphs, offset) {
  articles.forEach((article, index) => {
    const paragraph = paragraphs[index];
    
    // Configurazione scroll tramite Lenis
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);  // Sincronizza Lenis con ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    
    ScrollTrigger.create({
      trigger: article,
      pin: article,
      pinSpacing: false,
      start: `top +=${offset}px`,
      end: "bottom 50%",
      
      // Quando si entra nella sezione 
      onEnter: () => {
        gsap.to(paragraph, { opacity: 1, duration: 1.2 }); //Mostra il testo
        setActiveSection(index); //Aggiorna la navigazione per l'indice attuale
        changePageColors(index); //Cambia i colori della pagina per l'indice attuale
      },
      
      onEnterBack: () => {
        gsap.to(paragraph, { opacity: 1, duration: 1.2 });
        setActiveSection(index);
        changePageColors(index);
      },
      
      onLeave: () => {
        gsap.to(paragraph, { opacity: 0, duration: 1.2 });
      },
      
      onLeaveBack: () => {
        gsap.to(paragraph, { opacity: 0, duration: 1.2 });
      },
    });
    
    // Configura l'animazione del testo per una determinata sezione
    animateText(paragraph, allColors[index], index, offset);
  });
}

// Inizializzazione dei trigger in base al breakpoint
export function setupScrollTriggers(articles, paragraphs) {
  // Use different offsets for mobile vs desktop
  let matchMedia = gsap.matchMedia();
  
  matchMedia.add("(max-width: 991px)", () => {
    createSectionTriggers(articles, paragraphs, scrollOffsets.mobile);
  });
  
  matchMedia.add("(min-width: 992px)", () => {
    createSectionTriggers(articles, paragraphs, scrollOffsets.desktop);
  });
} 