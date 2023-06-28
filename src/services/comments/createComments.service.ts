import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User, Comments, Announcement } from "../../entities";
import { tCommentReq, tCommentReturn } from "../../interfaces";
import { returnCommentSchema } from "../../schemas";
import { AppError } from "../../errors";

export const createCommentService = async (
  commentData: tCommentReq,
  userId: string,
  announcementId: string
): Promise<tCommentReturn> => {
  const commentsRepository: Repository<Comments> =
    AppDataSource.getRepository(Comments);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const announcementRepository: Repository<Announcement> =
    AppDataSource.getRepository(Announcement);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });
  const findAnnouncement = await announcementRepository.findOne({
    where: {
      id: announcementId,
    },
  });
  if (!findUser) {
    throw new AppError("Usuario não encontrado!");
  }
  if (!findAnnouncement) {
    throw new AppError("Anuncio não encontrado!");
  }

  const comment: Comments = commentsRepository.create({
    ...commentData,
    user: findUser,
    announcements: findAnnouncement,
  });

  await commentsRepository.save(comment);

  const newComment = returnCommentSchema.parse(comment);

  return newComment;
};
