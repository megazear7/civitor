import z from "zod";

export const PlayerData = z.object({
  screen: z.object({}),
});
export type PlayerData = z.infer<typeof PlayerData>;
