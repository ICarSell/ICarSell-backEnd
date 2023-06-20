import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import { tUserReq, tUserReturnWithoutPass } from "../../interfaces";
import { returnUserSchemaWithoutPass } from "../../schemas";

export const createUserService = async (
  userData: tUserReq
): Promise<tUserReturnWithoutPass> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const addressRequest = userData.address;
  const newAddress: Address = addressRepository.create(addressRequest);
  await addressRepository.save(newAddress);

  const { address: _, ...userRequest } = userData;

  const user: User = userRepository.create({
    ...userRequest,
    address: newAddress,
  });
  await userRepository.save(user);

  newAddress.user = user;
  await addressRepository.save(newAddress);

  const newUser = returnUserSchemaWithoutPass.parse(user);
  console.log(newUser);

  return newUser;
};
