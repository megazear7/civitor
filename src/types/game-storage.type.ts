import { GameData } from "./game-data.type";
import { GameId } from "./standard.type";

export interface GameStorage {
  gameId: GameId;
  data: GameData | null;

  saveGameData(data: GameData): Promise<void>;
  loadGameData(): Promise<void>;
  getGameData(): Promise<GameData>;
}
