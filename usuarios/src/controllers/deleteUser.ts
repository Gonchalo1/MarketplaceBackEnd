import { Request, Response } from "express";
import { User } from "../database/Connection";

const deleteUsercontroller = async (req: Request, res: Response) => {
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

    // Elimina el usuario
    await user.destroy();

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    // Manejo de errores
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default deleteUsercontroller;
