import { useRef, useEffect } from 'react';

const usePrevious = (value: string | boolean | number) => {
  const ref = useRef<string | boolean | number>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;