import { Request, Response } from "express";
import { User } from "../database/Connection";

const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Validación de userId
    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    // Busca el usuario en la base de datos
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Devuelve la contraseña del usuario (No recomendado en producción)
    return res.json({ password: user.password });
  } catch (error) {
    // Manejo de errores
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default forgotPasswordController;
