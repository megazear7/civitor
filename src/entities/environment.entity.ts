import { drawRectangle } from "../draw/rectangle.draw";
import { Game } from "./game.entity";

export default class Environment {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  draw(): void {
    drawRectangle(this.game.element.context, {
      pos: { x: this.game.element.canvas.width / 2, y: this.game.element.canvas.height / 2 },
      width: this.game.element.canvas.width,
      height: this.game.element.canvas.height,
      lineWidth: 0,
      strokeColor: { red: 0, green: 0, blue: 0, opacity: 0 },
      fillColor: { red: 166, green: 215, blue: 133, opacity: 1 },
    });
  }
}
