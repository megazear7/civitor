import { GameData } from "../types/game-data.type";
import { UpdaterFunction } from "../types/updater-function.type";
import { Forest, WorldObjectData } from "../types/world-object-data.type";

export const updateForest: UpdaterFunction = (
  game: GameData,
  object: WorldObjectData,
): WorldObjectData => {
  const forest = Forest.parse(object);
  return forest;
};
