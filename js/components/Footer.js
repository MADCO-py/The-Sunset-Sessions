import { html, InstagramLogo, TiktokLogo, WhatsappLogo } from '../lib.js'
import { EVENTO, REDES, WHATSAPP, asset } from '../config.js'
import { waLink } from './Shared.js'

export default function Footer() {
  return html`
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <img className="foot-logo boil" src=${asset('logo.webp')} alt="" />
            <div className="foot-title">The Sunset Sessions</div>
          </div>
          <div>
            <h4>Síguenos</h4>
            <div className="social">
              <a href=${REDES.instagram} target="_blank" rel="noopener"><${InstagramLogo} weight="bold" />Instagram</a>
              <a href=${REDES.tiktok} target="_blank" rel="noopener"><${TiktokLogo} weight="bold" />TikTok</a>
              <a href=${waLink(WHATSAPP)} target="_blank" rel="noopener"><${WhatsappLogo} weight="bold" />WhatsApp</a>
            </div>
          </div>
          <div>
            <h4>Dónde</h4>
            <p className="addr">${EVENTO.lugar}<small>${EVENTO.direccion}<br />${EVENTO.fecha}, ${EVENTO.hora}</small></p>
          </div>
        </div>
        <div className="copy"><span>© 2026 The Sunset Sessions</span><span>${REDES.usuario}</span></div>
      </div>
    </footer>
  `
}
