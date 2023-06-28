import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import { AppError } from "../../errors";

export const deleteUserService = async (id: string) => {
  const adressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const idAdress = await userRepo.findOne({
    where: { id: id },
    relations: { address: true },
  });

  if (!idAdress) {
    throw new AppError("User not exist!", 404);
  }

  await adressRepo.delete({ id: idAdress.address.id });

  await userRepo.delete({ id: id });
};
