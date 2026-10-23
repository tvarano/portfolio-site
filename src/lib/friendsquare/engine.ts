import type {
  FriendsquareBoard,
  FriendsquareColor,
  FriendsquareOwnerGrid,
  FriendsquarePlayer,
  FriendsquareState,
  FriendsquareView,
} from "@/types/friendsquare";

export const FRIENDSQUARE_COLORS: FriendsquareColor[] = [
  "black",
  "yellow",
  "red",
  "green",
  "blue",
  "purple",
];

export const FRIENDSQUARE_ROWS = 7;
export const FRIENDSQUARE_COLS = 8;

export type Rng = () => number;

const DIRS: ReadonlyArray<readonly [number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function randomColor(rng: Rng): FriendsquareColor {
  return FRIENDSQUARE_COLORS[Math.floor(rng() * FRIENDSQUARE_COLORS.length)];
}

function startCell(player: FriendsquarePlayer, rows: number, cols: number): [number, number] {
  return player === "A" ? [rows - 1, 0] : [0, cols - 1];
}

function inBounds(r: number, c: number, rows: number, cols: number): boolean {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

/**
 * Fill a board with no two orthogonally adjacent cells sharing a color, so
 * every move absorbs one layer at a time and the game stays difficult.
 * Single row-major pass excluding the left and upper neighbors (with 6
 * colors a choice always exists). Then ensures each starting corner's
 * orthogonal neighbors differ from each other and from the start square,
 * so both players have a move.
 */
export function createBoard(
  rows: number = FRIENDSQUARE_ROWS,
  cols: number = FRIENDSQUARE_COLS,
  rng: Rng = Math.random,
): FriendsquareBoard {
  const board: FriendsquareBoard = [];
  for (let r = 0; r < rows; r += 1) {
    const row: FriendsquareColor[] = [];
    for (let c = 0; c < cols; c += 1) {
      const forbidden = new Set<FriendsquareColor>();
      if (c > 0) forbidden.add(row[c - 1]);
      if (r > 0) forbidden.add(board[r - 1][c]);
      const options = FRIENDSQUARE_COLORS.filter((color) => !forbidden.has(color));
      row.push(options[Math.floor(rng() * options.length)]);
    }
    board.push(row);
  }

  for (const player of ["A", "B"] as const) {
    const [sr, sc] = startCell(player, rows, cols);
    const startColor = board[sr][sc];
    const neighbors: [number, number][] = [];
    for (const [dr, dc] of DIRS) {
      const nr = sr + dr;
      const nc = sc + dc;
      if (inBounds(nr, nc, rows, cols)) neighbors.push([nr, nc]);
    }
    const used = new Set<FriendsquareColor>([startColor]);
    for (const [nr, nc] of neighbors) {
      // Preserve the no-adjacent invariant: the re-roll must also avoid
      // the cell's other orthogonal neighbors. At most 5 colors are
      // forbidden (start + sibling + up to 3 further neighbors), so with
      // 6 colors a choice always exists.
      const forbidden = new Set<FriendsquareColor>(used);
      for (const [dr, dc] of DIRS) {
        const ar = nr + dr;
        const ac = nc + dc;
        if (inBounds(ar, ac, rows, cols)) forbidden.add(board[ar][ac]);
      }
      let color = board[nr][nc];
      let guard = 0;
      while (forbidden.has(color) && guard < 100) {
        color = randomColor(rng);
        guard += 1;
      }
      board[nr][nc] = color;
      used.add(color);
    }
  }

  return board;
}

export function initialState(
  rows: number = FRIENDSQUARE_ROWS,
  cols: number = FRIENDSQUARE_COLS,
  rng: Rng = Math.random,
): FriendsquareState {
  const board = createBoard(rows, cols, rng);
  const owner: FriendsquareOwnerGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null),
  );
  const [ar, ac] = startCell("A", rows, cols);
  const [br, bc] = startCell("B", rows, cols);
  owner[ar][ac] = "A";
  owner[br][bc] = "B";
  return {
    rows,
    cols,
    board,
    owner,
    turn: "A",
    status: "active",
    winner: null,
    moveCount: 0,
  };
}

export function territoryColor(state: FriendsquareState, player: FriendsquarePlayer): FriendsquareColor {
  const [sr, sc] = startCell(player, state.rows, state.cols);
  return state.board[sr][sc];
}

function opponent(player: FriendsquarePlayer): FriendsquarePlayer {
  return player === "A" ? "B" : "A";
}

/** Colors the player may pick: anything except their own and the opponent's current color. */
export function legalColors(
  state: FriendsquareState,
  player: FriendsquarePlayer,
): FriendsquareColor[] {
  if (state.status !== "active") return [];
  const own = territoryColor(state, player);
  const foe = territoryColor(state, opponent(player));
  return FRIENDSQUARE_COLORS.filter((c) => c !== own && c !== foe);
}

export function countOwned(state: FriendsquareState, player: FriendsquarePlayer): number {
  let n = 0;
  for (let r = 0; r < state.rows; r += 1) {
    for (let c = 0; c < state.cols; c += 1) {
      if (state.owner[r][c] === player) n += 1;
    }
  }
  return n;
}

export function countNeutral(state: FriendsquareState): number {
  let n = 0;
  for (let r = 0; r < state.rows; r += 1) {
    for (let c = 0; c < state.cols; c += 1) {
      if (state.owner[r][c] === null) n += 1;
    }
  }
  return n;
}

function cloneGrid<T>(grid: T[][]): T[][] {
  return grid.map((row) => [...row]);
}

export class IllegalMoveError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IllegalMoveError";
  }
}

/**
 * Apply a move: recolor the player's whole territory, then absorb every
 * orthogonally connected neutral cell of that color. Never absorbs the
 * opponent's cells. Returns a new state; the input is not mutated.
 */
export function applyMove(
  state: FriendsquareState,
  player: FriendsquarePlayer,
  color: FriendsquareColor,
): FriendsquareState {
  if (state.status !== "active") {
    throw new IllegalMoveError("Game is not active.");
  }
  if (state.turn !== player) {
    throw new IllegalMoveError("It is not your turn.");
  }
  if (!legalColors(state, player).includes(color)) {
    throw new IllegalMoveError(`Color ${color} is not legal right now.`);
  }

  const board = cloneGrid(state.board);
  const owner = cloneGrid(state.owner);
  const foe = opponent(player);

  for (let r = 0; r < state.rows; r += 1) {
    for (let c = 0; c < state.cols; c += 1) {
      if (owner[r][c] === player) board[r][c] = color;
    }
  }

  // Flood-fill absorption: BFS from the territory through neutral cells
  // of the chosen color.
  const queue: [number, number][] = [];
  for (let r = 0; r < state.rows; r += 1) {
    for (let c = 0; c < state.cols; c += 1) {
      if (owner[r][c] === player) queue.push([r, c]);
    }
  }
  const seen = new Set<string>();
  while (queue.length > 0) {
    const [r, c] = queue.pop() as [number, number];
    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (!inBounds(nr, nc, state.rows, state.cols)) continue;
      if (owner[nr][nc] !== null) continue;
      if (board[nr][nc] !== color) continue;
      const key = `${nr},${nc}`;
      if (seen.has(key)) continue;
      seen.add(key);
      owner[nr][nc] = player;
      queue.push([nr, nc]);
    }
  }
  void foe;

  const next: FriendsquareState = {
    ...state,
    board,
    owner,
    moveCount: state.moveCount + 1,
    turn: foe,
  };

  if (countNeutral(next) === 0) {
    next.status = "done";
    const a = countOwned(next, "A");
    const b = countOwned(next, "B");
    next.winner = a === b ? "draw" : a > b ? "A" : "B";
  }

  return next;
}

function rotate180<T>(grid: T[][]): T[][] {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => grid[rows - 1 - r][cols - 1 - c]),
  );
}

/**
 * Viewer-relative state: the viewer always sees themselves as "A"
 * in the bottom-left. Player B's view is rotated 180 degrees.
 */
export function toView(state: FriendsquareState, viewer: FriendsquarePlayer): FriendsquareView {
  const flipped = viewer === "B";
  const board = flipped ? rotate180(state.board) : state.board;
  const rawOwner = flipped ? rotate180(state.owner) : state.owner;
  const owner: FriendsquareOwnerGrid = rawOwner.map((row) =>
    row.map((cell) => {
      if (cell === null) return null;
      if (!flipped) return cell;
      return cell === viewer ? "A" : "B";
    }),
  );

  const yourColor = territoryColor(state, viewer);
  const opponentColor = territoryColor(state, opponent(viewer));
  const winner =
    state.winner === null || state.winner === "draw"
      ? state.winner
      : state.winner === viewer
        ? "A"
        : "B";

  return {
    rows: state.rows,
    cols: state.cols,
    board,
    owner,
    yourTurn: state.status === "active" && state.turn === viewer,
    yourColor,
    opponentColor,
    legalColors: legalColors(state, viewer),
    yourCount: countOwned(state, viewer),
    opponentCount: countOwned(state, opponent(viewer)),
    neutralCount: countNeutral(state),
    status: state.status,
    winner,
    moveCount: state.moveCount,
  };
}

export function serializeState(state: FriendsquareState): string {
  return JSON.stringify(state);
}

export function deserializeState(raw: string): FriendsquareState {
  const parsed = JSON.parse(raw) as FriendsquareState;
  if (
    typeof parsed.rows !== "number" ||
    typeof parsed.cols !== "number" ||
    !Array.isArray(parsed.board) ||
    !Array.isArray(parsed.owner)
  ) {
    throw new Error("Invalid saved game state.");
  }
  return parsed;
}
