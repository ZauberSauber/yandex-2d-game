import { useEffect, useState } from 'react';

import { fetchThemeThunk } from '@slices/ThemeSlice';
import { ThemesId } from '@src/api/themeApi/types';
import { useDispatch } from '@src/store';

export const useInitTheme = () => {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const initTheme = async () => {
      try {
        const themeCache = localStorage.getItem('theme');

        if (themeCache !== null) {
          // Используем сохраненную тему из localStorage
          const isDark = themeCache === String(ThemesId.Dark);
          setIsDarkTheme(isDark);
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        } else {
          // Если нет в localStorage, загружаем с бэка
          const result = await dispatch(fetchThemeThunk());
          if (fetchThemeThunk.fulfilled.match(result)) {
            const isDark = result.payload === ThemesId.Dark;
            setIsDarkTheme(isDark);
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            const theme = (isDark ? ThemesId.Dark : ThemesId.Light) as unknown as string;
            localStorage.setItem('theme', theme);
          }
        }
      } catch (error) {
        console.error('Failed to init theme:', error);

        setIsDarkTheme(true);
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    };

    initTheme();
  }, [dispatch]);

  return { isDarkTheme, setIsDarkTheme };
};
