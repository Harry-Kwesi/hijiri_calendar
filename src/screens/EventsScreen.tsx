import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList , Alert, Share} from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import SearchBox from '../components/SearchBox';

// Sample data for Islamic events with Hijri and Gregorian dates
const islamicEvents = [
  { year: 1445, event: 'Ramadan', hijriDate: '1 Ramadan 1445', gregorianDate: '23 March 2024' },
  { year: 1445, event: 'Eid al-Fitr', hijriDate: '1 Shawwal 1445', gregorianDate: '10 April 2024' },
  { year: 1445, event: 'Eid al-Adha', hijriDate: '10 Dhu al-Hijjah 1445', gregorianDate: '17 June 2024' },
  { year: 1446, event: 'Ramadan', hijriDate: '1 Ramadan 1446', gregorianDate: '11 March 2025' },
  { year: 1446, event: 'Eid al-Fitr', hijriDate: '1 Shawwal 1446', gregorianDate: '30 April 2025' },
  { year: 1446, event: 'Eid al-Adha', hijriDate: '10 Dhu al-Hijjah 1446', gregorianDate: '27 June 2025' },
  // Add more events with Hijri and Gregorian dates as needed
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
    console.log('Search button pressed with query:', query);
    const year = parseInt(query, 10);
    if (!isNaN(year)) {
      // Update the entered year state
      setEnteredYear(year);
      // Filter events based on the entered Hijri year
      const filteredEvents = islamicEvents.filter(event => event.year === year);
      setEvents(filteredEvents);
      setNoEvents(filteredEvents.length === 0); // Set noEvents to true if no events are found
    } else {
      setEnteredYear(null);
      setEvents([]);
      setNoEvents(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Events"
        onBack={handleBack}
        onShare={handleShare}
        layout="other"
      />
      <View style={styles.searchBoxContainer}>
        <SearchBox onSearch={handleSearch} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, { color: colors.text }]}>Enter a Hijiri Year 1319-1523</Text>
        <Text style={[styles.heading, { color: colors.text }]}>
          {enteredYear !== null ? `Hijiri Year: ${enteredYear}` : 'Hijiri Year'}
        </Text>
        <View style={styles.line} />
        {noEvents ? (
          <Text style={[styles.noEventsText, { color: colors.text }]}>No events found for this year</Text>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item, index) => `${item.year}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.eventContainer}>
                <Text style={[styles.eventText, { color: colors.text }]}>{item.event}</Text>
                <Text style={[styles.dateText, { color: colors.text }]}>{`Hijri: ${item.hijriDate}`}</Text>
                <Text style={[styles.dateText, { color: colors.text }]}>{`Gregorian: ${item.gregorianDate}`}</Text>
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
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
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
    backgroundColor: 'black', 
    width: '100%',
  },
  eventContainer: {
    marginVertical: 4,
  },
  eventText: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
  },
  noEventsText: {
    fontSize: 18,
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export default EventsScreen;
