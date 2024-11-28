import WorldView from "../entities/world-view.entity";
import { BrushFunction } from "../types/brush-function.type";
import { GameMapConfig } from "../types/game-config.type";
import { Forest, WorldObjectData } from "../types/world-object-data.type";

export const brushForest: BrushFunction = (
  context: CanvasRenderingContext2D,
  map: GameMapConfig,
  worldView: WorldView,
  object: WorldObjectData,
): void => {
  const forest = Forest.parse(object);
  // TODO: The position depends on the world view (aka view port)
  context.fillStyle = `rgba(100, 0, 0, 1)`;
  context.fillRect(forest.pos.x, forest.pos.y, 20, 20);
};
