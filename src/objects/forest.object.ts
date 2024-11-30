import { z } from "zod";
import { BaseWorldObject } from "../types/base-world-object.type";
import { WorldObjectName } from "../types/world-object-name.type";
import { seed } from "../utils/random.util";
import { Game } from "../entities/game.entity";
import { Position } from "../types/standard.type";

export const Forest = BaseWorldObject.extend({
  type: z.literal(WorldObjectName.enum.forest),
});
export type Forest = z.infer<typeof Forest>;

export function buildForest(game: Game, {
  pos = { x: 100, y: 100 },
}: {
  pos?: Position;
} = {}): Forest {
  const obj: Forest = {
    type: "forest",
    pos,
    seed: seed(),
    zone: { row: 0, col: 0 },
  };

  obj.zone = game.worldGrid.findZone(obj);

  return obj;
}
