import { Color, Position } from "../types/standard.type";

export function drawRectangle(
  context: CanvasRenderingContext2D,
  {
    pos = { x: 0, y: 0 },
    width = 10,
    height = 10,
    fillColor = { red: 0, green: 0, blue: 0, opacity: 1 },
    strokeColor = { red: 0, green: 0, blue: 0, opacity: 1 },
    lineWidth = 1,
  }: {
    pos?: Position;
    width?: number;
    height?: number;
    fillColor?: Color;
    strokeColor?: Color;
    lineWidth?: number;
  },
): void {
  context.beginPath();
  context.moveTo(pos.x - width / 2, pos.y - height / 2);
  context.lineTo(pos.x + width / 2, pos.y - height / 2);
  context.lineTo(pos.x + width / 2, pos.y + height / 2);
  context.lineTo(pos.x - width / 2, pos.y + height / 2);
  context.lineTo(pos.x - width / 2, pos.y - height / 2 - lineWidth / 2);
  context.lineWidth = lineWidth;
  context.strokeStyle = `rgba(${strokeColor.red}, ${strokeColor.green}, ${strokeColor.blue}, ${strokeColor.opacity})`;
  context.stroke();
  context.fillStyle = `rgba(${fillColor.red}, ${fillColor.green}, ${fillColor.blue}, ${fillColor.opacity})`;
  context.fill();
}
