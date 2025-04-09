# Gestión de Unicornios

Una aplicación web simple para gestionar un inventario de unicornios mágicos.

## Funcionalidades

- Crear nuevos unicornios con nombre, color, edad y poder
- Ver lista de unicornios existentes
- Editar información de unicornios
- Eliminar unicornios del inventario

## Tecnologías Utilizadas

- React.js para la interfaz de usuario
- PrimeReact para componentes de UI
- React Router para navegación
- CRUD CRUD API para el backend

## Estructura del Proyecto

- `src/App.jsx` - Componente principal con rutas
- `src/unicorns/UnicornsContainer.jsx` - Lógica de negocio y manejo de estado
- `src/unicorns/UnicornsView.jsx` - Componentes de presentación

## Cómo Iniciar

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Iniciar servidor de desarrollo: `npm run dev`
4. Abrir `http://localhost:5173` en el navegador

## API

La aplicación utiliza CRUD CRUD como backend para almacenar los datos de los unicornios. Las operaciones disponibles son:

- GET /unicorns - Obtener todos los unicornios
- POST /unicorns - Crear nuevo unicornio
- PUT /unicorns/:id - Actualizar unicornio existente
- DELETE /unicorns/:id - Eliminar unicornio
