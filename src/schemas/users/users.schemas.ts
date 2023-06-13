import { z } from "zod";
import { addressCreateSchema } from "./address.schemas";

export const userCreateSchema = z.object({
  name: z.string().max(30).min(4),
  email: z.string().email().max(100),
  password: z.string().max(120),
  cpf: z.string().max(14),
  phone: z.string().max(13),
  dateOfBirth: z.number().int(),
  description: z.string(),
  isSeller: z.boolean().default(false),
  address: addressCreateSchema,
});

export const userReturnSchema = userCreateSchema.extend({
  id: z.string(),
});

export const returnUserSchemaWithoutPass = userReturnSchema.omit({
  password: true,
});
