import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { ThemeProvider } from './styles/theme';
import BootSplash from 'react-native-bootsplash';

export default function App() {

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []); 


  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}




