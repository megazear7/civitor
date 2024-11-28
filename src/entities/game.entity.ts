import CpgCivitor from "../elements/cpg-civitor.element";
import WorldView from "./world-view.entity";
import {
  GameId,
  GameStatus,
  GameStorageName,
  Milliseconds,
  MsSinceEpoch,
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
import { BrushFunction } from "../types/brush-function.type";
import { updatePerson } from "../updaters/person.updater";
import { updateForest } from "../updaters/forest.updater";
import { UpdaterFunction } from "../types/updater-function.type";

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
  lastUpdate: MsSinceEpoch;

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
    this.lastUpdate = Date.now();
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

  async frame(): Promise<void> {
    if (this.updateStatus === UpdateStatus.enum.idle) {
      this.updateStatus = UpdateStatus.enum.updating;
      const now = Date.now();
      const gameNeedsUpdated =
        now - this.lastUpdate > this.gameData.config.speed;
      const needToCheckForUpdates = now - this.lastUpdate > this.pingPeriod;

      if (this.controller && gameNeedsUpdated) {
        await this.performUpdates();
      }

      if (!this.controller && needToCheckForUpdates) {
        await this.pullUpdates();
      }

      await this.drawScreen();
      this.updateStatus = UpdateStatus.enum.idle;
    }
  }

  async performUpdates(): Promise<void> {
    this.gameData.clock++;
    this.lastUpdate = Date.now();

    for (let i = 0; i < this.gameData.objects.length; i++) {
      this.updateObject(i);
    }

    this.gameService.saveGame(this.gameData);
  }

  async pullUpdates(): Promise<void> {
    this.gameData = await this.gameService.getGame();
  }

  async drawScreen(): Promise<void> {
    this.element.context.clearRect(
      0,
      0,
      this.element.container.offsetWidth,
      this.element.container.offsetHeight,
    );

    for (const worldObject of this.gameData.objects) {
      this.drawObject(worldObject);
    }
  }

  drawObject(worldObject: WorldObjectData): void {
    const func: BrushFunction = {
      [WorldObjectType.enum.person]: brushPerson,
      [WorldObjectType.enum.forest]: brushForest,
    }[worldObject.type];

    func(
      this.element.context,
      this.gameData.config.map,
      this.worldView,
      worldObject,
    );
  }

  updateObject(index: Milliseconds): void {
    const worldObject = this.gameData.objects[index];
    const func: UpdaterFunction = {
      [WorldObjectType.enum.person]: updatePerson,
      [WorldObjectType.enum.forest]: updateForest,
    }[worldObject.type];

    this.gameData.objects[index] = func(this.gameData, worldObject);
  }

  createGame(): void {
    this.gameData = {
      clock: 0,
      config: {
        map: {
          width: 10000,
          height: 10000,
        },
        zone: {
          width: 100,
          height: 100,
        },
        speed: 10,
      },
      objects: [
        {
          type: "person",
          pos: {
            x: 100,
            y: 100,
          },
          vel: {
            dx: 1,
            dy: 0,
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

  set gameData(gameData: GameData) {
    this._gameData = gameData;
  }

  get gameData(): GameData {
    if (this._gameData === null) {
      throw new Error("Game data not loaded");
    }

    return this._gameData;
  }
}
