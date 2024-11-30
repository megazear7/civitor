import { z } from "zod";
import { Position, Velocity } from "../types/standard.type";
import { BaseWorldObject } from "../types/base-world-object.type";
import { WorldObjectName } from "../types/world-object-name.type";
import { seed } from "../utils/random.util";
import { Game } from "../entities/game.entity";

export const Person = BaseWorldObject.extend({
  type: z.literal(WorldObjectName.enum.person),
  vel: Velocity,
});
export type Person = z.infer<typeof Person>;

export function buildPerson(
  game: Game,
  {
    pos = { x: 25, y: 50 },
  }: {
    pos?: Position;
  } = {},
): Person {
  const obj: Person = {
    type: "person",
    pos,
    vel: {
      dx: 1,
      dy: 1,
    },
    seed: seed(),
    zone: { row: 0, col: 0 },
  };

  obj.zone = game.worldGrid.findZone(obj);

  return obj;
}
