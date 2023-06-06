import { Router } from "express";
import {
  createAnnouncementController,
  listAnnouncementController,
} from "../../controllers/announcement/announcement.controller";

export const announcementRouter: Router = Router();

announcementRouter.post("", createAnnouncementController);
announcementRouter.get("", listAnnouncementController);
