import { Request, Response } from "express";

import { IAnnouncement, IUpdateAnnouncement } from "../../interfaces";
import {
  createAnnouncementService,
  listAnnouncementService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from "../../services";
import { getAnnouncementByIdService } from "../../services/announcement/getAnnouncementbyId.service";
import { AppError } from "../../errors";
import { updateOnlyInfoAnnouncementService } from "../../services/announcement/updateOnlyInfoAnnouncement.service";
import { IReturnAnnouncement } from "../../interfaces";

import fs from "fs";

export const createAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const data: IAnnouncement = request.body;

  const files = request.files as { [fieldname: string]: Express.Multer.File[] };

  const sellerId = response.locals.userId;

  const imgCoverFile = files["imgCover"][0];
  const galleryFiles = files["gallery"];

  const newAnnouncement = await createAnnouncementService(
    data,
    imgCoverFile,
    galleryFiles,
    sellerId
  );

  try {
    // Excluir a imagem de capa
    fs.unlinkSync(imgCoverFile.path);

    // Excluir as imagens da galeria
    galleryFiles.forEach((galleryFile) => {
      fs.unlinkSync(galleryFile.path);
    });
  } catch (error) {
    console.error("Error deleting local images:", error);
  }

  return response.status(201).json(newAnnouncement);
};

export const listAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const allAnnouncements = await listAnnouncementService();
  return response.status(200).json(allAnnouncements);
};

export const getAnnouncementByIdController = async (
  request: Request,
  response: Response
) => {
  const getAnnouncement = await getAnnouncementByIdService(
    String(request.params.id)
  );

  return response.status(200).json(getAnnouncement);
};

import { uploadImageToCloudinary } from "../../utils/cloudnary";

export const updateAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const idAnnouncement = request.params.id;
  const dataUser = request.body;
  const files = request.files as { [fieldname: string]: Express.Multer.File[] };

  if ("imgCover" in files || "gallery" in files) {
    const imgCoverFile = files["imgCover"]?.[0];
    const galleryFiles = files["gallery"];

    const updateAnnouncement: IReturnAnnouncement =
      await updateAnnouncementService(
        dataUser,
        idAnnouncement,
        imgCoverFile,
        galleryFiles
      );

    return response.status(200).json(updateAnnouncement);
  }

  const updateAnnouncement = await updateOnlyInfoAnnouncementService(
    dataUser,
    idAnnouncement
  );

  return response.status(200).json(updateAnnouncement);
};

export const deleteCarController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  if (response.locals.userId != response.locals.findAnnouncement) {
    throw new AppError("Insufficient permission", 403);
  }

  const id = request.params.id;

  await deleteAnnouncementService(id);

  return response.status(204).json();
};
