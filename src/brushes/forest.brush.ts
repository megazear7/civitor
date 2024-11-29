import { drawCircle } from "../draw/circle.draw";
import WorldView from "../entities/world-view.entity";
import { Forest } from "../objects/forest.object";
import { BrushFunction } from "../types/brush-function.type";
import { GameMapConfig } from "../types/game-config.type";
import { Color, Position, PositionWithRadius } from "../types/standard.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { random } from "../utils/random.util";

export const TREE_RADIUS = 15;
export const FOREST_FILL_COLOR: Color = {
  red: 0,
  green: 117,
  blue: 80,
  opacity: 1,
};
export const FOREST_LINE_COLOR: Color = {
  red: 0,
  green: 97,
  blue: 60,
  opacity: 1,
};

export const brushForest: BrushFunction = (
  context: CanvasRenderingContext2D,
  map: GameMapConfig,
  worldView: WorldView,
  object: WorldObjectData,
): void => {
  const forest = Forest.parse(object);
  const pos: Position = {
    x: forest.pos.x - worldView.x,
    y: forest.pos.y - worldView.y,
  };
  const fillColor = FOREST_FILL_COLOR;
  const strokeColor = FOREST_LINE_COLOR;
  const numberOfTrees = Math.round(random(object.seed) * 4 + 3);
  const trees: PositionWithRadius[] = [];
  for (let i = 0; i < numberOfTrees; i++) {
    const factor = TREE_RADIUS * numberOfTrees;
    trees.push({
      x: pos.x + random(object.seed + i) * factor - factor / 2,
      y: pos.y + random(object.seed - i) * factor - factor / 2,
      radius: TREE_RADIUS * (random(object.seed - 100 - i) * 0.25 + 0.75),
    });
  }

  for (const tree of trees) {
    const pos = { x: tree.x, y: tree.y };
    const radius = worldView.adjustSize(tree.radius);
    drawCircle(context, { pos, radius, fillColor, strokeColor });
  }
};
