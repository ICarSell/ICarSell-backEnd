import { Repository } from "typeorm";
import { Address } from "../../entities";
import { AppDataSource } from "../../data-source";
import { tAddressUpdate, tUserUpdate } from "../../interfaces";
import { addressReturnSchema } from "../../schemas";
import { AppError } from "../../errors";

export const updateAddressByIdService = async (
  dataAddres: tAddressUpdate,
  idAddress: string
): Promise<tAddressUpdate> => {
  const AddressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const oldAddressData: Address | null = await AddressRepository.findOneBy({
    id: idAddress,
  });

  if (!oldAddressData) {
    throw new AppError("Address not found");
  }

  const newDataAddress = AddressRepository.create({
    ...oldAddressData,
    ...dataAddres,
  });

  await AddressRepository.save(newDataAddress);

  const address: tAddressUpdate = addressReturnSchema.parse(newDataAddress);

  return address;
};
