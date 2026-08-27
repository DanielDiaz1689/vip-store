import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatoCOP } from '../data/productos'
import { useCarrito } from '../context/CarritoContext'

/*
  Tarjeta de producto — recrea la card del Catalogo.razor original:
  imagen, título, descripción, precio, selector de cantidad y
  botón "Agregar al carrito".
*/
export default function ProductCard({ producto, alAgregar }) {
  const { agregar } = useCarrito()
  const [cantidad, setCantidad] = useState(1)

  const manejarAgregar = () => {
    agregar(producto, cantidad)
    setCantidad(1)
    alAgregar?.(producto) // avisa a la página para mostrar la notificación
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-borde bg-superficie shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* Imagen con zoom suave al pasar el mouse */}
     {/* La imagen rellena TODO el espacio, se recorta lo que sobra */}
<div className="h-52 overflow-hidden">
  <img
    src={producto.imagen}
    alt={producto.titulo}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
</div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1.5 w-fit rounded-full bg-primario/10 px-2.5 py-0.5 text-[11px] font-semibold text-primario">
          {producto.categoria}
        </span>
        <h3 className="mb-1 font-bold">{producto.titulo}</h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-gris">
          {producto.descripcion}
        </p>

        <p className="mb-4 text-xl font-extrabold text-tinta">
          {formatoCOP(producto.precio)}
        </p>

        <div className="flex items-center gap-3">
          {/* Selector de cantidad − / + */}
          <div className="flex items-center rounded-xl border border-borde">
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              className="px-3 py-2 text-gris transition-colors hover:text-primario"
              aria-label="Menos"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-semibold">{cantidad}</span>
            <button
              onClick={() => setCantidad(cantidad + 1)}
              className="px-3 py-2 text-gris transition-colors hover:text-primario"
              aria-label="Más"
            >
              +
            </button>
          </div>

          <button
            onClick={manejarAgregar}
            className="flex-1 rounded-xl bg-primario py-2.5 text-sm font-semibold text-white transition-all hover:bg-primario-oscuro active:scale-95"
          >
            Agregar 🛒
          </button>
        </div>
      </div>
    </motion.article>
  )
}
