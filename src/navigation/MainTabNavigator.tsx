import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PhasesScreen from '../screens/PhasesScreen';
import EventsScreen from '../screens/EventsScreen';
import EclipsesScreen from '../screens/EclipsesScreen';
import { useTheme } from '../styles/theme';

const Tab = createBottomTabNavigator();
const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName: string;

  switch (routeName) {
    case 'Home':
      iconName = 'home-outline';
      break;
    case 'Search':
      iconName = 'search-outline';
      break;
    case 'Phases':
      iconName = 'moon-outline';
      break;
    case 'Events':
      iconName = 'calendar-outline';
      break;
    case 'Eclipses':
      iconName = 'planet-outline';
      break;
    default:
      iconName = 'ellipse-outline';
  }

  return <Icon name={iconName} size={28} color={color} />;
};

const MainTabNavigator = React.memo(() => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => getTabBarIcon(route.name, props.color, props.size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Phases" component={PhasesScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Eclipses" component={EclipsesScreen} />
    </Tab.Navigator>
  );
});

export default MainTabNavigator;