import { Color, Position } from "../types/standard.type";
import { drawRectangle } from "./rectangle.draw";

export function drawSquare(
  context: CanvasRenderingContext2D,
  {
    pos = { x: 0, y: 0 },
    radius = 10,
    fillColor = { red: 0, green: 0, blue: 0, opacity: 1 },
    strokeColor = { red: 0, green: 0, blue: 0, opacity: 1 },
    lineWidth = 1,
  }: {
    pos?: Position;
    radius?: number;
    fillColor?: Color;
    strokeColor?: Color;
    lineWidth?: number;
  },
): void {
  drawRectangle(context, {
    pos,
    width: radius,
    height: radius,
    fillColor,
    strokeColor,
    lineWidth,
  });
}
