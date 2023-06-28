import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comments } from "../../entities";
import { AppError } from "../../errors";
import { tCommentReturnNew, tCommentUpdate } from "../../interfaces";
import { returnCommentSchema, returnCommentSchemaNew } from "../../schemas";

export const updateCommentByIdService = async (
  dataComment: tCommentReturnNew,
  idComment: number
): Promise<tCommentReturnNew> => {
  const CommentRepository: Repository<Comments> =
    AppDataSource.getRepository(Comments);

  const oldCommentData: Comments | null = await CommentRepository.findOneBy({
    id: idComment,
  });
  console.log(dataComment);
  if (!oldCommentData) {
    throw new AppError("Comment not found", 404);
  }

  const newDataComment = CommentRepository.create({
    ...oldCommentData,
    ...dataComment,
  });

  await CommentRepository.save(newDataComment);

  const comment: tCommentReturnNew = returnCommentSchemaNew.parse(newDataComment);

  return comment;
};
