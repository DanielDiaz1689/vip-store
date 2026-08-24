import { createContext, useContext, useEffect, useState } from 'react'

/*
  CARRITO DE COMPRAS 🛒 (equivalente al CarritoServicio de Blazor)

  Un "Context" es un estado compartido: cualquier componente de la app
  puede leer el carrito o modificarlo, sin pasar datos de mano en mano.

  Además se guarda en localStorage (memoria del navegador), así el
  carrito sobrevive aunque el cliente cierre la pestaña.
*/

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  // Estado inicial: intenta recuperar el carrito guardado
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('carrito')) ?? []
    } catch {
      return []
    }
  })

  // Cada vez que el carrito cambia, se guarda automáticamente
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items))
  }, [items])

  const agregar = (producto, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        // Si ya está en el carrito, solo suma la cantidad
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
  }

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    )
  }

  const eliminar = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id))

  const vaciar = () => setItems([])

  // Cantidad total de unidades (para la burbuja del menú)
  const totalUnidades = items.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <CarritoContext.Provider
      value={{ items, agregar, cambiarCantidad, eliminar, vaciar, totalUnidades }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

/* Atajo para usar el carrito desde cualquier componente:
   const { items, agregar } = useCarrito() */
export function useCarrito() {
  return useContext(CarritoContext)
}
