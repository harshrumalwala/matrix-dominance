import { CountdownOutput } from 'typings';
import { useState, useEffect } from 'react';

const useCountdown = (startingTimer: number = 10): CountdownOutput => {
  const [counter, setCounter] = useState<number>(startingTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('i am noobie')
      setCounter(counter - 1);
    }, 1000);
    if (counter === 0) clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
  });

  return {counter, setCounter};
};

export default useCountdown;
