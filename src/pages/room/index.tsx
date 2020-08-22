import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

import { Container, Row, Dot, Cell } from 'styles';
import LineTo from 'react-lineto';
import { mergeUtil } from 'helpers/util';
import {
  getUnassignedAndCompletedCells,
  getWinner,
  isMatrixComplete,
} from 'helpers/logic';

const matrixSize = 3;

const Room = () => {
  const { id }: { id: string } = useParams();
  const [edges, setEdges] = useState<{ [key: number]: Array<number> }>({});
  const [matrix, setMatrix] = useState(
    Array((matrixSize - 1) * (matrixSize - 1)).fill('')
  );
  const [start, setStart] = useState(-1);
  const [players, setPlayers] = useState(['HR', 'MR', 'AR']);
  const [playersTurn, setPlayersTurn] = useState(0);
  const [message, setMessage] = useState(`${players[0]}'s turn`);

  useEffect(() => {
    setMessage(`${players[playersTurn]}'s turn`);
  }, [playersTurn, players]);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();

    if (
      start !== -1 &&
      _.includes(
        [start - 1, start + 1, start + matrixSize, start - matrixSize],
        idx
      ) &&
      !_.includes(edges[start], idx)
    ) {
      setEdges((prevState) =>
        mergeUtil(prevState, { [start]: [idx], [idx]: [start] })
      );
      setStart(-1);
      const matrixIdxToBeUpdated = getUnassignedAndCompletedCells(
        start,
        idx,
        edges,
        matrix,
        matrixSize
      );
      _.forEach(matrixIdxToBeUpdated, (o) => {
        const updatedMatrix = matrix;
        updatedMatrix[o] = players[playersTurn];
        setMatrix(updatedMatrix);
      });
      if (isMatrixComplete(matrix)) setMessage(getWinner(matrix));
      else if (_.size(matrixIdxToBeUpdated) === 0)
        setPlayersTurn((playersTurn + 1) % _.size(players));
    } else {
      setStart(idx);
    }
  };

  return (
    <Container>
      <h1>{id}</h1>
      <h3>{message}</h3>
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
                className={`cell_${((i - 1) / 2) * matrixSize + k}`}
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

export default Room;
