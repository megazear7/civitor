import z from "zod";

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
