import { NextResponse } from "next/server";
import { getStore } from "@/lib/friendsquare/store";
import { StoreNotFoundError } from "@/lib/friendsquare/store-types";
import { errorResponse, requireUserId, unauthorized } from "../../../_lib";

export async function POST(
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
    const left = await store.leaveGame(id, userId);
    return NextResponse.json({ id: left.id, status: left.status });
  } catch (err) {
    return errorResponse(err);
  }
}
