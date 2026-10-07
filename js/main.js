import { createRoot, html } from './lib.js'
import App from './App.js'

createRoot(document.getElementById('root')).render(html`<${App} />`)
