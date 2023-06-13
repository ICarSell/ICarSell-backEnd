import { Router } from "express";
import { loginUserController } from "../../controllers";
import { ensureValidBodyMiddlewares } from "../../middlewares";
import { loginUserSchema } from "../../schemas";

export const loginRouter: Router = Router();

loginRouter.post(
  "",
  ensureValidBodyMiddlewares(loginUserSchema),
  loginUserController
);
