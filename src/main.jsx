import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// HelmetProvider is the context that allows any page component to use <Helmet>
// to dynamically update <title> and <meta> tags without a full page reload.
// It must wrap the entire app — only one HelmetProvider per application.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
