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

export const createAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const data: IAnnouncement = request.body;
  console.log(data);
  const files = request.files as { [fieldname: string]: Express.Multer.File[] };

  const sellerId = response.locals.userId;
  console.log(sellerId);

  const imgCoverFile = files["imgCover"][0];
  const galleryFiles = files["gallery"];

  const newAnnouncement = await createAnnouncementService(
    data,
    imgCoverFile,
    galleryFiles,
    sellerId
  );

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

    const updateAnnouncement: IUpdateAnnouncement =
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
