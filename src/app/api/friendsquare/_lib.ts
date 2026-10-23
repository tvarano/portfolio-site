import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { IllegalMoveError } from "@/lib/friendsquare/engine";
import {
  StoreConflictError,
  StoreNotFoundError,
} from "@/lib/friendsquare/store-types";

export async function requireUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export function errorResponse(err: unknown): NextResponse {
  if (err instanceof StoreNotFoundError) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
  if (err instanceof StoreConflictError) {
    return NextResponse.json({ error: err.message }, { status: 409 });
  }
  if (err instanceof IllegalMoveError) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  console.error("friendsquare error:", err);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Sign in required." }, { status: 401 });
}
