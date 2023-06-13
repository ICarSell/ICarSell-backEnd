import { Router } from "express";
import { createUserController } from "../../controllers";
import {
  ensureValidBodyMiddlewares,
  verifyCpfExistsMiddleware,
  verifyEmailExistsMiddleware,
} from "../../middlewares";
import { userCreateSchema } from "../../schemas";

export const usersRouter: Router = Router();

usersRouter.post(
  "",
  ensureValidBodyMiddlewares(userCreateSchema),
  verifyEmailExistsMiddleware,
  verifyCpfExistsMiddleware,
  createUserController
);
