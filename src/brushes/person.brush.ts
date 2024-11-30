import WorldView from "../entities/world-view.entity";
import { BrushFunction } from "../types/brush-function.type";
import { GameMapConfig } from "../types/game-config.type";
import { Position } from "../types/standard.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { drawCircle } from "../draw/circle.draw";
import { Person } from "../objects/person.object";

export const PERSON_RADIUS = 10;

export const brushPerson: BrushFunction = (
  context: CanvasRenderingContext2D,
  map: GameMapConfig,
  worldView: WorldView,
  object: WorldObjectData,
): void => {
  const person = Person.parse(object);
  const radius = worldView.adjustSize(PERSON_RADIUS);
  const pos: Position = worldView.adjustPosition({
    x: person.pos.x,
    y: person.pos.y,
  });

  drawCircle(context, { pos, radius });
};
