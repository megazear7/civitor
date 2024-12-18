import { z } from "zod";
import { Position, Seed, ZonePosition } from "./standard.type";

export const BaseWorldObject = z.object({
  pos: Position,
  seed: Seed,
  zone: ZonePosition.nullable(),
});
export type BaseWorldObject = z.infer<typeof BaseWorldObject>;
