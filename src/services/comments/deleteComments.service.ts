import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities";
import { AppError } from "../../errors";

export const deleteCommentsService = async (id: number) => {
  const CommentRepo: Repository<Comments> =
    AppDataSource.getRepository(Comments);

  const findComment = await CommentRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!findComment) {
    throw new AppError("Comment not exist!", 404);
  }

  await CommentRepo.delete({ id: id });
};
