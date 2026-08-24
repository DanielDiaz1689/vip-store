# VIP STORE — Tienda de tecnología (demo)

Recreación moderna del proyecto ecommerce que Daniel Díaz construyó originalmente en **Blazor + MudBlazor + SQL Server**, ahora con **React + Vite + Tailwind + React Router + Framer Motion**. Proyecto de demostración para el portafolio.

## Funcionalidades

- 🏠 Portada a pantalla completa
- 🛍️ Catálogo con filtros por categoría y buscador
- 🛒 Carrito persistente (`localStorage`) con IVA 19%
- 💳 Pago con tarjeta **simulado** (no procesa cobros reales)
- 📊 Panel administrativo demo: métricas y gráfica de ventas

## Comandos

```bash
npm install      # primera vez
npm run dev      # → http://localhost:5174
npm run build    # versión de producción
```

## ¿Dónde edito cada cosa?

| Quiero cambiar... | Archivo |
|---|---|
| Productos, precios, categorías | `src/data/productos.js` |
| Colores del tema | `src/index.css` (bloque `@theme`) |
| Lógica del carrito | `src/context/CarritoContext.jsx` |
| Una página | `src/pages/<Página>.jsx` |
| Las rutas | `src/App.jsx` |
