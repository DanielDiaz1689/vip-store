/*
  Catálogo de VIP STORE (datos de demostración).
  Las imágenes son las mismas del proyecto Blazor original.
  En una tienda real estos datos vendrían de una base de datos.
*/
import iphone13 from '../assets/productos/iphone-13.jpg'
import iphone16pro from '../assets/productos/iphone-16-pro.png'
import iphone16proMax from '../assets/productos/iphone-16-pro-max.png'
import appleWatch10 from '../assets/productos/apple-watch-10.jpg'
import visionPro from '../assets/productos/vision-pro.png'
import airpodsPro from '../assets/productos/airpods-pro.jpg'
import airpodsMax from '../assets/productos/airpods-max.jpg'

export const IVA_PORCENTAJE = 19 // IVA Colombia

export const categorias = ['Todos', 'Smartphones', 'Audio', 'Wearables', 'Realidad mixta']

export const productos = [
  {
    id: 1,
    titulo: 'iPhone 13 128GB',
    descripcion: 'Pantalla Super Retina XDR de 6.1", chip A15 Bionic y cámara dual de 12 MP. El equilibrio perfecto entre precio y potencia.',
    precio: 2399900,
    categoria: 'Smartphones',
    imagen: iphone13,
  },
  {
    id: 2,
    titulo: 'iPhone 16 Pro 256GB',
    descripcion: 'Titanio, chip A18 Pro y sistema de cámaras profesional con zoom óptico 5x. Fotografía de otro nivel.',
    precio: 5299900,
    categoria: 'Smartphones',
    imagen: iphone16pro,
  },
  {
    id: 3,
    titulo: 'iPhone 16 Pro Max 512GB',
    descripcion: 'La pantalla más grande y la mejor batería en un iPhone. Acabado titanio desierto.',
    precio: 6799900,
    categoria: 'Smartphones',
    imagen: iphone16proMax,
  },
  {
    id: 4,
    titulo: 'Apple Watch Series 10',
    descripcion: 'Pantalla más grande, carga rápida y sensores avanzados de salud. Tu entrenador personal en la muñeca.',
    precio: 2149900,
    categoria: 'Wearables',
    imagen: appleWatch10,
  },
  {
    id: 5,
    titulo: 'AirPods Pro 2',
    descripcion: 'Cancelación activa de ruido de nueva generación y audio adaptativo. Sonido inmersivo todo el día.',
    precio: 1099900,
    categoria: 'Audio',
    imagen: airpodsPro,
  },
  {
    id: 6,
    titulo: 'AirPods Max',
    descripcion: 'Audífonos over-ear con audio de alta fidelidad, cancelación de ruido y diseño premium en aluminio.',
    precio: 2549900,
    categoria: 'Audio',
    imagen: airpodsMax,
  },
  {
    id: 7,
    titulo: 'Apple Vision Pro',
    descripcion: 'Computación espacial: apps, cine y trabajo en un lienzo infinito. El futuro, hoy.',
    precio: 17999900,
    categoria: 'Realidad mixta',
    imagen: visionPro,
  },
]

/* Formatea números como pesos colombianos: 2399900 → $ 2.399.900 */
export function formatoCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor)
}
