import { WhatsappLogo } from '@phosphor-icons/react'
import { MSJ_MICROFONO, WHATSAPP } from '../config'
import { Reveal, waLink } from './Shared'

const N = '#170803'
const C = '#FEFFC6'

function MicCartoon() {
  return (
    <svg className="mic-art boil" viewBox="0 0 220 300" aria-hidden="true">
      <defs><clipPath id="mic-head"><circle cx="110" cy="86" r="54" /></clipPath></defs>
      <g className="notes">
        <g><text x="20" y="70" fontSize="40">&#9834;</text></g>
        <g><text x="180" y="50" fontSize="34">&#9835;</text></g>
      </g>
      <path d="M110 186 V262" stroke={N} strokeWidth="10" strokeLinecap="round" />
      <path d="M62 284 Q110 256 158 284 Z" fill={N} stroke={N} strokeWidth="6" strokeLinejoin="round" />
      <path d="M80 134 L140 134 L128 206 Q110 214 92 206 Z" fill={N} />
      <rect x="74" y="128" width="72" height="16" fill={C} stroke={N} strokeWidth="5" />
      <circle cx="110" cy="86" r="54" fill={C} stroke={N} strokeWidth="6" />
      <g clipPath="url(#mic-head)" stroke={N} strokeWidth="2.5" opacity=".35"><path d="M40 52 H180 M40 70 H180 M40 104 H180 M40 122 H180" /></g>
      <ellipse cx="94" cy="80" rx="10" ry="16" fill={C} stroke={N} strokeWidth="4" />
      <ellipse className="pupil" cx="96" cy="84" rx="5" ry="9" fill={N} />
      <ellipse cx="126" cy="80" rx="10" ry="16" fill={C} stroke={N} strokeWidth="4" />
      <ellipse className="pupil" cx="128" cy="84" rx="5" ry="9" fill={N} />
      <path d="M92 108 Q110 128 128 108 Q110 116 92 108 Z" fill={N} stroke={N} strokeWidth="4" strokeLinejoin="round" />
      <path d="M80 160 Q48 150 40 118" fill="none" stroke={N} strokeWidth="7" strokeLinecap="round" />
      <path d="M140 160 Q176 152 184 120" fill="none" stroke={N} strokeWidth="7" strokeLinecap="round" />
      <use href="#glove" x="18" y="92" width="40" height="40" transform="rotate(-20 38 112)" />
      <use href="#glove" x="166" y="94" width="40" height="40" transform="scale(-1 1) translate(-372 0)" />
    </svg>
  )
}

export default function OpenMic() {
  return (
    <section className="block mic" id="microfono">
      <div className="wrap mic-grid">
        <Reveal>
          <h2>Micrófono abierto</h2>
          <p className="say">¿Quieres estar frente a las luces?</p>
          <p className="sub">Escríbenos, muéstranos tu talento y sal al escenario.</p>
          <a className="btn" href={waLink(WHATSAPP, MSJ_MICROFONO)} target="_blank" rel="noopener">
            <WhatsappLogo weight="bold" size={26} /> Quiero robarme el micrófono
          </a>
        </Reveal>
        <MicCartoon />
      </div>
    </section>
  )
}
