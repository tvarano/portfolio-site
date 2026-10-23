"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AuthForms() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "register") {
        const res = await fetch("/api/friendsquare/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setError(data.error ?? "Registration failed.");
          return;
        }
      }
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid username or password.");
        return;
      }
      router.push("/friendsquare");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg border-2 border-[#14213D] bg-white p-6 shadow-[4px_4px_0_#14213D]">
      <div className="mb-4 flex gap-2">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`flex-1 rounded border-2 border-[#14213D] px-3 py-1.5 text-sm font-bold capitalize ${
              mode === m ? "bg-[#14213D] text-[#FEFAE0]" : "bg-white text-[#14213D]"
            }`}
          >
            {m === "login" ? "Log in" : "Register"}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm font-bold">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            minLength={3}
            maxLength={20}
            className="rounded border-2 border-[#14213D] px-3 py-2 font-normal"
            placeholder="pick a name"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="rounded border-2 border-[#14213D] px-3 py-2 font-normal"
            placeholder="literally anything"
          />
        </label>
        <p className="text-xs opacity-60">
          security note: this is a doodle site, not a bank. use a doodle
          password, not your bank password.
        </p>
        {error && (
          <p role="alert" className="text-sm font-bold text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="rounded border-2 border-[#14213D] bg-[#006D77] px-3 py-2 font-bold text-white disabled:opacity-50"
        >
          {busy ? "Working…" : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>
    </div>
  );
}
