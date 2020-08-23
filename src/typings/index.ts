export interface DotProps {
  isSelected: boolean;
  dotId: number;
  matrixSize: number;
}

export interface CellProps {
  cellId: number;
  matrixSize: number;
}

export interface GridProps {
  isConnectingDots: boolean;
}

export interface Room {
  edges: { [key: number]: Array<number> };
  matrix: Array<string | null>;
  selectedDot: number;
  players: Array<string>;
  playerTurn: number;
  message: string;
  matrixSize: number;
}

export interface RoomOutput {
  isFetching: boolean;
  room: Room | undefined;
}

export interface Window {
  height: number;
  width: number;
}

export interface ConnectDotsOutput {
  isConnectingDots: boolean;
  connectDots: (idx: number, room: Room) => void;
}

export interface CreateNewGameOutput {
  isCreatingNewGame: boolean;
  createNewGame: (players: Array<string>, matrixSize: number) => void;
}
