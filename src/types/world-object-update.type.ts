import z from "zod";
import { WorldObjectData } from "./world-object-data.type";
import { ArrayIndex } from "./standard.type";

export const WorldObjectUpdate = z.object({
  object: WorldObjectData,
  index: ArrayIndex,
});
export type WorldObjectUpdate = z.infer<typeof WorldObjectUpdate>;
