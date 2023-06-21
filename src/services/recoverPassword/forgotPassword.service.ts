import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

const saltRounds = 10;

export const forgotPasswordService = async (email: string) => {
  try {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const resetToken = generateResetToken();

    const forgotPass = {
      ...user,
      resetToken: resetToken,
      resetTokenExpiration: new Date(Date.now() + 3600000),
    };

    await userRepository.save(forgotPass);

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "motorsShop16@outlook.com.br",
        pass: "MotorShop16@",
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    await transporter.sendMail({
      from: "motorsShop16@outlook.com.br",
      to: user.email,
      subject: "Redefinir senha",
      html: `<p>Para redefinir sua senha, clique no link a seguir:</p><a href="http://localhost:3000/reset-password/${resetToken}">Redefinir senha</a>`,
    });

    return "E-mail de recuperação de senha enviado.";
  } catch (error) {
    console.error(error);
    throw new AppError("Erro ao processar a solicitação.");
  }
};

function generateResetToken(): string {
  const resetToken = uuidv4();
  return resetToken;
}
