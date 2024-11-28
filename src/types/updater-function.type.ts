import { GameData } from "./game-data.type";
import { ArrayIndex } from "./standard.type";
import { WorldObjectData } from "./world-object-data.type";
import { WorldObjectUpdate } from "./world-object-update.type";

export type UpdaterFunction = (
  game: GameData,
  generic: WorldObjectData,
  index: ArrayIndex,
) => WorldObjectUpdate[];
