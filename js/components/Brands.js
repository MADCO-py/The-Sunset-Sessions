import { html } from '../lib.js'
import { MARCAS, asset } from '../config.js'
import { SectionHead } from './Shared.js'

export default function Brands() {
  const lista = (copia) => MARCAS.length
    ? MARCAS.map((m) => html`
        <div className="logo-slot has-logo" key=${copia + m.nombre}>
          <img src=${asset(m.logo)} alt=${copia ? '' : m.nombre} loading="lazy" />
        </div>
      `)
    : Array.from({ length: 6 }, (_, i) => html`<div className="logo-slot" key=${copia + i}>Logo de marca ${i + 1}</div>`)

  // La lista va dos veces para que la cinta se mueva sin cortes
  return html`
    <section className="block brands" id="marcas">
      <div className="wrap">
        <${SectionHead} title="Marcas aliadas">Las marcas que hacen posible cada sesión.<//>
      </div>
      <div className="marquee-wrap">
        <div className="marquee">
          ${lista('')}
          <div className="marquee-copy" aria-hidden="true">${lista('copia-')}</div>
        </div>
      </div>
    </section>
  `
}
