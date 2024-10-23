import { Router, Request, Response } from "express";
import registercontroller from "../controllers/register";

const router = Router();

router.get("/register", (req: Request, res: Response) => {
  registercontroller(req, res);
});

export default router;
