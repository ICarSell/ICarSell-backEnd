import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities";
import { AppError } from "../../errors";
import { tCommentUpdate } from "../../interfaces";
import { returnCommentSchema } from "../../schemas";

export const updateCommentByIdService = async (
  dataComment: tCommentUpdate,
  idComment: number
): Promise<tCommentUpdate> => {
  const CommentRepository: Repository<Comments> =
    AppDataSource.getRepository(Comments);

  const oldCommentData: Comments | null = await CommentRepository.findOneBy({
    id: idComment,
  });

  if (!oldCommentData) {
    throw new AppError("Comment not found", 404);
  }

  const newDataComment = CommentRepository.create({
    ...oldCommentData,
    ...dataComment,
  });

  await CommentRepository.save(newDataComment);

  const comment: tCommentUpdate = returnCommentSchema.parse(newDataComment);

  return comment;
};
