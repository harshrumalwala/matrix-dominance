import React from 'react';
import { useHistory } from 'react-router-dom';

import { Header, Button } from 'components';

const Home = () => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/room/AAA');
  };

  return (
    <div>
      <Header>Home</Header>
      <Button onClick={handleClick}>Go to game room</Button>
    </div>
  );
};

export default Home;
