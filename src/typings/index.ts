import { Dispatch } from 'react';

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
  isFetchingUsers: boolean;
  room: Room | undefined;
  users: { [key: string]: User } | undefined;
}

export interface UsersOutput {
  isFetching: boolean;
  users: { [key: string]: User } | undefined;
}

export interface User {
  nickName: string;
  nameInitials: string;
}

export interface Window {
  height: number;
  width: number;
}

export interface ConnectDotsOutput {
  isConnectingDots: boolean;
  connectDots: (
    idx: number,
    room: Room,
    users: { [key: string]: User } | undefined
  ) => void;
}

export interface CreateNewGameOutput {
  isCreatingNewGame: boolean;
  createNewGame: (players: Array<string>, matrixSize: number) => void;
}

export interface CountdownOutput {
  counter: number;
  setCounter: Dispatch<number>;
}

export interface FieldProps {
  id: string;
  label: string;
  placeholder?: string;
  onChange:
    | ((value: string | undefined) => void)
    | ((value: number | undefined) => void);
  type: string;
  value: string | number | undefined;
  errorMessage?: string | undefined;
  disabled?: boolean;
}
