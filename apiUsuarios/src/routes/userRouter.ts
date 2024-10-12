import { Router } from 'express';
import { createUser, login, getUser, updateUser, forgotPassword, resetPassword } from '../controllers/userController'; // Importar funciones nombradas
import authMiddleware from '../middleware/autenticateToken';

// Crear una instancia de Router
const router: Router = Router();

// Definir las rutas y asociarlas con los métodos del controlador
router.post('/', createUser); // Registro de usuario
router.post('/auth/login', login); // Autenticar usuario
router.get('/:id', authMiddleware, getUser); // Ruta protegida
router.put('/:id', authMiddleware, updateUser); // Ruta protegida
router.post('/auth/forgot-password', forgotPassword); // Solicitar recuperación de contraseña
router.post('/auth/reset-password', resetPassword); // Restablecer contraseña

// Exportar el enrutador como módulo
export default router;
