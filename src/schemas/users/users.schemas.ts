import { z } from "zod";
import { addressCreateSchema, addressReturnSchema } from "./address.schemas";
import { returnAnnouncementSchema } from "../announcement/annoucement.schema";

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
export const userUpdateSchema = userCreateSchema
  .omit({
    address: true,
    password: true,
    isSeller: true,
  })
  .partial()
  .refine(
    ({ name, email, cpf, dateOfBirth, description, phone }) =>
      name !== undefined ||
      email !== undefined ||
      cpf !== undefined ||
      dateOfBirth !== undefined ||
      description !== undefined ||
      phone !== undefined,
    {
      message: "One of the fields must be defined",
      path: ["name, email, cpf, dateOfBirth, description or phone"],
    }
  );

export const userReturnSchema = userCreateSchema.extend({
  id: z.string(),
});

export const returnUserSchemaWithoutPass = userReturnSchema
  .omit({
    password: true,
  })
  .extend({
    address: addressReturnSchema,
  });

export const returnUserToCommentsWhitoutPass = userCreateSchema
  .extend({
    id: z.string(),
  })
  .omit({
    address: true,
    password: true,
  });

export const returnUserSchemaWhitoutAdress = returnUserSchemaWithoutPass.omit({
  address: true,
});
