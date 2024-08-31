import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SideMenu from 'react-native-side-menu';
import Header from '../components/Header';
import { useTheme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-hijri';
import CustomText from '../components/Customtext';

const { height} = Dimensions.get('window');

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
  const [initialDate] = useState(moment());  
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

  const handleResetDate = () => {
    setCurrentDate(initialDate.clone());
  };

  const getMoonPhase = useCallback((date: moment.Moment): string => {
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
  }, []);

  const getMoonPhaseImage = useMemo(() => {
    return (date: moment.Moment) => {
      const phase = getMoonPhase(date);
      switch (phase) {
        case '🌑':
          return { image: require('../../assets/images/new_moon.jpeg'), label: 'Current Moon Phase' };
        case '🌒':
          return { image: require('../../assets/images/waxing_crescent.jpeg'), label: 'Current Moon Phase' };
        case '🌓':
          return { image: require('../../assets/images/first_quarter.jpeg'), label: 'Current Moon Phase' };
        case '🌔':
          return { image: require('../../assets/images/waxing_gibbous.jpeg'), label: 'Current Moon Phase' };
        case '🌕':
          return { image: require('../../assets/images/full_moon.jpeg'), label: 'Current Moon Phase' };
        case '🌖':
          return { image: require('../../assets/images/waning_gibbous.jpeg'), label: 'Current Moon Phase' };
        case '🌗':
          return { image: require('../../assets/images/last_quarter.jpeg'), label: 'Current Moon Phase' };
        case '🌘':
          return { image: require('../../assets/images/waning_crescent.jpeg'), label: 'Current Moon Phase' };
        default:
          return { image: require('../../assets/images/moon.jpg'), label: 'Unknown Phase' };
      }
    };
  }, [getMoonPhase]);

  const hijriDate = currentDate.format('iD iMMMM iYYYY');
  const gregorianDate = currentDate.format('YYYY-MM-DD');
  const dayName = currentDate.format('dddd');
  const { image: moonPhaseImage, label: phaseLabel } = getMoonPhaseImage(currentDate);

  const handleImageError = () => {
    Alert.alert('Error', 'Failed to load moon phase image.');
  };

  return (
    <SideMenu
      menu={
        <View style={[styles.menu, { backgroundColor: colors.surface }]}>
          <CustomText style={[styles.menuTitle, { color: colors.text }]}>Menu</CustomText>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.screen)}
              accessibilityLabel={item.title}
              accessibilityRole="button"
            >
              <Icon name={item.icon} size={24} color={colors.text} style={styles.menuItemIcon} />
              <CustomText style={[styles.menuItemText, { color: colors.text }]}>{item.title}</CustomText>
            </TouchableOpacity>
          ))}
        </View>
      }
      isOpen={isMenuOpen}
      onChange={setIsMenuOpen}
      menuPosition='right'
      edgeHitWidth={200}
    >
      <View style={[styles.container, { backgroundColor: colors.darkgray }]}>
        <Header
          title=""
          onShare={handleShare}
          onMenu={handleMenu}
          layout="home"
          showMenuIcon={!isMenuOpen}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePreviousDay} accessibilityLabel="Previous Day" accessibilityRole="button" style={[styles.button, styles.previousButton]}>
            <CustomText style={[styles.buttonText, { color: colors.darkgray }]}>Previous</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleResetDate} accessibilityLabel="Reset Date" accessibilityRole="button" >
              <CustomText style={[styles.resetText, { color: colors.surface }]}>Back To Today</CustomText>
            </TouchableOpacity>
          <TouchableOpacity onPress={handleNextDay} accessibilityLabel="Next Day" accessibilityRole="button" style={[styles.button, styles.nextButton]}>
            <CustomText style={[styles.buttonText, { color: colors.darkgray }]}>Next</CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={moonPhaseImage}
            style={styles.image}
            onError={handleImageError}
          />
          <CustomText style={styles.phaseLabel}>{phaseLabel}</CustomText>
        </View>
        <View style={styles.content}>
          <Text style={[styles.text, { color: colors.surface}]}>
          
            <CustomText style={{ fontWeight: 'bold', fontSize: 40 }}>{dayName}{'\n'}</CustomText>
            <CustomText style={styles.subText}>Hijiri: {hijriDate}{'\n'}</CustomText>
            <CustomText style={styles.subText}>Gregorian: {gregorianDate}</CustomText>
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
    margin: 5,
    borderRadius: 20,
    overflow: 'hidden',
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
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    margin: 20,
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
   
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white', 
    borderRadius: 20, 
    paddingVertical: 10,
    paddingHorizontal: 20, 
    alignItems: 'center',
    justifyContent: 'center', 
    margin: 10, 
    borderWidth: 1, 
    borderColor: '#ddd', 
  },
  previousButton: {
    marginRight: 'auto',
  },
  nextButton: {
    marginLeft: 'auto',
  },
  buttonText: {
    fontSize: 16,
  },
  resetText: {
    fontSize: 16,
    marginTop: 15
  },
  menu: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E7EB',
  },
  menuItemIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default HomeScreen;
