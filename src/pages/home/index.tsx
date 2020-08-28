import React from 'react';
import { useHistory } from 'react-router-dom';

import { Header, Button } from 'components';

const Home = () => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/room/AAA');
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/login');
  };

  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/profile');
  };

  return (
    <div>
      <Header>Home</Header>
      <Button onClick={handleClick}>Go to game room</Button>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleProfile}>Profile</Button>
    </div>
  );
};

export default Home;
