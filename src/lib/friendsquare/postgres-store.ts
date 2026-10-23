import { Pool } from "pg";
import type { FriendsquareState } from "@/types/friendsquare";
import { newId, newInviteCode } from "./ids";
import {
  StoreConflictError,
  StoreNotFoundError,
  type FriendsquareStore,
  type GameRow,
  type GameRowStatus,
  type UserRow,
} from "./store-types";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS friendsquare_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS friendsquare_games (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL,
  player_a_id TEXT NOT NULL,
  player_b_id TEXT,
  state JSONB NOT NULL,
  move_count INTEGER NOT NULL DEFAULT 0,
  winner_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS friendsquare_games_code_idx ON friendsquare_games (code);
`;

function toUserRow(r: {
  id: string;
  username: string;
  password_hash: string;
  created_at: Date;
}): UserRow {
  return {
    id: r.id,
    username: r.username,
    passwordHash: r.password_hash,
    createdAt: r.created_at.toISOString(),
  };
}

function toGameRow(r: {
  id: string;
  code: string;
  status: string;
  player_a_id: string;
  player_b_id: string | null;
  state: FriendsquareState;
  winner_id: string | null;
  created_at: Date;
  updated_at: Date;
}): GameRow {
  return {
    id: r.id,
    code: r.code,
    status: r.status as GameRowStatus,
    playerAId: r.player_a_id,
    playerBId: r.player_b_id,
    state: r.state,
    winnerId: r.winner_id,
    createdAt: r.created_at.toISOString(),
    updatedAt: r.updated_at.toISOString(),
  };
}

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "23505"
  );
}

/** Postgres backend. Used whenever POSTGRES_URL or DATABASE_URL is set. */
export class PostgresFriendsquareStore implements FriendsquareStore {
  private pool: Pool;
  private schemaReady: Promise<void> | null = null;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 10_000,
    });
  }

  private ensureSchema(): Promise<void> {
    if (!this.schemaReady) {
      this.schemaReady = this.pool.query(SCHEMA).then(() => undefined);
    }
    return this.schemaReady;
  }

  async getUserByUsername(username: string): Promise<UserRow | null> {
    await this.ensureSchema();
    const { rows } = await this.pool.query(
      "SELECT id, username, password_hash, created_at FROM friendsquare_users WHERE username = $1",
      [username],
    );
    return rows.length > 0 ? toUserRow(rows[0]) : null;
  }

  async getUserById(id: string): Promise<UserRow | null> {
    await this.ensureSchema();
    const { rows } = await this.pool.query(
      "SELECT id, username, password_hash, created_at FROM friendsquare_users WHERE id = $1",
      [id],
    );
    return rows.length > 0 ? toUserRow(rows[0]) : null;
  }

  async createUser(username: string, passwordHash: string): Promise<UserRow> {
    await this.ensureSchema();
    try {
      const { rows } = await this.pool.query(
        "INSERT INTO friendsquare_users (id, username, password_hash) VALUES ($1, $2, $3) RETURNING id, username, password_hash, created_at",
        [newId(), username, passwordHash],
      );
      return toUserRow(rows[0]);
    } catch (err) {
      if (isUniqueViolation(err)) throw new StoreConflictError("Username is taken.");
      throw err;
    }
  }

  async getActiveGameForUser(userId: string): Promise<GameRow | null> {
    await this.ensureSchema();
    const { rows } = await this.pool.query(
      `SELECT id, code, status, player_a_id, player_b_id, state, winner_id, created_at, updated_at
       FROM friendsquare_games
       WHERE status IN ('waiting', 'active') AND (player_a_id = $1 OR player_b_id = $1)
       ORDER BY updated_at DESC LIMIT 1`,
      [userId],
    );
    return rows.length > 0 ? toGameRow(rows[0]) : null;
  }

  async getGameById(id: string): Promise<GameRow | null> {
    await this.ensureSchema();
    const { rows } = await this.pool.query(
      "SELECT id, code, status, player_a_id, player_b_id, state, winner_id, created_at, updated_at FROM friendsquare_games WHERE id = $1",
      [id],
    );
    return rows.length > 0 ? toGameRow(rows[0]) : null;
  }

  async getGameByCode(code: string): Promise<GameRow | null> {
    await this.ensureSchema();
    const { rows } = await this.pool.query(
      "SELECT id, code, status, player_a_id, player_b_id, state, winner_id, created_at, updated_at FROM friendsquare_games WHERE code = $1",
      [code],
    );
    return rows.length > 0 ? toGameRow(rows[0]) : null;
  }

  async createGame(creatorId: string, state: FriendsquareState): Promise<GameRow> {
    await this.ensureSchema();
    const active = await this.getActiveGameForUser(creatorId);
    if (active) throw new StoreConflictError("You already have an active game.");
    for (let attempt = 0; attempt < 10; attempt += 1) {
      try {
        const { rows } = await this.pool.query(
          `INSERT INTO friendsquare_games (id, code, status, player_a_id, player_b_id, state, move_count)
           VALUES ($1, $2, 'waiting', $3, NULL, $4, $5)
           RETURNING id, code, status, player_a_id, player_b_id, state, winner_id, created_at, updated_at`,
          [newId(), newInviteCode(), creatorId, JSON.stringify(state), state.moveCount],
        );
        return toGameRow(rows[0]);
      } catch (err) {
        if (!isUniqueViolation(err) || attempt === 9) throw err;
      }
    }
    throw new StoreConflictError("Could not create game; try again.");
  }

  async joinGame(gameId: string, userId: string): Promise<GameRow> {
    await this.ensureSchema();
    const game = await this.getGameById(gameId);
    if (!game) throw new StoreNotFoundError("Game not found.");
    if (game.playerAId === userId || game.playerBId === userId) return game;
    if (game.status !== "waiting" || game.playerBId !== null) {
      throw new StoreConflictError("Game is no longer joinable.");
    }
    const active = await this.getActiveGameForUser(userId);
    if (active) throw new StoreConflictError("You already have an active game.");
    const { rows } = await this.pool.query(
      `UPDATE friendsquare_games SET player_b_id = $1, status = 'active', updated_at = NOW()
       WHERE id = $2 AND status = 'waiting' AND player_b_id IS NULL
       RETURNING id, code, status, player_a_id, player_b_id, state, winner_id, created_at, updated_at`,
      [userId, gameId],
    );
    if (rows.length === 0) throw new StoreConflictError("Game is no longer joinable.");
    return toGameRow(rows[0]);
  }

  async updateGameState(
    gameId: string,
    expectedMoveCount: number,
    state: FriendsquareState,
    winnerId: string | null,
  ): Promise<GameRow> {
    await this.ensureSchema();
    const nextStatus = state.status === "done" ? "done" : "active";
    const { rows } = await this.pool.query(
      `UPDATE friendsquare_games
       SET state = $1, move_count = $2, status = $3, winner_id = $4, updated_at = NOW()
       WHERE id = $5 AND move_count = $6
       RETURNING id, code, status, player_a_id, player_b_id, state, winner_id, created_at, updated_at`,
      [JSON.stringify(state), state.moveCount, nextStatus, winnerId, gameId, expectedMoveCount],
    );
    if (rows.length === 0) {
      const game = await this.getGameById(gameId);
      if (!game) throw new StoreNotFoundError("Game not found.");
      throw new StoreConflictError("Game changed; refresh and retry.");
    }
    return toGameRow(rows[0]);
  }

  async leaveGame(gameId: string, userId: string): Promise<GameRow> {
    await this.ensureSchema();
    const game = await this.getGameById(gameId);
    if (!game) throw new StoreNotFoundError("Game not found.");
    if (game.playerAId !== userId && game.playerBId !== userId) {
      throw new StoreNotFoundError("Game not found.");
    }
    const { rows } = await this.pool.query(
      `UPDATE friendsquare_games SET status = 'abandoned', updated_at = NOW()
       WHERE id = $1 AND status IN ('waiting', 'active')
       RETURNING id, code, status, player_a_id, player_b_id, state, winner_id, created_at, updated_at`,
      [gameId],
    );
    return rows.length > 0 ? toGameRow(rows[0]) : game;
  }
}
