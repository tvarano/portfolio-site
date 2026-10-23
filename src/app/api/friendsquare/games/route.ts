import { NextResponse } from "next/server";
import { initialState } from "@/lib/friendsquare/engine";
import { getStore } from "@/lib/friendsquare/store";
import { errorResponse, requireUserId, unauthorized } from "../_lib";

export async function POST() {
  try {
    const userId = await requireUserId();
    if (!userId) return unauthorized();
    const store = getStore();
    const game = await store.createGame(userId, initialState());
    return NextResponse.json(
      { id: game.id, code: game.code, status: game.status },
      { status: 201 },
    );
  } catch (err) {
    return errorResponse(err);
  }
}
