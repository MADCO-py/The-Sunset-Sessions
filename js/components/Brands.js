import { html, InstagramLogo } from '../lib.js'
import { MARCAS, TOTAL_MARCAS, asset } from '../config.js'
import { Reveal, SectionHead } from './Shared.js'

const usuario = (url) => '@' + url.replace(/\/+$/, '').split('/').pop()

// Disco de vinilo: el logo va como etiqueta al centro y el disco gira
function Vinilo({ logo }) {
  return html`
    <span className="vinyl" aria-hidden="true">
      <span className="disc">
        ${logo
          ? html`<img className="vinyl-label" src=${asset(logo)} alt="" loading="lazy" />`
          : html`<span className="vinyl-label soon-label">?</span>`}
      </span>
      <span className="vinyl-shine" />
      <span className="vinyl-hole" />
    </span>
  `
}

export default function Brands() {
  const vacias = Math.max(0, TOTAL_MARCAS - MARCAS.length)

  return html`
    <section className="block brands" id="marcas">
      <div className="wrap">
        <${SectionHead} title="Marcas aliadas">Las marcas que hacen posible cada sesión.<//>
        <div className="brand-grid">
          ${MARCAS.map((m, i) => html`
            <${Reveal} as="a" className="ally" key=${m.nombre} delay=${i * 120} style=${{ '--d': `${7 + i * 1.5}s` }} href=${m.instagram} target="_blank" rel="noopener" aria-label=${`${m.nombre} en Instagram`}>
              <${Vinilo} logo=${m.logo} />
              <span className="brand-name">${m.nombre}</span>
              <span className="brand-ig"><${InstagramLogo} weight="bold" />${usuario(m.instagram)}</span>
            <//>
          `)}
          ${Array.from({ length: vacias }, (_, i) => html`
            <${Reveal} className="ally soon" key=${'soon' + i} delay=${(MARCAS.length + i) * 120}>
              <${Vinilo} />
              <span className="brand-name">Próximamente</span>
              <span className="brand-ig">Marca por revelar</span>
            <//>
          `)}
        </div>
      </div>
    </section>
  `
}
