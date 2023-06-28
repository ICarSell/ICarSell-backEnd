import { DeepPartial } from "typeorm";
import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "../../schemas";

export type tUserReq = z.infer<typeof userCreateSchema>;
export type tUserUpdateReq = Omit<
  tUserReq,
  "address" | "password" | "isSeller"
>;
export type tUserReturn = z.infer<typeof userReturnSchema>;
export type tUserReturnWithoutPass = Omit<tUserReturn, "password">;
export type tUserReturnWithoutPassAndAddress = Omit<
  tUserReturnWithoutPass,
  "address"
>;
export type tUserUpdate = DeepPartial<tUserUpdateReq>;
