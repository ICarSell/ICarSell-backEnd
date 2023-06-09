import { Router } from "express";

import {
  ensureAnnouncementExistsMiddlewares,
  ensureAnnouncementdValidBodyMiddlewares,
} from "../../middlewares";

import { updateAnnouncementSchema } from "../../schemas";
import {
  createAnnouncementController,
  deleteCarController,
  listAnnouncementController,
  updateAnnouncementController,
} from "../../controllers";

export const announcementRouter: Router = Router();

announcementRouter.post("", createAnnouncementController);

announcementRouter.get("", listAnnouncementController);

announcementRouter.patch(
  "/:id",
  ensureAnnouncementdValidBodyMiddlewares(updateAnnouncementSchema),
  ensureAnnouncementExistsMiddlewares,
  updateAnnouncementController
);

announcementRouter.delete("/:id", deleteCarController);
