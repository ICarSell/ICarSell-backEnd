import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const verifyCpfExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (req.body.cpf) {
    const findUser = await userRepository.findOne({
      where: {
        cpf: req.body.cpf,
      },
    });

    if (findUser) {
      throw new AppError("CPF already exists", 409);
    }

    return next();
  }

  return next();
};
