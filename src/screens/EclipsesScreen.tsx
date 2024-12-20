import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Share } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import SearchBox from '../components/SearchBox';
import CustomText from '../components/Customtext';

// Sample data for eclipses with Hijri and Gregorian dates
const eclipses = [
  { year: 1445, eclipse: 'Solar Eclipse', hijriDate: '29 Ramadan 1445', gregorianDate: '17 March 2024' },
  { year: 1445, eclipse: 'Lunar Eclipse', hijriDate: '15 Shawwal 1445', gregorianDate: '06 April 2024' },
  { year: 1446, eclipse: 'Solar Eclipse', hijriDate: '27 Ramadan 1446', gregorianDate: '07 March 2025' },
  { year: 1446, eclipse: 'Lunar Eclipse', hijriDate: '10 Shawwal 1446', gregorianDate: '01 May 2025' },
 
];

const EclipsesScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [eclipsesData, setEclipsesData] = useState<{ year: number, eclipse: string, hijriDate: string, gregorianDate: string }[]>([]);
  const [noEclipses, setNoEclipses] = useState<boolean>(false);
  const [enteredYear, setEnteredYear] = useState<number | null>(null);

  const handleBack = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  const handleShare = async () => {
    if (!eclipsesData || eclipsesData.length === 0) {
      Alert.alert('No Content to Share', 'Please generate some content to share.');
      return;
    }

    const eclipseMessages = eclipsesData.map(eclipse => 
      `${eclipse.eclipse}\nHijri: ${eclipse.hijriDate}\nGregorian: ${eclipse.gregorianDate}`
    ).join('\n\n');

    try {
      const shareResult = await Share.share({
        message: eclipseMessages,
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
      setEnteredYear(year);
      const filteredEclipses = eclipses.filter(eclipse => eclipse.year === year);
      setEclipsesData(filteredEclipses);
      setNoEclipses(filteredEclipses.length === 0); 
    } else {
      setEnteredYear(null);
      setEclipsesData([]);
      setNoEclipses(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.darkgray }]}>
      <Header
        title="Eclipses"
        onBack={handleBack}
        onShare={handleShare}
        layout="eclipse"
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
        {noEclipses ? (
          <CustomText style={[styles.noEclipsesText, { color: colors.surface }]}>No eclipses found for this year</CustomText>
        ) : (
          <FlatList
            data={eclipsesData}
            keyExtractor={(item, index) => `${item.year}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.eclipseContainer}>
                <CustomText style={[styles.eclipseText, { color: colors.surface }]}>{item.eclipse}</CustomText>
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
  eclipseContainer: {
    marginVertical: 4,
  },
  eclipseText: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 18,
    color: 'gray',
  },
  noEclipsesText: {
    fontSize: 18,
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export default EclipsesScreen;
