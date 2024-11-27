import WorldView from "../entities/world-view.entity";
import { GameMapConfig } from "../types/game-config.type";
import { Forest } from "../types/world-object-data.type";

export function brushForest(
  context: CanvasRenderingContext2D,
  map: GameMapConfig,
  worldView: WorldView,
  forest: Forest,
): void {
  // TODO: The position depends on the world view (aka view port)
  context.fillStyle = `rgba(100, 0, 0, 1)`;
  context.fillRect(forest.pos.x, forest.pos.y, 20, 20);
}
