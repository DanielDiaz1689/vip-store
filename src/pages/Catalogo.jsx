import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { productos, categorias } from '../data/productos'
import ProductCard from '../components/ProductCard'

/*
  Catálogo — recrea Catalogo.razor:
  grid de productos + filtro por categoría + buscador,
  y una notificación (toast) al agregar al carrito,
  como el SweetAlert del proyecto original.
*/
export default function Catalogo() {
  const [categoria, setCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [toast, setToast] = useState(null) // producto recién agregado

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = categoria === 'Todos' || p.categoria === categoria
    const coincideBusqueda = p.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  const mostrarToast = (producto) => {
    setToast(producto)
    setTimeout(() => setToast(null), 2200) // se oculta solo
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-1 text-3xl font-extrabold">Catálogo de productos</h1>
      <p className="mb-8 text-gris">
        {productosFiltrados.length} producto(s) disponible(s)
      </p>

      {/* Barra de filtros: categorías + buscador */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              categoria === cat
                ? 'border-primario bg-primario text-white'
                : 'border-borde bg-superficie text-gris hover:border-primario/50 hover:text-tinta'
            }`}
          >
            {cat}
          </button>
        ))}

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar producto..."
          className="ml-auto w-full rounded-xl border border-borde bg-superficie px-4 py-2 text-sm outline-none transition-colors focus:border-primario sm:w-60"
        />
      </div>

      {/* Grid de productos */}
      {productosFiltrados.length === 0 ? (
        <p className="py-16 text-center text-gris">
          No se encontraron productos con esos filtros.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                alAgregar={mostrarToast}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Notificación flotante al agregar */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-tinta px-5 py-3 text-sm font-medium text-white shadow-2xl"
          >
            ✅ <b>{toast.titulo}</b> agregado al carrito
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
