import { useState, useEffect } from 'react';
import { Window } from 'typings';

const useDimensions = () => {
  const [dimensions, setDimensions] = useState<Window>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () =>
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions]);
};

export default useDimensions;
