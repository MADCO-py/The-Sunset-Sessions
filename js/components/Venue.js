import { html, useEffect, useRef, useState, GoogleLogo, NavigationArrow, X, ArrowRight } from '../lib.js'
import { CUPOS, EVENTO, NAVEGACION, asset } from '../config.js'
import { Ice, Reveal, SectionHead } from './Shared.js'

// Fotos del lugar, en orden.
// forma: 'alta' (dos filas), 'ancha' (todo el ancho) o 'normal'.
// frase: texto grande encima de la foto (opcional).
// texto: etiqueta pequeña de la esquina.
const FOTOS = [
  { src: 'sunset.webp', texto: 'Al atardecer', forma: 'alta' },
  { src: 'cafe1.webp', texto: 'Mesas de madera', forma: 'normal', frase: 'Tenemos un lugar para ti' },
  { src: 'cafe3.webp', texto: 'La barra', forma: 'normal' },
  { video: 'latte.mp4', src: 'latte.jpg', texto: 'Café de especialidad', forma: 'ancha' },
  { src: 'cafe2.webp', texto: 'Tazas listas', forma: 'normal' },
  { src: 'poste.webp', texto: 'Los afiches', forma: 'normal', frase: '¿Estás listo?' },
]

function Media({ f, full }) {
  return f.video
    ? html`<video src=${asset(f.video)} poster=${asset(f.src)} autoPlay muted loop playsInline aria-label=${f.texto} />`
    : html`<img src=${asset(f.src)} alt=${f.texto} loading=${full ? 'eager' : 'lazy'} />`
}

// Visor a pantalla completa: flechas, deslizar con el dedo y Escape para cerrar
function Visor({ i, setI }) {
  const startX = useRef(null)
  const total = FOTOS.length
  const ir = (d) => setI((i + d + total) % total)

  useEffect(() => {
    document.body.classList.add('lock')
    const onKey = (e) => {
      if (e.key === 'Escape') setI(null)
      if (e.key === 'ArrowRight') ir(1)
      if (e.key === 'ArrowLeft') ir(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('lock'); window.removeEventListener('keydown', onKey) }
  }, [i])

  const f = FOTOS[i]
  return html`
    <div
      className="visor"
      role="dialog"
      aria-modal="true"
      aria-label=${f.texto}
      onClick=${(e) => e.target === e.currentTarget && setI(null)}
      onPointerDown=${(e) => { startX.current = e.clientX }}
      onPointerUp=${(e) => {
        if (startX.current == null) return
        const dx = e.clientX - startX.current
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1)
        startX.current = null
      }}
    >
      <button className="visor-close" onClick=${() => setI(null)} aria-label="Cerrar"><${X} weight="bold" size=${26} /></button>
      <figure className="visor-fig" key=${i}>
        <${Media} f=${f} full=${true} />
        <figcaption><span>${f.texto}</span><span>${i + 1} / ${total}</span></figcaption>
      </figure>
      <button className="visor-nav prev" onClick=${() => ir(-1)} aria-label="Foto anterior"><${ArrowRight} weight="bold" size=${24} /></button>
      <button className="visor-nav next" onClick=${() => ir(1)} aria-label="Foto siguiente"><${ArrowRight} weight="bold" size=${24} /></button>
    </div>
  `
}

export default function Venue() {
  const [abierta, setAbierta] = useState(null)

  return html`
    <section className="block" id="lugar">
      <div className="wrap">
        <${SectionHead} title="El lugar" />
        <div className="place-grid">
          <${Reveal} className="place-info">
            <h3>${EVENTO.lugar}</h3>
            <p>Un café escondido entre hiedra, mesas de madera y buena música. Ahí nos vemos.</p>
            <dl className="facts">
              <div><dt>Fecha</dt><dd>${EVENTO.diaCompleto}</dd></div>
              <div><dt>Hora</dt><dd>${EVENTO.hora}</dd></div>
              <div><dt>${EVENTO.tipoEntrada}</dt><dd>${EVENTO.fase && html`<${Ice} />${EVENTO.fase}, `}${EVENTO.precio}${CUPOS && ` (${CUPOS})`}</dd></div>
              <div><dt>Dirección</dt><dd>${EVENTO.direccion}</dd></div>
            </dl>
            <div className="nav-btns">
              <a className="btn" href=${NAVEGACION.google} target="_blank" rel="noopener">
                <${GoogleLogo} weight="bold" size=${22} /> Abrir en Google Maps
              </a>
              <a className="btn ghost" href=${NAVEGACION.waze} target="_blank" rel="noopener">
                <${NavigationArrow} weight="bold" size=${22} /> Abrir en Waze
              </a>
            </div>
          <//>
          <${Reveal} className="gallery" delay=${120}>
            ${FOTOS.map((f, i) => html`
              <button key=${f.src} className=${`tile ${f.forma}`} style=${{ '--r': `${i % 2 ? 1.2 : -1.2}deg` }} onClick=${() => setAbierta(i)} aria-label=${`Ver foto: ${f.texto}`}>
                <${Media} f=${f} />
                ${f.frase && html`<span className="tile-frase" aria-hidden="true">${f.frase}</span>`}
                <span className="tile-tag">${f.texto}</span>
              </button>
            `)}
          <//>
        </div>
      </div>
      ${abierta !== null && html`<${Visor} i=${abierta} setI=${setAbierta} />`}
    </section>
  `
}
