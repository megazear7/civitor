import { z } from "zod";
import { Position, Seed, ZonePosition } from "./standard.type";

export const BaseWorldObject = z.object({
  pos: Position,
  seed: Seed,
  zone: ZonePosition,
});
export type BaseWorldObject = z.infer<typeof BaseWorldObject>;
