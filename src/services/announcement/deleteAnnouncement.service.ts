import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";

export const deleteAnnouncementService = async (id: string) => {
  const AnnouncementRepo: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  await AnnouncementRepo.delete({ id: id });
};
