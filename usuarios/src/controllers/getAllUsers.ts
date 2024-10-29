import { Request, Response } from "express";

const getAllUsersController = async(_req: Request, res: Response) => {
    res.send('getallusers')
}

export default getAllUsersController
