import CpgCivitor from "../elements/cpg-civitor.element";
import WorldView from "./world-view.entity";
import {
  GameId,
  GameStatus,
  GameStorageName,
  UpdateStatus,
} from "../types/standard";
import { GameService } from "../services/game.service";
import { GameData } from "../types/game-data.type";
import {
  WorldObjectData,
  WorldObjectType,
} from "../types/world-object-data.type";
import { brushForest } from "../brushes/forest.brush";
import { brushPerson } from "../brushes/person.brush";

export class Game {
  element: CpgCivitor;
  gameStatus: GameStatus;
  gameId: GameId;
  gameStorageName: GameStorageName;
  gameService: GameService;
  worldView: WorldView;
  _gameData: GameData | null;
  updateStatus: UpdateStatus = UpdateStatus.enum.idle;
  pingPeriod: number = 50; // MS to wait before updating as non controller.

  /**
   * True if this computer is the controller. The controller is computer
   * that does all of the game updates. The other computers in a multiplayer
   * game recieve the updates.
   */
  controller: boolean = true;

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
      await this.gameService.saveGame(this.gameData);
      this.gameStatus = GameStatus.enum.Created;
    } else {
      await this.gameService.loadGame();
      this.gameData = await this.gameService.getGame();
      this.gameStatus = GameStatus.enum.Loaded;
    }
  }

  frame(): void {
    if (this.updateStatus === UpdateStatus.enum.idle) {
      if (this.controller) {
        this.startUpdating();
      } else {
        this.checkForUpdate();
      }
    }

    if (this.updateStatus === UpdateStatus.enum.updated) {
      this.drawScreen();

      if (this.controller) {
        this.updateStatus = UpdateStatus.enum.idle;
      } else {
        this.checkForUpdate();
        setTimeout(() => {
          this.updateStatus = UpdateStatus.enum.idle;
        }, this.pingPeriod);
      }
    }
  }

  async startUpdating(): Promise<void> {
    const msFromLastUpdate = Date.now() - this.gameData.clock;

    for (const worldObject of this.gameData.objects) {
      this.updateObject(worldObject, msFromLastUpdate);
    }

    this.updateStatus = UpdateStatus.enum.updated;
  }

  async drawScreen(): Promise<void> {
    for (const worldObject of this.gameData.objects) {
      this.drawObject(worldObject);
    }

    this.updateStatus = UpdateStatus.enum.idle;
  }

  async checkForUpdate(): Promise<void> {
    this.gameData = await this.gameService.getGame();
    this.updateStatus = UpdateStatus.enum.updated;
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

  drawObject(worldObject: WorldObjectData): void {
    if (worldObject.type === WorldObjectType.enum.person) {
      brushPerson(
        this.element.context,
        this.gameData.config.map,
        this.worldView,
        worldObject,
      );
    } else if (worldObject.type === WorldObjectType.enum.forest) {
      brushForest(
        this.element.context,
        this.gameData.config.map,
        this.worldView,
        worldObject,
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateObject(worldObject: WorldObjectData, elapsedTime: number): void {
    // TODO: All updates need adjusted based on the amount of time elasped since the last update
    // so that objects move at the same speed regardless of how fast the computer renders frames.
    //console.log(worldObject, elapsedTime);
  }

  createGame(): void {
    this.gameData = {
      clock: Date.now(),
      config: {
        map: {
          width: 10000,
          height: 10000,
        },
        zone: {
          width: 100,
          height: 100,
        },
      },
      objects: [
        {
          type: "person",
          pos: {
            x: 100,
            y: 100,
          },
        },
      ],
      zones: [],
      players: [],
    };
    this.gameService.saveGame(this.gameData);
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
