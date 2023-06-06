import { Router } from "express";
import {
  createAnnouncementController,
  updateAnnouncementController,
} from "../../controllers/announcement/announcement.controller";
import {
  ensureAnnouncementExistsMiddlewares,
  ensureAnnouncementdValidBodyMiddlewares,
} from "../../middlewares";
import { updateAnnouncementSchema } from "../../schemas";

export const announcementRouter: Router = Router();

announcementRouter.post("", createAnnouncementController);
announcementRouter.patch(
  "/:id",
  ensureAnnouncementdValidBodyMiddlewares(updateAnnouncementSchema),
  ensureAnnouncementExistsMiddlewares,
  updateAnnouncementController
);
