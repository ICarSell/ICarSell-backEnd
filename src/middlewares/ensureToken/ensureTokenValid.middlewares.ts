import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import Jwt from "jsonwebtoken";

export const ensureTokenValidMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  Jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    if (decode.isSeller) {
      response.locals.sellerId = decode.isSeller;
      response.locals.userId = decode.sub;
      return next();
    }
    response.locals.userId = decode.sub;

    throw new AppError("Insufficient permission", 403);
  });
};
