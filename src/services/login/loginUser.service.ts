import "dotenv/config";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { compare } from "bcryptjs";
import Jwt from "jsonwebtoken";
import { IDataLogin } from "../../interfaces";
import { AppError } from "../../errors";

export const loginUserService = async (
  dataLogin: IDataLogin
): Promise<object> => {
  const { email, password } = dataLogin;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchPassword: boolean = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = Jwt.sign(
    {
      isSeller: user.isSeller,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  const userId = user.id;

  const returnToken = {
    token: token,
    userId: userId,
  };

  return returnToken;
};
