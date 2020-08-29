import React from 'react';
import LineTo from 'react-lineto';
import _ from 'lodash';

import { Header, Button } from 'components';
import { Container, Row, Dot, Cell, Grid } from './styles';
import {
  useRoom,
  useDimensions,
  useConnectDots,
  useCreateNewGame,
} from 'hooks';

const Room = () => {
  const { isFetching, room } = useRoom();
  const { isConnectingDots, connectDots } = useConnectDots();
  const { isCreatingNewGame, createNewGame } = useCreateNewGame();

  useDimensions();

  if (isFetching) return <Header>Loading Room...</Header>;

  if (!room) return <Header>Room Not Found</Header>;

  const { selectedDot, edges, matrix, message, matrixSize, players } = room;

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();
    connectDots(idx, room);
  };

  const startNewGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createNewGame(players, matrixSize);
  };

  const getDotId = (x: number, y: number): number => (x / 2) * matrixSize + y;
  const getCellId = (x: number, y: number): number =>
    ((x - 1) / 2) * (matrixSize - 1) + y;

  return (
    <Container>
      <h3>{message}</h3>
      <Grid isConnectingDots={isConnectingDots}>
        {_.times(2 * matrixSize - 1, (i: number) => (
          <Row key={i}>
            {i % 2 === 0 &&
              _.times(matrixSize, (j: number) => (
                <Dot
                  isSelected={selectedDot === getDotId(i, j)}
                  key={getDotId(i, j)}
                  dotId={getDotId(i, j)}
                  matrixSize={matrixSize}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                    handleClick(e, getDotId(i, j))
                  }
                  className={`dot_${getDotId(i, j)}`}
                />
              ))}
            {i % 2 === 1 &&
              _.times(matrixSize - 1, (k: number) => (
                <Cell
                  key={getCellId(i, k)}
                  cellId={getCellId(i, k)}
                  matrixSize={matrixSize}
                  className={`cell_${getCellId(i, k)}`}
                >
                  {matrix[getCellId(i, k)] && matrix[getCellId(i, k)]}
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
      </Grid>
      <Button disabled={isCreatingNewGame} onClick={startNewGame}>{`${
        isCreatingNewGame ? 'Creating New Game' : 'New Game'
      }`}</Button>
    </Container>
  );
};

export default Room;
