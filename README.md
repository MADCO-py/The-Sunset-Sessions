# The Sunset Sessions

Página del evento hecha con React, **sin compilar nada**: no necesita Node, npm ni `npm run build`.
React, htm y los íconos de Phosphor ya vienen incluidos en `vendor/react-bundle.js`.

## Publicar en GitHub Pages

1. Crea un repo y sube **todo el contenido de esta carpeta** a la rama `main`. El `index.html` tiene que quedar en la raíz del repo, no dentro de otra carpeta.
2. En el repo ve a **Settings → Pages**.
3. En **Source** elige **Deploy from a branch**.
4. En **Branch** elige `main` y la carpeta **`/ (root)`**, y dale **Save**.
5. Espera 1 o 2 minutos y abre el link que aparece arriba en esa página.

## Hacer cambios

Abre `js/config.js` en GitHub, toca el lápiz de editar, cambia lo que necesites y dale **Commit changes**. En 1 o 2 minutos la página se actualiza sola.

| Qué | Dónde (en `js/config.js`) |
| --- | --- |
| Número de WhatsApp | `WHATSAPP` (502 + número, sin espacios) |
| Fecha, hora, precio, dirección | `EVENTO` |
| Hora de la cuenta regresiva | `EVENTO.inicio` (formato `2026-11-01T16:00:00-06:00`) |
| Botones de Google Maps y Waze | `COORDENADAS` (opcional, para que lleve justo a la puerta) |
| Mensaje del micrófono abierto | `MSJ_MICROFONO` |
| Pistas de artistas | `ARTISTAS` |
| Opciones de "¿Cómo te enteraste?" | `FUENTES` |
| Logos de marcas | `MARCAS` |
| Instagram y TikTok | `REDES` |

Los textos de cada sección están en `js/components/` y los colores y tamaños en `styles.css`.

### Revelar a un artista

Sube su foto a la carpeta `assets/` y en `ARTISTAS` cambia:

```js
{ pista: 'Fui youtuber de Minecraft por un tiempo.', revelado: true, nombre: 'Nombre del artista', foto: 'artista1.jpg' }
```

### Agregar marcas aliadas

Sube los logos a `assets/` y llena:

```js
export const MARCAS = [
  { nombre: 'Marca uno', logo: 'marca-uno.png' },
]
```

### Fuentes (Chillink y Neue Montreal)

Sube los archivos a la carpeta `fonts/` con estos nombres:

- `Chillink.otf`
- `NeueMontreal-Regular.otf`
- `NeueMontreal-Bold.otf`

Si son `.ttf` o `.woff2`, cambia la extensión en `fonts/fonts.css`. Mientras no estén, la página usa Shrikhand y Schibsted Grotesk.

## Verla en tu compu antes de subirla

Abrir `index.html` con doble clic **no funciona** (los navegadores bloquean los módulos de JavaScript desde archivos locales). Usa cualquiera de estas opciones:

- En VS Code, la extensión **Live Server**: clic derecho en `index.html` → *Open with Live Server*.
- En la terminal, dentro de esta carpeta: `python -m http.server` y abre http://localhost:8000

## Cómo se escribe el código (htm en vez de JSX)

Es React normal, pero en vez de JSX se usa `html` con comillas invertidas, que el navegador entiende directo:

```js
// JSX
<Boton color="naranja" onClick={abrir}>{texto}</Boton>

// htm
html`<${Boton} color="naranja" onClick=${abrir}>${texto}<//>`
```

Las llaves `{ }` se vuelven `${ }`, los componentes se escriben `<${Componente}>` y se cierran con `<//>`.

## Estructura

```
index.html             entrada de la página
styles.css             estilos (mobile first)
js/
  config.js            datos del evento (lo que más se edita)
  App.js               orden de las secciones
  main.js              arranca React
  lib.js               React, htm e íconos
  components/          una sección por archivo
vendor/
  react-bundle.js      React 18 + htm + Phosphor Icons, ya listos (no se edita)
assets/                fotos, videos y mascotas
fonts/                 fuentes de la marca
```

### Usar otro ícono de Phosphor

El paquete incluye: `WhatsappLogo`, `InstagramLogo`, `TiktokLogo`, `GoogleLogo`, `NavigationArrow`, `MapPin`, `Ticket`, `MusicNotes`, `Microphone`, `CalendarBlank`, `Clock`, `EnvelopeSimple`, `Phone`, `ArrowRight` y `X`. Se importan desde `lib.js`:

```js
import { html, MapPin } from '../lib.js'
html`<${MapPin} weight="bold" size=${22} />`
```
