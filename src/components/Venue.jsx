import { GoogleLogo, NavigationArrow } from '@phosphor-icons/react'
import { EVENTO, NAVEGACION, asset } from '../config'
import { Reveal, SectionHead } from './Shared'

const FOTOS = [
  ['cafe1.webp', 'Mesas de madera de Casa Tina'],
  ['cafe3.webp', 'Barra de café con tazas'],
  ['cafe2.webp', 'Máquina de espresso'],
  ['cafe5.webp', 'Tazas y utensilios de café'],
  ['cafe4.webp', 'Barra de Casa Tina'],
]

export default function Venue() {
  return (
    <section className="block" id="lugar">
      <div className="wrap">
        <SectionHead title="El lugar" />
        <div className="place-grid">
          <Reveal className="place-info">
            <h3>{EVENTO.lugar}</h3>
            <p>Un café escondido entre hiedra, mesas de madera y buena música. Ahí nos vemos.</p>
            <dl className="facts">
              <div><dt>Fecha</dt><dd>{EVENTO.diaCompleto}</dd></div>
              <div><dt>Hora</dt><dd>{EVENTO.hora}</dd></div>
              <div><dt>Entrada</dt><dd>{EVENTO.precio}</dd></div>
              <div><dt>Dirección</dt><dd>{EVENTO.direccion}</dd></div>
            </dl>
            <div className="nav-btns">
              <a className="btn" href={NAVEGACION.google} target="_blank" rel="noopener">
                <GoogleLogo weight="bold" size={22} /> Abrir en Google Maps
              </a>
              <a className="btn ghost" href={NAVEGACION.waze} target="_blank" rel="noopener">
                <NavigationArrow weight="bold" size={22} /> Abrir en Waze
              </a>
            </div>
          </Reveal>
          <Reveal className="reel-wrap" delay={120}>
            <div className="reel" tabIndex={0} aria-label="Fotos de Casa Tina, desliza para ver más">
              <figure><video src={asset('hiedra.mp4')} poster={asset('hiedra.jpg')} autoPlay muted loop playsInline aria-label="Pared de hiedra en Casa Tina" /></figure>
              {FOTOS.map(([f, alt]) => (
                <figure key={f}><img src={asset(f)} alt={alt} loading="lazy" /></figure>
              ))}
            </div>
            <p className="reel-hint">Desliza para ver más fotos</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
