import { Game } from "../entities/game.entity";
import { Person } from "../objects/person.object";
import { ArrayIndex } from "../types/standard.type";
import { UpdaterFunction } from "../types/updater-function.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { WorldObjectUpdate } from "../types/world-object-update.type";

export const updatePerson: UpdaterFunction = (
  game: Game,
  generic: WorldObjectData,
  index: ArrayIndex,
): WorldObjectUpdate[] => {
  const object = Person.parse(generic);
  const oldZone = object.zone;

  object.pos.x += object.vel.dx;
  object.pos.y += object.vel.dy;
  object.zone = game.worldGrid.findZone(object);

  const newZone = object.zone;
  const zone = { oldZone, newZone };
  const update: WorldObjectUpdate = { object, index, zone };

  return [update];
};
