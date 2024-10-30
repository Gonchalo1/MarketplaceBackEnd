import { Request, Response } from "express";
import checkUser from '../services/userService';
import { User } from '../database/Connection';

const loginController = async (req: Request, res: Response) => {
    const { email, username, password } = req.query;

    if (!email || !username || !password) {
        return res.status(400).send('Faltan datos');
    }

    try {
        // Usamos `checkUser` para validar el usuario
        await checkUser(email as string, password as string);

        const user = await User.findOne({
            where: {
                email: email as string,
                username: username as string
            }
        });

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        return user.password === password
            ? res.json({ access: true })
            : res.status(403).send("Contraseña incorrecta");

    } catch (error) {
        return res.status(403).send((error as Error).message);
    }
};

export default loginController;
