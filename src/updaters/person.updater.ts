import { Person } from "../objects/person.object";
import { GameData } from "../types/game-data.type";
import { ArrayIndex } from "../types/standard.type";
import { UpdaterFunction } from "../types/updater-function.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { WorldObjectUpdate } from "../types/world-object-update.type";

export const updatePerson: UpdaterFunction = (
  game: GameData,
  generic: WorldObjectData,
  index: ArrayIndex,
): WorldObjectUpdate[] => {
  const object = Person.parse(generic);

  object.pos.x += object.vel.dx;
  object.pos.y += object.vel.dy;

  return [{ object, index }];
};
