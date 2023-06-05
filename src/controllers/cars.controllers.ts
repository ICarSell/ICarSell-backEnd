import { Response, Request } from "express";
import { deleteCarService } from "../services/cars/deleteCar.services";

export const deleteCarController = (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = "Adicionar o ID que vem da request";

  await deleteCarService(id);

  return response.status(204).json();
};
