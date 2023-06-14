import { Request, Response } from "express";

import { IAnnouncement, IUpdateAnnouncement } from "../../interfaces";
import {
  createAnnouncementService,
  listAnnouncementService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from "../../services";

export const createAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const data: IAnnouncement = request.body;
  const files = request.files as { [fieldname: string]: Express.Multer.File[] };

  const imgCoverFile = files["imgCover"][0];
  const galleryFiles = files["gallery"];

  const newAnnouncement = await createAnnouncementService(
    data,
    imgCoverFile,
    galleryFiles
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

export const updateAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const idAnnouncement = request.params.id;

  const dataUser: IUpdateAnnouncement = request.body;
  const files = request.files as { [fieldname: string]: Express.Multer.File[] };

  console.log(files);

  const imgCoverFile = files["imgCover"][0];
  const galleryFiles = files["gallery"];

  const updateAnnouncement: IUpdateAnnouncement =
    await updateAnnouncementService(
      dataUser,
      idAnnouncement,
      imgCoverFile,
      galleryFiles
    );

  return response.status(200).json(updateAnnouncement);
};

export const deleteCarController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = request.params.id;

  await deleteAnnouncementService(id);

  return response.status(204).json();
};
