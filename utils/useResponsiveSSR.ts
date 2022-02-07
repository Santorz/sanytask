import { useState, useLayoutEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export function useResponsiveSSR() {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: '48em',
  });

  const isTabletOnly = useMediaQuery({
    minWidth: '48em',
    maxWidth: '62em',
  });

  const isTabletAndAbove = useMediaQuery({
    minWidth: '48em',
  });

  const isDesktop = useMediaQuery({
    minWidth: '62em',
  });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  return {
    isDesktop: isClient ? isDesktop : true,
    isTabletOnly: isClient ? isTabletOnly : false,
    isMobile: isClient ? isMobile : false,
    isTabletAndAbove: isClient ? isTabletAndAbove : false,
  };
}

export default useResponsiveSSR;
