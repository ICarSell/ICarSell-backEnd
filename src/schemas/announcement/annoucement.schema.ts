import { z } from "zod";

export const createAnnouncementSchema = z.object({
  mark: z.string().max(50),
  model: z.string().max(50),
  year: z.number(),
  mileage: z.number(),
  color: z.string(),
  priceFipe: z.number(),
  price: z.number(),
  description: z.string(),
  imgCover: z.string(),
  isActive: z.boolean().default(true),
});

export const returnAnnouncementSchema = createAnnouncementSchema.extend({
  id: z.string(),
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();
