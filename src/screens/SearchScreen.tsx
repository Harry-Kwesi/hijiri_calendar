import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import { useTheme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment-hijri';
import Icon from 'react-native-vector-icons/Ionicons';
import { Share } from 'react-native';
import CustomText from '../components/Customtext';
import CustomTextInput from '../components/CustomTextInput';

const SearchScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateInput, setDateInput] = useState<string>('');
  const [result, setResult] = useState<string>('Please choose or enter a valid Gregorian date in YYYY-MM-DD format.');

  const gregorianToHijri = (date: Date): string => {
    const gregorianDate = moment(date).format('YYYY-MM-DD');
    const hijriDate = moment(date).format('iYYYY/iM/iD');
    const [hijriYear, hijriMonth, hijriDay] = hijriDate.split('/').map(Number);
    return `Hijri ${hijriYear}-${String(hijriMonth).padStart(2, '0')}-${String(hijriDay).padStart(2, '0')}`;
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setDateInput(moment(date).format('YYYY-MM-DD'));
    setOpen(false);
    const hijriDate = gregorianToHijri(date);
    setResult(`Gregorian ${moment(date).format('YYYY-MM-DD')} converts to \n${hijriDate}`);
  };

  const handleInputChange = (text: string) => {
    setDateInput(text);
    const [year, month, day] = text.split('-').map(Number);
    if (year && month && day) {
      const hijriDate = gregorianToHijri(new Date(year, month - 1, day));
      setResult(`Gregorian ${text} converts to ${hijriDate}`);
    } else {
      setResult('Please enter a valid Gregorian date in YYYY-MM-DD format.');
    }
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  const handleShare = async () => {
    if (!result) {
      Alert.alert('No Content to Share', 'Please generate some content to share.');
      return;
    }
  
    try {
      const shareResult = await Share.share({
        message: result,
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
  

  return (
    <View style={[styles.container, { backgroundColor: colors.darkgray }]}>
      <Header
        title="Search"
        onBack={handleBack}
        onShare={handleShare} 
        layout="search"
      />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.iconContainer}>
            <Icon name="calendar-outline" size={24} color={colors.surface} />
          </TouchableOpacity>
          <CustomTextInput
            value={dateInput}
            onChangeText={handleInputChange}
            placeholder="Enter Gregorian date (YYYY-MM-DD)"
            placeholderTextColor="#ccc"
            style={{ color: colors.surface }}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.result}>
         <CustomText style={[styles.text, { color: colors.surface, fontWeight: 'bold' }]}>
               Details{'\n'}
        </CustomText>
        <CustomText style={[styles.subText, { color: colors.surface }]}>
               {result}
        </CustomText>
        </View>

        <DatePicker
          modal
          open={open}
          date={selectedDate || new Date()}
          mode="date"
          onConfirm={handleDateChange}
          onCancel={() => setOpen(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 15
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding:5,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#2C2C2C'
  },
  input: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },
  iconContainer: {
    padding: 10,
  },
  result: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    marginTop:20,
    padding: 10,
    alignSelf: 'center', 
  },
  text: {
    textAlign: 'left',
    width: '100%',
    fontSize: 24,
  },
  subText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default SearchScreen;
