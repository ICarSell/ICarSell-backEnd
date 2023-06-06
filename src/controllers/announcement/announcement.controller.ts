import { Request, Response, request } from "express";

import { IAnnouncement, IUpdateAnnouncement } from "../../interfaces";
import {
  createAnnouncementService,
  listAnnouncementService,
  updateAnnouncementService,
} from "../../services";

export const createAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const data: IAnnouncement = request.body;

  const newAnnouncement = await createAnnouncementService(data);

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

  const updateAnnouncement: IUpdateAnnouncement =
    await updateAnnouncementService(dataUser, idAnnouncement);

  return response.status(200).json(updateAnnouncement);
}

