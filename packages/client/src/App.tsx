import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { saveThemeThunk } from '@slices';
import { ThemesId } from '@src/api/themeApi/types';
import { ThemeContext } from '@src/context';
import { useInitTheme } from '@src/hooks/useInitTheme';
import { useDispatch } from '@src/store';

import { routes } from './routes';

const router = createBrowserRouter(routes);

export const App = () => {
  const dispatch = useDispatch();
  const { isDarkTheme: initIsDarkTheme } = useInitTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(initIsDarkTheme);

  useEffect(() => {
    setIsDarkTheme(initIsDarkTheme);
  }, [initIsDarkTheme]);

  const handleThemeChange = async (isDark: boolean) => {
    try {
      const themeValue = isDark ? ThemesId.Dark : ThemesId.Light;

      localStorage.setItem('darkTheme', themeValue.toString());

      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

      setIsDarkTheme(isDark);

      await dispatch(saveThemeThunk(themeValue));
    } catch (error) {
      console.error('Failed to save theme:', error);

      const fallbackTheme = localStorage.getItem('darkTheme') === String(ThemesId.Dark);
      setIsDarkTheme(fallbackTheme);
      document.documentElement.setAttribute('data-theme', fallbackTheme ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme: handleThemeChange }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};
