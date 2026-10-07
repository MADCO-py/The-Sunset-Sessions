import { html, useEffect, useLayoutEffect, useMemo, useRef } from '../lib.js'
import { asset, EVENTO } from '../config.js'
import { Glove } from './Shared.js'

const PALABRAS = ['The', 'Sunset', 'Sessions']

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const horizonRef = useRef(null)

  const stars = useMemo(
    () => Array.from({ length: 46 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 62,
      size: 6 + Math.random() * 10,
      dur: 1 + Math.random() * 2.5,
    })),
    []
  )

  // Atardecer -> noche mientras bajas
  useEffect(() => {
    const hero = heroRef.current
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.8)))
      hero.style.setProperty('--p', p.toFixed(3))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // La línea del horizonte queda justo debajo del título
  useLayoutEffect(() => {
    const place = () => {
      const hb = heroRef.current.getBoundingClientRect()
      const tb = titleRef.current.getBoundingClientRect()
      horizonRef.current.style.height = `${Math.max(0, hb.bottom - tb.bottom - 12)}px`
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(heroRef.current)
    document.fonts?.ready.then(place)
    const t = setTimeout(place, 1300) // después de que caen las letras
    return () => { ro.disconnect(); clearTimeout(t) }
  }, [])

  return html`
    <header className="hero" id="inicio" ref=${heroRef}>
      <div className="sky-night" />
      <div className="sky" />
      <div className="stars" aria-hidden="true">
        ${stars.map((s, i) => html`
          <i key=${i} style=${{ left: `${s.left}%`, top: `${s.top}%`, '--s': `${s.size}px`, '--d': `${s.dur}s` }} />
        `)}
      </div>
      <div className="sun" />
      <div className="horizon" ref=${horizonRef} />

      <a className="badge" href="#comprar" aria-label=${`Entrada a ${EVENTO.precio}`}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path className="boil" d="M50 2 L58 20 L74 8 L74 28 L94 26 L84 42 L98 54 L80 62 L88 82 L68 78 L62 98 L50 84 L38 98 L32 78 L12 82 L20 62 L2 54 L16 42 L6 26 L26 28 L26 8 L42 20 Z" fill="#4F1E0C" stroke="#FEFFC6" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <span className="in"><b>${EVENTO.precio}</b><small>la entrada</small></span>
      </a>

      <div className="hero-inner wrap">
        <img className="mascots boil" src=${asset('logo.webp')} alt="Tres soles caricatura caminando juntos, mascotas de The Sunset Sessions" />
        <h1 ref=${titleRef} aria-label="The Sunset Sessions">
          ${PALABRAS.map((w, i) => html`<span key=${w} style=${{ '--i': i }} aria-hidden="true">${w}</span>${i < PALABRAS.length - 1 ? ' ' : ''}`)}
        </h1>
        <p className="tagline">Un rincón lleno de música, arte y café.</p>
        <div className="hero-meta">
          <span>${EVENTO.fecha}</span>
          <span>${EVENTO.hora}</span>
          <span>${EVENTO.lugar}</span>
        </div>
        <div className="hero-cta">
          <a className="btn" href="#comprar">Comprar mi entrada <${Glove} /></a>
          <a className="btn ghost" href="#artistas">Adivina los artistas</a>
        </div>
      </div>
    </header>
  `
}
