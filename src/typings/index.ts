export interface DotProps {
  isSelected: boolean;
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
  isConnecting: boolean;
  connectDots: (idx: number, room: Room) => void;
}

export interface CreateNewGameOutput {
  isCreatingNewGame: boolean;
  createNewGame: (players: Array<string>, matrixSize: number) => void;
}
