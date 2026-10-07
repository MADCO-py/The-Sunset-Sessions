import { MARCAS, asset } from '../config'
import { SectionHead } from './Shared'

export default function Brands() {
  const items = MARCAS.length
    ? MARCAS.map((m) => (
        <div className="logo-slot has-logo" key={m.nombre}>
          <img src={asset(m.logo)} alt={m.nombre} loading="lazy" />
        </div>
      ))
    : Array.from({ length: 6 }, (_, i) => <div className="logo-slot" key={i}>Logo de marca {i + 1}</div>)

  return (
    <section className="block brands" id="marcas">
      <div className="wrap">
        <SectionHead title="Marcas aliadas">Las marcas que hacen posible cada sesión.</SectionHead>
      </div>
      <div className="marquee-wrap">
        <div className="marquee">
          {items}
          <div className="marquee-copy" aria-hidden="true">{items}</div>
        </div>
      </div>
    </section>
  )
}
