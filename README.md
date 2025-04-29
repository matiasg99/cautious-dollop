# Gestión de Unicornios y Productos

Una aplicación web simple para gestionar un inventario de unicornios mágicos y productos relacionados.

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:5173` en tu navegador

## ¿Cómo se usa?

- Navega a `/unicornios` para gestionar unicornios:
  - Ver listado de unicornios
  - Crear, editar y eliminar unicornios
- Navega a `/productos` para gestionar productos:
  - Ver listado de productos
  - Agregar nuevos productos

## Vistas principales

- `/unicornios` → Listado de unicornios (con opción de crear, editar y eliminar)
- `/unicornios/crear` → Formulario para crear un unicornio
- `/unicornios/editar/:id` → Formulario para editar un unicornio existente
- `/productos` → Listado de productos (nombre y color)
- `/productos/new` → Formulario para agregar un producto

## Tecnologías Utilizadas

- React.js para la interfaz de usuario
- PrimeReact para componentes de UI (solo unicornios)
- React Router para navegación
- CRUD CRUD API para unicornios
- LocalStorage para productos

## Estructura del Proyecto

- `src/App.jsx` - Componente principal y ruteo global
- `src/unicorns/` - Módulo de unicornios (vistas, formulario, contexto)
- `src/products/` - Módulo de productos (vistas, formulario, datos locales)
- `src/context/UnicornContext.jsx` - Contexto global para unicornios

