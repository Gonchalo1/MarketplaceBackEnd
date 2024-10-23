import { Request, Response } from "express";

const registercontroller = (_req: Request, res: Response) => {
    res.send("Register funcionando");
}

export default registercontroller;
