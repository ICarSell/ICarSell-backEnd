import { Router } from "express";
import {
  createCommentController,
  updateCommentController,
} from "../../controllers";
import {
  ensureTokenValidMiddlewares,
  ensureValidBodyMiddlewares,
} from "../../middlewares";
import { createCommentSchema } from "../../schemas";
import { deleteCommentsService } from "../../services/comments/deleteComments.service";
import { deleteCommentsController } from "../../controllers/comments/comments.controller";

export const commentsRouter: Router = Router();

commentsRouter.post(
  "/:id",
  ensureTokenValidMiddlewares,
  ensureValidBodyMiddlewares(createCommentSchema),
  createCommentController
);

commentsRouter.delete(
  "/:id",
  ensureTokenValidMiddlewares,
  deleteCommentsController
);

commentsRouter.patch(
  "/:id",
  ensureTokenValidMiddlewares,
  updateCommentController
);
