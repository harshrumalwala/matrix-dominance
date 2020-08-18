import React, { useState } from 'react';
import './App.css';
import _ from 'lodash';

import { Container, Row, Dot, Cell } from 'styles';
import LineTo from 'react-lineto';

const matrixSize = 8;

const App = () => {
  const [edges, setEdges] = useState<{ [key: number]: Array<number> }>({});
  const [matrix, setMatrix] = useState(Array(49).fill(''));
  const [start, setStart] = useState(-1);
  const [players, setPlayers] = useState(['HR', 'MR', 'AR']);
  const [playersTurn, setPlayersTurn] = useState(0);

  const isHorizontalLine = (start: number, end: number) =>
    Math.abs(start - end) === 1;

  const mergeUtil = (
    a: { [key: string]: Array<number> },
    b: { [key: string]: Array<number> }
  ) => {
    let result: { [key: string]: Array<number> } = a;
    _.forEach(b, (v: Array<number>, k: string) => {
      result[k] = _.has(result, k) ? _.union(result[k], v) : v;
    });
    return result;
  };

  const isCompleteCell = (arr: Array<number>) => {
    arr.sort((a, b) => a - b);
    return (
      _.every([arr[1], arr[2]], (o) => _.includes(edges[arr[0]], o)) &&
      _.every([arr[1], arr[2]], (o) => _.includes(edges[arr[3]], o))
    );
  };

  const getMatrixIndexIfCompleteCell = (arr: Array<number>) => {
    if (isCompleteCell(arr)) {
      const minIdx = Math.min(...arr);
      return minIdx - Math.floor(minIdx / matrixSize);
    }
    return -1;
  };

  const getUnassignedAndCompletedVerticalCells = (
    point1: number,
    point2: number
  ) => {
    let unassignedAndCompletedMatrixIdxes = [],
      topCell,
      bottomCell;
    if (point1 - matrixSize >= 0) {
      topCell = [point1, point2, point1 - matrixSize, point2 - matrixSize];
      const topIdx = getMatrixIndexIfCompleteCell(topCell);
      if (topIdx !== -1 && matrix[topIdx] === '')
        unassignedAndCompletedMatrixIdxes.push(topIdx);
    }
    if (point1 + matrixSize < matrixSize * matrixSize) {
      bottomCell = [point1, point2, point1 + matrixSize, point2 + matrixSize];
      const bottomIdx = getMatrixIndexIfCompleteCell(bottomCell);
      if (bottomIdx !== -1 && matrix[bottomIdx] === '')
        unassignedAndCompletedMatrixIdxes.push(bottomIdx);
    }
    return unassignedAndCompletedMatrixIdxes;
  };

  const getUnassignedAndCompletedHorizontalCells = (
    point1: number,
    point2: number
  ) => {
    let unassignedAndCompletedMatrixIdxes = [],
      leftCell,
      rightCell;
    if (
      Math.floor(point1 / matrixSize) === Math.floor((point1 - 1) / matrixSize)
    ) {
      leftCell = [point1, point2, point1 - 1, point2 - 1];
      const leftIdx = getMatrixIndexIfCompleteCell(leftCell);
      if (leftIdx !== -1 && matrix[leftIdx] === '')
        unassignedAndCompletedMatrixIdxes.push(leftIdx);
    }
    if (
      Math.floor(point1 / matrixSize) === Math.floor((point1 + 1) / matrixSize)
    ) {
      rightCell = [point1, point2, point1 + 1, point2 + 1];
      const rightIdx = getMatrixIndexIfCompleteCell(rightCell);
      if (rightIdx !== -1 && matrix[rightIdx] === '')
        unassignedAndCompletedMatrixIdxes.push(rightIdx);
    }
    return unassignedAndCompletedMatrixIdxes;
  };

  const getUnassignedAndCompletedCells = (point1: number, point2: number) => {
    return isHorizontalLine(point1, point2)
      ? getUnassignedAndCompletedVerticalCells(point1, point2)
      : getUnassignedAndCompletedHorizontalCells(point1, point2);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();

    if (
      start !== -1 &&
      _.includes(
        [start - 1, start + 1, start + matrixSize, start - matrixSize],
        idx
      )
    ) {
      setEdges((prevState) =>
        mergeUtil(prevState, { [start]: [idx], [idx]: [start] })
      );
      setStart(-1);
      const matrixIdxToBeUpdated = getUnassignedAndCompletedCells(start, idx);
      _.forEach(matrixIdxToBeUpdated, (o) => {
        const updatedMatrix = matrix;
        updatedMatrix[o] = players[playersTurn];
        setMatrix(updatedMatrix);
      });
      _.size(matrixIdxToBeUpdated) === 0 &&
        setPlayersTurn((playersTurn + 1) % _.size(players));
    } else {
      setStart(idx);
    }
  };

  return (
    <Container>
      <p>Player's Turn : {players[playersTurn]}</p>
      {_.times(2 * matrixSize - 1, (i) => (
        <Row key={i}>
          {i % 2 === 0 &&
            _.times(matrixSize, (j) => (
              <Dot
                key={(i / 2) * matrixSize + j}
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  handleClick(e, (i / 2) * matrixSize + j)
                }
                className={`dot_${(i / 2) * matrixSize + j}`}
              />
            ))}
          {i % 2 === 1 &&
            _.times(matrixSize - 1, (k) => (
              <Cell
                key={((i - 1) / 2) * (matrixSize - 1) + k}
                className={`${k === 0 ? 'left-cell' : ''} cell_${
                  ((i - 1) / 2) * matrixSize + k
                }`}
              >
                {matrix[((i - 1) / 2) * (matrixSize - 1) + k]}
              </Cell>
            ))}
        </Row>
      ))}
      {_.map(edges, (v, k) =>
        _.map(v, (o) => (
          <LineTo
            key={`from_${o}_to_${k}`}
            from={`dot_${o}`}
            to={`dot_${k}`}
            delay={0}
          />
        ))
      )}
    </Container>
  );
};

export default App;
