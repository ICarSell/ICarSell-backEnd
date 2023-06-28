import { Request, Response } from "express";
import { createCommentService, updateCommentByIdService } from "../../services";
import { deleteCommentsService } from "../../services/comments/deleteComments.service";
import { tCommentReturnNew, tCommentUpdate } from "../../interfaces";

export const createCommentController = async (req: Request, res: Response) => {
  const userId = String(res.locals.userId);
  const newComment = await createCommentService(
    req.body,
    userId,
    req.params.id
  );

  return res.status(201).json(newComment);
};

export const deleteCommentsController = async (req: Request, res: Response) => {
  await deleteCommentsService(Number(req.params.id));

  return res.status(204).send();
};

export const updateCommentController = async (req: Request, res: Response) => {

  const idComment = Number(req.params.id);

  const dataComment: tCommentReturnNew = req.body;

  const comment: tCommentReturnNew = await updateCommentByIdService(dataComment, idComment);

  return res.status(200).json(comment);
};
