import { Router } from "express";
import { createAnnouncementController } from "../../controllers/announcement/announcement.controller";

export const announcementRouter: Router = Router();

announcementRouter.post("", createAnnouncementController);
