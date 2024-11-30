import { Game } from "../entities/game.entity";
import { ArrayIndex } from "./standard.type";
import { WorldObjectData } from "./world-object-data.type";
import { WorldObjectUpdate } from "./world-object-update.type";

export type UpdaterFunction = (
  game: Game,
  generic: WorldObjectData,
  index: ArrayIndex,
) => WorldObjectUpdate[];
