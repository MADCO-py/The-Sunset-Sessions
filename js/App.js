import { html, Fragment } from './lib.js'
import { Sprites } from './components/Shared.js'
import Nav from './components/Nav.js'
import Hero from './components/Hero.js'
import Countdown from './components/Countdown.js'
import About from './components/About.js'
import Artists from './components/Artists.js'
import OpenMic from './components/OpenMic.js'
import Venue from './components/Venue.js'
import Brands from './components/Brands.js'
import HowToBuy from './components/HowToBuy.js'
import BuyForm from './components/BuyForm.js'
import Footer from './components/Footer.js'
import StickyBuy from './components/StickyBuy.js'

// El orden de las secciones en la página
export default function App() {
  return html`
    <${Fragment}>
      <${Sprites} />
      <${Nav} />
      <${Hero} />
      <main>
        <${Countdown} />
        <${About} />
        <${Artists} />
        <${OpenMic} />
        <${Venue} />
        <${Brands} />
        <${HowToBuy} />
        <${BuyForm} />
      </main>
      <${Footer} />
      <${StickyBuy} />
    <//>
  `
}
