import { Game } from "./game.entity";

export default class WorldView {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
}
