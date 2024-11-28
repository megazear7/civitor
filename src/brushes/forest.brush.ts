import { drawCircle } from "../draw/circle.draw";
import WorldView from "../entities/world-view.entity";
import { Forest } from "../objects/forest.object";
import { BrushFunction } from "../types/brush-function.type";
import { GameMapConfig } from "../types/game-config.type";
import { Color, Position } from "../types/standard.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { random } from "../utils/random.util";

export const TREE_RADIUS = 15;
export const FOREST_COLOR: Color = {
  red: 0,
  green: 117,
  blue: 80,
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
  const radius = TREE_RADIUS * worldView.zoom;
  const fillColor = FOREST_COLOR;
  const numberOfTrees = Math.round(random(object.seed) * 4 + 3);
  const trees: Position[] = [];
  for (let i = 0; i < numberOfTrees; i++) {
    const factor = TREE_RADIUS * numberOfTrees;
    trees.push({
      x: pos.x + random(object.seed + i) * factor - factor / 2,
      y: pos.y + random(object.seed - i) * factor - factor / 2,
    });
  }

  for (const tree of trees) {
    const pos = tree;
    drawCircle(context, { pos, radius, fillColor });
  }
};
