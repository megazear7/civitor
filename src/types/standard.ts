import z from "zod";

export const GameId = z.string().length(10);
export type GameId = z.infer<typeof GameId>;

export const GameStatus = z.enum([ "NeedToCreate", "Created", "NeedToLoad", "Loaded" ]);
export type GameStatus = z.infer<typeof GameStatus>;
