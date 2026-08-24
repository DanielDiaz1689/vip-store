import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Dashboard from './pages/Dashboard'

/*
  Rutas de la tienda (equivalente al @page de cada .razor):
  /            → portada
  /catalogo    → tienda
  /carrito     → carrito y pago
  /dashboard   → panel administrativo (demo)

  React Router cambia de página SIN recargar el navegador.
*/
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer className="border-t border-borde py-6 text-center text-sm text-gris">
        VIP STORE · Proyecto de demostración desarrollado por{' '}
        <a
          href="https://wa.me/573136676011"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primario hover:underline"
        >
          Daniel Díaz
        </a>
      </footer>
    </>
  )
}
