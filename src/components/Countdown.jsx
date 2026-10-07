import { useEffect, useState } from 'react'
import { EVENTO } from '../config'

const INICIO = new Date(EVENTO.inicio).getTime()

function restante() {
  const t = Math.max(0, Math.floor((INICIO - Date.now()) / 1000))
  return {
    total: t,
    d: Math.floor(t / 86400),
    h: Math.floor((t % 86400) / 3600),
    m: Math.floor((t % 3600) / 60),
    s: t % 60,
  }
}

const UNIDADES = [['d', 'días'], ['h', 'horas'], ['m', 'minutos'], ['s', 'segundos']]

export default function Countdown() {
  const [r, setR] = useState(restante)

  useEffect(() => {
    const id = setInterval(() => setR(restante()), 1000)
    return () => clearInterval(id)
  }, [])

  const done = r.total === 0

  return (
    <section className={`countdown ${done ? 'done' : ''}`} id="cuenta" aria-label="Cuenta regresiva">
      <div className="wrap cd-inner">
        <p className="cd-label">Faltan para el atardecer</p>
        {done ? (
          <p className="cd-done">Ya empezó. Te esperamos en Casa Tina.</p>
        ) : (
          <div className="cd" role="timer">
            {UNIDADES.map(([k, label]) => {
              const v = String(r[k]).padStart(2, '0')
              return (
                <div className="u" key={k}>
                  {/* la key cambia con el número y así se repite el rebote */}
                  <b key={v} className="tick">{v}</b>
                  <span>{label}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
