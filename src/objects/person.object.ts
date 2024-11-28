import { z } from "zod";
import { Velocity } from "../types/standard.type";
import { BaseWorldObject } from "../types/base-world-object.type";
import { WorldObjectName } from "../types/world-object-name.type";

export const Person = BaseWorldObject.extend({
  type: z.literal(WorldObjectName.enum.person),
  vel: Velocity,
});
export type Person = z.infer<typeof Person>;
