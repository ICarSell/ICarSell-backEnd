import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";

import { Announcement } from "../../entities";
import {
  IAnnouncement,
  IReturnAnnouncement,
  IUpdateAnnouncement,
} from "../../interfaces";
import { returnAnnouncementSchema } from "../../schemas";

export const createAnnouncementService = async (
  data: IAnnouncement
): Promise<IReturnAnnouncement> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const announcement = announcementRepository.create(data);

  await announcementRepository.save(announcement);

  const newAnnouncement = returnAnnouncementSchema.parse(announcement);

  return newAnnouncement;
};

export const updateAnnouncementService = async (
  data: IUpdateAnnouncement,
  idAnnouncement: string
): Promise<IReturnAnnouncement> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const oldAnnouncementData: Announcement | null =
    await announcementRepository.findOneBy({
      id: idAnnouncement,
    });

  const newDataAnnouncement = announcementRepository.create({
    ...oldAnnouncementData,
    ...data,
  });

  await announcementRepository.save(newDataAnnouncement);

  const announcement = returnAnnouncementSchema.parse(newDataAnnouncement);

  return announcement;
};
