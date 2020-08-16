import React, { useState } from 'react';
import './App.css';
import _ from 'lodash';

import { Container, Row, Dot, Cell } from 'styles';
import LineTo from 'react-lineto';

const App = () => {
  const [edges, setEdges] = useState({});
  const [matrix, setMatrix] = useState([]);
  const [start, setStart] = useState(-1);
  const matrixSize = 4;

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

  const handleClick = (e: React.MouseEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();

    if (start === -1) setStart(idx);
    else {
      setEdges((prevState) =>
        mergeUtil(prevState, { [start]: [idx], [idx]: [start] })
      );
      setStart(-1);
    }
    console.log(edges);
  };

  return (
    <Container>
      {_.times(2 * matrixSize - 1, (i) => (
        <Row key={i}>
          {i % 2 === 0 &&
            _.times(matrixSize, (j) => (
              <Dot
                key={i * matrixSize + j}
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  handleClick(e, i * matrixSize + j)
                }
                className={`dot_${i * matrixSize + j}`}
              />
            ))}
          {i % 2 === 1 &&
            _.times(matrixSize - 1, (k) =>
              k === 0 ? (
                <Cell key={i * matrixSize + k} className="left-cell">
                  HR
                </Cell>
              ) : (
                <Cell key={i * matrixSize + k}>HR</Cell>
              )
            )}
        </Row>
      ))}
      {_.map(edges, (v, k) =>
        _.map(v, (o) => <LineTo from={`dot_${o}`} to={`dot_${k}`} delay={0} />)
      )}
    </Container>
  );
};

export default App;
