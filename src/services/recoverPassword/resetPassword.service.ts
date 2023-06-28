import bcrypt from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

const saltRounds = 10;

export const resetPasswordService = async (token: string, password: string) => {
  try {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const resetToken = token;

    const user = await userRepository.findOne({
      where: {
        resetToken,
      },
    });

    if (!user || user.resetTokenExpiration! < new Date()) {
      throw new AppError("Token inválido ou expirado.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const resetPass = {
      ...user,
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiration: null,
    };

    await userRepository.save(resetPass);

    return "Senha redefinida com sucesso.";
  } catch (error) {
    console.error(error);
    throw new AppError("Erro ao processar a solicitação.");
  }
};
