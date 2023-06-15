import { number, z } from "zod";
import {
  returnUserSchemaWhitoutAdress,
  returnUserSchemaWithoutPass,
  userCreateSchema,
  userReturnSchema,
} from "../users/users.schemas";

const imageSchema = z.object({
  fileName: z.string(),
  path: z.string(),
});

const gallerySchema = z.array(imageSchema);

export const createAnnouncementSchema = z.object({
  mark: z.string().max(50),
  model: z.string().max(50),
  year: z.string(),
  mileage: z.string(),
  color: z.string(),
  priceFipe: z.string(),
  fuel: z.string(),
  price: z.string(),
  description: z.string(),
  imgCover: imageSchema,
  gallery: gallerySchema,
  isActive: z.boolean().default(true),
});

export const returnAnnouncementSchema = createAnnouncementSchema.extend({
  id: z.string(),
});

export const returnListOneAnnouncementSchema = returnAnnouncementSchema.extend({
  user: returnUserSchemaWhitoutAdress,
});

const allImageSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  path: z.string(),
});

export const allAnnouncementSchema = z.object({
  mark: z.string().max(50),
  model: z.string().max(50),
  year: z.string(),
  mileage: z.string(),
  color: z.string(),
  fuel: z.string(),
  priceFipe: z.string(),
  price: z.string(),
  description: z.string(),
  imgCover: allImageSchema,
  isActive: z.boolean().default(true),
  user: returnUserSchemaWhitoutAdress,
});

export const allreturnAnnouncementSchema = allAnnouncementSchema.extend({
  id: z.string(),
});

export const returnAllAnnouncementSchema = allreturnAnnouncementSchema.array();

export const updateAnnouncementSchema = createAnnouncementSchema.partial();
