import { html } from '../lib.js'
import { asset } from '../config.js'
import { Eye, Reveal, SectionHead } from './Shared.js'

const S = { fill: 'none', stroke: '#FEFFC6', strokeWidth: 3.4, strokeLinecap: 'round', strokeLinejoin: 'round' }

const VIBES = [
  {
    titulo: 'Música en vivo',
    texto: 'Artistas locales tocando mientras cae el sol.',
    dibujo: html`
      <g ...${S}><ellipse cx="34" cy="72" rx="14" ry="11" /><ellipse cx="72" cy="64" rx="14" ry="11" /><path d="M48 70 V18 L86 10 V62" /><path d="M48 30 L86 22" /></g>
      <${Eye} x="29" y="70" /><${Eye} x="39" y="70" /><${Eye} x="67" y="62" /><${Eye} x="77" y="62" />
    `,
  },
  {
    titulo: 'Café y comida',
    texto: 'Café de especialidad y antojos de nuestras marcas aliadas.',
    dibujo: html`
      <g ...${S}><path d="M18 40 H74 V66 Q74 88 46 88 Q18 88 18 66 Z" /><path d="M74 48 Q92 48 90 60 Q88 72 74 70" /><path d="M34 30 q-6 -8 0 -14 q6 -6 0 -12 M50 30 q-6 -8 0 -14 q6 -6 0 -12" /><path d="M38 72 q8 6 16 0" /></g>
      <${Eye} x="38" y="58" /><${Eye} x="54" y="58" />
    `,
  },
  {
    titulo: 'Arte y actividades',
    texto: 'Dinámicas, arte y sorpresas entre cada set.',
    dibujo: html`
      <g ...${S}><path d="M14 20 H86 V76 H14 Z" /><path d="M14 64 L38 44 L56 60 L68 50 L86 64" /><circle cx="68" cy="34" r="6" /><path d="M50 90 l-8 -14 M50 90 l8 -14" /></g>
      <${Eye} x="30" y="34" /><${Eye} x="44" y="34" />
    `,
  },
]

export default function About() {
  return html`
    <section className="block" id="quienes">
      <div className="wrap">
        <${SectionHead} title="Quiénes somos" />
        <div className="about">
          <${Reveal} className="body">
            <p className="lead">¿Nos vemos al atardecer?</p>
            <p>The Sunset Sessions es una tarde de música en vivo, arte y café en un rincón de la zona 10. Juntamos artistas locales, marcas que nos gustan y un lugar con buena vibra para que la tarde se convierta en noche sin darte cuenta.</p>
            <p>Empezamos pegando afiches en postes y paredes de la ciudad, y queremos que cada sesión se sienta igual de cercana: nuevos artistas, nuevas actividades y la misma idea de siempre, que te vayas con ganas de que llegue la próxima.</p>
          <//>
          <${Reveal} className="collage" aria-label="Fotos de la campaña de afiches" delay=${120}>
            <figure className="c1"><img src=${asset('calle.webp')} alt="Chica leyendo el afiche en una esquina de la 15 calle A, zona 10" loading="lazy" /></figure>
            <figure className="c2"><img src=${asset('poste.webp')} alt="Afiche con código QR pegado en un poste" loading="lazy" /></figure>
            <figure className="c3"><video src=${asset('flyer.mp4')} poster=${asset('flyer.jpg')} autoPlay muted loop playsInline aria-label="Video de la campaña" /></figure>
            <figure className="c4"><img src=${asset('poster.webp')} alt="Afiche oficial: 1 de noviembre, Casa Tina zona 10, Q100" loading="lazy" /></figure>
          <//>
        </div>
        <div className="vibes">
          ${VIBES.map((v, i) => html`
            <${Reveal} className="vibe" key=${v.titulo} delay=${i * 90}>
              <svg className="boil" viewBox="0 0 100 100" aria-hidden="true">${v.dibujo}</svg>
              <h3>${v.titulo}</h3>
              <p>${v.texto}</p>
            <//>
          `)}
        </div>
      </div>
    </section>
  `
}
