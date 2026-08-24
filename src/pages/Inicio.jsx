import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondo from '../assets/fondo-inicio.png'

/*
  Portada de la tienda — recrea la página Inicio.razor del proyecto
  Blazor original: imagen de fondo a pantalla completa + botón de entrada.
*/
export default function Inicio() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-62px)] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {/* Capa oscura para que el texto resalte sobre la foto */}
      <div className="absolute inset-0 bg-black/55" />

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
        <p className="mx-auto mb-8 max-w-md text-lg text-white/80">
          Los mejores dispositivos, al mejor precio y con envío a toda Colombia.
        </p>
        <Link
          to="/catalogo"
          className="inline-block rounded-xl bg-primario px-8 py-4 font-semibold text-white shadow-lg shadow-primario/40 transition-all hover:-translate-y-0.5 hover:bg-primario-oscuro"
        >
          Explorar la tienda →
        </Link>
      </motion.div>
    </section>
  )
}
