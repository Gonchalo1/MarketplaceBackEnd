import { Router, Request, Response } from "express";
import registercontroller from "../controllers/register";
import getAllUsersController from "../controllers/getAllUsers";
import mainPageController from "../controllers/mainPage";
import loginController from "../controllers/loginController";
import authMiddleware from "../middleware/authMiddleware";
import deleteUsercontroller from "../controllers/deleteUser";

const router = Router();

router.get("/users", authMiddleware, (req: Request, res: Response) => {
  getAllUsersController(req, res);
});

router.get("/", (req: Request, res: Response) => {
  mainPageController(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  loginController(req,res);
});


router.post("/register", (req: Request, res: Response) => {
  registercontroller(req, res);
});

 router.delete("/deleteuser", (req: Request, res: Response) => {
   deleteUsercontroller(req, res);
 });
export default router;

/** A DESARROLLAR LOS SIGUIENTES ENDPOINTS
  
  
*  Olvidé mi contraseña: /api/users/forgot-password
Permite a los usuarios solicitar un restablecimiento de contraseña.
  
  
  
*  Verificar correo electrónico: /api/users/verify-email
Permite verificar la dirección de correo electrónico del usuario.
  
  
  
* ///// Endpoints de Gestión de Usuarios /////
  
  
*  Obtener información del usuario: /api/users/me
Permite a un usuario autenticado obtener su propia información.
  
  
*  Actualizar información del usuario: /api/users/me
Permite a un usuario autenticado actualizar su información personal (nombre, correo electrónico, contraseña, etc.).





*Eliminar cuenta de usuario: /api/users/me
Permite a un usuario eliminar su cuenta.
 
 
 
*  /////  Endpoints de Gestión de Roles y Permisos  /////

*Obtener roles de usuario: /api/users/me/roles
 Permite obtener los roles asignados a un usuario.

* Asignar/quitar roles: /api/users/{userId}/roles
Permite asignar o quitar roles a un usuario específico.



*Buscar usuarios: /api/users/search
Permite buscar usuarios por nombre, correo electrónico u otros criterios.
 
 */





