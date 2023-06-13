import { z } from "zod";

const imageSchema = z.object({
  fileName: z.string(),
  path: z.string(),
});

const gallerySchema = z.array(imageSchema);

export const createAnnouncementSchema = z.object({
  mark: z.string().max(50),
  model: z.string().max(50),
  year: z.string().or(z.number()),
  mileage: z.string().or(z.number()),
  color: z.string(),
  priceFipe: z.string().or(z.number()),
  price: z.string().or(z.number()),
  description: z.string(),
  imgCover: imageSchema,
  gallery: gallerySchema,
  isActive: z.boolean().default(true),
});

export const returnAnnouncementSchema = createAnnouncementSchema.extend({
  id: z.string(),
});

const allImageSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  path: z.string(),
});

export const allAnnouncementSchema = z.object({
  mark: z.string().max(50),
  model: z.string().max(50),
  year: z.string().or(z.number()),
  mileage: z.string().or(z.number()),
  color: z.string(),
  priceFipe: z.string().or(z.number()),
  price: z.string().or(z.number()),
  description: z.string(),
  imgCover: allImageSchema,
  isActive: z.boolean().default(true),
});

export const allreturnAnnouncementSchema = allAnnouncementSchema.extend({
  id: z.string(),
});

export const returnAllAnnouncementSchema = allreturnAnnouncementSchema.array();

export const updateAnnouncementSchema = createAnnouncementSchema.partial();
