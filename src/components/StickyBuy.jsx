import { useEffect, useState } from 'react'
import { EVENTO } from '../config'

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
      setShow(pastHero && !atBuy)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={`sticky-buy ${show ? 'show' : ''}`} aria-hidden={!show}>
      <div>
        <b>{EVENTO.precio}</b>
        <span>{EVENTO.fecha}, Casa Tina</span>
      </div>
      <a className="btn sm" href="#comprar" tabIndex={show ? 0 : -1}>Comprar entrada</a>
    </div>
  )
}
