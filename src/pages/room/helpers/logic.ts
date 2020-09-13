import { isHorizontalLine, mergeUtil } from './util';
import _ from 'lodash';
import { Room, User } from 'typings';

export const isCompleteCell = (
  arr: Array<number>,
  edges: { [key: number]: Array<number> },
): boolean => {
  arr.sort((a, b) => a - b);
  return (
    _.every([arr[1], arr[2]], (o) => _.includes(edges[arr[0]], o)) &&
    _.every([arr[1], arr[2]], (o) => _.includes(edges[arr[3]], o))
  );
};

export const getWinner = (
  matrix: Array<string | null>,
  users: { [key: string]: User } | undefined,
): string => {
  const playersCellCount: { [key: string]: number } = _.countBy(matrix);
  const numberOfWinners: { [key: number]: number } = _.countBy(
    playersCellCount,
  );

  const winner: string = _.maxBy(
    Object.keys(playersCellCount),
    (o) => playersCellCount[o],
  ) as string;

  return numberOfWinners[playersCellCount[winner]] === 1
    ? `${users?.[winner].nickName} won the board`
    : 'Draw';
};

export const getMatrixIndexIfCompleteCell = (
  arr: Array<number>,
  edges: { [key: number]: Array<number> },
  matrixSize: number,
): number => {
  if (isCompleteCell(arr, edges)) {
    const minIdx: number = Math.min(...arr);
    return minIdx - Math.floor(minIdx / matrixSize);
  }
  return -1;
};

export const getUnassignedAndCompletedVerticalCells = (
  point1: number,
  point2: number,
  edges: { [key: number]: Array<number> },
  matrix: Array<string | null>,
  matrixSize: number,
): Array<number> => {
  let unassignedAndCompletedMatrixIdxes: Array<number> = [],
    topCell: Array<number>,
    bottomCell: Array<number>;
  if (point1 - matrixSize >= 0) {
    topCell = [point1, point2, point1 - matrixSize, point2 - matrixSize];
    const topIdx: number = getMatrixIndexIfCompleteCell(
      topCell,
      edges,
      matrixSize,
    );
    if (topIdx !== -1 && _.isNil(matrix[topIdx]))
      unassignedAndCompletedMatrixIdxes.push(topIdx);
  }
  if (point1 + matrixSize < matrixSize * matrixSize) {
    bottomCell = [point1, point2, point1 + matrixSize, point2 + matrixSize];
    const bottomIdx: number = getMatrixIndexIfCompleteCell(
      bottomCell,
      edges,
      matrixSize,
    );
    if (bottomIdx !== -1 && _.isNil(matrix[bottomIdx]))
      unassignedAndCompletedMatrixIdxes.push(bottomIdx);
  }
  return unassignedAndCompletedMatrixIdxes;
};

export const getUnassignedAndCompletedHorizontalCells = (
  point1: number,
  point2: number,
  edges: { [key: number]: Array<number> },
  matrix: Array<string | null>,
  matrixSize: number,
): Array<number> => {
  let unassignedAndCompletedMatrixIdxes: Array<number> = [],
    leftCell: Array<number>,
    rightCell: Array<number>;
  if (
    Math.floor(point1 / matrixSize) === Math.floor((point1 - 1) / matrixSize)
  ) {
    leftCell = [point1, point2, point1 - 1, point2 - 1];
    const leftIdx: number = getMatrixIndexIfCompleteCell(
      leftCell,
      edges,
      matrixSize,
    );
    if (leftIdx !== -1 && _.isNil(matrix[leftIdx]))
      unassignedAndCompletedMatrixIdxes.push(leftIdx);
  }
  if (
    Math.floor(point1 / matrixSize) === Math.floor((point1 + 1) / matrixSize)
  ) {
    rightCell = [point1, point2, point1 + 1, point2 + 1];
    const rightIdx: number = getMatrixIndexIfCompleteCell(
      rightCell,
      edges,
      matrixSize,
    );
    if (rightIdx !== -1 && _.isNil(matrix[rightIdx]))
      unassignedAndCompletedMatrixIdxes.push(rightIdx);
  }
  return unassignedAndCompletedMatrixIdxes;
};

export const getUnassignedAndCompletedCells = (
  point1: number,
  point2: number,
  edges: { [key: number]: Array<number> },
  matrix: Array<string | null>,
  matrixSize: number,
): Array<number> => {
  return isHorizontalLine(point1, point2)
    ? getUnassignedAndCompletedVerticalCells(
        point1,
        point2,
        edges,
        matrix,
        matrixSize,
      )
    : getUnassignedAndCompletedHorizontalCells(
        point1,
        point2,
        edges,
        matrix,
        matrixSize,
      );
};

export const isMatrixComplete = (matrix: Array<string | null>): boolean =>
  !_.includes(matrix, null);

export const getUpdatedBoardState = ({
  selectedDot,
  idx,
  matrixSize,
  edges,
  matrix,
  players,
  playerTurn,
  users,
}: Room & { idx: number; users: { [key: string]: User } | undefined }): Omit<
  Room,
  'players' | 'matrixSize' | 'message' | 'host' | 'pendingInvite'
> => {
  let newEdges: { [key: number]: Array<number> } = _.merge({}, edges);
  let newSelectedDot: number = selectedDot;
  let newMatrix: Array<string | null> = enrichMatrix([...matrix], users);
  let newPlayerTurn: number = playerTurn;

  if (
    selectedDot !== -1 &&
    _.includes(
      [
        selectedDot - 1,
        selectedDot + 1,
        selectedDot + matrixSize,
        selectedDot - matrixSize,
      ],
      idx,
    ) &&
    !_.includes(edges[selectedDot], idx)
  ) {
    newEdges = mergeUtil(edges, { [selectedDot]: [idx], [idx]: [selectedDot] });

    newSelectedDot = -1;
    const matrixIdxToBeUpdated = getUnassignedAndCompletedCells(
      selectedDot,
      idx,
      edges,
      matrix,
      matrixSize,
    );
    _.forEach(matrixIdxToBeUpdated, (o) => {
      newMatrix[o] = players[playerTurn];
    });
    if (!isMatrixComplete(newMatrix) && _.size(matrixIdxToBeUpdated) === 0)
      newPlayerTurn = (playerTurn + 1) % _.size(players);
  } else {
    newSelectedDot = idx;
  }

  return {
    edges: newEdges,
    matrix: newMatrix,
    playerTurn: newPlayerTurn,
    selectedDot: newSelectedDot,
    lastUpdatedTime: getCurrentUTCTime(),
  };
};

export const enrichMatrix = (
  matrix: Array<string | null>,
  users: { [key: string]: User } | undefined,
): Array<string | null> =>
  _.reduce(
    matrix,
    (acc: Array<string | null>, v: string | null) => {
      v
        ? acc.push(
            _.chain(users).pickBy(['nameInitials', v]).keys().first().value(),
          )
        : acc.push(null);
      return acc;
    },
    [],
  );

export const getCurrentUTCTime = (): number => {
  const now = new Date();
  now.toUTCString();
  return Math.floor(now.getTime() / 1000);
};

export const getNewGameState = (
  players: Array<string>,
  host: string,
  matrixSize: number,
) => {
  const randomPlayerTurn = Math.floor(Math.random() * _.size(players));
  return {
    edges: {},
    pendingInvite: [],
    matrix: Array((matrixSize - 1) * (matrixSize - 1)).fill(null),
    selectedDot: -1,
    playerTurn: randomPlayerTurn,
    players,
    matrixSize,
    host,
    lastUpdatedTime: getCurrentUTCTime(),
  };
};

export const enrichRoom = (
  room: Room,
  users: { [key: string]: User } | undefined,
): Room => {
  if (!users || _.isEmpty(users)) return room;

  const matrix: Array<string | null> = _.reduce(
    room.matrix,
    (acc: Array<string | null>, v: string | null) => {
      v ? acc.push(users[v]?.nameInitials) : acc.push(null);
      return acc;
    },
    [],
  );
  const message = isMatrixComplete(room.matrix)
    ? getWinner(room.matrix, users)
    : `${users[room.players[room.playerTurn]]?.nickName}'s turn`;
  return {
    ...room,
    matrix,
    message,
  } as Room;
};

export const updateRoomPlayers = (
  userId: string,
  pendingInvite: Array<string>,
  players?: Array<string>,
  isAccepted?: boolean,
): { pendingInvite: Array<string>; players?: Array<string> } =>
  _.includes(pendingInvite, userId)
    ? isAccepted!
      ? {
          players: [...players!, userId],
          pendingInvite: _.remove(pendingInvite, (id) => id !== userId),
        }
      : { pendingInvite: _.remove(pendingInvite, (id) => id !== userId) }
    : { pendingInvite: [...pendingInvite, userId] };
