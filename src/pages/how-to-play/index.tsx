import React from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import { Header, Button, List, Item } from 'components';

const HowToPlay = () => {
  const history = useHistory();

  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/');
  };

  const rules = [
    'Create a new game or join an existing game',
    'On your turn try to connect any two adjacent dots (vertical or horizontal)',
    'To win a box try to connect the last remaining side of that box',
    'Try to get your name in maximum number of boxes to win the game',
    'Play and Enjoy...',
  ];

  return (
    <>
      <Header>How To Play</Header>
      <List>
        {_.map(rules, (rule: string, index: number) => (
          <Item key={`rule-${index}`} isBullet={true}>
            {rule}
          </Item>
        ))}
      </List>
      <Button onClick={handleHomeClick}>Home</Button>
    </>
  );
};

export default HowToPlay;
