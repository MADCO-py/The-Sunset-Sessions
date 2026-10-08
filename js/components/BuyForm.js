import { html, useState, WhatsappLogo } from '../lib.js'
import { EVENTO, FUENTES, WHATSAPP, asset } from '../config.js'
import { Reveal, SectionHead, waLink } from './Shared.js'

const VACIO = { nombre: '', edad: '', telefono: '', correo: '', fuente: '', otro: '' }

const REGLAS = {
  nombre: (d) => d.nombre.trim().length >= 3,
  edad: (d) => +d.edad >= 1 && +d.edad <= 99,
  telefono: (d) => d.telefono.replace(/\D/g, '').length === 8,
  correo: (d) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.correo.trim()),
  fuente: (d) => !!d.fuente,
}

const ERRORES = {
  nombre: 'Escribe tu nombre.',
  edad: 'Escribe una edad válida.',
  telefono: 'Revisa tu número: deben ser 8 dígitos.',
  correo: 'Revisa tu correo, parece incompleto.',
  fuente: 'Elige una opción.',
}

const fuenteTexto = (d) =>
  d.fuente === 'Otro' && d.otro.trim() ? `Otro: ${d.otro.trim()}` : d.fuente

const formatoTel = (v) => {
  const n = v.replace(/\D/g, '').slice(0, 8)
  return n.length > 4 ? `${n.slice(0, 4)} ${n.slice(4)}` : n
}

// Lo que se envía por WhatsApp (los * ponen negrita en WhatsApp)
function mensaje(d) {
  return [
    `Hola, quiero comprar mi entrada para ☀️The Sunset Sessions☀️ (${EVENTO.fecha}, ${EVENTO.lugar}).`,
    '',
    `*Nombre:* ${d.nombre.trim()}`,
    `*Edad:* ${d.edad}`,
    `*Teléfono:* ${d.telefono}`,
    `*Correo:* ${d.correo.trim()}`,
    `*Me enteré por:* ${fuenteTexto(d)}`,
    '',
    `*${EVENTO.tipoEntrada}:* ${EVENTO.precio}`,
  ].join('\n')
}

const V = (v) => (v ? html`<mark>${v}</mark>` : html`<span className="empty">...</span>`)

function Preview({ d }) {
  return html`
    <div className="bubble">
      Hola, quiero comprar mi entrada para The Sunset Sessions (${EVENTO.fecha}, ${EVENTO.lugar}).${'\n\n'}Nombre: ${V(d.nombre.trim())}${'\n'}Edad: ${V(d.edad)}${'\n'}Teléfono: ${V(d.telefono)}${'\n'}Correo: ${V(d.correo.trim())}${'\n'}Me enteré por: ${V(fuenteTexto(d))}${'\n\n'}${EVENTO.tipoEntrada}: ${EVENTO.precio}
    </div>
  `
}

export default function BuyForm() {
  const [d, setD] = useState(VACIO)
  const [bad, setBad] = useState({})
  const [toast, setToast] = useState(false)

  const set = (k) => (e) => {
    let v = e.target.value
    if (k === 'edad') v = v.replace(/\D/g, '').slice(0, 2)
    if (k === 'telefono') v = formatoTel(v)
    setD((p) => ({ ...p, [k]: v }))
    setBad((p) => ({ ...p, [k]: false }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    for (const k in REGLAS) if (!REGLAS[k](d)) errs[k] = true
    setBad(errs)
    const first = Object.keys(REGLAS).find((k) => errs[k])
    if (first) {
      const el = document.querySelector(`[data-f="${first}"] input`)
      el?.focus({ preventScroll: true })
      el?.closest('.field')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setToast(true)
    setTimeout(() => setToast(false), 2600)
    window.open(waLink(WHATSAPP, mensaje(d)), '_blank', 'noopener')
  }

  // Se llama como función (no como componente) para que el input no pierda el foco
  const field = (k, label, full, children) => html`
    <div className=${`field ${full ? 'full' : ''} ${bad[k] ? 'bad' : ''}`} data-f=${k}>
      ${label && html`<label htmlFor=${k}>${label}</label>`}
      ${children}
      ${bad[k] && html`<span className="err" role="alert">${ERRORES[k]}</span>`}
    </div>
  `

  return html`
    <section className="block buy" id="comprar">
      <div className="wrap">
        <${SectionHead} title="Compra aquí">Llena el formulario y te mandamos directo a WhatsApp con tu mensaje listo.<//>
        <div className="buy-grid">
          <form onSubmit=${submit} noValidate>
            ${field('nombre', 'Nombre completo', true, html`
              <input id="nombre" value=${d.nombre} onChange=${set('nombre')} autoComplete="name" placeholder="Tu nombre y apellido" />
            `)}
            ${field('edad', 'Edad', false, html`
              <input id="edad" value=${d.edad} onChange=${set('edad')} inputMode="numeric" placeholder="Ej. 22" />
            `)}
            ${field('telefono', 'Número de teléfono', false, html`
              <input id="telefono" value=${d.telefono} onChange=${set('telefono')} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Ej. 5555 1234" />
            `)}
            ${field('correo', 'Correo electrónico', true, html`
              <input id="correo" value=${d.correo} onChange=${set('correo')} type="email" inputMode="email" autoComplete="email" autoCapitalize="none" placeholder="tucorreo@gmail.com" />
            `)}
            ${field('fuente', null, true, html`
              <span className="legend" id="fuenteLbl">¿Cómo te enteraste del evento?</span>
              <div className="chips" role="radiogroup" aria-labelledby="fuenteLbl">
                ${FUENTES.map((f) => html`
                  <label className="chip" key=${f}>
                    <input type="radio" name="fuente" value=${f} checked=${d.fuente === f} onChange=${set('fuente')} />
                    <span>${f}</span>
                  </label>
                `)}
              </div>
              ${d.fuente === 'Otro' && html`
                <input className="otro" value=${d.otro} onChange=${set('otro')} placeholder="Cuéntanos dónde" aria-label="¿Dónde te enteraste?" />
              `}
            `)}
            <div className="form-foot">
              <button className="btn" type="submit"><${WhatsappLogo} weight="bold" size=${24} /> Comprar por WhatsApp</button>
              <small>Se abrirá WhatsApp con tu mensaje escrito. Nada se cobra en esta página.</small>
            </div>
          </form>

          <${Reveal} as="aside" className="preview" aria-live="polite">
            <div className="ticket">
              <span>${EVENTO.tipoEntrada}<small>${EVENTO.fecha}, ${EVENTO.hora.split(' a ')[0]} p. m.</small></span>
              <b>${EVENTO.precio}</b>
            </div>
            <div className="phone">
              <div className="phone-top">
                <img src=${asset('sun_kiss.webp')} alt="" />
                <div><b>The Sunset Sessions</b><small>+502 ${WHATSAPP.slice(3, 7)} ${WHATSAPP.slice(7)}</small></div>
              </div>
              <div className="chat"><${Preview} d=${d} /></div>
            </div>
            <p>Así se verá tu mensaje. Si algo está mal, corrígelo antes de enviar.</p>
          <//>
        </div>
      </div>
      <div className=${`toast ${toast ? 'show' : ''}`} role="status">Abriendo WhatsApp con tu mensaje</div>
    </section>
  `
}
