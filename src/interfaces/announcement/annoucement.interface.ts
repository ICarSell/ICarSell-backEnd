import { z } from "zod";
import {
  createAnnouncementSchema,
  returnAllAnnouncementSchema,
  returnAnnouncementSchema,
} from "../../schemas";
import { DeepPartial } from "typeorm";

export type IAnnouncement = z.infer<typeof createAnnouncementSchema>;
export type IReturnAnnouncement = z.infer<typeof returnAnnouncementSchema>;

export type IReturnAllAnnouncement = z.infer<
  typeof returnAllAnnouncementSchema
>;

export type IUpdateAnnouncement = DeepPartial<IAnnouncement>;

