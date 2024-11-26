import CpgCivitor from "./element";

let x = 0;

export default class Game {
  element: CpgCivitor;

  constructor(element: CpgCivitor) {
    this.element = element;
  }

  update(): void {
    this.element.context.fillStyle = `rgba(100, 0, 0, 1)`;
    this.element.context.fillRect(5 + x, 5, 20, 20);
    x++;
  }
}
