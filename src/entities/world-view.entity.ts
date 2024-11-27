import Game from "./game.entity";
import { WorldObjectData } from "../types/world-object-data.type";

export default class WorldView {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
}
