import WorldView from "../entities/world-view.entity";
import { GameMapConfig } from "./game-config.type";
import { WorldObjectData } from "./world-object-data.type";

export type BrushFunction = (
  context: CanvasRenderingContext2D,
  map: GameMapConfig,
  worldView: WorldView,
  object: WorldObjectData,
) => void;
