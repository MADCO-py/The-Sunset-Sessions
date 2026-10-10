import { html, useEffect, useRef, useState } from '../lib.js'

// Filtro "line boil" (las líneas tiemblan como animación hecha a mano),
// ojo de caricatura y guante blanco. Se monta una sola vez en App.
export function Sprites() {
  return html`
    <svg width="0" height="0" style=${{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="boil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1" result="n">
            <animate attributeName="seed" values="1;4;7;10" dur="0.48s" calcMode="discrete" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" />
        </filter>
        <g id="eye">
          <ellipse cx="0" cy="0" rx="5" ry="8" fill="#FEFFC6" />
          <ellipse cx="1" cy="2" rx="2.6" ry="4.4" fill="#170803" />
          <path d="M1 2 L4.5 -1.5 L4.5 3 Z" fill="#FEFFC6" />
        </g>
        <symbol id="glove" viewBox="0 0 40 40">
          <g fill="#FEFFC6" stroke="#170803" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
            <path d="M4 16 h6 v12 h-6 z" />
            <path d="M10 15 c4 -1 6 -3 8 -7 c1 -2 4 -1 3 2 l-1 4 h12 c3 0 3 4 0 4 h-3 c3 0 3 4 0 4 h-2 c2 0 2 4 -1 4 h-2 c2 0 2 4 -1 4 h-10 c-2 0 -3 -1 -3 -2 z" />
            <path d="M13 17 l-1 6 M16 17 l-1 6" fill="none" />
          </g>
        </symbol>
        <symbol id="ice" viewBox="0 0 40 40">
          <g stroke="#170803" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
            <path d="M20 4 L35 11 L35 28 L20 36 L5 28 L5 11 Z" fill="#FEFFC6" />
            <path d="M5 20 L20 27 L35 20 L35 28 L20 36 L5 28 Z" fill="#4F1E0C" />
            <path d="M5 11 L20 18 L35 11 M20 18 V36" fill="none" />
            <path d="M10 14 L10 17 M14 9 L18 7" fill="none" stroke="#DA6220" />
          </g>
        </symbol>
      </defs>
    </svg>
  `
}

export const Glove = ({ className = 'glove' }) =>
  html`<svg className=${className} aria-hidden="true"><use href="#glove" /></svg>`

// Cubo de hielo con café frío, para la fase Cold Brew
export const Ice = ({ className = 'ice' }) =>
  html`<svg className=${className} aria-hidden="true"><use href="#ice" /></svg>`

export const Eye = (props) => html`<use href="#eye" ...${props} />`

export function useInView(options = { threshold: 0.12 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

// Aparece con rebote al entrar en pantalla
export function Reveal({ as = 'div', className = '', delay = 0, style, children, ...rest }) {
  const [ref, inView] = useInView()
  return html`
    <${as}
      ref=${ref}
      className=${`reveal ${inView ? 'in' : ''} ${className}`}
      style=${{ transitionDelay: `${delay}ms`, ...style }}
      ...${rest}
    >${children}<//>
  `
}

export function SectionHead({ title, children }) {
  return html`
    <${Reveal} className="sec-head">
      <h2>${title}</h2>
      ${children && html`<p>${children}</p>`}
    <//>
  `
}

export const waLink = (numero, texto) =>
  `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`
