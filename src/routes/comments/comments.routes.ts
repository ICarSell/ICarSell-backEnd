import { Router } from "express";
import { createCommentController } from "../../controllers";
import {
  ensureTokenValidMiddlewares,
  ensureValidBodyMiddlewares,
} from "../../middlewares";
import { createCommentSchema } from "../../schemas";

export const commentsRouter: Router = Router();

commentsRouter.post(
  "/:id",
  ensureTokenValidMiddlewares,
  ensureValidBodyMiddlewares(createCommentSchema),
  createCommentController
);
