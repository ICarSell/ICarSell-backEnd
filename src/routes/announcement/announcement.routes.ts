import { Router } from "express";
import multer from "multer";

import path from "path";

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

const storage = multer.diskStorage({
  destination: function (
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, "public/uploads");
  },
  filename: function (
    req: any,
    file: { originalname: string },
    cb: (arg0: null, arg1: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

announcementRouter.post(
  "",
  upload.fields([
    { name: "imgCover", maxCount: 1 },
    { name: "gallery", maxCount: 6 },
  ]),
  createAnnouncementController
);

announcementRouter.get("", listAnnouncementController);

announcementRouter.patch(
  "/:id",
  upload.fields([
    { name: "imgCover", maxCount: 1 },
    { name: "gallery", maxCount: 6 },
  ]),
  ensureAnnouncementdValidBodyMiddlewares(updateAnnouncementSchema),
  ensureAnnouncementExistsMiddlewares,
  updateAnnouncementController
);

announcementRouter.delete("/:id", deleteCarController);
