export type FriendsquareColor =
  | "black"
  | "yellow"
  | "red"
  | "green"
  | "blue"
  | "purple";

export type FriendsquarePlayer = "A" | "B";

export type FriendsquareStatus = "waiting" | "active" | "done";

/** rows × cols grid of colors. Row 0 is the top. */
export type FriendsquareBoard = FriendsquareColor[][];

/** Parallel grid: which player owns each cell, or null if neutral. */
export type FriendsquareOwnerGrid = (FriendsquarePlayer | null)[][];

export interface FriendsquareState {
  rows: number;
  cols: number;
  board: FriendsquareBoard;
  owner: FriendsquareOwnerGrid;
  turn: FriendsquarePlayer;
  status: FriendsquareStatus;
  winner: FriendsquarePlayer | "draw" | null;
  moveCount: number;
}

/** What a viewer sees: always themselves as "A" from the bottom-left. */
export interface FriendsquareView {
  rows: number;
  cols: number;
  board: FriendsquareBoard;
  owner: FriendsquareOwnerGrid;
  yourTurn: boolean;
  yourColor: FriendsquareColor;
  opponentColor: FriendsquareColor;
  legalColors: FriendsquareColor[];
  yourCount: number;
  opponentCount: number;
  neutralCount: number;
  status: FriendsquareStatus;
  winner: FriendsquarePlayer | "draw" | null;
  moveCount: number;
}
