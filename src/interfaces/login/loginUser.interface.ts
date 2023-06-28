import { z } from "zod";
import { loginUserSchema } from "../../schemas";

export type IDataLogin = z.infer<typeof loginUserSchema>;
