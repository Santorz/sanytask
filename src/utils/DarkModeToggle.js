import React, { useMemo, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocalstorage } from 'rooks';
import Toggle from 'react-toggle';
import '../css/react-toggle.css';

export const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useColorScheme();
  return (
    <Toggle
      className='app-theme-toggle'
      checked={isDarkMode}
      onChange={({ target }) => setIsDarkMode(target.checked)}
      icons={{ checked: '🌙', unchecked: '🔆' }}
      aria-label='App theme toggle'
    />
  );
};

export const useColorScheme = () => {
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined
  );

  const [themeStateBool, setThemeStateBool /*,removeThemeState*/] =
    useLocalstorage('isDarkTheme');

  const [isDarkMode, setIsDarkMode] = [themeStateBool, setThemeStateBool];

  const value = useMemo(
    () =>
      isDarkMode === undefined ||
      isDarkMode === null ||
      ((isDarkMode === undefined || isDarkMode === null) &&
        typeof isDarkMode !== 'boolean')
        ? !!systemPrefersDark
        : isDarkMode,
    [isDarkMode, systemPrefersDark]
  );

  useEffect(() => {
    if (value) {
      document.body.setAttribute('darkTheme', true);
    } else {
      document.body.removeAttribute('darkTheme');
    }
  }, [value]);
  return {
    isDarkMode: value,
    setIsDarkMode,
  };
};

// export default DarkModeToggle;
