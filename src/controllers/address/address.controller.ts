import { Request, Response } from "express";
import { updateAddressByIdService } from "../../services";
import { tAddressReq, tAddressUpdate } from "../../interfaces";

export const updateAddresByIdController = async (
  request: Request,
  response: Response
) => {

  const idAddress = String(request.params.id);

  const dataAddress: tAddressReq = request.body;

  const address: tAddressUpdate = await updateAddressByIdService(dataAddress, idAddress);

  return response.status(200).json(address);
};
