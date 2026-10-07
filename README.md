# The Sunset Sessions

Página del evento hecha con React + Vite. Solo frontend; se publica en GitHub Pages.

## Correrla en tu compu

```bash
npm install
npm run dev
```

Abre la dirección que te muestra la terminal (normalmente http://localhost:5173). Para probarla en tu celular, corre `npm run dev -- --host` y abre la IP que aparece en la terminal estando en el mismo WiFi.

## Publicar en GitHub Pages

La página ya compilada está en la carpeta **`docs/`**. GitHub Pages publica esa carpeta directo.

1. Sube todo el proyecto a un repo en GitHub, en la rama `main`. Asegúrate de que la carpeta `docs/` quede en el repo.
2. En el repo ve a **Settings → Pages**.
3. En **Source** elige **Deploy from a branch**.
4. En **Branch** elige `main` y la carpeta **`/docs`**, y dale **Save**.
5. Espera 1 o 2 minutos y abre el link que aparece arriba en esa misma página.

### Cada vez que cambies algo

```bash
npm run build
```

Eso vuelve a generar `docs/`. Después sube los cambios (commit y push) y GitHub Pages se actualiza solo.

### Si sale la pantalla en blanco

Casi siempre es porque Pages está publicando la raíz del repo en vez de `/docs`. Revisa el paso 4.

## Qué cambiar y dónde

Casi todo está en **`src/config.js`**:

| Qué | Dónde |
| --- | --- |
| Número de WhatsApp | `WHATSAPP` (502 + número, sin espacios) |
| Fecha, hora, precio, dirección | `EVENTO` |
| Botones de Google Maps y Waze | `COORDENADAS` (opcional, para que lleve justo a la puerta) |
| Hora de la cuenta regresiva | `EVENTO.inicio` (formato `2026-11-01T16:00:00-06:00`) |
| Mensaje del micrófono abierto | `MSJ_MICROFONO` |
| Pistas de artistas | `ARTISTAS` |
| Opciones de "¿Cómo te enteraste?" | `FUENTES` |
| Logos de marcas | `MARCAS` |
| Instagram y TikTok | `REDES` |

### Revelar a un artista

Sube su foto a `public/assets/` y en `ARTISTAS` cambia:

```js
{ pista: 'Fui youtuber de Minecraft por un tiempo.', revelado: true, nombre: 'Nombre del artista', foto: 'artista1.jpg' }
```

### Agregar marcas aliadas

Sube los logos a `public/assets/` y llena:

```js
export const MARCAS = [
  { nombre: 'Marca uno', logo: 'marca-uno.png' },
]
```

### Fuentes (Chillink y Neue Montreal)

Copia los archivos a `public/fonts/` con estos nombres:

- `Chillink.otf`
- `NeueMontreal-Regular.otf`
- `NeueMontreal-Bold.otf`

Si son `.ttf` o `.woff2`, cambia la extensión en `public/fonts/fonts.css`. Mientras no estén, la página usa Shrikhand y Schibsted Grotesk.

## Estructura

```
src/
  config.js          datos del evento (lo que más se edita)
  styles.css         estilos, mobile first
  App.jsx            orden de las secciones
  components/
    Nav.jsx          barra de arriba y menú de celular
    Hero.jsx         inicio con el atardecer
    Countdown.jsx    cuenta regresiva
    About.jsx        quiénes somos
    Artists.jsx      artistas misteriosos
    OpenMic.jsx      micrófono abierto
    Venue.jsx        el lugar
    Brands.jsx       marcas aliadas
    HowToBuy.jsx     cómo comprar
    BuyForm.jsx      formulario de compra por WhatsApp
    Footer.jsx       redes con Phosphor Icons
    StickyBuy.jsx    barra fija de compra en celular
    Shared.jsx       filtro de caricatura, guante, animación de aparición
public/
  assets/            fotos, videos y mascotas
  fonts/             fuentes de la marca
```
