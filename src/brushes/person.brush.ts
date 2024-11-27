import WorldView from "../entities/world-view.entity";
import { GameMapConfig } from "../types/game-config.type";
import { Person } from "../types/world-object-data.type";

export function brushPerson(
  context: CanvasRenderingContext2D,
  map: GameMapConfig,
  worldView: WorldView,
  person: Person,
): void {
  // TODO: The position depends on the world view (aka view port)
  context.fillStyle = `rgba(100, 0, 0, 1)`;
  context.fillRect(person.pos.x, person.pos.y, 20, 20);
}
