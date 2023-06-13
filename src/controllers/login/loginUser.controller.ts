import { IDataLogin } from "../../interfaces";
import { Request, Response } from "express";
import { loginUserService } from "../../services";

export const loginUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginUser: IDataLogin = request.body;

  const token: string = await loginUserService(loginUser);

  return response.json({ token: token });
};
