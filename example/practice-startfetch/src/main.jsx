import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import startfetch from 'startfetch'

const { WrappingComponent } = startfetch
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WrappingComponent>
      <App />
    </WrappingComponent>
  </StrictMode>,
)
