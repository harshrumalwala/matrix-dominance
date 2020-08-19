import { isHorizontalLine } from './util';
import _ from 'lodash';

export const isCompleteCell = (
  arr: Array<number>,
  edges: { [key: number]: Array<number> }
): boolean => {
  arr.sort((a, b) => a - b);
  return (
    _.every([arr[1], arr[2]], (o) => _.includes(edges[arr[0]], o)) &&
    _.every([arr[1], arr[2]], (o) => _.includes(edges[arr[3]], o))
  );
};

export const getMatrixIndexIfCompleteCell = (
  arr: Array<number>,
  edges: { [key: number]: Array<number> },
  matrixSize: number
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
  matrix: Array<string>,
  matrixSize: number
): Array<number> => {
  let unassignedAndCompletedMatrixIdxes: Array<number> = [],
    topCell: Array<number>,
    bottomCell: Array<number>;
  if (point1 - matrixSize >= 0) {
    topCell = [point1, point2, point1 - matrixSize, point2 - matrixSize];
    const topIdx: number = getMatrixIndexIfCompleteCell(
      topCell,
      edges,
      matrixSize
    );
    if (topIdx !== -1 && matrix[topIdx] === '')
      unassignedAndCompletedMatrixIdxes.push(topIdx);
  }
  if (point1 + matrixSize < matrixSize * matrixSize) {
    bottomCell = [point1, point2, point1 + matrixSize, point2 + matrixSize];
    const bottomIdx: number = getMatrixIndexIfCompleteCell(
      bottomCell,
      edges,
      matrixSize
    );
    if (bottomIdx !== -1 && matrix[bottomIdx] === '')
      unassignedAndCompletedMatrixIdxes.push(bottomIdx);
  }
  return unassignedAndCompletedMatrixIdxes;
};

export const getUnassignedAndCompletedHorizontalCells = (
  point1: number,
  point2: number,
  edges: { [key: number]: Array<number> },
  matrix: Array<string>,
  matrixSize: number
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
      matrixSize
    );
    if (leftIdx !== -1 && matrix[leftIdx] === '')
      unassignedAndCompletedMatrixIdxes.push(leftIdx);
  }
  if (
    Math.floor(point1 / matrixSize) === Math.floor((point1 + 1) / matrixSize)
  ) {
    rightCell = [point1, point2, point1 + 1, point2 + 1];
    const rightIdx: number = getMatrixIndexIfCompleteCell(
      rightCell,
      edges,
      matrixSize
    );
    if (rightIdx !== -1 && matrix[rightIdx] === '')
      unassignedAndCompletedMatrixIdxes.push(rightIdx);
  }
  return unassignedAndCompletedMatrixIdxes;
};

export const getUnassignedAndCompletedCells = (
  point1: number,
  point2: number,
  edges: { [key: number]: Array<number> },
  matrix: Array<string>,
  matrixSize: number
): Array<number> => {
  return isHorizontalLine(point1, point2)
    ? getUnassignedAndCompletedVerticalCells(
        point1,
        point2,
        edges,
        matrix,
        matrixSize
      )
    : getUnassignedAndCompletedHorizontalCells(
        point1,
        point2,
        edges,
        matrix,
        matrixSize
      );
};

export const isMatrixComplete = (matrix: Array<string>): boolean =>
  !_.includes(matrix, '');

export const getWinner = (matrix: Array<string>): string => {
  const playersCellCount: { [key: string]: number } = _.countBy(matrix);
  const numberOfWinners: { [key: number]: number } = _.countBy(
    playersCellCount
  );

  const winner: string = _.maxBy(
    Object.keys(playersCellCount),
    (o) => playersCellCount[o]
  ) as string;

  return numberOfWinners[playersCellCount[winner]] === 1
    ? `${winner} won the board`
    : 'Draw';
};
