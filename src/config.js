// ============================================================
//  Todo lo que se cambia seguido está aquí.
// ============================================================

export const WHATSAPP = '50258387088' // 502 + número, sin espacios ni +

export const EVENTO = {
  fecha: '1 de noviembre',
  diaCompleto: 'Domingo 1 de noviembre',
  hora: '4:00 a 6:00 p. m.',
  inicio: '2026-11-01T16:00:00-06:00', // hora de Guatemala, para la cuenta regresiva
  lugar: 'Casa Tina, zona 10',
  precio: 'Q100',
  direccion: 'Diagonal 6 15-36, zona 10, Ciudad de Guatemala',
}

// Navegación. Si después consigues las coordenadas exactas (ej. 14.5967, -90.5134),
// ponlas en COORDENADAS y los botones llevarán justo a la puerta.
export const COORDENADAS = '' // 'lat,lng'
const DESTINO = 'CasaTina, Diag. 6 15-36, Ciudad de Guatemala 01010'

export const NAVEGACION = {
  google: COORDENADAS
    ? `https://www.google.com/maps/dir/?api=1&destination=${COORDENADAS}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DESTINO)}`,
  waze: COORDENADAS
    ? `https://waze.com/ul?ll=${COORDENADAS}&navigate=yes`
    : `https://waze.com/ul?q=${encodeURIComponent('CasaTina Diagonal 6 15-36 zona 10 Guatemala')}&navigate=yes`,
}

export const REDES = {
  instagram: 'https://www.instagram.com/thesunset_sessions',
  tiktok: 'https://www.tiktok.com/@thesunset_sessions',
  usuario: '@thesunset_sessions',
}

export const MSJ_MICROFONO = 'Quiero robarme el micrófono, mi nombre es: '

// Para revelar a un artista: revelado: true, y llenar nombre y foto
// (la foto va en public/assets/).
export const ARTISTAS = [
  { pista: 'Fui youtuber de Minecraft por un tiempo.', revelado: false, nombre: '', foto: '' },
  { pista: 'Tengo una canción muy reciente… ¡oh, mira! Una burbuja.', revelado: false, nombre: '', foto: '' },
]

export const FUENTES = [
  'Instagram',
  'TikTok',
  'Un afiche en la calle',
  'Un amigo o amiga',
  'Una marca aliada',
  'Otro',
]

// Logos de marcas: agregar { nombre: 'Marca', logo: 'marca.png' } (archivo en public/assets/).
// Mientras esté vacío se muestran espacios de ejemplo.
export const MARCAS = []

export const asset = (archivo) => `${import.meta.env.BASE_URL}assets/${archivo}`
