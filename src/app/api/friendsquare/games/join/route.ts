import { NextResponse } from "next/server";
import { normalizeInviteCode } from "@/lib/friendsquare/ids";
import { getStore } from "@/lib/friendsquare/store";
import { StoreNotFoundError } from "@/lib/friendsquare/store-types";
import { errorResponse, requireUserId, unauthorized } from "../../_lib";

export async function POST(request: Request) {
  try {
    const userId = await requireUserId();
    if (!userId) return unauthorized();
    const body = (await request.json()) as { code?: unknown };
    const code = normalizeInviteCode(String(body.code ?? ""));
    if (!code) {
      return NextResponse.json({ error: "Invite code is required." }, { status: 400 });
    }
    const store = getStore();
    const game = await store.getGameByCode(code);
    if (!game) throw new StoreNotFoundError("No game with that code.");
    const joined = await store.joinGame(game.id, userId);
    return NextResponse.json({ id: joined.id, code: joined.code, status: joined.status });
  } catch (err) {
    return errorResponse(err);
  }
}
