import { useState, useEffect } from 'react';

export enum MEDIA_QUERIES {
  MOBILE = "(max-width: 768px)",
  // more queries...
}

export const useMediaQuery = (query:MEDIA_QUERIES) => {
  const {matches, setMatches} = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // listen for window size change
    const handleMediaQueryChange = (event: {matches: boolean}) => {
      setMatches(event.matches)
    }
    mediaQuery.addListener(handleMediaQueryChange)
    
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    }
  }, [query])
  
  return matches
};
