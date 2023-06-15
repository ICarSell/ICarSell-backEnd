import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import { IReturnAllAnnouncement } from "../../interfaces";
import { returnAllAnnouncementSchema } from "../../schemas";

export const listAnnouncementService =
  async (): Promise<IReturnAllAnnouncement> => {
    const contactsRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

    const findAnnouncements: Array<Announcement> =
      await contactsRepository.find({
        relations: {
          imgCover: true,
          user: true,
        },
      });

    const announcements = returnAllAnnouncementSchema.parse(findAnnouncements);

    return announcements;
  };
