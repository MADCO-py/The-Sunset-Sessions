import { html, useEffect, useState } from '../lib.js'
import { asset, EVENTO } from '../config.js'

const LINKS = [
  ['quienes', 'Quiénes somos'],
  ['artistas', 'Artistas'],
  ['microfono', 'Micrófono abierto'],
  ['lugar', 'El lugar'],
  ['marcas', 'Marcas'],
  ['como', 'Cómo comprar'],
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40)
      let cur = ''
      for (const [id] of LINKS) {
        const s = document.getElementById(id)
        if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
      }
      const buy = document.getElementById('comprar')
      if (buy && buy.getBoundingClientRect().top < window.innerHeight * 0.4) cur = ''
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del fondo con el menú abierto
  useEffect(() => {
    document.body.classList.toggle('lock', open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const tab = open ? 0 : -1

  return html`
    <nav className=${`nav ${solid ? 'solid' : ''} ${open ? 'open' : ''}`}>
      <div className="wrap">
        <a className="brand" href="#inicio" onClick=${close}>
          <img src=${asset('sun_laugh.webp')} alt="" />
          <span>The Sunset Sessions</span>
        </a>
        <ul className="nav-links">
          ${LINKS.map(([id, label]) => html`
            <li key=${id}><a href=${`#${id}`} className=${active === id ? 'on' : ''}>${label}</a></li>
          `)}
        </ul>
        <a className="btn sm nav-cta" href="#comprar">Comprar entrada</a>
        <button
          className="menu-btn"
          aria-label=${open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded=${open}
          aria-controls="menu-movil"
          onClick=${() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className="mobile-menu" id="menu-movil" aria-hidden=${!open}>
        <ul>
          ${LINKS.map(([id, label], i) => html`
            <li key=${id} style=${{ '--i': i }}>
              <a href=${`#${id}`} onClick=${close} tabIndex=${tab}>${label}</a>
            </li>
          `)}
        </ul>
        <div className="mobile-menu-foot">
          <p>${EVENTO.fecha}, ${EVENTO.hora}<br />${EVENTO.lugar}</p>
          <a className="btn" href="#comprar" onClick=${close} tabIndex=${tab}>
            Comprar entrada, ${EVENTO.precio}
          </a>
        </div>
        <img className="mobile-menu-sun boil" src=${asset('sun_kiss.webp')} alt="" />
      </div>
    </nav>
  `
}
