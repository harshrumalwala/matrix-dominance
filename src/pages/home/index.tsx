import React from 'react';
import { useHistory } from 'react-router-dom';

import { Header, Button, Logout, NewGameModal } from 'components';
import { useCurrentUser } from 'hooks';

const Home = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/login');
  };

  const handleActiveRooms = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/roomList');
  };

  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push(`/profile/${currentUser?.uid}`);
  };

  return (
    <div>
      <Header>Home</Header>
      {currentUser ? (
        <>
          <NewGameModal isExisting={false} />
          <Button onClick={handleActiveRooms}>Join Game Room</Button>
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
