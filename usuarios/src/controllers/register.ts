import { Request, Response } from "express";
import { User } from "../database/Connection";

const registercontroller = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;


        if (!username) {
            return res.status(400).send('Missing username'); // Or a more informative message
          }

        // Verificación de los campos requeridos
        if (!email || !password) {
            return res.status(400).send('Faltan datos');
        }

        // Usamos el modelo `User` para `findOrCreate`
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { username, password },
        });

        return res.json({ user, created });
    } catch (error) {
        return res.status(500).json((error as Error).message);
    }
};

export default registercontroller;