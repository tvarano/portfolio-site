"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { FRIENDSQUARE_COLORS } from "@/lib/friendsquare/engine";
import type { GameViewPayload } from "@/lib/friendsquare/views";
import type { FriendsquareColor } from "@/types/friendsquare";

const COLOR_HEX: Record<FriendsquareColor, string> = {
  black: "#232323",
  yellow: "#FACC15",
  red: "#EF4444",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#A855F7",
};

export default function GameBoard({
  gameId,
  initial,
}: {
  gameId: string;
  initial: GameViewPayload;
}) {
  const router = useRouter();
  const [payload, setPayload] = useState<GameViewPayload>(initial);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/friendsquare/games/${gameId}`);
    if (res.ok) {
      setPayload((await res.json()) as GameViewPayload);
    }
  }, [gameId]);

  useEffect(() => {
    if (payload.status !== "waiting" && payload.status !== "active") return;
    const timer = setInterval(() => void refresh(), 2000);
    return () => clearInterval(timer);
  }, [payload.status, refresh]);

  async function handleMove(color: FriendsquareColor) {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/friendsquare/games/${gameId}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
      });
      const data = (await res.json()) as GameViewPayload & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Move failed.");
        await refresh();
        return;
      }
      setPayload(data);
    } finally {
      setBusy(false);
    }
  }

  async function handleLeave() {
    setBusy(true);
    try {
      await fetch(`/api/friendsquare/games/${gameId}/leave`, { method: "POST" });
      router.push("/friendsquare");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const { view, status, opponentUsername, winnerUsername } = payload;
  const over = status === "done" || status === "abandoned";

  let banner: string;
  if (status === "waiting") banner = "Waiting for opponent…";
  else if (status === "abandoned") banner = "Game abandoned.";
  else if (status === "done") {
    banner =
      view.winner === "draw"
        ? "Draw!"
        : view.winner === "A"
          ? `You win, ${winnerUsername ?? "you"}!`
          : `${winnerUsername ?? "Opponent"} wins.`;
  } else {
    banner = view.yourTurn ? "Your turn" : "Opponent's turn…";
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div className="rounded-lg border-2 border-[#14213D] bg-white px-4 py-2 text-center font-bold shadow-[4px_4px_0_#14213D]">
        {banner}
      </div>

      {status === "waiting" && (
        <p className="text-center font-bold">
          Share this code: <span className="font-mono text-lg">{payload.code}</span>
        </p>
      )}

      <div className="flex justify-between text-sm font-bold">
        <span>
          you ({view.yourColor}): {view.yourCount}
        </span>
        <span>
          {opponentUsername ?? "opponent"} ({view.opponentColor}): {view.opponentCount}
        </span>
      </div>

      <div
        className="grid gap-0 overflow-hidden rounded-md border-2 border-[#14213D] bg-[#14213D]"
        style={{ gridTemplateColumns: `repeat(${view.cols}, minmax(0, 1fr))` }}
        aria-label="friendsquare board"
      >
        {view.board.map((row, r) =>
          row.map((color, c) => {
            const cellOwner = view.owner[r][c];
            if (cellOwner === null) {
              return (
                <div key={`${r}-${c}`} className="relative aspect-square">
                  {/* Neutral tiles sit rigid and separated on the dark canvas. */}
                  <div
                    className="absolute transition-[inset,border-radius] duration-150"
                    style={{
                      inset: 3,
                      borderRadius: 3,
                      backgroundColor: COLOR_HEX[color],
                    }}
                  />
                </div>
              );
            }
            // Owned cells autotile into one jello blob per territory: a corner
            // rounds only when both adjoining sides face outward (other
            // player, neutral, or board edge), plus a glossy highlight.
            const sameOwner = (rr: number, cc: number) =>
              rr >= 0 &&
              rr < view.rows &&
              cc >= 0 &&
              cc < view.cols &&
              view.owner[rr][cc] === cellOwner;
            const up = sameOwner(r - 1, c);
            const down = sameOwner(r + 1, c);
            const left = sameOwner(r, c - 1);
            const right = sameOwner(r, c + 1);
            const R = "30%";
            const radii = {
              borderTopLeftRadius: !up && !left ? R : 0,
              borderTopRightRadius: !up && !right ? R : 0,
              borderBottomLeftRadius: !down && !left ? R : 0,
              borderBottomRightRadius: !down && !right ? R : 0,
            };
            // Slight per-cell gloss variation so big territories don't tile.
            const gx = 26 + ((r * 7 + c * 13) % 3) * 9;
            const gy = 20 + ((r * 5 + c * 11) % 3) * 9;
            return (
              <div key={`${r}-${c}`} className="relative aspect-square">
                <div
                  className="absolute transition-[inset,border-radius] duration-150"
                  style={{
                    inset: 0,
                    backgroundColor: COLOR_HEX[color],
                    ...radii,
                  }}
                />
                <div
                  className="absolute transition-[inset,border-radius] duration-150"
                  style={{
                    inset: 0,
                    ...radii,
                    background: `radial-gradient(ellipse 95% 75% at ${gx}% ${gy}%, rgba(255,255,255,0.30), rgba(255,255,255,0) 62%)`,
                  }}
                />
              </div>
            );
          }),
        )}
      </div>

      {!over && status === "active" && (
        <div className="grid grid-cols-6 gap-1">
          {FRIENDSQUARE_COLORS.map((color) => {
            const legal = view.legalColors.includes(color) && view.yourTurn;
            return (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={`play ${color}`}
                disabled={!legal || busy}
                onClick={() => handleMove(color)}
                className="aspect-square rounded border-2 border-[#14213D] disabled:opacity-25"
                style={{ backgroundColor: COLOR_HEX[color] }}
              />
            );
          })}
        </div>
      )}
      {error && (
        <p role="alert" className="text-center text-sm font-bold text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleLeave}
          disabled={busy}
          className="flex-1 rounded border-2 border-[#14213D] bg-white px-3 py-2 font-bold disabled:opacity-50"
        >
          {over ? "Back to lobby" : "Leave game"}
        </button>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/friendsquare" })}
          className="rounded border-2 border-[#14213D] bg-white px-3 py-2 font-bold"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
