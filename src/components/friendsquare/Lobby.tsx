"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface MePayload {
  user: { id: string; username: string };
  activeGame: { id: string; code: string; status: string } | null;
}

export default function Lobby() {
  const router = useRouter();
  const [me, setMe] = useState<MePayload | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/friendsquare/me");
    if (res.ok) setMe((await res.json()) as MePayload);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function postJson(url: string, body?: unknown): Promise<{ id?: string; error?: string }> {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return (await res.json()) as { id?: string; error?: string };
  }

  async function handleCreate() {
    setError(null);
    setBusy(true);
    try {
      const data = await postJson("/api/friendsquare/games");
      if (!data.id) {
        setError(data.error ?? "Could not create game.");
        return;
      }
      router.push(`/friendsquare/game/${data.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const data = await postJson("/api/friendsquare/games/join", { code });
      if (!data.id) {
        setError(data.error ?? "Could not join game.");
        return;
      }
      router.push(`/friendsquare/game/${data.id}`);
    } finally {
      setBusy(false);
    }
  }

  async function handleLeave() {
    if (!me?.activeGame) return;
    setError(null);
    setBusy(true);
    try {
      await postJson(`/api/friendsquare/games/${me.activeGame.id}/leave`);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  if (!me) return <p className="font-bold">Loading…</p>;

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between rounded-lg border-2 border-[#14213D] bg-white px-4 py-2 shadow-[4px_4px_0_#14213D]">
        <span className="font-bold">hi, {me.user.username}</span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/friendsquare" })}
          className="text-sm font-bold text-[#006D77] underline"
        >
          log out
        </button>
      </div>

      {me.activeGame ? (
        <div className="rounded-lg border-2 border-[#14213D] bg-white p-4 shadow-[4px_4px_0_#14213D]">
          <p className="font-bold">
            {me.activeGame.status === "waiting"
              ? `Waiting for opponent — code: ${me.activeGame.code}`
              : "Game in progress"}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => router.push(`/friendsquare/game/${me.activeGame!.id}`)}
              className="flex-1 rounded border-2 border-[#14213D] bg-[#006D77] px-3 py-2 font-bold text-white"
            >
              {me.activeGame.status === "waiting" ? "Open lobby" : "Resume game"}
            </button>
            <button
              type="button"
              onClick={handleLeave}
              disabled={busy}
              className="rounded border-2 border-[#14213D] bg-white px-3 py-2 font-bold disabled:opacity-50"
            >
              Leave
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={handleCreate}
            disabled={busy}
            className="rounded-lg border-2 border-[#14213D] bg-[#D4930A] px-4 py-3 font-bold text-[#14213D] shadow-[4px_4px_0_#14213D] disabled:opacity-50"
          >
            Start a new game
          </button>
          <form
            onSubmit={handleJoin}
            className="rounded-lg border-2 border-[#14213D] bg-white p-4 shadow-[4px_4px_0_#14213D]"
          >
            <label className="flex flex-col gap-1 text-sm font-bold">
              Join with invite code
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                minLength={6}
                maxLength={6}
                placeholder="ABC123"
                className="rounded border-2 border-[#14213D] px-3 py-2 font-mono uppercase"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="mt-3 w-full rounded border-2 border-[#14213D] bg-[#14213D] px-3 py-2 font-bold text-[#FEFAE0] disabled:opacity-50"
            >
              Join game
            </button>
          </form>
        </>
      )}
      {error && (
        <p role="alert" className="text-sm font-bold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
