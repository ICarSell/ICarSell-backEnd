import { z } from "zod";

export const addressCreateSchema = z.object({
  zipCode: z.string().max(10),
  state: z.string().max(50),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z.string().max(10),
  complement: z.string().max(100),
});

export const addressReturnSchema = addressCreateSchema.extend({
  id: z.string(),
});
