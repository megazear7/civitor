import { GameConfig } from "../types/game-config.type";
import { PlayerData } from "../types/player-data.type";
import { GameId } from "../types/standard";
import { WorldObjectData } from "../types/world-object-data.type";
import { WorldZoneData } from "../types/world-zone-data.type";

const config: GameConfig = {
  map: {
    width: 5000,
    height: 5000,
  },
  zone: {
    width: 100,
    height: 100,
  },
};

export class GameService {
  gameId: GameId

  constructor(gameId: GameId) {
    this.gameId = gameId;
  }

  async createGame(): Promise<void> {
  }

  async loadGame(): Promise<void> {
  }

  async getConfig(): Promise<GameConfig> {
    return config;
  }

  async getPlayers(): Promise<PlayerData[]> {
    return [];
  }

  async getWorldObjects(): Promise<WorldObjectData[]> {
    return [];
  }

  async getWorldZones(): Promise<WorldZoneData[]> {
    return [];
  }
}
