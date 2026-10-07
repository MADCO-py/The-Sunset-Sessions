import { Sprites } from './components/Shared'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import About from './components/About'
import Artists from './components/Artists'
import OpenMic from './components/OpenMic'
import Venue from './components/Venue'
import Brands from './components/Brands'
import HowToBuy from './components/HowToBuy'
import BuyForm from './components/BuyForm'
import Footer from './components/Footer'
import StickyBuy from './components/StickyBuy'

export default function App() {
  return (
    <>
      <Sprites />
      <Nav />
      <Hero />
      <main>
        <Countdown />
        <About />
        <Artists />
        <OpenMic />
        <Venue />
        <Brands />
        <HowToBuy />
        <BuyForm />
      </main>
      <Footer />
      <StickyBuy />
    </>
  )
}
