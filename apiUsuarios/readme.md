## 3. Servicio de Gestión de Usuarios

Este servicio maneja el registro, autenticación y gestión de perfiles de usuario.

### Endpoints:

- `POST /users` - Registrar un nuevo usuario
- `POST /auth/login` - Autenticar usuario
- `GET /users/{id}` - Obtener perfil de usuario
- `PUT /users/{id}` - Actualizar perfil de usuario
- `POST /auth/forgot-password` - Solicitar recuperación de contraseña
- `POST /auth/reset-password` - Restablecer contraseña

### Atributos principales:

- Usuario: `id`, `nombre`, `email`, `contraseña_hash`, `dirección`, `teléfono`, `fecha_registro`