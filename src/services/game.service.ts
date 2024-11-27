import { GameData } from "../types/game-data.type";
import { GameStorage } from "../types/game-storage.type";
import { GameId, GameStorageName } from "../types/standard";
import { GameStorageLocal } from "./game-storage-local.service";

/**
 * This class should be responsible for pulling game data from some asynchronous data
 * source such as local storage or from an api or something. This should be abstracted
 * so that games can be saved in different places but it does not effect clients to
 * the service.
 */
export class GameService {
  gameId: GameId;
  gameStorageName: GameStorageName;
  storage: GameStorage;

  constructor(gameId: GameId, gameStorageName: GameStorageName) {
    this.gameId = gameId;
    this.gameStorageName = gameStorageName;

    if (gameStorageName === GameStorageName.enum.local) {
      this.storage = new GameStorageLocal(this.gameId);
    } else if (gameStorageName === GameStorageName.enum.online) {
      throw new Error("Not implemeneted");
    } else {
      throw new Error("Should not reach");
    }
  }

  async saveGame(game: GameData): Promise<void> {
    this.storage.saveGameData(game);
  }

  async loadGame(): Promise<void> {
    return this.storage.loadGameData();
  }

  async getGame(): Promise<GameData> {
    return this.storage.getGameData();
  }
}
