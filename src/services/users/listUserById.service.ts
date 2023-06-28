import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const listUserByIdService = async (id: string): Promise<any> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const findUser = await userRepo

    .createQueryBuilder("user")
    .leftJoinAndSelect("user.address", "adress")
    .leftJoinAndSelect("user.announcement", "announcement")
    .leftJoinAndSelect("announcement.imgCover", "imgCover")
    .leftJoinAndSelect("announcement.gallery", "gallery")
    .where("user.id = :id", { id: id })
    .getOne();

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const { password: _, ...returnUser } = findUser;

  return returnUser;
};
