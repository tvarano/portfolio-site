import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { normalizeUsername } from "@/lib/friendsquare/ids";
import { hashPassword } from "@/lib/friendsquare/passwords";
import { checkRateLimit } from "@/lib/friendsquare/rate-limit";
import { getStore } from "@/lib/friendsquare/store";
import { errorResponse } from "../../_lib";

export async function POST(request: Request) {
  try {
    const ip =
      (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(`register:${ip}`, 20, 3_600_000)) {
      return NextResponse.json({ error: "Too many attempts. Try later." }, { status: 429 });
    }
    const body = (await request.json()) as { username?: unknown; password?: unknown };
    const username = normalizeUsername(String(body.username ?? ""));
    const password = String(body.password ?? "");
    if (!username) {
      return NextResponse.json(
        { error: "Username must be 3-20 lowercase letters, numbers, or underscores." },
        { status: 400 },
      );
    }
    if (typeof body.password !== "string" || password.length > 1024) {
      return NextResponse.json({ error: "Invalid password." }, { status: 400 });
    }
    const store = getStore();
    const user = await store.createUser(username, await hashPassword(password));
    return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
  } catch (err) {
    return errorResponse(err);
  }
}
