import z from "zod";
import { WorldObjectData } from "./world-object-data.type";
import { ArrayIndex, ZonePosition } from "./standard.type";

export const ZoneUpdate = z.object({
  oldZone: ZonePosition.nullable(),
  newZone: ZonePosition.nullable(),
});
export type ZoneUpdate = z.infer<typeof ZoneUpdate>;

export const WorldObjectUpdate = z.object({
  object: WorldObjectData,
  index: ArrayIndex,
  zone: ZoneUpdate.optional(),
});
export type WorldObjectUpdate = z.infer<typeof WorldObjectUpdate>;
