import { FileFriendsquareStore } from "./file-store";
import { PostgresFriendsquareStore } from "./postgres-store";
import type { FriendsquareStore } from "./store-types";

let cached: FriendsquareStore | null = null;

/**
 * Postgres when a connection string is configured (production via Vercel
 * Marketplace), otherwise a local JSON file for development.
 */
export function getStore(): FriendsquareStore {
  if (cached) return cached;
  const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  cached =
    connectionString && connectionString.length > 0
      ? new PostgresFriendsquareStore(connectionString)
      : new FileFriendsquareStore();
  return cached;
}

export function isPostgresConfigured(): boolean {
  const v = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  return !!v && v.length > 0;
}
