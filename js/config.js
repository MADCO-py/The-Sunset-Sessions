// ============================================================
//  Todo lo que se cambia seguido está aquí.
//  Puedes editar este archivo directo en GitHub (lápiz de editar)
//  y al guardar la página se actualiza sola en 1 o 2 minutos.
// ============================================================

export const WHATSAPP = '50258387088' // 502 + número, sin espacios ni +

export const EVENTO = {
  fecha: '7 de noviembre',
  diaCompleto: 'Sábado 7 de noviembre',
  hora: '4:00 a 6:00 p. m.',
  inicio: '2026-11-07T16:00:00-06:00', // hora de Guatemala, para la cuenta regresiva
  lugar: 'Casa Tina, zona 10',
  precio: 'Q100',
  tipoEntrada: 'Preventa', // cámbialo a 'Entrada general' cuando termine la preventa
  direccion: 'Diagonal 6 15-36, zona 10, Ciudad de Guatemala',
}

// Si consigues las coordenadas exactas (ej. '14.5967,-90.5134'), ponlas aquí
// y los botones de Google Maps y Waze llevarán justo a la puerta.
export const COORDENADAS = ''
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
// (la foto se sube a la carpeta assets/).
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

// Logos de marcas: agregar { nombre: 'Marca', logo: 'marca.png' } (archivo en assets/).
// Mientras esté vacío se muestran espacios de ejemplo.
export const MARCAS = []

export const asset = (archivo) => `./assets/${archivo}`
