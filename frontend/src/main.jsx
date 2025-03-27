import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/search.jsx'
import { CartProvider } from './context/cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
