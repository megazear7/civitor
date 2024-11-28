import { GameData } from "../types/game-data.type";
import { UpdaterFunction } from "../types/updater-function.type";
import { Person, WorldObjectData } from "../types/world-object-data.type";

export const updatePerson: UpdaterFunction = (
  game: GameData,
  object: WorldObjectData,
): WorldObjectData => {
  const person = Person.parse(object);

  person.pos.x += person.vel.dx;
  person.pos.y += person.vel.dy;

  return person;
};
