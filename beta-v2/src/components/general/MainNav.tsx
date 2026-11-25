'use client';
import { useTheme } from 'next-themes';

import { FC } from 'react';
import ReactResp from '@/lib/ReactResp';

// Main Nav Component
const MainNav: FC = () => {
  return (
    <>
      <h1>{typeof ReactResp}</h1>
    </>
  );
};

export default MainNav;
