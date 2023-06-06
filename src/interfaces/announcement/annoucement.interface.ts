import { z } from "zod";
import {
  createAnnouncementSchema,
  returnAnnouncementSchema,
} from "../../schemas";
import { DeepPartial } from "typeorm";

export type IAnnouncement = z.infer<typeof createAnnouncementSchema>;
export type IReturnAnnouncement = z.infer<typeof returnAnnouncementSchema>;

export type IUpdateAnnouncement = DeepPartial<IAnnouncement>;
