import { html, useEffect, useState } from '../lib.js'
import { EVENTO } from '../config.js'

// Barra fija abajo en celular: aparece después del inicio y se esconde
// cuando ya estás en la sección de compra.
export default function StickyBuy() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('inicio')
      const buy = document.getElementById('comprar')
      const pastHero = hero && hero.getBoundingClientRect().bottom < 80
      const atBuy = buy && buy.getBoundingClientRect().top < window.innerHeight * 0.9
      setShow(Boolean(pastHero && !atBuy))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return html`
    <div className=${`sticky-buy ${show ? 'show' : ''}`} aria-hidden=${!show}>
      <p><b>${EVENTO.precio}</b><span>${EVENTO.tipoEntrada}</span></p>
      <a className="btn sm" href="#comprar" tabIndex=${show ? 0 : -1}>Comprar</a>
    </div>
  `
}
