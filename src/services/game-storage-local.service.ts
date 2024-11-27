import { GameData } from "../types/game-data.type";
import { GameStorage } from "../types/game-storage.type";
import { GameId } from "../types/standard";

/**
 * This services saves game state to localstorage.
 */
export class GameStorageLocal implements GameStorage {
  gameId: GameId;
  data: GameData | null;

  constructor(gameId: GameId) {
    this.gameId = gameId;
    this.data = null;
  }

  async saveGameData(data: GameData): Promise<void> {
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  async loadGameData(): Promise<void> {
    this.data = GameData.parse(
      window.localStorage.getItem(this.localStorageKey),
    );
  }

  async getGameData(): Promise<GameData> {
    if (!this.data) {
      throw new Error("Game data not loaded");
    }

    return this.data;
  }

  private get localStorageKey(): string {
    return `civitor_${this.gameId}_data`;
  }
}
