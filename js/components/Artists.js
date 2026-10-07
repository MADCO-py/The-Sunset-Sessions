import { html, useRef, useState, InstagramLogo } from '../lib.js'
import { ARTISTAS, EVENTO, REDES, asset } from '../config.js'
import { Glove, Reveal, SectionHead } from './Shared.js'

function MysteryCard({ artista, i, total }) {
  const [flip, setFlip] = useState(false)

  if (artista.revelado) {
    return html`
      <${Reveal} className="card revealed" delay=${i * 120}>
        <div className="face front">
          <div className="photo"><img src=${asset(artista.foto)} alt=${artista.nombre} loading="lazy" /></div>
          <h3>${artista.nombre}</h3>
          <p className="clue">${artista.pista}</p>
        </div>
      <//>
    `
  }

  return html`
    <${Reveal}
      as="button"
      type="button"
      className=${`card ${flip ? 'flip' : ''}`}
      style=${{ '--i': i }}
      delay=${i * 120}
      aria-pressed=${flip}
      aria-label=${`Artista misterioso ${i + 1}. Pista: ${artista.pista} Toca para voltear.`}
      onClick=${(e) => { if (!e.target.closest('a')) setFlip(!flip) }}
    >
      <div className="card-in">
        <div className="face front">
          <div className="q">
            <div className="eyes" aria-hidden="true"><i /><i /></div>
            <span>?</span>
          </div>
          <p className="clue">${artista.pista}</p>
          <div className="who">
            <span>Artista <b>${i + 1}</b> de ${total}</span>
            <span>Toca para voltear</span>
          </div>
        </div>
        <div className="face back">
          <img src=${asset('sun_laugh.webp')} alt="" />
          <div>
            <h3>¿Ya sabes quién es?</h3>
            <p>Lo revelamos muy pronto. Síguenos para ser de los primeros en saberlo.</p>
            <a className="btn sm" href=${REDES.instagram} target="_blank" rel="noopener" tabIndex=${flip ? 0 : -1}>
              <${InstagramLogo} weight="bold" size=${20} /> Ver en Instagram
            </a>
          </div>
        </div>
      </div>
    <//>
  `
}

const NUMEROS = ['', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']

export default function Artists() {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const n = ARTISTAS.length
  const palabra = NUMEROS[n] || n
  const intro = n === 1 ? 'Un artista, una pista.' : `${palabra} artistas, ${String(palabra).toLowerCase()} pistas.`

  return html`
    <section className="block mystery" id="artistas" ref=${ref} onPointerMove=${move}>
      <img className="peek boil" src=${asset('sun_kiss.webp')} alt="" />
      <div className="wrap">
        <${SectionHead} title="¿Quién viene?">${intro} Toca una tarjeta y ve si adivinas quién es.<//>
        <div className=${`cards cards-${Math.min(n, 3)}`}>
          ${ARTISTAS.map((a, i) => html`<${MysteryCard} key=${i} artista=${a} i=${i} total=${n} />`)}
        </div>
        <${Reveal} as="p" className="mystery-note">
          <${Glove} className="note-glove" />
          Revelamos a cada artista en Instagram antes del ${EVENTO.fecha}.
        <//>
      </div>
    </section>
  `
}
