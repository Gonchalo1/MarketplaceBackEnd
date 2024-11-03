import { Router, Request, Response } from "express";
import registercontroller from "../controllers/register";
import getAllUsersController from "../controllers/getAllUsers";
import mainPageController from "../controllers/mainPage";
import loginController from "../controllers/loginController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/users", authMiddleware, (req: Request, res: Response) => {
  getAllUsersController(req, res);
});

router.get("/", (req: Request, res: Response) => {
  mainPageController(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  loginController(req,res);
});


router.post("/register", (req: Request, res: Response) => {
  registercontroller(req, res);
});





export default router;
