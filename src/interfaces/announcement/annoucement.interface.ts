import { z } from "zod";
import {
  createAnnouncementSchema,
  returnAllAnnouncementSchema,
  returnAnnouncementSchema,
} from "../../schemas";
import { DeepPartial } from "typeorm";
import {
  createOnlyAnnouncementSchema,
  returnListOneAnnouncementSchema,
  returnOnlyInfoAnnouncementSchema,
} from "../../schemas/announcement/annoucement.schema";

export type IAnnouncement = z.infer<typeof createAnnouncementSchema>;
export type IAnnouncementOnlyInfo = z.infer<
  typeof createOnlyAnnouncementSchema
>;

export type IReturnAnnouncement = z.infer<typeof returnAnnouncementSchema>;
export type IReturnOnlyInfoAnnouncement = z.infer<
  typeof returnOnlyInfoAnnouncementSchema
>;

export type IReturnAllAnnouncement = z.infer<
  typeof returnAllAnnouncementSchema
>;
export type iListOneAnnouncement = z.infer<
  typeof returnListOneAnnouncementSchema
>;

export type IUpdateAnnouncement = DeepPartial<IAnnouncement>;
