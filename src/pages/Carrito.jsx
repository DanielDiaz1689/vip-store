import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCarrito } from '../context/CarritoContext'
import { formatoCOP, IVA_PORCENTAJE } from '../data/productos'

/*
  Carrito — recrea Cart.razor: tabla con IVA 19%, subtotales,
  formulario de tarjeta y confirmación de compra.

  ⚠️ El pago es 100% SIMULADO (como en el proyecto Blazor original):
  no se envía ningún dato a ningún lado. En una tienda real se
  integraría una pasarela como Wompi, MercadoPago o Stripe.
*/
export default function Carrito() {
  const { items, cambiarCantidad, eliminar, vaciar } = useCarrito()
  const [tarjeta, setTarjeta] = useState({ titular: '', numero: '', vigencia: '', cvv: '' })
  const [compraExitosa, setCompraExitosa] = useState(false)

  const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0)
  const iva = subtotal * (IVA_PORCENTAJE / 100)
  const total = subtotal + iva

  const cambiar = (e) => setTarjeta({ ...tarjeta, [e.target.name]: e.target.value })

  const procesarPago = (e) => {
    e.preventDefault()
    setCompraExitosa(true) // simulación: siempre aprueba
    vaciar()
  }

  /* ---- Pantalla de compra exitosa ---- */
  if (compraExitosa) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-exito/10 text-5xl"
        >
          ✅
        </motion.div>
        <h1 className="mb-3 text-3xl font-extrabold">¡Compra exitosa!</h1>
        <p className="mb-8 text-gris">
          Tu pedido fue procesado correctamente. Recibirás un correo con los
          detalles del envío. <i>(Demostración: no se realizó ningún cobro)</i>
        </p>
        <Link
          to="/catalogo"
          className="inline-block rounded-xl bg-primario px-6 py-3 font-semibold text-white transition-colors hover:bg-primario-oscuro"
        >
          Seguir comprando
        </Link>
      </section>
    )
  }

  /* ---- Carrito vacío ---- */
  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="mb-4 text-6xl">🛒</p>
        <h1 className="mb-3 text-2xl font-extrabold">Tu carrito está vacío</h1>
        <p className="mb-8 text-gris">Agrega productos desde la tienda para verlos aquí.</p>
        <Link
          to="/catalogo"
          className="inline-block rounded-xl bg-primario px-6 py-3 font-semibold text-white transition-colors hover:bg-primario-oscuro"
        >
          Ir a la tienda
        </Link>
      </section>
    )
  }

  /* ---- Carrito con productos ---- */
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-extrabold">Carrito de compras</h1>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Tabla de productos */}
        <div>
         
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-borde bg-superficie">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-borde text-left text-xs uppercase tracking-wider text-gris">
                  <th className="p-4">Producto</th>
                  <th className="p-4">Cantidad</th>
                  <th className="p-4">Precio unit.</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-borde/60 last:border-0">
                    <td className="flex items-center gap-3 p-4">
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="h-12 w-12 rounded-lg border border-borde bg-white object-contain p-1"
                      />
                      <span className="font-semibold">{item.titulo}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex w-fit items-center rounded-lg border border-borde">
                        <button
                          onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                          className="px-2.5 py-1 text-gris hover:text-primario"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-semibold">{item.cantidad}</span>
                        <button
                          onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                          className="px-2.5 py-1 text-gris hover:text-primario"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4">{formatoCOP(item.precio)}</td>
                    <td className="p-4 font-semibold">{formatoCOP(item.precio * item.cantidad)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => eliminar(item.id)}
                        className="text-gris transition-colors hover:text-red-500"
                        aria-label={`Eliminar ${item.titulo}`}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={vaciar}
            className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Resumen + pago */}
        <div className="h-fit rounded-2xl border border-borde bg-superficie p-6">
          <h2 className="mb-4 text-lg font-bold">Resumen del pedido</h2>

          <dl className="mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gris">Subtotal</dt>
              <dd className="font-medium">{formatoCOP(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gris">IVA ({IVA_PORCENTAJE}%)</dt>
              <dd className="font-medium">{formatoCOP(iva)}</dd>
            </div>
            <div className="flex justify-between border-t border-borde pt-3 text-base">
              <dt className="font-bold">Total a pagar</dt>
              <dd className="font-extrabold text-primario">{formatoCOP(total)}</dd>
            </div>
          </dl>

          <h3 className="mb-3 font-bold">💳 Datos de la tarjeta</h3>
          <form onSubmit={procesarPago} className="space-y-3">
            <input
              required
              name="titular"
              value={tarjeta.titular}
              onChange={cambiar}
              placeholder="Nombre del titular"
              className="w-full rounded-xl border border-borde px-4 py-2.5 text-sm outline-none focus:border-primario"
            />
            <input
              required
              name="numero"
              value={tarjeta.numero}
              onChange={cambiar}
              placeholder="Número de tarjeta"
              maxLength={19}
              inputMode="numeric"
              className="w-full rounded-xl border border-borde px-4 py-2.5 text-sm outline-none focus:border-primario"
            />
            <div className="flex gap-3">
              <input
                required
                name="vigencia"
                value={tarjeta.vigencia}
                onChange={cambiar}
                placeholder="MM/AA"
                maxLength={5}
                className="w-1/2 rounded-xl border border-borde px-4 py-2.5 text-sm outline-none focus:border-primario"
              />
              <input
                required
                name="cvv"
                value={tarjeta.cvv}
                onChange={cambiar}
                placeholder="CVV"
                maxLength={4}
                inputMode="numeric"
                type="password"
                className="w-1/2 rounded-xl border border-borde px-4 py-2.5 text-sm outline-none focus:border-primario"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primario py-3 font-semibold text-white transition-colors hover:bg-primario-oscuro"
            >
              Pagar {formatoCOP(total)}
            </button>
            <p className="text-center text-xs text-gris">
              🔒 Pago de demostración — no se procesa ningún cobro real.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
