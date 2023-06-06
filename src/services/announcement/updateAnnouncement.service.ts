import { Repository } from "typeorm";
import { IReturnAnnouncement, IUpdateAnnouncement } from "../../interfaces";
import { Announcement } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnAnnouncementSchema } from "../../schemas";

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
  