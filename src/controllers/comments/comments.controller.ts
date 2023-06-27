import { Request, Response } from "express";
import { createCommentService } from "../../services";
import { deleteCommentsService } from "../../services/comments/deleteComments.service";

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
