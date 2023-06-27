import { z } from "zod";
import { createCommentSchema, returnCommentSchema } from "../../schemas";
import { DeepPartial } from "typeorm";

export type tCommentReq = z.infer<typeof createCommentSchema>;
export type tCommentReturn = z.infer<typeof returnCommentSchema>;

export type tCommentUpdate = DeepPartial<tCommentReq>;
