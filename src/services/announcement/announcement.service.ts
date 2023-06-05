import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";

import { Announcement } from "../../entities";
import { IAnnouncement, IReturnAnnouncement } from "../../interfaces";
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
