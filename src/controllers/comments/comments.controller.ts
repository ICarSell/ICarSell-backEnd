import { Request, Response } from "express";
import { createCommentService } from "../../services";

export const createCommentController = async (req: Request, res: Response) => {
  const userId = String(res.locals.userId);
  const newComment = await createCommentService(
    req.body,
    userId,
    req.params.id
  );

  return res.status(201).json(newComment);
};
