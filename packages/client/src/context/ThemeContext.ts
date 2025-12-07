import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  setIsDarkTheme: () => {
  },
});

export const useTheme = () => useContext(ThemeContext);