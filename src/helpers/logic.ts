import { isHorizontalLine } from './util';
import _ from 'lodash';

export const isCompleteCell = (
  arr: Array<number>,
  edges: { [key: number]: Array<number> }
) => {
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
) => {
  if (isCompleteCell(arr, edges)) {
    const minIdx = Math.min(...arr);
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
) => {
  let unassignedAndCompletedMatrixIdxes = [],
    topCell,
    bottomCell;
  if (point1 - matrixSize >= 0) {
    topCell = [point1, point2, point1 - matrixSize, point2 - matrixSize];
    const topIdx = getMatrixIndexIfCompleteCell(topCell, edges, matrixSize);
    if (topIdx !== -1 && matrix[topIdx] === '')
      unassignedAndCompletedMatrixIdxes.push(topIdx);
  }
  if (point1 + matrixSize < matrixSize * matrixSize) {
    bottomCell = [point1, point2, point1 + matrixSize, point2 + matrixSize];
    const bottomIdx = getMatrixIndexIfCompleteCell(
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
) => {
  let unassignedAndCompletedMatrixIdxes = [],
    leftCell,
    rightCell;
  if (
    Math.floor(point1 / matrixSize) === Math.floor((point1 - 1) / matrixSize)
  ) {
    leftCell = [point1, point2, point1 - 1, point2 - 1];
    const leftIdx = getMatrixIndexIfCompleteCell(leftCell, edges, matrixSize);
    if (leftIdx !== -1 && matrix[leftIdx] === '')
      unassignedAndCompletedMatrixIdxes.push(leftIdx);
  }
  if (
    Math.floor(point1 / matrixSize) === Math.floor((point1 + 1) / matrixSize)
  ) {
    rightCell = [point1, point2, point1 + 1, point2 + 1];
    const rightIdx = getMatrixIndexIfCompleteCell(rightCell, edges, matrixSize);
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
) => {
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
