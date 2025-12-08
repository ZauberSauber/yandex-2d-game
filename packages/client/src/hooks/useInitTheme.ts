import { useEffect, useState } from 'react';

import { fetchThemeThunk } from '@slices/ThemeSlice';
import { useDispatch } from '@src/store';

export const useInitTheme = () => {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const initTheme = async () => {
      try {
        const themeCache = localStorage.getItem('darkTheme');

        if (themeCache !== null) {
          // Используем сохраненную тему из localStorage
          const isDark = themeCache === '1';
          setIsDarkTheme(isDark);
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        } else {
          // Если нет в localStorage, загружаем с бэка
          const result = await dispatch(fetchThemeThunk());
          if (fetchThemeThunk.fulfilled.match(result)) {
            const isDark = result.payload.theme === 1; // бэк возвращает { theme: 0|1 }
            setIsDarkTheme(isDark);
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('darkTheme', isDark ? '1' : '0');
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