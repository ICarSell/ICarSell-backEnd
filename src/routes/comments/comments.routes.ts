import { Router } from "express";
import {
  createCommentController,
  updateCommentController,
} from "../../controllers";
import {
  ensureTokenValidMiddlewaresOnlyToken,
  ensureValidBodyMiddlewares,
} from "../../middlewares";
import { createCommentSchema } from "../../schemas";

import { deleteCommentsController } from "../../controllers/comments/comments.controller";

export const commentsRouter: Router = Router();

commentsRouter.post(
  "/:id",
  ensureTokenValidMiddlewaresOnlyToken,
  ensureValidBodyMiddlewares(createCommentSchema),
  createCommentController
);

commentsRouter.delete(
  "/:id",
  ensureTokenValidMiddlewaresOnlyToken,
  deleteCommentsController
);

commentsRouter.patch(
  "/:id",
  ensureTokenValidMiddlewaresOnlyToken,
  updateCommentController
);
