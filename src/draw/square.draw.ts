import { Color, Position } from "../types/standard.type";

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
  context.beginPath();
  context.moveTo(pos.x - radius, pos.y - radius);
  context.lineTo(pos.x + radius, pos.y - radius);
  context.lineTo(pos.x + radius, pos.y + radius);
  context.lineTo(pos.x - radius, pos.y + radius);
  context.lineTo(pos.x - radius, pos.y - radius - lineWidth / 2);
  context.lineWidth = lineWidth;
  context.strokeStyle = `rgba(${strokeColor.red}, ${strokeColor.green}, ${strokeColor.blue}, ${strokeColor.opacity})`;
  context.stroke();
  context.fillStyle = `rgba(${fillColor.red}, ${fillColor.green}, ${fillColor.blue}, ${fillColor.opacity})`;
  context.fill();
}
