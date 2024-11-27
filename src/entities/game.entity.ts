import CpgCivitor from "../elements/cpg-civitor.element";
import WorldView from "./world-view.entity";
import { GameId, GameStatus, GameStorageName } from "../types/standard";
import { GameService } from "../services/game.service";
import { GameData } from "../types/game-data.type";

let x = 0;

export class Game {
  element: CpgCivitor;
  gameStatus: GameStatus;
  gameId: GameId;
  gameStorageName: GameStorageName;
  gameService: GameService;
  worldView: WorldView;
  _gameData: GameData | null;

  constructor(
    element: CpgCivitor,
    gameId: GameId | null,
    gameStorageName: GameStorageName,
  ) {
    this.element = element;
    this.gameStatus =
      gameId === null
        ? GameStatus.enum.NeedToCreate
        : GameStatus.enum.NeedToLoad;
    this.gameId = gameId || this.makeGameId();
    this.gameStorageName = gameStorageName;
    this.gameService = new GameService(this.gameId, this.gameStorageName);
    this.worldView = new WorldView(this);
    this._gameData = null;
  }

  async initialize(): Promise<void> {
    if (this.gameStatus === GameStatus.enum.NeedToCreate) {
      this.createGame();
      this.gameService.saveGame(this.gameData);
      this.gameStatus = GameStatus.enum.Created;
    } else {
      await this.gameService.loadGame();
      this.gameData = await this.gameService.getGame();
      this.gameStatus = GameStatus.enum.Loaded;
    }
  }

  update(): void {
    this.element.context.fillStyle = `rgba(100, 0, 0, 1)`;
    this.element.context.fillRect(5 + x, 5, 20, 20);
    x++;
  }

  set gameData(gameData: GameData) {
    this._gameData = gameData;
  }

  get gameData(): GameData {
    if (this._gameData === null) {
      throw new Error("Game data not loaded");
    }

    return this._gameData;
  }

  createGame(): void {
    // TODO implement
  }

  makeGameId(): string {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
