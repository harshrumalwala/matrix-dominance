import React from 'react';
import { useHistory } from 'react-router-dom';

import { Header, Button, Logout } from 'components';
import { useCurrentUser } from 'hooks';

const Home = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();

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
    history.push(`/profile/${currentUser?.uid}`);
  };

  return (
    <div>
      <Header>Home</Header>
      <Button onClick={handleClick}>Go to game room</Button>
      {currentUser ? (
        <>
          <Button onClick={handleProfile}>Profile</Button>
          <Logout />
        </>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
};

export default Home;
