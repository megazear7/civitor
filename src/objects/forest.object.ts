import { z } from "zod";
import { BaseWorldObject } from "../types/base-world-object.type";
import { WorldObjectName } from "../types/world-object-name.type";

export const Forest = BaseWorldObject.extend({
  type: z.literal(WorldObjectName.enum.forest),
});
export type Forest = z.infer<typeof Forest>;
