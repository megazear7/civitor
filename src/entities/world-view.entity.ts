import { Game } from "./game.entity";

export default class WorldView {
  game: Game;
  x: number;
  y: number;
  width: number;

  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = 1000;
  }

  get zoom(): number {
    return this.game.gameData.config.map.width / this.width;
  }

  adjustSize(size: number): number {
    const widthAsPercentageOfWorldView = size / this.width;
    return (
      this.game.element.context.canvas.width * widthAsPercentageOfWorldView
    );
  }
}
