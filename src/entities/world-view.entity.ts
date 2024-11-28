import { Game } from "./game.entity";

export default class WorldView {
  game: Game;
  x: number;
  y: number;
  zoom: number;

  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
  }
}
