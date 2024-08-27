import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import moment from 'moment-hijri';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const [currentMonth, setCurrentMonth] = useState(moment().startOf('iMonth'));
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedDate) {
      const timer = setTimeout(() => {
        setSelectedDate(null);
      }, 5000); // 30 seconds

      // Cleanup the timer if the component unmounts or the selectedDate changes
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
    <View style={styles.container}>
      <Header
        title="Events"
        onBack={handleBack}
        onShare={handleShare}
        layout="other"
      />
      <View style={styles.header}>
        <Text style={styles.monthText}>
          {currentMonth.format('iMMMM iYYYY')} / {currentGregorianMonth}
        </Text>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.clone().subtract(1, 'iMonth'))}>
            <Ionicons name="chevron-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.clone().add(1, 'iMonth'))}>
            <Ionicons name="chevron-forward-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.todayDate}>Today's Hijri Date: {today.locale('en').format('iD iMMMM iYYYY')}</Text>

      <View style={styles.weekHeader}>
        {daysOfWeek.map(day => (
          <Text key={day} style={styles.dayHeader}>{day}</Text>
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
                <Text style={styles.dateText}>{item.locale('en').format('iD')}</Text>
                <Text style={styles.moonPhaseText}>{getMoonPhase(item)}</Text>
                <Text style={styles.gregorianDateText}>{item.locale('en').format('D-M')}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.format('iYYYY-iMM-iDD')}
        numColumns={7}
      />

      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate.locale('en').format('iD iMMMM iYYYY')} / {selectedDate.locale('en').format('D MMMM YYYY')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', // Dark background color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // White text color
  },
  navigation: {
    flexDirection: 'row',
  },
  todayDate: {
    fontSize: 16,
    marginBottom: 16,
    color: '#ffffff', // White text color
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
    color: '#ffffff', // White text color
  },
  dateCellWrapper: {
    width: '14.28%',
    marginVertical: 8, // Adds space above and below each cell
  },
  dateCell: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  todayCell: {
    backgroundColor: '#4caf50', // Highlight color for today
  },
  selectedCell: {
    backgroundColor: '#2196f3', // Highlight color for selected date
  },
  dateText: {
    fontSize: 14,
    color: '#ffffff', // White text color
  },
  moonPhaseText: {
    fontSize: 12,
    marginTop: 4,
    color: '#ffffff', // White text color
  },
  gregorianDateText: {
    fontSize: 12,
    marginTop: 2,
    color: '#ffffff', // White text color
  },
  selectedDateContainer: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#333333',
    borderRadius: 8,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#ffffff', // White text color
    textAlign: 'center',
  },
});

export default PhasesScreen;
