import { KeyCode } from "../types/key-code.type";
import { Position, PositionWithRadius } from "../types/standard.type";
import { intersection } from "../utils/math.util";
import { Game } from "./game.entity";

export default class WorldView {
  game: Game;
  x: number;
  y: number;
  width: number;
  baseZoomIncrement: number = 1;
  zoomIncrement: number = this.baseZoomIncrement;
  zoomAcceleration: number = 0.01;
  baseScrollIncrement: number = 1;
  scrollIncrement: number = this.baseScrollIncrement;
  scrollAcceleration: number = 0.01;
  minZoom: number;
  keysToTrack: KeyCode[];
  keysPressed: KeyCode[];
  zoomKeys: KeyCode[] = [KeyCode.enum.Minus, KeyCode.enum.Equal];
  scrollKeys: KeyCode[] = [
    KeyCode.enum.KeyW,
    KeyCode.enum.KeyA,
    KeyCode.enum.KeyS,
    KeyCode.enum.KeyD,
    KeyCode.enum.ArrowUp,
    KeyCode.enum.ArrowLeft,
    KeyCode.enum.ArrowRight,
    KeyCode.enum.ArrowDown,
  ];

  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = 1000;
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

    if (intersection(this.keysPressed, this.scrollKeys).length === 0) {
      this.scrollIncrement = this.baseScrollIncrement;
    }

    if (intersection(this.keysPressed, this.zoomKeys).length === 0) {
      this.zoomIncrement = this.baseZoomIncrement;
    }
  }

  zoomOut(): void {
    if (
      this.width <
      this.game.gameData.config.map.width - this.zoomIncrement + 1
    ) {
      const oldWidth = this.width;
      const oldHeight = this.height;
      this.width += this.zoomIncrement;

      const changeInWidth = this.width - oldWidth;
      const newX = this.x - changeInWidth / 4;
      this.x =
        newX > 0
          ? newX + this.width < this.game.gameData.config.map.width
            ? newX
            : this.game.gameData.config.map.width - this.width
          : 0;

      const changeInHeight = this.height - oldHeight;
      const newY = this.y - changeInHeight / 4;
      this.y =
        newY > 0
          ? newY + this.height < this.game.gameData.config.map.height
            ? newY
            : this.game.gameData.config.map.height - this.height
          : 0;

      this.zoomIncrement *= 1 + this.zoomAcceleration;
    }
  }

  zoomIn(): void {
    if (this.width > this.minZoom) {
      const oldWidth = this.width;
      const oldHeight = this.height;
      this.width -= this.zoomIncrement;

      const changeInWidth = oldWidth - this.width;
      const newX = this.x + changeInWidth / 4;
      this.x =
        newX > 0
          ? newX + this.width < this.game.gameData.config.map.width
            ? newX
            : this.game.gameData.config.map.width - this.width
          : 0;

      const changeInHeight = oldHeight - this.height;
      const newY = this.y + changeInHeight / 4;
      this.y =
        newY > 0
          ? newY + this.height < this.game.gameData.config.map.height
            ? newY
            : this.game.gameData.config.map.height - this.height
          : 0;

      this.zoomIncrement *= 1 + this.zoomAcceleration;
    }
  }

  scrollLeft(): void {
    if (this.x > this.scrollIncrement) {
      this.x -= this.scrollIncrement;
      this.scrollIncrement *= 1 + this.scrollAcceleration;
    } else {
      this.x = 0;
    }
  }

  scrollRight(): void {
    const furthestRightScroll =
      this.game.gameData.config.map.width - this.width;
    if (this.x < furthestRightScroll - this.scrollIncrement) {
      this.x += this.scrollIncrement;
      this.scrollIncrement *= 1 + this.scrollAcceleration;
    } else {
      this.x = furthestRightScroll;
    }
  }

  scrollUp(): void {
    if (this.y > this.scrollIncrement) {
      this.y -= this.scrollIncrement;
      this.scrollIncrement *= 1 + this.scrollAcceleration;
    } else {
      this.y = 0;
    }
  }

  scrollDown(): void {
    const lowestScroll = this.game.gameData.config.map.height - this.height;
    if (this.y < lowestScroll - this.scrollIncrement) {
      this.y += this.scrollIncrement;
      this.scrollIncrement *= 1 + this.scrollAcceleration;
    } else {
      this.y = lowestScroll;
    }
  }

  get zoom(): number {
    return this.game.gameData.config.map.width / this.width;
  }

  get height(): number {
    const canvasRatio =
      this.game.element.context.canvas.height /
      this.game.element.context.canvas.width;
    return this.width * canvasRatio;
  }

  adjustSize(size: number): number {
    const widthAsPercentageOfWorldView = size / this.width;
    return (
      this.game.element.context.canvas.width * widthAsPercentageOfWorldView
    );
  }

  adjustPositionX(x: number): number {
    return this.adjustSize(x - this.x);
  }

  adjustPositionY(y: number): number {
    return this.adjustSize(y - this.y);
  }

  adjustPosition(pos: Position): Position {
    return {
      x: this.adjustPositionX(pos.x),
      y: this.adjustPositionY(pos.y),
    };
  }

  adjustPositionAndRadius(pos: PositionWithRadius): PositionWithRadius {
    return {
      x: this.adjustPositionX(pos.x),
      y: this.adjustPositionY(pos.y),
      radius: this.adjustSize(pos.radius),
    };
  }
}
