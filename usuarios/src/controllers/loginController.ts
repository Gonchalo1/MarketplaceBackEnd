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
        // Use `checkUser` to validate the user
        await checkUser(email, password, username);

        // Find the user in the database
        const user = await User.findOne({
            where: {
                email: email,
                username: username
            }
        });

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Check if the password is correct
        if (user.password === password) {
            // If user is authenticated, generate a JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, username: user.username }, // payload
                process.env.JWT_SECRET as string, // secret key
                { expiresIn: process.env.JWT_EXPIRES_IN } // expiration
            );

            // Send the token and access status in the response
            return res.json({ access: true, token });
        } else {
            return res.status(403).send("Contraseña incorrecta");
        }
    } catch (error) {
        return res.status(403).send((error as Error).message);
    }
};

export default loginController;
