import { Game } from "../entities/game.entity";
import { GameId, GameStorageName } from "../types/standard";

export default class CpgCivitor extends HTMLElement {
  shadow: ShadowRoot;
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  game: Game;
  gameId: string | null;
  type: GameStorageName | null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
          <style>
            canvas {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          </style>
          <canvas></canvas>
        `;

    this.canvas = this.shadow.querySelector("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.container = this as HTMLElement;
    const searchParams = new URLSearchParams(document.location.search);
    this.gameId = GameId.nullable().parse(searchParams.get("game"));
    this.type = GameStorageName.parse(searchParams.get("type"));
    this.game = new Game(this, this.gameId, this.type);
    this.game.initialize();
    const url = new URL(window.location.href);
    url.searchParams.set("game", this.game.gameId);
    history.pushState(null, "", url);
  }

  connectedCallback(): void {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;

    let resizeTimer: NodeJS.Timeout;
    window.onresize = (): void => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
      }, 250);
    };

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    function animate(): void {
      requestAnimationFrame(animate);
      self.context.clearRect(
        0,
        0,
        self.container.offsetWidth,
        self.container.offsetHeight,
      );
      self.game.frame();
    }

    animate();
  }
}

customElements.define("cpg-civitor", CpgCivitor);
