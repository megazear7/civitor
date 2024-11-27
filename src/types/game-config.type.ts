import z from "zod";

export const GameMapConfig = z.object({
  width: z.number().int(),
  height: z.number().int(),
});
export type GameMapConfig = z.infer<typeof GameMapConfig>;

export const GameZoneConfig = z.object({
  width: z.number().int(),
  height: z.number().int(),
});
export type GameZoneConfig = z.infer<typeof GameZoneConfig>;

export const GameConfig = z.object({
  map: GameMapConfig,
  zone: GameZoneConfig,
});
export type GameConfig = z.infer<typeof GameConfig>;
