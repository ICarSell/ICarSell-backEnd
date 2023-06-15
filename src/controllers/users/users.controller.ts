import { Request, Response } from "express";
import { createUserService } from "../../services";
import { listUserByIdService } from "../../services/users/listUserById.service";

export const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(newUser);
};
export const listUserByIdController = async (req: Request, res: Response) => {
  const listUser = await listUserByIdService(String(req.params.id));

  return res.status(201).json(listUser);
};
