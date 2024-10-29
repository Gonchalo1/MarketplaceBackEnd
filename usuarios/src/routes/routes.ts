import { Router, Request, Response } from "express";
import registercontroller from "../controllers/register";
import getAllUsersController from "../controllers/getAllUsers";
import mainPageController from "../controllers/mainPage";

const router = Router();


router.get("/users", (req: Request, res: Response) => {
  getAllUsersController(req,res);
});

router.get("/register", (req: Request, res: Response) => {
  registercontroller(req, res);
});

router.get("/", (req: Request, res: Response) => {
  mainPageController(req, res);
});

// router.get("/login", (req: Request, res: Response) => {
//   registercontroller(req, res);
// });

// router.get("/logout", (req: Request, res: Response) => {
//   registercontroller(req, res);
// });

// router.get("/protected", (req: Request, res: Response) => {
//   registercontroller(req, res);
// });


export default router;
