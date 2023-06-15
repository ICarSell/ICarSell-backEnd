import { Router } from "express";
import {
  createUserController,
  listUserByIdController,
} from "../../controllers";
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

usersRouter.get("/:id", listUserByIdController);
