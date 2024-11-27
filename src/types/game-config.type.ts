import z from "zod";

export const GameConfig = z.object({
  map: z.object({
    width: z.number().int(),
    height: z.number().int(),
  }),
  zone: z.object({
    width: z.number().int(),
    height: z.number().int(),
  }),
});
export type GameConfig = z.infer<typeof GameConfig>;
