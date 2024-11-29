import { KeyCode } from "../types/key-code.type";
import { Game } from "./game.entity";

const ZOOM_INCREMENT = 100;

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

    this.attachListeners();
  }
  attachListeners() {
    window.addEventListener('keydown', event => {
      const func = {
        [KeyCode.enum.Minus]: this.zoomOut.bind(this),
        [KeyCode.enum.Equal]: this.zoomIn.bind(this),
      }[event.code];

      if (func) {
        func();
      }
    });
  }

  zoomOut() {
    if (this.width < this.game.gameData.config.map.width - ZOOM_INCREMENT + 1) {
      this.width += ZOOM_INCREMENT;
    }
  }

  zoomIn() {
    if (this.width > ZOOM_INCREMENT * 2) {
      this.width -= ZOOM_INCREMENT;
    }
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
