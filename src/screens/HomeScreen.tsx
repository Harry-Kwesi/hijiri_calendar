import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SideMenu from 'react-native-side-menu';
import Header from '../components/Header';
import { useTheme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-hijri';

const { height } = Dimensions.get('window');

const menuItems = [
  { title: 'Home', icon: 'home', screen: 'Home' },
  { title: 'Date Converter', icon: 'calendar', screen: 'DateConverter' },
  { title: 'Age Calculator', icon: 'calculator', screen: 'AgeCalculator' },
  { title: 'Moon Articles', icon: 'document-text', screen: 'MoonArticles' },
  { title: 'About', icon: 'information-circle', screen: 'About' },
];

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const navigation = useNavigation();

  const handleShare = () => {
    console.log('Share icon pressed');
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemPress = (screen: string) => {
    closeMenu();
    navigation.navigate(screen);
  };

  const handleNextDay = () => {
    setCurrentDate(currentDate.clone().add(1, 'days'));
  };

  const handlePreviousDay = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'days'));
  };

  function getMoonPhase(date: moment.Moment): string {
    const synodicMonth = 29.53058867;
    const knownNewMoon = moment('2023-12-12');
    
    const daysSinceNewMoon = date.diff(knownNewMoon, 'days');
    const phase = (daysSinceNewMoon % synodicMonth) / synodicMonth;

    if (phase < 0.03 || phase > 0.97) {
        return '🌑';
    } else if (phase < 0.22) {
        return '🌒';
    } else if (phase < 0.28) {
        return '🌓';
    } else if (phase < 0.47) {
        return '🌔';
    } else if (phase < 0.53) {
        return '🌕';
    } else if (phase < 0.72) {
        return '🌖';
    } else if (phase < 0.78) {
        return '🌗';
    } else {
        return '🌘';
    }
  }

  const getMoonPhaseImage = (date: moment.Moment) => {
    const phase = getMoonPhase(date);
    switch (phase) {
      case '🌑':
        return { image: require('../assets/images/new_moon.jpeg'), label: 'Phase-1' };
      case '🌒':
        return { image: require('../assets/images/waxing_crescent.jpeg'), label: 'Phase-2' };
      case '🌓':
        return { image: require('../assets/images/first_quarter.jpeg'), label: 'Phase-3' };
      case '🌔':
        return { image: require('../assets/images/waxing_gibbous.jpeg'), label: 'Phase-4' };
      case '🌕':
        return { image: require('../assets/images/full_moon.jpeg'), label: 'Phase-5' };
      case '🌖':
        return { image: require('../assets/images/waning_gibbous.jpeg'), label: 'Phase-6' };
      case '🌗':
        return { image: require('../assets/images/last_quarter.jpeg'), label: 'Phase-7' };
      case '🌘':
        return { image: require('../assets/images/waning_crescent.jpeg'), label: 'Phase-8' };
      default:
        return { image: require('../assets/images/moon.jpg'), label: 'unknown Phase' };
    }
  };

  const hijriDate = currentDate.format('iD iMMMM iYYYY');
  const gregorianDate = currentDate.format('YYYY-MM-DD');
  const dayName = currentDate.format('dddd');
  const { image: moonPhaseImage, label: phaseLabel } = getMoonPhaseImage(currentDate);

  return (
    <SideMenu
      menu={
        <View style={styles.menu}>
          <Text style={styles.menuTitle}>Menu</Text>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.title} style={styles.menuItem} onPress={() => handleMenuItemPress(item.screen)}>
              <Icon name={item.icon} size={24} color={colors.text} style={styles.menuItemIcon} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      }
      isOpen={isMenuOpen}
      onChange={setIsMenuOpen}
      menuPosition='right'
      edgeHitWidth={100}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          title=""
          onShare={handleShare}
          onMenu={handleMenu}
          layout="home"
          showMenuIcon={!isMenuOpen}
        />
        <View style={styles.imageContainer}>
          <Image source={moonPhaseImage} style={styles.image} />
          <Text style={styles.phaseLabel}>{phaseLabel}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePreviousDay}>
            <Text style={styles.buttonText}>Previous Day</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextDay}>
            <Text style={styles.buttonText}>Next Day</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={[styles.text, { color: colors.text }]}>
            <Text style={styles.title}>{dayName}{'\n'}</Text>
            <Text style={styles.subText}>{hijriDate}{'\n'}</Text>
            <Text style={styles.subText}>{gregorianDate}</Text>
          </Text>
        </View>
      </View>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  phaseLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  text: {
    textAlign: 'left',
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    padding:10
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  menu: {
    width: 250,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'flex-start',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default HomeScreen;
