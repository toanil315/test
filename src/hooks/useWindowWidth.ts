import { useLayoutEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  return width;
};
