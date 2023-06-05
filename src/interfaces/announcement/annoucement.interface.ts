import { z } from "zod";
import {
  createAnnouncementSchema,
  returnAllAnnouncementSchema,
  returnAnnouncementSchema,
} from "../../schemas";

export type IAnnouncement = z.infer<typeof createAnnouncementSchema>;
export type IReturnAnnouncement = z.infer<typeof returnAnnouncementSchema>;
export type IReturnAllAnnouncement = z.infer<
  typeof returnAllAnnouncementSchema
>;
