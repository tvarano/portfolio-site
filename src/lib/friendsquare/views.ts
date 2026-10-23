import { toView } from "./engine";
import type { FriendsquareStore, GameRow } from "./store-types";
import type { FriendsquarePlayer, FriendsquareView } from "@/types/friendsquare";

export interface GameViewPayload {
  id: string;
  code: string;
  status: GameRow["status"];
  opponentUsername: string | null;
  winnerUsername: string | null;
  view: FriendsquareView;
}

export function viewerRole(game: GameRow, userId: string): FriendsquarePlayer | null {
  if (game.playerAId === userId) return "A";
  if (game.playerBId === userId) return "B";
  return null;
}

export async function buildGameView(
  store: FriendsquareStore,
  game: GameRow,
  userId: string,
): Promise<GameViewPayload> {
  const role = viewerRole(game, userId);
  if (!role) throw new Error("Not a member of this game.");
  const opponentId = role === "A" ? game.playerBId : game.playerAId;
  const opponent = opponentId ? await store.getUserById(opponentId) : null;
  const winner =
    game.status === "done" && game.winnerId
      ? await store.getUserById(game.winnerId)
      : null;
  return {
    id: game.id,
    code: game.code,
    status: game.status,
    opponentUsername: opponent?.username ?? null,
    winnerUsername: winner?.username ?? null,
    view: toView(game.state, role),
  };
}
