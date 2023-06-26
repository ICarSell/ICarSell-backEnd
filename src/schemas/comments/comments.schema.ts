import { z } from "zod";
import { returnUserSchemaWithoutPass } from "../users/users.schemas";
import { returnAnnouncementSchema } from "../announcement/annoucement.schema";

export const createCommentSchema = z.object({
  comments: z.string(),
});
export const returnCommentSchema = createCommentSchema.extend({
  id: z.number(),
  createdAt: z.string(),
});
