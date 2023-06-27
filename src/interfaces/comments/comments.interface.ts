import { z } from "zod";
import { createCommentSchema, returnCommentSchema } from "../../schemas";

export type tCommentReq = z.infer<typeof createCommentSchema>;
export type tCommentReturn = z.infer<typeof returnCommentSchema>;
