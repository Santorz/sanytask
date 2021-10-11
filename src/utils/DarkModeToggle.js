import React, { useMemo, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocalstorageState } from 'rooks';
import Toggle from 'react-toggle';
import '../css/react-toggle.css';

export const useColorScheme = () => {
  const [isDarkMode, setIsDarkMode /*,removeThemeState*/] =
    useLocalstorageState('isDarkTheme');
  const systemPrefersDark = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
    undefined,
  });

  const value = useMemo(
    () =>
      isDarkMode === undefined ||
      isDarkMode === null ||
      (isDarkMode !== undefined &&
        isDarkMode !== null &&
        typeof isDarkMode !== 'boolean')
        ? systemPrefersDark
        : isDarkMode,
    [isDarkMode, systemPrefersDark]
  );

  useEffect(() => {
    // console.log(value);
    if (value) {
      document.body.setAttribute('darkTheme', true);
    } else {
      document.body.removeAttribute('darkTheme');
    }
  }, [value]);
  return [isDarkMode, setIsDarkMode];
};

export const DarkModeToggle = (props) => {
  const { isDarkTheme, darkThemeToggle } = props ? props : {};
  // const { isDarkTheme, darkThemeToggle } = useContext(DarkThemeContext);

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
