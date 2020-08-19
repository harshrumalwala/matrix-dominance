import React, { useState } from 'react';
import './App.css';
import _ from 'lodash';

import { Container, Row, Dot, Cell } from 'styles';
import LineTo from 'react-lineto';
import { mergeUtil } from 'helpers/util';
import { getUnassignedAndCompletedCells } from 'helpers/logic';

const matrixSize = 8;

const App = () => {
  const [edges, setEdges] = useState<{ [key: number]: Array<number> }>({});
  const [matrix, setMatrix] = useState(Array(49).fill(''));
  const [start, setStart] = useState(-1);
  const [players, setPlayers] = useState(['HR', 'MR', 'AR']);
  const [playersTurn, setPlayersTurn] = useState(0);

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

export default App;
