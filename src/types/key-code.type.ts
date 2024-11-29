import { z } from "zod";

export const KeyCode = z.enum(["Minus", "Equal"]);
export type KeyCode = z.infer<typeof KeyCode>;
