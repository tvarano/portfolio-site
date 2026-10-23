import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { normalizeUsername } from "@/lib/friendsquare/ids";
import { verifyPassword } from "@/lib/friendsquare/passwords";
import { checkRateLimit } from "@/lib/friendsquare/rate-limit";
import { getStore } from "@/lib/friendsquare/store";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Vercel terminates TLS at its proxy; trusting the forwarded host is the
  // documented setup there (equivalent to AUTH_TRUST_HOST=true).
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/friendsquare" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const username = normalizeUsername(String(credentials?.username ?? ""));
        const password = String(credentials?.password ?? "");
        if (!username) return null;
        if (!checkRateLimit(`login:${username}`, 10, 60_000)) return null;
        const store = getStore();
        const user = await store.getUserByUsername(username);
        if (!user) return null;
        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, name: user.username };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      if (user?.name) token.username = user.name;
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      if (typeof token.username === "string") session.user.name = token.username;
      return session;
    },
  },
});
