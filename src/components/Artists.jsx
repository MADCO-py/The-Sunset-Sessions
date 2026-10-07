import { useRef, useState } from 'react'
import { InstagramLogo } from '@phosphor-icons/react'
import { ARTISTAS, EVENTO, REDES, asset } from '../config'
import { Glove, Reveal, SectionHead } from './Shared'

function MysteryCard({ artista, i, total }) {
  const [flip, setFlip] = useState(false)

  if (artista.revelado) {
    return (
      <Reveal className="card revealed" delay={i * 120}>
        <div className="face front">
          <div className="photo"><img src={asset(artista.foto)} alt={artista.nombre} loading="lazy" /></div>
          <h3>{artista.nombre}</h3>
          <p className="clue">{artista.pista}</p>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal
      as="button"
      type="button"
      className={`card ${flip ? 'flip' : ''}`}
      style={{ '--i': i }}
      delay={i * 120}
      aria-pressed={flip}
      aria-label={`Artista misterioso ${i + 1}. Pista: ${artista.pista} Toca para voltear.`}
      onClick={(e) => { if (!e.target.closest('a')) setFlip(!flip) }}
    >
      <div className="card-in">
        <div className="face front">
          <div className="q">
            <div className="eyes" aria-hidden="true"><i /><i /></div>
            <span>?</span>
          </div>
          <p className="clue">{artista.pista}</p>
          <div className="who">
            <span>Artista <b>{i + 1}</b> de {total}</span>
            <span>Toca para voltear</span>
          </div>
        </div>
        <div className="face back">
          <img src={asset('sun_laugh.webp')} alt="" />
          <div>
            <h3>¿Ya sabes quién es?</h3>
            <p>Lo revelamos muy pronto. Síguenos para ser de los primeros en saberlo.</p>
            <a className="btn sm" href={REDES.instagram} target="_blank" rel="noopener" tabIndex={flip ? 0 : -1}>
              <InstagramLogo weight="bold" size={20} /> Ver en Instagram
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Artists() {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const n = ARTISTAS.length

  return (
    <section className="block mystery" id="artistas" ref={ref} onPointerMove={move}>
      <img className="peek boil" src={asset('sun_kiss.webp')} alt="" />
      <div className="wrap">
        <SectionHead title="¿Quién viene?">
          {n === 1 ? 'Un artista, una pista.' : `${n === 2 ? 'Dos' : n} artistas, ${n === 2 ? 'dos' : n} pistas.`} Toca una tarjeta y ve si adivinas quién es.
        </SectionHead>
        <div className={`cards cards-${Math.min(n, 3)}`}>
          {ARTISTAS.map((a, i) => <MysteryCard key={i} artista={a} i={i} total={n} />)}
        </div>
        <Reveal as="p" className="mystery-note">
          <Glove className="note-glove" />
          Revelamos a cada artista en Instagram antes del {EVENTO.fecha}.
        </Reveal>
      </div>
    </section>
  )
}
