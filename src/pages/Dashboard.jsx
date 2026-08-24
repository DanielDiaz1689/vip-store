import { motion } from 'framer-motion'
import { productos, formatoCOP } from '../data/productos'

/*
  Panel administrativo — recrea Dashboard.razor:
  tarjetas de métricas (ingresos, ventas, clientes, productos)
  + gráfica de ventas mensuales.
  Los números son datos de demostración.
*/

const metricas = [
  { etiqueta: 'Total ingresos', valor: formatoCOP(48750000), icono: '💰', color: 'border-l-primario' },
  { etiqueta: 'Total ventas', valor: '132', icono: '🛍️', color: 'border-l-exito' },
  { etiqueta: 'Total clientes', valor: '87', icono: '👥', color: 'border-l-amber-500' },
  { etiqueta: 'Total productos', valor: String(productos.length), icono: '📦', color: 'border-l-sky-500' },
]

const ventasMensuales = [
  { mes: 'Mar', valor: 4200000 },
  { mes: 'Abr', valor: 6800000 },
  { mes: 'May', valor: 5500000 },
  { mes: 'Jun', valor: 9100000 },
  { mes: 'Jul', valor: 11200000 },
  { mes: 'Ago', valor: 11950000 },
]

const masVendidos = [
  { titulo: 'iPhone 16 Pro 256GB', unidades: 34 },
  { titulo: 'AirPods Pro 2', unidades: 29 },
  { titulo: 'Apple Watch Series 10', unidades: 21 },
]

export default function Dashboard() {
  const maximo = Math.max(...ventasMensuales.map((v) => v.valor))

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Panel administrativo</h1>
          <p className="text-gris">Resumen general de la tienda</p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Vista de demostración
        </span>
      </div>

      {/* Tarjetas de métricas */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metricas.map((metrica, i) => (
          <motion.div
            key={metrica.etiqueta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl border border-borde bg-superficie p-5 shadow-sm border-l-4 ${metrica.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gris">
                  {metrica.etiqueta}
                </p>
                <p className="mt-1 text-2xl font-extrabold">{metrica.valor}</p>
              </div>
              <span className="text-3xl">{metrica.icono}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Gráfica de barras (hecha solo con divs y CSS) */}
        <div className="rounded-2xl border border-borde bg-superficie p-6 shadow-sm">
          <h2 className="mb-6 font-bold">Ventas de los últimos 6 meses</h2>
          <div className="flex h-56 items-end justify-between gap-4">
            {ventasMensuales.map((venta, i) => (
              <div key={venta.mes} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(venta.valor / maximo) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-primario to-indigo-400"
                  title={formatoCOP(venta.valor)}
                />
                <span className="text-xs font-medium text-gris">{venta.mes}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="rounded-2xl border border-borde bg-superficie p-6 shadow-sm">
          <h2 className="mb-5 font-bold">Más vendidos</h2>
          <ol className="space-y-4">
            {masVendidos.map((producto, i) => (
              <li key={producto.titulo} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primario/10 text-sm font-bold text-primario">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{producto.titulo}</p>
                  <p className="text-xs text-gris">{producto.unidades} unidades</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
