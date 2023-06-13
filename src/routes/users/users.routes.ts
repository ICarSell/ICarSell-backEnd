import { Router } from "express";
import { createUserController } from "../../controllers";

export const usersRouter: Router = Router();

usersRouter.post("", createUserController);
