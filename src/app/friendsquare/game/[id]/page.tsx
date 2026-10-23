import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GameBoard from "@/components/friendsquare/GameBoard";
import { getStore } from "@/lib/friendsquare/store";
import { buildGameView } from "@/lib/friendsquare/views";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Friendsquare game",
  robots: { index: false, follow: false },
};

export default async function FriendsquareGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/friendsquare");
  const { id } = await params;
  const store = getStore();
  const game = await store.getGameById(id);
  if (
    !game ||
    (game.playerAId !== session.user.id && game.playerBId !== session.user.id)
  ) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center font-bold">
        Game not found.
      </div>
    );
  }
  const payload = await buildGameView(store, game, session.user.id);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-center text-3xl font-black">Friendsquare</h1>
      <GameBoard gameId={id} initial={payload} />
    </div>
  );
}
