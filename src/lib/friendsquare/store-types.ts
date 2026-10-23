import type { FriendsquareState } from "@/types/friendsquare";

export type GameRowStatus = "waiting" | "active" | "done" | "abandoned";

export interface UserRow {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

export interface GameRow {
  id: string;
  code: string;
  status: GameRowStatus;
  playerAId: string;
  playerBId: string | null;
  state: FriendsquareState;
  winnerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export class StoreConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreConflictError";
  }
}

export class StoreNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreNotFoundError";
  }
}

export interface FriendsquareStore {
  getUserByUsername(username: string): Promise<UserRow | null>;
  getUserById(id: string): Promise<UserRow | null>;
  createUser(username: string, passwordHash: string): Promise<UserRow>;
  getActiveGameForUser(userId: string): Promise<GameRow | null>;
  getGameById(id: string): Promise<GameRow | null>;
  getGameByCode(code: string): Promise<GameRow | null>;
  createGame(creatorId: string, state: FriendsquareState): Promise<GameRow>;
  joinGame(gameId: string, userId: string): Promise<GameRow>;
  /**
   * Conditional write: only applies when the stored moveCount matches
   * `expectedMoveCount`, so two concurrent moves can't both land.
   */
  updateGameState(
    gameId: string,
    expectedMoveCount: number,
    state: FriendsquareState,
    winnerId: string | null,
  ): Promise<GameRow>;
  leaveGame(gameId: string, userId: string): Promise<GameRow>;
}
