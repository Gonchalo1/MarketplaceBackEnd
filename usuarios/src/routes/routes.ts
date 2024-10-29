import { Router, Request, Response } from "express";
import registercontroller from "../controllers/register";

const router = Router();


router.get("/", (_req: Request, res: Response) => {
  res.send('hola desde /');
});

router.get("/register", (req: Request, res: Response) => {
  registercontroller(req, res);
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
