import { GameData } from "./game-data.type";
import { WorldObjectData } from "./world-object-data.type";

export type UpdaterFunction = (
  game: GameData,
  object: WorldObjectData,
) => WorldObjectData;
