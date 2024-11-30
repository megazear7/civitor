import { z } from "zod";

export const KeyCode = z.enum([
  "Minus",
  "Equal",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "ArrowDown",
  "KeyZ",
  "KeyX",
]);
export type KeyCode = z.infer<typeof KeyCode>;
