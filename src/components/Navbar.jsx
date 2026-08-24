import { Link, NavLink } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

/*
  Menú superior de la tienda.
  <NavLink> sabe si su ruta está activa (isActive) para resaltarla.
  La burbuja del carrito se actualiza sola gracias al Context.
*/
export default function Navbar() {
  const { totalUnidades } = useCarrito()

  const estiloEnlace = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primario/10 text-primario'
        : 'text-gris hover:bg-borde/50 hover:text-tinta'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-borde bg-superficie/85 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="text-lg font-extrabold tracking-tight">
          VIP<span className="text-primario"> STORE</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <NavLink to="/catalogo" className={estiloEnlace}>
            Tienda
          </NavLink>
          <NavLink to="/dashboard" className={estiloEnlace}>
            Panel admin
          </NavLink>

          {/* Carrito con contador */}
          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `relative ml-1 rounded-lg p-2.5 transition-colors ${
                isActive ? 'bg-primario/10 text-primario' : 'text-gris hover:bg-borde/50'
              }`
            }
            aria-label="Carrito de compras"
          >
            🛒
            {totalUnidades > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primario text-[11px] font-bold text-white">
                {totalUnidades}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
