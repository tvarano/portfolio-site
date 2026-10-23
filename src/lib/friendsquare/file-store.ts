import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { FriendsquareState } from "@/types/friendsquare";
import { newId, newInviteCode } from "./ids";
import {
  StoreConflictError,
  StoreNotFoundError,
  type FriendsquareStore,
  type GameRow,
  type UserRow,
} from "./store-types";

interface FileData {
  users: UserRow[];
  games: GameRow[];
}

function dataFilePath(): string {
  return (
    process.env.FRIENDSQUARE_DATA_FILE ??
    path.join(process.cwd(), ".data", "friendsquare.json")
  );
}

/**
 * JSON-file backend for local development only. Production uses Postgres
 * (see postgres-store.ts). Writes are serialized with an in-process mutex.
 */
export class FileFriendsquareStore implements FriendsquareStore {
  private mutex: Promise<void> = Promise.resolve();

  private async withLock<T>(fn: (data: FileData) => T | Promise<T>): Promise<T> {
    let release!: () => void;
    const next = new Promise<void>((resolve) => {
      release = resolve;
    });
    const prev = this.mutex;
    this.mutex = prev.then(() => next);
    await prev;
    try {
      const data = await this.read();
      const result = await fn(data);
      await this.write(data);
      return result;
    } finally {
      release();
    }
  }

  private async read(): Promise<FileData> {
    try {
      const raw = await readFile(dataFilePath(), "utf8");
      const parsed = JSON.parse(raw) as FileData;
      if (!Array.isArray(parsed.users) || !Array.isArray(parsed.games)) {
        throw new Error("Invalid friendsquare data file.");
      }
      return parsed;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return { users: [], games: [] };
      }
      throw err;
    }
  }

  private async write(data: FileData): Promise<void> {
    const file = dataFilePath();
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(data), "utf8");
  }

  async getUserByUsername(username: string): Promise<UserRow | null> {
    const data = await this.read();
    return data.users.find((u) => u.username === username) ?? null;
  }

  async getUserById(id: string): Promise<UserRow | null> {
    const data = await this.read();
    return data.users.find((u) => u.id === id) ?? null;
  }

  async createUser(username: string, passwordHash: string): Promise<UserRow> {
    return this.withLock((data) => {
      if (data.users.some((u) => u.username === username)) {
        throw new StoreConflictError("Username is taken.");
      }
      const now = new Date().toISOString();
      const user: UserRow = { id: newId(), username, passwordHash, createdAt: now };
      data.users.push(user);
      return user;
    });
  }

  async getActiveGameForUser(userId: string): Promise<GameRow | null> {
    const data = await this.read();
    return (
      data.games.find(
        (g) =>
          (g.status === "waiting" || g.status === "active") &&
          (g.playerAId === userId || g.playerBId === userId),
      ) ?? null
    );
  }

  async getGameById(id: string): Promise<GameRow | null> {
    const data = await this.read();
    return data.games.find((g) => g.id === id) ?? null;
  }

  async getGameByCode(code: string): Promise<GameRow | null> {
    const data = await this.read();
    return data.games.find((g) => g.code === code) ?? null;
  }

  async createGame(creatorId: string, state: FriendsquareState): Promise<GameRow> {
    return this.withLock((data) => {
      const active = data.games.find(
        (g) =>
          (g.status === "waiting" || g.status === "active") &&
          (g.playerAId === creatorId || g.playerBId === creatorId),
      );
      if (active) {
        throw new StoreConflictError("You already have an active game.");
      }
      let code = newInviteCode();
      let guard = 0;
      while (data.games.some((g) => g.code === code) && guard < 50) {
        code = newInviteCode();
        guard += 1;
      }
      const now = new Date().toISOString();
      const game: GameRow = {
        id: newId(),
        code,
        status: "waiting",
        playerAId: creatorId,
        playerBId: null,
        state,
        winnerId: null,
        createdAt: now,
        updatedAt: now,
      };
      data.games.push(game);
      return game;
    });
  }

  async joinGame(gameId: string, userId: string): Promise<GameRow> {
    return this.withLock((data) => {
      const game = data.games.find((g) => g.id === gameId);
      if (!game) throw new StoreNotFoundError("Game not found.");
      if (game.playerAId === userId || game.playerBId === userId) return game;
      if (game.status !== "waiting" || game.playerBId !== null) {
        throw new StoreConflictError("Game is no longer joinable.");
      }
      const active = data.games.find(
        (g) =>
          g.id !== gameId &&
          (g.status === "waiting" || g.status === "active") &&
          (g.playerAId === userId || g.playerBId === userId),
      );
      if (active) {
        throw new StoreConflictError("You already have an active game.");
      }
      game.playerBId = userId;
      game.status = "active";
      game.updatedAt = new Date().toISOString();
      return game;
    });
  }

  async updateGameState(
    gameId: string,
    expectedMoveCount: number,
    state: FriendsquareState,
    winnerId: string | null,
  ): Promise<GameRow> {
    return this.withLock((data) => {
      const game = data.games.find((g) => g.id === gameId);
      if (!game) throw new StoreNotFoundError("Game not found.");
      if (game.state.moveCount !== expectedMoveCount) {
        throw new StoreConflictError("Game changed; refresh and retry.");
      }
      game.state = state;
      game.winnerId = winnerId;
      if (state.status === "done") game.status = "done";
      game.updatedAt = new Date().toISOString();
      return game;
    });
  }

  async leaveGame(gameId: string, userId: string): Promise<GameRow> {
    return this.withLock((data) => {
      const game = data.games.find((g) => g.id === gameId);
      if (!game) throw new StoreNotFoundError("Game not found.");
      if (game.playerAId !== userId && game.playerBId !== userId) {
        throw new StoreNotFoundError("Game not found.");
      }
      if (game.status === "waiting" || game.status === "active") {
        game.status = "abandoned";
        game.updatedAt = new Date().toISOString();
      }
      return game;
    });
  }
}
