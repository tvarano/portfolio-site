import { NextResponse } from "next/server";
import { getStore } from "@/lib/friendsquare/store";
import { StoreNotFoundError } from "@/lib/friendsquare/store-types";
import { buildGameView } from "@/lib/friendsquare/views";
import { errorResponse, requireUserId, unauthorized } from "../../_lib";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await requireUserId();
    if (!userId) return unauthorized();
    const { id } = await params;
    const store = getStore();
    const game = await store.getGameById(id);
    if (!game) throw new StoreNotFoundError("Game not found.");
    if (game.playerAId !== userId && game.playerBId !== userId) {
      throw new StoreNotFoundError("Game not found.");
    }
    return NextResponse.json(await buildGameView(store, game, userId));
  } catch (err) {
    return errorResponse(err);
  }
}
