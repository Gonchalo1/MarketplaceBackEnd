import { Request, Response } from "express";

const registercontroller = async(_req: Request, res: Response) => {
    res.send("Register funcionando");
}

export default registercontroller;
