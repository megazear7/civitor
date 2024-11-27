import z from "zod";
import { GameConfig } from "./game-config.type";
import { WorldObjectData } from "./world-object-data.type";
import { WorldZoneData } from "./world-zone-data.type";
import { PlayerData } from "./player-data.type";

export const GameData = z.object({
  config: GameConfig,
  objects: WorldObjectData.array(),
  zones: WorldZoneData.array(),
  players: PlayerData.array(),
});
export type GameData = z.infer<typeof GameData>;
