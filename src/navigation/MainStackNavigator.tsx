import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import DateConverter from '../screens/DateConverterScreen';  
import AgeCalculator from '../screens/AgeCalculatorScreen';  
import MoonArticles from '../screens/MoonArticleScreen';  
import About from '../screens/AboutScreen';  

const Stack = createNativeStackNavigator();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,  
      }}
    >
      <Stack.Screen name="Tabs" component={MainTabNavigator} />
      <Stack.Screen name="DateConverter" component={DateConverter} />
      <Stack.Screen name="AgeCalculator" component={AgeCalculator} />
      <Stack.Screen name="MoonArticles" component={MoonArticles} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
