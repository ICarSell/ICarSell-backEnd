import { z } from "zod";
import { returnUserToCommentsWhitoutPass } from "../users/users.schemas";

export const createCommentSchema = z.object({
  comments: z.string(),
});
export const returnCommentSchema = createCommentSchema.extend({
  id: z.number(),
  createdAt: z.string().or(z.date()),
  user: returnUserToCommentsWhitoutPass,
});

export const returnCommentSchemaNew = returnCommentSchema.omit({ user: true });
