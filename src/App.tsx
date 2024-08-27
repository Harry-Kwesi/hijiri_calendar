import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { ThemeProvider } from './styles/theme';


export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

