import React from 'react'
import ReactDOM from 'react-dom/client'
import JogoDaMemoria from './pages/JogoDaMemoria'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { JogoDaMemoriaContextProvider } from './pages/JogoDaMemoria/context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <JogoDaMemoriaContextProvider>
      <JogoDaMemoria />
    </JogoDaMemoriaContextProvider>
  </React.StrictMode>,
)
