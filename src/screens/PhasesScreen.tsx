import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useTheme } from '../styles/theme';
import moment from 'moment-hijri';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/Customtext';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

const PhasesScreen: React.FC = () => {
  const { colors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(moment().startOf('iMonth'));
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedDate) {
      const timer = setTimeout(() => {
        setSelectedDate(null);
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [selectedDate]);

  const startOfMonth = currentMonth.clone().startOf('week');
  const endOfMonth = currentMonth.clone().endOf('iMonth').endOf('week');

  const generateDates = () => {
    const dates = [];
    let day = startOfMonth.clone();

    while (day.isBefore(endOfMonth, 'day')) {
      dates.push(day.clone());
      day.add(1, 'day');
    }
    return dates;
  };

  const dates = generateDates();
  const currentGregorianMonth = moment(currentMonth.toDate()).locale('en').format('MMMM YYYY');
  const today = moment();

  const handleDatePress = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    if (selectedDate) {
      try {
        const hijriDate = selectedDate.locale('en').format('iD iMMMM iYYYY');
        const gregorianDate = selectedDate.locale('en').format('D MMMM YYYY');
        const moonPhase = getMoonPhase(selectedDate);

        const message = `Selected Date: ${hijriDate} (Hijri) / ${gregorianDate} (Gregorian)\nMoon Phase: ${moonPhase}`;
        await Share.share({
          message,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      alert('Please select a date to share.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.darkgray }]}>
      <Header
        title="Events"
        onBack={handleBack}
        onShare={handleShare}
        layout="phases"
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.clone().subtract(1, 'iMonth'))} style={styles.button}>
            <CustomText style={[styles.buttonText, { color: colors.darkgray }]}>Previous</CustomText>
      </TouchableOpacity>
         <CustomText style={[styles.monthText, { color: colors.surface }]}>{currentMonth.format('iMMMM iYYYY')}{'\n'} {currentGregorianMonth}</CustomText>
      <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.clone().add(1, 'iMonth'))} style={styles.button}>
            <CustomText style={[styles.buttonText, { color: colors.darkgray }]}>Next</CustomText>
          </TouchableOpacity>
      </View>

      <CustomText style={[styles.todayDate, { color: colors.surface}]}>Today's Hijri Date: {today.locale('en').format('iD iMMMM iYYYY')}</CustomText>

      <View style={styles.weekHeader}>
        {daysOfWeek.map(day => (
          <CustomText key={day} style={[styles.dayHeader, { color: colors.surface}]}>{day}</CustomText>
        ))}
      </View>

      <FlatList
        data={dates}
        renderItem={({ item }) => {
          const isToday = item.isSame(today, 'day');
          const isSelected = selectedDate && item.isSame(selectedDate, 'day');

          return (
            <TouchableOpacity onPress={() => handleDatePress(item)} style={styles.dateCellWrapper}>
              <View style={[
                styles.dateCell, 
                isToday && styles.todayCell, 
                isSelected && styles.selectedCell
              ]}>
                <CustomText style={[styles.dateText, { color: colors.surface}]}>{item.locale('en').format('iD')}</CustomText>
                <CustomText style={[styles.moonPhaseText,{ color: colors.surface}]}>{getMoonPhase(item)}</CustomText>
                <CustomText style={[styles.gregorianDateText,{ color: colors.surface}]}>{item.locale('en').format('D-M')}</CustomText>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.format('iYYYY-iMM-iDD')}
        numColumns={7}
      />

      {selectedDate && (
        <View style={[styles.selectedDateContainer, { backgroundColor: colors.background}]}>
          <CustomText style={[styles.selectedDateText, { color: colors.surface}]}>
            Selected Date: {selectedDate.locale('en').format('iD iMMMM iYYYY')} / {selectedDate.locale('en').format('D MMMM YYYY')}
          </CustomText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding:10
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:10
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
  buttonText: {
    fontSize: 16,
  },
  todayDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical:20,
    paddingHorizontal: 20,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dateCellWrapper: {
    width: '14.28%',
    marginVertical: 8, 
  },
  dateCell: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  todayCell: {
    backgroundColor: '#D502DC',
  },
  selectedCell: {
    backgroundColor: '#2C2C2C', 
    borderRadius: 5,
  },
  dateText: {
    fontSize: 14, 
  },
  moonPhaseText: {
    fontSize: 12,
    marginTop: 4, 
  },
  gregorianDateText: {
    fontSize: 12,
    marginTop: 2,
  },
  selectedDateContainer: {
    marginBottom:20,
    padding: 8,
    borderRadius: 8,
  },
  selectedDateText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PhasesScreen;
