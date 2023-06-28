import { Request, Response } from "express";
import { createUserService, updateUserService } from "../../services";
import { listUserByIdService } from "../../services/users/listUserById.service";
import { deleteUserService } from "../../services/users/deleteUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(newUser);
};

export const listUserByIdController = async (req: Request, res: Response) => {
  const listUser = await listUserByIdService(String(req.params.id));

  return res.status(200).json(listUser);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData = req.body;
  const userId = String(res.locals.userId);
  const newUser = await updateUserService(userData, userId);

  return res.status(200).json(newUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id);

  return res.status(204).send();
};
