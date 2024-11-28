import { Forest } from "../objects/forest.object";
import { GameData } from "../types/game-data.type";
import { ArrayIndex } from "../types/standard.type";
import { UpdaterFunction } from "../types/updater-function.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { WorldObjectUpdate } from "../types/world-object-update.type";

export const updateForest: UpdaterFunction = (
  game: GameData,
  generic: WorldObjectData,
  index: ArrayIndex,
): WorldObjectUpdate[] => {
  const object = Forest.parse(generic);
  return [{ object, index }];
};
