import { DeepPartial } from "typeorm";
import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "../../schemas";

export type tUserReq = z.infer<typeof userCreateSchema>;
export type tUserReturn = z.infer<typeof userReturnSchema>;
export type tUserReturnWithoutPass = Omit<tUserReturn, "password">;
// type tAllUsersReturn = z.infer<typeof returnAllUsers>;
export type tUserUpdate = DeepPartial<tUserReq>;
