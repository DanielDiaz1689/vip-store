import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/*
  Portada de la tienda — fondo sobrio: degradado oscuro,
  dos brillos difuminados y una cuadrícula sutil.
  Todo hecho con CSS (sin imágenes = carga instantánea).
*/
export default function Inicio() {
  return (
    <section className="relative flex min-h-[calc(100vh-62px)] items-center justify-center overflow-hidden bg-[#0b1020]">
      {/* Brillos difuminados */}
      <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]" />

      {/* Cuadrícula sutil de fondo */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 px-6 text-center text-white"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
          Tecnología premium
        </p>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl">
          VIP <span className="text-indigo-400">STORE</span>
        </h1>
        <p className="mx-auto mb-8 max-w-md text-lg text-white/70">
          Los mejores dispositivos, al mejor precio y con envío a toda Colombia.
        </p>
        <Link
          to="/catalogo"
          className="inline-block rounded-xl bg-primario px-8 py-4 font-semibold text-white shadow-lg shadow-primario/40 transition-all hover:-translate-y-0.5 hover:bg-primario-oscuro"
        >
          Explorar la tienda →
        </Link>

        {/* Sellos de confianza */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-widest text-white/40">
          <span>🚚 Envío nacional</span>
          <span>🛡️ Garantía 30 días</span>
          <span>💳 Pago seguro</span>
        </div>
      </motion.div>
    </section>
  )
}
