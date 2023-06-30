import { Router } from "express";
import multer from "multer";

import path from "path";

import {
  ensureAnnouncementExistsMiddlewares,
  ensureTokenValidMiddlewares,
  ensureValidBodyMiddlewares,
} from "../../middlewares";

import { updateAnnouncementSchema } from "../../schemas";
import {
  createAnnouncementController,
  deleteCarController,
  listAnnouncementController,
  updateAnnouncementController,
} from "../../controllers";
import { getAnnouncementByIdController } from "../../controllers/announcement/announcement.controller";
import fs from "fs";

const cloudinary = require("cloudinary").v2;

export const announcementRouter: Router = Router();

cloudinary.config({
  cloud_name: "dqbeocdcm",
  api_key: "823447954476992",
  api_secret: "8jPMadTfs7b-1kn5gst0U8CosiQ",
});

const storage = multer.diskStorage({
  destination: function (
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) {
    const uploadDir = "public/uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
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
  ensureTokenValidMiddlewares,
  createAnnouncementController
);

announcementRouter.get("", listAnnouncementController);
announcementRouter.get("/:id", getAnnouncementByIdController);

announcementRouter.patch(
  "/:id",
  upload.fields([
    { name: "imgCover", maxCount: 1 },
    { name: "gallery", maxCount: 6 },
  ]),
  ensureTokenValidMiddlewares,
  ensureAnnouncementExistsMiddlewares,
  updateAnnouncementController
);

announcementRouter.delete(
  "/:id",
  ensureTokenValidMiddlewares,
  ensureAnnouncementExistsMiddlewares,
  deleteCarController
);
