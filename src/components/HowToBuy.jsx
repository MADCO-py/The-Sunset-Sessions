import { EVENTO } from '../config'
import { Eye, Reveal, SectionHead } from './Shared'

const S = { fill: 'none', stroke: '#FEFFC6', strokeWidth: 3.4, strokeLinecap: 'round', strokeLinejoin: 'round' }

const PASOS = [
  {
    titulo: 'Llena tus datos',
    texto: 'Nombre, edad, teléfono, correo y cómo te enteraste del evento.',
    dibujo: (<><g {...S}><path d="M22 14 H78 V90 H22 Z" /><path d="M38 8 H62 V20 H38 Z" /><path d="M32 66 H68 M32 76 H58" /><path d="M42 56 q8 6 16 0" /></g><Eye x="42" y="42" /><Eye x="58" y="42" /></>),
  },
  {
    titulo: 'Te llevamos a WhatsApp',
    texto: 'Se abre el chat con tu mensaje ya escrito. Solo lo envías.',
    dibujo: (<><g {...S}><path d="M10 16 H90 V70 H42 L24 88 V70 H10 Z" /><path d="M40 52 q10 8 20 0" /></g><Eye x="40" y="38" /><Eye x="60" y="38" /></>),
  },
  {
    titulo: `Paga ${EVENTO.precio} y listo`,
    texto: 'Te mandamos los datos para pagar y te confirmamos tu entrada por el mismo chat.',
    dibujo: (<><g {...S}><path d="M8 28 H92 V44 q-8 6 0 12 V72 H8 V56 q8 -6 0 -12 Z" /><path d="M66 30 V70" strokeDasharray="4 6" /><path d="M28 58 q8 6 16 0" /></g><Eye x="28" y="46" /><Eye x="44" y="46" /></>),
  },
]

export default function HowToBuy() {
  return (
    <section className="block" id="como">
      <div className="wrap">
        <SectionHead title="Cómo comprar">Sin pasarelas de pago ni cuentas: todo se arregla por WhatsApp.</SectionHead>
        <ol className="steps">
          {PASOS.map((p, i) => (
            <Reveal as="li" className="step" key={i} delay={i * 90}>
              <span className="num" aria-hidden="true">{i + 1}</span>
              <svg className="boil" viewBox="0 0 100 100" aria-hidden="true">{p.dibujo}</svg>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
