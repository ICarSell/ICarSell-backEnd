import { z } from "zod";
import {
  createAnnouncementSchema,
  returnAnnouncementSchema,
} from "../../schemas";

export type IAnnouncement = z.infer<typeof createAnnouncementSchema>;
export type IReturnAnnouncement = z.infer<typeof returnAnnouncementSchema>;
