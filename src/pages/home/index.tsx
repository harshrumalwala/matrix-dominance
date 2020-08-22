import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/room/AAA');
  };

  return (
    <>
      <h3>Home</h3>
      <button onClick={handleClick}>Go to game room</button>
    </>
  );
};

export default Home;
