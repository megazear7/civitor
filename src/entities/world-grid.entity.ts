import { drawLine } from "../draw/line.draw";
import { drawRectangle } from "../draw/rectangle.draw";
import { KeyCode } from "../types/key-code.type";
import { ZonePosition } from "../types/standard.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { Game } from "./game.entity";

export default class WorldGrid {
  game: Game;
  gridVisible: boolean;
  crosshairsVisible: boolean;
  keysToTrack: KeyCode[];
  keysPressed: KeyCode[];

  constructor(game: Game) {
    this.game = game;
    this.gridVisible = false;
    this.crosshairsVisible = false;
    this.keysToTrack = [KeyCode.enum.KeyZ];
    this.keysPressed = [];

    this.attachListeners();
  }

  attachListeners(): void {
    window.addEventListener("keydown", (event) => {
      const code = KeyCode.nullable()
        .catch(() => null)
        .parse(event.code);
      const map: { [key: string]: () => void } = {
        [KeyCode.enum.KeyZ]: this.toggleGrid.bind(this),
        [KeyCode.enum.KeyX]: this.toggleCrosshairs.bind(this),
      };
      if (code) {
        const func = map[code];

        if (func) {
          func();
        }
      }
    });
  }

  findZone(object: WorldObjectData): ZonePosition | null {
    const row = Math.floor(
      object.pos.y / this.game.gameData.config.zone.height,
    );
    const col = Math.floor(object.pos.x / this.game.gameData.config.zone.width);
    if (
      row >= 0 &&
      row < this.game.gameData.config.zone.rows &&
      col >= 0 &&
      col < this.game.gameData.config.zone.columns
    ) {
      return { row, col };
    } else {
      return null;
    }
  }

  updateZone(
    objectIndexA: number,
    oldZone: ZonePosition | null,
    newZone: ZonePosition | null,
  ): void {
    if (
      (oldZone &&
        newZone &&
        (oldZone.col !== newZone.col || oldZone.row !== newZone.row)) ||
      (oldZone === null && newZone !== null)
    ) {
      if (oldZone) {
        const oldList = this.getZoneArray(oldZone.row, oldZone.col);
        if (oldList) {
          oldList.filter((objectIndexB) => objectIndexA !== objectIndexB);
        }
      }

      const newList = this.getZoneArray(newZone.row, newZone.col);
      if (newList) {
        newList.push(objectIndexA);
      }
    }
  }

  getZoneArray(row: number, col: number): number[] | undefined {
    if (this.game.gameData.zones.length > row) {
      const cols = this.game.gameData.zones[row];
      if (cols && cols.length > col) {
        return cols[col];
      }
    }
    return undefined;
  }

  buildZones(): void {
    for (let row = 0; row < this.game.gameData.config.zone.rows; row++) {
      this.game.gameData.zones.push([]);
      for (let col = 0; col < this.game.gameData.config.zone.columns; col++) {
        this.game.gameData.zones[row].push([]);
      }
    }
  }

  draw(): void {
    if (this.gridVisible) {
      for (let i = 0; i < this.game.gameData.config.zone.rows; i++) {
        for (let j = 0; j < this.game.gameData.config.zone.rows; j++) {
          const pos = this.game.worldView.adjustPosition({
            x: i * this.width + this.width / 2,
            y: j * this.height + this.height / 2,
          });
          drawRectangle(this.game.element.context, {
            pos,
            width: this.game.worldView.adjustSize(this.width),
            height: this.game.worldView.adjustSize(this.height),
            lineWidth: 1,
            strokeColor: { red: 0, green: 0, blue: 0, opacity: 0.25 },
            fillColor: { red: 0, green: 0, blue: 0, opacity: 0 },
          });
        }
      }
    }

    if (this.crosshairsVisible) {
      const midX = this.game.element.canvas.width / 2;
      const midY = this.game.element.canvas.height / 2;

      drawLine(this.game.element.context, {
        p1: { x: midX - 10, y: midY },
        p2: { x: midX + 10, y: midY },
      });

      drawLine(this.game.element.context, {
        p1: { x: midX, y: midY - 10 },
        p2: { x: midX, y: midY + 10 },
      });
    }
  }

  toggleGrid(): void {
    this.gridVisible = !this.gridVisible;
  }

  toggleCrosshairs(): void {
    this.crosshairsVisible = !this.crosshairsVisible;
  }

  get width(): number {
    return (
      this.game.gameData.config.map.width /
      this.game.gameData.config.zone.columns
    );
  }

  get height(): number {
    return (
      this.game.gameData.config.map.height / this.game.gameData.config.zone.rows
    );
  }
}
