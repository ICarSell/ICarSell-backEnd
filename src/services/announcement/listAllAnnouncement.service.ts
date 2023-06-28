import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import { IReturnAllAnnouncement } from "../../interfaces";
import { returnAllAnnouncementSchema } from "../../schemas";
import { AppError } from "../../errors";

export const listAnnouncementService =
  async (): Promise<IReturnAllAnnouncement> => {
    const contactsRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

    const findAnnouncements: Array<Announcement> =
      await contactsRepository.find({
        where: {
          isActive: true,
        },
        relations: {
          imgCover: true,
          user: true,
        },
      });

    if (!findAnnouncements) {
      throw new AppError("Nenhum anuncio foi encontrado", 404);
    }

    const announcements = returnAllAnnouncementSchema.parse(findAnnouncements);

    return announcements;
  };
