import { z } from "zod";
import { addressCreateSchema } from "../../schemas";
import { DeepPartial } from "typeorm";

export type tAddressReq = z.infer<typeof addressCreateSchema>;
export type tAddressUpdate = DeepPartial<tAddressReq>
