import { DefaultTheme } from '@react-navigation/native';
import { createContext, useContext } from 'react';
import { colors, Colors } from '../constants/colors';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors, 
  },
  fonts: {
    regular: 'SourceSansPro-Regular',
    bold: 'SourceSansPro-Bold'
  },
};

export const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
