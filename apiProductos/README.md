## 1. Servicio de Catálogo de Productos

Este servicio maneja la gestión de productos, categorías y etiquetas.

### Endpoints:

- `POST /products` - Crear un nuevo producto
- `GET /products` - Obtener lista de productos (con filtros opcionales)
- `GET /products/{id}` - Obtener detalles de un producto específico
- `PUT /products/{id}` - Actualizar un producto existente
- `DELETE /products/{id}` - Eliminar un producto
- `GET /categories` - Obtener lista de categorías
- `POST /categories` - Crear una nueva categoría
- `PUT /categories/{id}` - Actualizar una categoría
- `DELETE /categories/{id}` - Eliminar una categoría
- `GET /tags` - Obtener lista de etiquetas
- `POST /tags` - Crear una nueva etiqueta
- `DELETE /tags/{id}` - Eliminar una etiqueta

### Atributos principales:

- Producto: `id`, `nombre`, `descripción`, `precio`, `categoría_id`, `tags[]`, `stock`, `imagen_url`
- Categoría: `id`, `nombre`, `descripción`
- Etiqueta: `id`, `nombre`