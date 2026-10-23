import { NextResponse } from "next/server";
import {
  FRIENDSQUARE_COLORS,
  IllegalMoveError,
  applyMove,
} from "@/lib/friendsquare/engine";
import { getStore } from "@/lib/friendsquare/store";
import { StoreNotFoundError } from "@/lib/friendsquare/store-types";
import { buildGameView, viewerRole } from "@/lib/friendsquare/views";
import type { FriendsquareColor } from "@/types/friendsquare";
import { errorResponse, requireUserId, unauthorized } from "../../../_lib";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await requireUserId();
    if (!userId) return unauthorized();
    const { id } = await params;
    const body = (await request.json()) as { color?: unknown };
    const color = String(body.color ?? "");
    if (!(FRIENDSQUARE_COLORS as string[]).includes(color)) {
      throw new IllegalMoveError("Unknown color.");
    }
    const store = getStore();
    const game = await store.getGameById(id);
    if (!game) throw new StoreNotFoundError("Game not found.");
    const role = viewerRole(game, userId);
    if (!role) throw new StoreNotFoundError("Game not found.");
    if (game.status === "waiting") {
      throw new IllegalMoveError("Waiting for an opponent to join.");
    }
    if (game.status !== "active") {
      throw new IllegalMoveError("Game is over.");
    }
    const next = applyMove(game.state, role, color as FriendsquareColor);
    let winnerId: string | null = null;
    if (next.status === "done" && next.winner !== null && next.winner !== "draw") {
      winnerId = next.winner === "A" ? game.playerAId : game.playerBId;
    }
    const saved = await store.updateGameState(
      game.id,
      game.state.moveCount,
      next,
      winnerId,
    );
    return NextResponse.json(await buildGameView(store, saved, userId));
  } catch (err) {
    return errorResponse(err);
  }
}
