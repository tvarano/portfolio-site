# Friendsquare

Two-player Filler clone at `/friendsquare`. Deliberately unlinked from the
home page; reachable by direct URL only, with `noindex` metadata.

## How it plays

- 7×8 board, 6 colors. Player A starts bottom-left, Player B top-right.
- Each player sees themselves as A (B's view is rotated 180°).
- On your turn pick any color except your current one and your opponent's
  current one. Your whole territory recolors and absorbs orthogonally
  adjacent squares of that color. Diagonals don't count; you can never
  absorb your opponent.
- Creator moves first, strict alternation. Most squares when the board is
  full wins; equal counts are a draw.
- One active game per player. Leaving abandons the game for both players.

## Local dev

1. `npm install`
2. Generate the auth secret (writes to `.env.local`, which is gitignored):
   `npx auth secret`
3. `npm run dev` → http://localhost:3000/friendsquare

Without `POSTGRES_URL`/`DATABASE_URL` set, the app uses a JSON file at
`.data/friendsquare.json` (gitignored). Register two users in two
browsers/profiles, share the 6-letter invite code, and play.

## Production (Vercel)

Secrets (set in the Vercel dashboard under Project → Settings →
Environment Variables, type **Secret** — never commit them):

- `AUTH_SECRET` — generate with `npx auth secret` and paste the value.
- `POSTGRES_URL` — injected automatically when you add a Postgres
  integration from the Vercel Marketplace (e.g. Neon). The app also
  accepts `DATABASE_URL`.

Provisioning: Vercel Dashboard → Storage → add a Marketplace Postgres
database and connect it to this project. Tables (`friendsquare_users`,
`friendsquare_games`) are created automatically on first use. Passwords
are scrypt-hashed with per-user salts; plaintext is never stored or logged.

## SMS stretch (not implemented)

Turn-notification texts need a provider (e.g. Twilio), a verified sender
number, per-message budget, and opt-in handling for recipients' phone
numbers — plus PII storage for those numbers. Time-box that investigation
before collecting phone numbers at all. Until then, auth is username-only
by design.
