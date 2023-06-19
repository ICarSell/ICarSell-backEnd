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
import { deleteUserController } from "../../controllers/users/users.controller";

export const usersRouter: Router = Router();

usersRouter.post(
  "",
  ensureValidBodyMiddlewares(userCreateSchema),
  verifyEmailExistsMiddleware,
  verifyCpfExistsMiddleware,
  createUserController
);

usersRouter.get("/:id", listUserByIdController);

usersRouter.delete("/:id", deleteUserController);
