import React, { useContext } from 'react';
import { DarkThemeContext } from '..';
import Toggle from 'react-toggle';
import '../css/react-toggle.css';

export const DarkModeToggle = (props) => {
  // const { isDarkTheme, darkThemeToggle } = props ? props : {};
  const { isDarkTheme, darkThemeToggle } = useContext(DarkThemeContext);

  return (
    <Toggle
      className='app-theme-toggle'
      checked={isDarkTheme}
      onChange={() => {
        darkThemeToggle();
      }}
      icons={{ checked: '🌙', unchecked: '🔆' }}
      aria-label='App theme toggle'
    />
  );
};
