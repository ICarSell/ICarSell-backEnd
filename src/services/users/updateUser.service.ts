import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  tUserReturnWithoutPassAndAddress,
  tUserUpdate,
} from "../../interfaces";
import { returnUserSchemaWhitoutAdress } from "../../schemas";

const updateUserService = async (
  userData: tUserUpdate,
  updateId: string
): Promise<tUserReturnWithoutPassAndAddress> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldData = await userRepository.findOneBy({
    id: updateId,
  });

  const user: tUserUpdate = userRepository.create({
    ...oldData,
    ...userData,
  });

  await userRepository.save(user);

  const newUser = returnUserSchemaWhitoutAdress.parse(user);

  return newUser;
};

export default updateUserService;
