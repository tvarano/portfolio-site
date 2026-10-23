import type { Metadata } from "next";
import { auth } from "@/auth";
import AuthForms from "@/components/friendsquare/AuthForms";
import Lobby from "@/components/friendsquare/Lobby";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Friendsquare",
  description: "A two-player color-filler duel.",
  robots: { index: false, follow: false },
};

export default async function FriendsquarePage() {
  const session = await auth();
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-black">Friendsquare</h1>
      {session?.user ? <Lobby /> : <AuthForms />}
    </div>
  );
}
