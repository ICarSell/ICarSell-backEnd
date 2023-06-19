import { Request, Response, NextFunction } from "express";
import { Announcement } from "../../entities";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

export const ensureAnnouncementExistsMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const idAnnouncement: string = request.params.id;

  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const announcementFindOne: Announcement | null = await announcementRepository
    .createQueryBuilder("announcement")
    .leftJoinAndSelect("announcement.user", "user")
    .where("announcement.id = :id", { id: idAnnouncement })
    .getOne();

  if (!announcementFindOne) {
    throw new AppError("Announcement not found", 404);
  }

  response.locals.findAnnouncement = announcementFindOne.user.id;

  return next();
};
