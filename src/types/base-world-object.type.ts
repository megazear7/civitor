import { z } from "zod";
import { Position, Seed } from "./standard.type";

export const BaseWorldObject = z.object({
  pos: Position,
  seed: Seed,
});
export type BaseWorldObject = z.infer<typeof BaseWorldObject>;
