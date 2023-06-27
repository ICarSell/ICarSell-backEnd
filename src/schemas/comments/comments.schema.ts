import { z } from "zod";

export const createCommentSchema = z.object({
  comments: z.string(),
});
export const returnCommentSchema = createCommentSchema.extend({
  id: z.number(),
  createdAt: z.string().or(z.date()),
});
