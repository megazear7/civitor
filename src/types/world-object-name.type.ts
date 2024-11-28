import { z } from "zod";

export const WorldObjectName = z.enum(["person", "forest"]);
export type WorldObjectName = z.infer<typeof WorldObjectName>;
