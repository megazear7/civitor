import CpgCivitor from "../elements/cpg-civitor.element";
import WorldView from "./world-view.entity";
import {
  ArrayIndex,
  GameId,
  GameStatus,
  GameStorageName,
  MsSinceEpoch,
  UpdateStatus,
} from "../types/standard.type";
import { GameService } from "../services/game.service";
import { GameData } from "../types/game-data.type";
import { WorldObjectData } from "../types/world-object-data.type";
import { brushForest } from "../brushes/forest.brush";
import { brushPerson } from "../brushes/person.brush";
import { BrushFunction } from "../types/brush-function.type";
import { updatePerson } from "../updaters/person.updater";
import { updateForest } from "../updaters/forest.updater";
import { UpdaterFunction } from "../types/updater-function.type";
import { WorldObjectName } from "../types/world-object-name.type";
import WorldGrid from "./world-grid.entity";
import { buildPerson } from "../objects/person.object";
import { buildForest } from "../objects/forest.object";
import Environment from "./environment.entity";

export class Game {
  element: CpgCivitor;
  gameStatus: GameStatus;
  gameId: GameId;
  gameStorageName: GameStorageName;
  gameService: GameService;
  worldView: WorldView;
  worldGrid: WorldGrid;
  environment: Environment;
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
    this.worldGrid = new WorldGrid(this);
    this.environment = new Environment(this);
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
    this.worldView.update();

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

    this.environment.draw();

    for (const worldObject of this.gameData.objects) {
      this.drawObject(worldObject);
    }

    this.worldGrid.draw();
  }

  drawObject(worldObject: WorldObjectData): void {
    const func: BrushFunction = {
      [WorldObjectName.enum.person]: brushPerson,
      [WorldObjectName.enum.forest]: brushForest,
    }[worldObject.type];

    func(
      this.element.context,
      this.gameData.config.map,
      this.worldView,
      worldObject,
    );
  }

  updateObject(index: ArrayIndex): void {
    const worldObject = this.gameData.objects[index];
    const func: UpdaterFunction = {
      [WorldObjectName.enum.person]: updatePerson,
      [WorldObjectName.enum.forest]: updateForest,
    }[worldObject.type];
    const updates = func(this.gameData, worldObject, index);

    for (const update of updates) {
      update.object.zone = this.worldGrid.findZone(update.object);
      this.gameData.objects[update.index] = update.object;
    }
  }

  createGame(): void {
    this.gameData = {
      clock: 0,
      config: {
        map: {
          width: 2000,
          height: 2000,
        },
        zone: {
          rows: 2000 / 100,
          columns: 2000 / 100,
        },
        speed: 10,
      },
      objects: [],
      zones: [],
      players: [],
    };
    this.gameData.objects.push(buildPerson(this));
    this.gameData.objects.push(buildForest(this, { pos: { x: 210, y: 210 }}));
    this.gameData.objects.push(buildForest(this, { pos: { x: 1750, y: 80 }}));
    this.gameData.objects.push(buildForest(this, { pos: { x: 1750, y: 680 }}));
    this.gameData.objects.push(buildForest(this, { pos: { x: 750, y: 880 }}));
    this.gameData.objects.push(buildForest(this, { pos: { x: 950, y: 980 }}));
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
