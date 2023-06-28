import { Router } from "express";
import { updateAddresByIdController } from "../../controllers";
import { ensureTokenValidMiddlewares } from "../../middlewares";

export const addressRouter: Router = Router();

addressRouter.patch(
  "/:id",
  ensureTokenValidMiddlewares,
  updateAddresByIdController
);
