import { Router } from "express";
import {
  createUserController,
  listUserByIdController,
  updateUserController,
} from "../../controllers";
import {
  ensureTokenValidMiddlewares,
  ensureValidBodyMiddlewares,
  verifyCpfExistsMiddleware,
  verifyEmailExistsMiddleware,
} from "../../middlewares";
import { userCreateSchema, userUpdateSchema } from "../../schemas";

export const usersRouter: Router = Router();

usersRouter.post(
  "",
  ensureValidBodyMiddlewares(userCreateSchema),
  verifyEmailExistsMiddleware,
  verifyCpfExistsMiddleware,
  createUserController
);

usersRouter.get("/:id", listUserByIdController);

usersRouter.patch(
  "/",
  ensureTokenValidMiddlewares,
  ensureValidBodyMiddlewares(userUpdateSchema),
  verifyEmailExistsMiddleware,
  verifyCpfExistsMiddleware,
  updateUserController
);
