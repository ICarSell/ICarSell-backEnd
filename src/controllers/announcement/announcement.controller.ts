import { Request, Response, request } from "express";
import { IAnnouncement } from "../../interfaces";
import { createAnnouncementService } from "../../services";

export const createAnnouncementController = async (
  request: Request,
  response: Response
) => {
  const data: IAnnouncement = request.body;

  const newAnnouncement = await createAnnouncementService(data);

  return response.status(201).json(newAnnouncement);
};
