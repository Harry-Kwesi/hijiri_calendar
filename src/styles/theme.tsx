import { DefaultTheme } from '@react-navigation/native';
import { createContext, useContext } from 'react';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    text: '#000000',
    disabled: '#e0e0e0',
    placeholder: '#a0a0a0',
    backdrop: '#000000',
    error: '#B00020',
    gray: '#6e6e6e',
  },
};

export const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
