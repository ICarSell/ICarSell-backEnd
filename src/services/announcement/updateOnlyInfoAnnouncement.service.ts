import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import {
  IAnnouncementOnlyInfo,
  IReturnOnlyInfoAnnouncement,
} from "../../interfaces/announcement/annoucement.interface";
import { returnOnlyInfoAnnouncementSchema } from "../../schemas/announcement/annoucement.schema";

export const updateOnlyInfoAnnouncementService = async (
  data: any,
  idAnnouncement: string
): Promise<IReturnOnlyInfoAnnouncement> => {
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const oldAnnouncementData: Announcement | null =
    await announcementRepository.findOneBy({
      id: idAnnouncement,
    });

  const newDataAnnouncement = announcementRepository.create({
    ...oldAnnouncementData,
    ...data,
    isActive: data.isActive === "true",
  });

  await announcementRepository.save(newDataAnnouncement);

  const announcement =
    returnOnlyInfoAnnouncementSchema.parse(newDataAnnouncement);

  return announcement;
};
