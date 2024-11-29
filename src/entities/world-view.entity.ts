import { KeyCode } from "../types/key-code.type";
import { Position, PositionWithRadius } from "../types/standard.type";
import { Game } from "./game.entity";

export default class WorldView {
  game: Game;
  x: number;
  y: number;
  width: number;
  zoomIncrement: number;
  scrollIncrement: number;
  minZoom: number;
  keysToTrack: KeyCode[];
  keysPressed: KeyCode[];

  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = 1000;
    this.zoomIncrement = 5;
    this.scrollIncrement = 5;
    this.minZoom = 200;
    this.keysToTrack = [
      KeyCode.enum.Minus,
      KeyCode.enum.Equal,
      KeyCode.enum.KeyW,
      KeyCode.enum.KeyA,
      KeyCode.enum.KeyS,
      KeyCode.enum.KeyD,
      KeyCode.enum.ArrowUp,
      KeyCode.enum.ArrowLeft,
      KeyCode.enum.ArrowRight,
      KeyCode.enum.ArrowDown,
    ];
    this.keysPressed = [];

    this.attachListeners();
  }

  attachListeners(): void {
    window.addEventListener("keydown", (event) => {
      const code = KeyCode.nullable()
        .catch(() => null)
        .parse(event.code);
      if (
        code &&
        this.keysToTrack.includes(code) &&
        !this.keysPressed.includes(code)
      ) {
        this.keysPressed.push(code);
      }
    });

    window.addEventListener("keyup", (event) => {
      const code = KeyCode.nullable()
        .catch(() => null)
        .parse(event.code);
      if (
        code &&
        this.keysToTrack.includes(code) &&
        this.keysPressed.includes(code)
      ) {
        this.keysPressed = this.keysPressed.filter((key) => key != code);
      }
    });
  }

  update(): void {
    for (const key of this.keysPressed) {
      const map: { [key: string]: () => void } = {
        [KeyCode.enum.Minus]: this.zoomOut.bind(this),
        [KeyCode.enum.Equal]: this.zoomIn.bind(this),
        [KeyCode.enum.KeyW]: this.scrollUp.bind(this),
        [KeyCode.enum.KeyA]: this.scrollLeft.bind(this),
        [KeyCode.enum.KeyD]: this.scrollRight.bind(this),
        [KeyCode.enum.KeyS]: this.scrollDown.bind(this),
        [KeyCode.enum.ArrowUp]: this.scrollUp.bind(this),
        [KeyCode.enum.ArrowLeft]: this.scrollLeft.bind(this),
        [KeyCode.enum.ArrowRight]: this.scrollRight.bind(this),
        [KeyCode.enum.ArrowDown]: this.scrollDown.bind(this),
      };
      const func = map[key];

      if (func) {
        func();
      }
    }
  }

  zoomOut(): void {
    if (
      this.width <
      this.game.gameData.config.map.width - this.zoomIncrement + 1
    ) {
      this.width += this.zoomIncrement;
    }
  }

  zoomIn(): void {
    if (this.width > this.minZoom) {
      this.width -= this.zoomIncrement;
    }
  }

  scrollLeft(): void {
    if (this.x > this.scrollIncrement) {
      this.x -= this.scrollIncrement;
    } else {
      this.x = 0;
    }
  }

  scrollRight(): void {
    const furthestRightScroll = this.game.gameData.config.map.width - this.width;
    if (this.x < furthestRightScroll - this.scrollIncrement) {
      this.x += this.scrollIncrement;
    } else {
      this.x = furthestRightScroll;
    }
  }

  scrollUp(): void {
    if (this.y > this.scrollIncrement) {
      this.y -= this.scrollIncrement;
    } else {
      this.y = 0;
    }
  }

  scrollDown(): void {
    const lowestScroll = this.game.gameData.config.map.height - this.height;
    if (this.y < lowestScroll - this.scrollIncrement) {
      this.y += this.scrollIncrement;
    } else {
      this.y = lowestScroll;
    }
  }

  get zoom(): number {
    return this.game.gameData.config.map.width / this.width;
  }

  get height(): number {
    const canvasRatio = this.game.element.context.canvas.height / this.game.element.context.canvas.width;
    return this.width * canvasRatio;
  }

  adjustSize(size: number): number {
    const widthAsPercentageOfWorldView = size / this.width;
    return (
      this.game.element.context.canvas.width * widthAsPercentageOfWorldView
    );
  }

  adjustPosition(pos: Position): Position {
    return {
      x: pos.x - this.x,
      y: pos.y - this.y,
    }
  }

  adjustPositionAndRadius(pos: PositionWithRadius): PositionWithRadius {
    return {
      x: pos.x - this.x,
      y: pos.y - this.y,
      radius: this.adjustSize(pos.radius),
    }
  }
}
