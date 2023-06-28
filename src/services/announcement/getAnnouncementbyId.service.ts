import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import { AppError } from "../../errors";
import { iListOneAnnouncement } from "../../interfaces/announcement/annoucement.interface";
import { returnListOneAnnouncementSchema } from "../../schemas/announcement/annoucement.schema";

export const getAnnouncementByIdService = async (
  id: string
): Promise<iListOneAnnouncement> => {
  const announRepo = AppDataSource.getRepository(Announcement);

  const announcement = await announRepo
    .createQueryBuilder("announcement")
    .leftJoinAndSelect("announcement.user", "user")
    .leftJoinAndSelect("announcement.imgCover", "imgCover")
    .leftJoinAndSelect("announcement.gallery", "gallery")
    .leftJoinAndSelect("announcement.comments", "comments")
    .leftJoinAndSelect("comments.user", "commentsUser")
    .where("announcement.id = :id", { id: id })
    .getOne();

  if (!announcement) {
    throw new AppError("Announcement not found", 404);
  }

  const returnAnnouncement =
    returnListOneAnnouncementSchema.parse(announcement);

  return returnAnnouncement;
};
