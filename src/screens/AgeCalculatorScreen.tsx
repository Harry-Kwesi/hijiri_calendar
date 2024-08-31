import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, Share} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../styles/theme';
import Header from '../components/Header';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/Customtext';

const AgeCalculator = () => {
  const { colors } = useTheme();
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const navigation = useNavigation();

  const calculateAge = () => {
    if (year === null || month === null || day === null) {
      setAge('Please fill in all fields.');
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(year, month, 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setAge(`${ageYears} years, ${ageMonths} months, and ${ageDays} days`);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    if (!age) {
      Alert.alert('No Content to Share', 'Please generate some content to share.');
      return;
    }
  
    try {
      const shareResult = await Share.share({
        message: age,
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
        title="Age Calculator"
        onBack={handleBack}
        onShare={handleShare}
        layout="other"
      />
      <View style={styles.inputContainer}>
        <CustomTextInput
          style={styles.input}
          placeholder="Year"
          keyboardType="numeric"
          value={year !== null ? year.toString() : ''}
          onChangeText={(value) => setYear(value ? parseInt(value) : null)}
        />
        <Picker
          selectedValue={month}
          style={styles.input}
          onValueChange={(itemValue) => setMonth(itemValue)}
        >
          <Picker.Item label="Month" value={null} />
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <Picker.Item key={month} label={month.toString()} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={day}
          style={styles.input}
          onValueChange={(itemValue) => setDay(itemValue)}
        >
          <Picker.Item label="Day" value={null} />
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <Picker.Item key={day} label={day.toString()} value={day} />
          ))}
        </Picker>
      </View>
      <CustomText style={[styles.instruction, { color: colors.surface }]}>Enter your Date in Gregorian Format</CustomText>


      <TouchableOpacity style={styles.button} onPress={calculateAge}>
          <CustomText style={[styles.buttonText, {color: colors.surface}]}>GO</CustomText>
        </TouchableOpacity>

      
      
      {age && (
        <CustomText style={[styles.result, {color: colors.surface}]}>{age}</CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical:10
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#161616',
    marginRight: 5,
    fontSize: 18,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#D502DC',
  },
  buttonText: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
   
  },
  instruction: {
    textAlign: 'center',
    marginBottom:25
  },
  result: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#2C2C2C',
    borderRadius: 25,
    padding: 20,
    alignSelf: 'center', 
  },
});

export default AgeCalculator;
