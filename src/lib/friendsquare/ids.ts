import { randomInt, randomUUID } from "node:crypto";

const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function newId(): string {
  return randomUUID();
}

export function newInviteCode(): string {
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return code;
}

/** Usernames are lowercase alphanumeric + underscore, 3-20 chars. */
export function normalizeUsername(raw: string): string | null {
  const username = raw.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,20}$/.test(username)) return null;
  return username;
}

export function normalizeInviteCode(raw: string): string {
  return raw.trim().toUpperCase();
}
