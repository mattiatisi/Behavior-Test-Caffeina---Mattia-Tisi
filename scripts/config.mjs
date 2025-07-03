// Creo array con tutti i colori (da esportare negli altri moduli)
// Ogni array contiene: [background, attivo, testo]
export const colors = {
  ambition: ["#102b70", "#a9c0f9", "#e5edff"],
  excellence: ["#a9f9ba", "#043510", "#2a743a"],
  caring: ["#f9a9e8", "#350428", "#782b67"],
  growth: ["#043510", "#a9f9ba", "#e5ffea"],
  courage: ["#350428", "#f9a9e8", "#ffe5fa"],
  proactivity: ["#a9c0f9", "#041035", "#102b70"]
};

// L'ordine corrisponde alle sezioni: ambition, excellence, caring, growth, courage, proactivity
// Viene usato negli altri moduli per accedere all'intera palette e viene passato l'indice per cambiare i colori
export const allColors = [colors.ambition, colors.excellence, colors.caring, colors.growth, colors.courage, colors.proactivity];

// Offsset scroll per desktop and mobile
export const scrollOffsets = {
  mobile: 145.7,
  desktop: 199.7
}; 