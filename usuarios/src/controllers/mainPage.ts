import { Request, Response } from "express";

const mainPageController = (_req:Request, res:Response) => {
 res.send('main Page   ----> all endpoints are /register /login / users /logout /deleteuser')
}

export default mainPageController