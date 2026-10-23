import { NextResponse } from "next/server";
import { getStore } from "@/lib/friendsquare/store";
import { errorResponse, requireUserId, unauthorized } from "../_lib";

export async function GET() {
  try {
    const userId = await requireUserId();
    if (!userId) return unauthorized();
    const store = getStore();
    const user = await store.getUserById(userId);
    if (!user) return unauthorized();
    const active = await store.getActiveGameForUser(userId);
    return NextResponse.json({
      user: { id: user.id, username: user.username },
      activeGame: active
        ? { id: active.id, code: active.code, status: active.status }
        : null,
    });
  } catch (err) {
    return errorResponse(err);
  }
}
