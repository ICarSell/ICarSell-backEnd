import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";

export const ensureAnnouncementdValidBodyMiddlewares =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const validBody = schema.parse(request.body);

    request.body = validBody;

    return next();
  };
