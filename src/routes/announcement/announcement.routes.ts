import { Router } from "express";
import {
  createAnnouncementController,
  listAnnouncementController,
  updateAnnouncementController,
} from "../../controllers/announcement/announcement.controller";

import {
  ensureAnnouncementExistsMiddlewares,
  ensureAnnouncementdValidBodyMiddlewares,
} from "../../middlewares";

import { updateAnnouncementSchema } from "../../schemas";


export const announcementRouter: Router = Router();

announcementRouter.post("", createAnnouncementController);

announcementRouter.get("", listAnnouncementController);

announcementRouter.patch(
  "/:id",
  ensureAnnouncementdValidBodyMiddlewares(updateAnnouncementSchema),
  ensureAnnouncementExistsMiddlewares,
  updateAnnouncementController
);

