import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList , Alert, Share} from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import SearchBox from '../components/SearchBox';
import CustomText from '../components/Customtext';


// Sample data for Islamic events with Hijri and Gregorian dates
const islamicEvents = [
  { year: 1445, event: 'Ramadan', hijriDate: '1 Ramadan 1445', gregorianDate: '23 March 2024' },
  { year: 1445, event: 'Eid al-Fitr', hijriDate: '1 Shawwal 1445', gregorianDate: '10 April 2024' },
  { year: 1445, event: 'Eid al-Adha', hijriDate: '10 Dhu al-Hijjah 1445', gregorianDate: '17 June 2024' },
  { year: 1446, event: 'Ramadan', hijriDate: '1 Ramadan 1446', gregorianDate: '11 March 2025' },
  { year: 1446, event: 'Eid al-Fitr', hijriDate: '1 Shawwal 1446', gregorianDate: '30 April 2025' },
  { year: 1446, event: 'Eid al-Adha', hijriDate: '10 Dhu al-Hijjah 1446', gregorianDate: '27 June 2025' },

];

const EventsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [events, setEvents] = useState<{ year: number, event: string, hijriDate: string, gregorianDate: string }[]>([]);
  const [noEvents, setNoEvents] = useState<boolean>(false);
  const [enteredYear, setEnteredYear] = useState<number | null>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    if (!events || events.length === 0) {
      Alert.alert('No Content to Share', 'Please generate some content to share.');
      return;
    }
  
    const eventMessages = events.map(event => 
      `${event.event}\nHijri: ${event.hijriDate}\nGregorian: ${event.gregorianDate}`
    ).join('\n\n');
  
    try {
      const shareResult = await Share.share({
        message: eventMessages,
      });
  
      if (shareResult.action === Share.sharedAction) {
        if (shareResult.activityType) {
          console.log(`Shared with activity type: ${shareResult.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (shareResult.action === Share.dismissedAction) {
        console.log('Share was dismissed');
      }
    } catch (error) {
      Alert.alert('Share Failed', 'An error occurred while sharing. Please try again.');
      console.error('Share failed:', error);
    }
  };
  
  const handleSearch = (query: string) => {
    const year = parseInt(query, 10);
    if (!isNaN(year)) {
      setEnteredYear(year);
      const filteredEvents = islamicEvents.filter(event => event.year === year);
      setEvents(filteredEvents);
      setNoEvents(filteredEvents.length === 0); 
    } else {
      setEnteredYear(null);
      setEvents([]);
      setNoEvents(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.darkgray }]}>
      <Header
        title="Events"
        onBack={handleBack}
        onShare={handleShare}
        layout="events"
      />
      <View style={styles.searchBoxContainer}>
        <SearchBox onSearch={handleSearch} />
      </View>
      <View style={styles.instruction}>
        <CustomText style={[styles.text, { color: colors.surface }]}>Enter a Hijiri Year 1319-1523</CustomText>
      </View>
      <View style={styles.content}>
        <CustomText style={[styles.heading, { color: colors.surface}]}>
          {enteredYear !== null ? `Hijiri Year: ${enteredYear}` : 'Hijiri Year'}
        </CustomText>
        <View style={styles.line} />
        {noEvents ? (
          <CustomText style={[styles.noEventsText, { color: colors.surface }]}>No events found for this year</CustomText>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item, index) => `${item.year}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.eventContainer}>
                <CustomText style={[styles.eventText, { color: colors.surface }]}>{item.event}</CustomText>
                <CustomText style={[styles.dateText, { color: colors.surface }]}>{`Hijri: ${item.hijriDate}`}</CustomText>
                <CustomText style={[styles.dateText, { color: colors.surface }]}>{`Gregorian: ${item.gregorianDate}`}</CustomText>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  instruction: {
     marginLeft:25
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    margin: 20,
    padding: 5,
  },
  text: {
    fontSize: 18,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 16,
    width: '100%',
  },
  line: {
    height: 1,
    backgroundColor: '#fff', 
    width: '100%',
  },
  eventContainer: {
    marginVertical: 4,
  },
  eventText: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 18,
    color: 'gray',
  },
  noEventsText: {
    fontSize: 18,
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export default EventsScreen;
