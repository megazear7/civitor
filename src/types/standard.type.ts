import z from "zod";

export const ArrayIndex = z.number().int().min(0);
export type ArrayIndex = z.infer<typeof ArrayIndex>;

export const GameId = z.string().length(10);
export type GameId = z.infer<typeof GameId>;

export const GameStatus = z.enum([
  "NeedToCreate",
  "Created",
  "NeedToLoad",
  "Loaded",
]);
export type GameStatus = z.infer<typeof GameStatus>;

export const GameStorageName = z.enum(["local", "online"]);
export type GameStorageName = z.infer<typeof GameStorageName>;

export const UpdateStatus = z.enum(["updating", "updated", "idle"]);
export type UpdateStatus = z.infer<typeof UpdateStatus>;

export const PxPerSecond = z.number();
export type PxPerSecond = z.infer<typeof PxPerSecond>;

export const MsSinceEpoch = z.number();
export type MsSinceEpoch = z.infer<typeof MsSinceEpoch>;

export const Milliseconds = z.number();
export type Milliseconds = z.infer<typeof Milliseconds>;

export const Seconds = z.number();
export type Seconds = z.infer<typeof Seconds>;

export const Pixels = z.number();
export type Pixels = z.infer<typeof Pixels>;

export const Position = z.object({
  x: z.number(),
  y: z.number(),
});
export type Position = z.infer<typeof Position>;

export const Velocity = z.object({
  dx: z.number(),
  dy: z.number(),
});
export type Velocity = z.infer<typeof Velocity>;

export const Color = z.object({
  red: z.number().min(0).max(255),
  green: z.number().min(0).max(255),
  blue: z.number().min(0).max(255),
  opacity: z.number().min(0).max(1),
});
export type Color = z.infer<typeof Color>;

export const Seed = z.number();
export type Seed = z.infer<typeof Seed>;

export const RandomNumber = z.number().min(0).max(1);
export type RandomNumber = z.infer<typeof RandomNumber>;
