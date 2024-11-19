import { Request, Response } from "express";
import checkUser from '../services/userService';
import { User } from '../database/Connection';
import jwt from "jsonwebtoken";

const loginController = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).send('Faltan datos');
    }

    try {
        // checkuser valida el usuario
        await checkUser(email, password, username);

        // Encuentra usuario en la base de datos
        const user = await User.findOne({
            where: {
                email: email,
                username: username
            }
        });

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // valida si la contraseña es correcta
        if (user.password === password) {
            // si pasa todos los checkeos crea el token
            const token = jwt.sign(
                { id: user.id, email: user.email, username: user.username }, 
                process.env.JWT_SECRET as string, // token secreto
                { expiresIn: process.env.JWT_EXPIRES_IN } // expiracion
            );

            // envia una respuesta con el token y el access status
            return res.json({ access: true, token });
        } else {
            return res.status(403).send("Contraseña incorrecta");
        }
    } catch (error) {
        return res.status(403).send((error as Error).message);
    }
};

export default loginController;
