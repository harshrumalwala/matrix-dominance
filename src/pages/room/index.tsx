import React from 'react';
import LineTo from 'react-lineto';
import _ from 'lodash';

import { Container, Row, Dot, Cell, Button } from 'styles';
import {
  useRoom,
  useDimensions,
  useConnectDots,
  useCreateNewGame,
} from 'hooks';

const Room = () => {
  const { isFetching, room } = useRoom();
  const { isConnecting, connectDots } = useConnectDots();
  const { isCreatingNewGame, createNewGame } = useCreateNewGame();

  useDimensions();

  if (isFetching) return <h1>Loading Room...</h1>;

  if (!room) return <h1>Room Not Found</h1>;

  const { selectedDot, edges, matrix, message, matrixSize, players } = room;

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();
    connectDots(idx, room);
  };

  const startNewGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createNewGame(players, matrixSize);
  };

  return (
    <Container>
      <h3>{message}</h3>
      {_.times(2 * matrixSize - 1, (i) => (
        <Row key={i}>
          {i % 2 === 0 &&
            _.times(matrixSize, (j) => (
              <Dot
                isSelected={selectedDot === (i / 2) * matrixSize + j}
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
                {matrix[((i - 1) / 2) * (matrixSize - 1) + k] &&
                  matrix[((i - 1) / 2) * (matrixSize - 1) + k]}
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
      <Button onClick={startNewGame}>Create New Game</Button>
    </Container>
  );
};

export default Room;
