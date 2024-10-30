import { Request, Response } from "express";
import { User } from "../database/Connection";

const getAllUsersController = async(_req: Request, res: Response) => {
    try {
        const users = await User.findAll(); 
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
}

export default getAllUsersController
