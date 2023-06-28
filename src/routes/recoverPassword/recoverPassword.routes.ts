import { Router } from "express";
import {
  forgotPasswordController,
  resetPasswordController,
} from "../../controllers/recoverPassword/recoverPassword.controller";

export const resetPasswordrouter = Router();

resetPasswordrouter.patch("/forgot-password", forgotPasswordController);

resetPasswordrouter.patch("/reset-password/:token", resetPasswordController);
