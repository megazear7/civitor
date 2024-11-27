import CpgCivitor from "../elements/cpg-civitor.element";
import { WorldObjectData } from "../types/world-object-data.type";
import { PlayerData } from "../types/player-data.type";
import WorldView from "./world-view.entity";
import { WorldZoneData } from "../types/world-zone-data.type";
import { GameId, GameStatus } from "../types/standard";
import { GameService } from "../services/game.service";
import { GameConfig } from "../types/game-config.type";

let x = 0;

export default class Game {
  element: CpgCivitor;
  gameStatus: GameStatus;
  gameId: GameId;
  gameService: GameService;
  worldView: WorldView;
  config: GameConfig | undefined;
  objects: WorldObjectData[];
  zones: WorldZoneData[];
  players: PlayerData[] | undefined;

  constructor(element: CpgCivitor, gameId: GameId | null) {
    this.element = element;
    this.gameStatus = gameId === null ? GameStatus.enum.NeedToCreate : GameStatus.enum.NeedToLoad;
    this.gameId = gameId || this.makeGameId();
    this.gameService = new GameService(this.gameId);
    this.worldView = new WorldView(this);
    this.objects = [];
    this.zones = [];
    this.players = [];
  }

  async initialize(): Promise<void> {
    if (this.gameStatus === GameStatus.enum.NeedToCreate) {
      await this.gameService.createGame();
      this.gameStatus = GameStatus.enum.Created;
    } else {
      await this.gameService.loadGame();
      this.gameStatus = GameStatus.enum.Loaded;
    }
    this.config = await this.gameService.getConfig();
    this.objects = await this.gameService.getWorldObjects();
    this.zones = await this.gameService.getWorldZones();
    this.players = await this.gameService.getPlayers();
  }

  update(): void {
    this.element.context.fillStyle = `rgba(100, 0, 0, 1)`;
    this.element.context.fillRect(5 + x, 5, 20, 20);
    x++;
  }

  makeGameId(): string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
}
