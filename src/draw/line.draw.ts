import { Color, Position } from "../types/standard.type";

export function drawLine(
  context: CanvasRenderingContext2D,
  {
    p1 = { x: 0, y: 0 },
    p2 = { x: 0, y: 0 },
    strokeColor = { red: 0, green: 0, blue: 0, opacity: 1 },
    lineWidth = 1,
  }: {
    p1?: Position;
    p2?: Position;
    radius?: number;
    fillColor?: Color;
    strokeColor?: Color;
    lineWidth?: number;
  },
): void {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineWidth = lineWidth;
  context.strokeStyle = `rgba(${strokeColor.red}, ${strokeColor.green}, ${strokeColor.blue}, ${strokeColor.opacity})`;
  context.stroke();
}
